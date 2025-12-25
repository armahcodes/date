/**
 * Shopify Customer Account API
 *
 * This module handles OAuth2 authentication with Shopify's Customer Account API
 * and provides functions to fetch customer data (orders, subscriptions, profile).
 *
 * Based on: https://shopify.dev/docs/api/customer/latest#step-authorization
 */

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "jveysj-j1.myshopify.com";
const CUSTOMER_ACCOUNT_API_CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID || "";
const CUSTOMER_ACCOUNT_API_CLIENT_SECRET = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_SECRET || "";

// Customer Account API endpoints (using store domain)
// Auth endpoints use /authentication/oauth/
const AUTH_URL = `https://${SHOPIFY_STORE_DOMAIN}/authentication/oauth/authorize`;
const TOKEN_URL = `https://${SHOPIFY_STORE_DOMAIN}/authentication/oauth/token`;
const LOGOUT_URL = `https://${SHOPIFY_STORE_DOMAIN}/authentication/logout`;

// GraphQL API endpoint
const CUSTOMER_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/account/customer/api/2024-10/graphql`;

// Types
export interface ShopifyCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  email: string;
  phone: string | null;
  defaultAddress: ShopifyAddress | null;
  addresses: {
    edges: Array<{ node: ShopifyAddress }>;
  };
}

export interface ShopifyAddress {
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  provinceCode: string | null;
  country: string | null;
  countryCode: string | null;
  zip: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
}

export interface ShopifyOrder {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          title: string;
          image: {
            url: string;
            altText: string | null;
          } | null;
          price: {
            amount: string;
            currencyCode: string;
          };
        } | null;
      };
    }>;
  };
}

export interface ShopifySubscriptionContract {
  id: string;
  status: string;
  nextBillingDate: string | null;
  deliveryPolicy: {
    interval: string;
    intervalCount: number;
  };
  lines: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        currentPrice: {
          amount: string;
          currencyCode: string;
        };
        productId: string;
        variantId: string;
        variantImage: {
          url: string;
          altText: string | null;
        } | null;
      };
    }>;
  };
}

export interface CustomerTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  idToken?: string;
}

// Generate code verifier for PKCE (must be 43-128 characters, URL-safe)
function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Generate code challenge from verifier using SHA-256
async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  // URL-safe base64 encoding
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Generate random state for CSRF protection
function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Generate nonce for replay attack prevention
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate the authorization URL for Shopify Customer Account login
 * Uses PKCE flow for public clients (web apps)
 */
export async function getAuthorizationUrl(redirectUri: string): Promise<{
  url: string;
  codeVerifier: string;
  state: string;
  nonce: string;
}> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateState();
  const nonce = generateNonce();

  const params = new URLSearchParams({
    client_id: CUSTOMER_ACCOUNT_API_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'openid email customer-account-api:full',
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return {
    url: `${AUTH_URL}?${params.toString()}`,
    codeVerifier,
    state,
    nonce,
  };
}

/**
 * Exchange authorization code for tokens
 * For confidential clients, uses Basic auth with client credentials
 * For public clients, uses code_verifier (PKCE)
 */
export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<CustomerTokens> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body: Record<string, string> = {
    grant_type: 'authorization_code',
    client_id: CUSTOMER_ACCOUNT_API_CLIENT_ID,
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  };

  // If we have a client secret (confidential client), use Basic auth
  if (CUSTOMER_ACCOUNT_API_CLIENT_SECRET) {
    const credentials = Buffer.from(
      `${CUSTOMER_ACCOUNT_API_CLIENT_ID}:${CUSTOMER_ACCOUNT_API_CLIENT_SECRET}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers,
    body: new URLSearchParams(body),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Token exchange error:', error);
    throw new Error(`Token exchange failed: ${error}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
    idToken: data.id_token,
  };
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<CustomerTokens> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body: Record<string, string> = {
    grant_type: 'refresh_token',
    client_id: CUSTOMER_ACCOUNT_API_CLIENT_ID,
    refresh_token: refreshToken,
  };

  // If we have a client secret, use Basic auth
  if (CUSTOMER_ACCOUNT_API_CLIENT_SECRET) {
    const credentials = Buffer.from(
      `${CUSTOMER_ACCOUNT_API_CLIENT_ID}:${CUSTOMER_ACCOUNT_API_CLIENT_SECRET}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers,
    body: new URLSearchParams(body),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Token refresh error:', error);
    throw new Error('Token refresh failed');
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
    idToken: data.id_token,
  };
}

/**
 * Get logout URL (end_session_endpoint)
 */
export function getLogoutUrl(idToken: string, postLogoutRedirectUri: string): string {
  const params = new URLSearchParams({
    id_token_hint: idToken,
    post_logout_redirect_uri: postLogoutRedirectUri,
  });

  return `${LOGOUT_URL}?${params.toString()}`;
}

/**
 * Make authenticated GraphQL request to Customer Account API
 * Authorization header format: just the access_token (not "Bearer")
 */
async function customerApiFetch<T>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
  origin?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': accessToken,
  };

  // For public clients, include origin header
  if (origin) {
    headers['Origin'] = origin;
  }

  const response = await fetch(CUSTOMER_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Customer API Error:', JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data;
}

// GraphQL Queries
const CUSTOMER_QUERY = `
  query CustomerDetails {
    customer {
      id
      firstName
      lastName
      displayName
      email
      phone
      defaultAddress {
        id
        address1
        address2
        city
        province
        provinceCode
        country
        countryCode
        zip
        phone
        firstName
        lastName
        company
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            provinceCode
            country
            countryCode
            zip
            phone
            firstName
            lastName
            company
          }
        }
      }
    }
  }
`;

const ORDERS_QUERY = `
  query CustomerOrders($first: Int!) {
    customer {
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            orderNumber
            processedAt
            fulfillmentStatus
            financialStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    title
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const SUBSCRIPTIONS_QUERY = `
  query CustomerSubscriptions($first: Int!) {
    customer {
      subscriptionContracts(first: $first) {
        edges {
          node {
            id
            status
            nextBillingDate
            deliveryPolicy {
              interval
              intervalCount
            }
            lines(first: 10) {
              edges {
                node {
                  title
                  quantity
                  currentPrice {
                    amount
                    currencyCode
                  }
                  productId
                  variantId
                  variantImage {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch customer profile
 */
export async function getCustomer(accessToken: string): Promise<ShopifyCustomer | null> {
  try {
    const data = await customerApiFetch<{ customer: ShopifyCustomer }>(
      accessToken,
      CUSTOMER_QUERY
    );
    return data.customer;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
}

/**
 * Fetch customer orders
 */
export async function getCustomerOrders(
  accessToken: string,
  first: number = 10
): Promise<ShopifyOrder[]> {
  try {
    const data = await customerApiFetch<{
      customer: { orders: { edges: Array<{ node: ShopifyOrder }> } };
    }>(accessToken, ORDERS_QUERY, { first });

    return data.customer.orders.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

/**
 * Fetch customer subscriptions
 */
export async function getCustomerSubscriptions(
  accessToken: string,
  first: number = 10
): Promise<ShopifySubscriptionContract[]> {
  try {
    const data = await customerApiFetch<{
      customer: { subscriptionContracts: { edges: Array<{ node: ShopifySubscriptionContract }> } };
    }>(accessToken, SUBSCRIPTIONS_QUERY, { first });

    return data.customer.subscriptionContracts.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
}

/**
 * Format price helper
 */
export function formatPrice(price: { amount: string; currencyCode: string }): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(amount);
}

/**
 * Format date helper
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get fulfillment status label
 */
export function getFulfillmentStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    UNFULFILLED: 'Processing',
    PARTIALLY_FULFILLED: 'Partially Shipped',
    FULFILLED: 'Shipped',
    RESTOCKED: 'Restocked',
    PENDING_FULFILLMENT: 'Pending',
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    ON_HOLD: 'On Hold',
    SCHEDULED: 'Scheduled',
  };
  return labels[status] || status;
}

/**
 * Get subscription status label
 */
export function getSubscriptionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    ACTIVE: 'Active',
    PAUSED: 'Paused',
    CANCELLED: 'Cancelled',
    EXPIRED: 'Expired',
    FAILED: 'Failed',
  };
  return labels[status] || status;
}

/**
 * Get delivery interval label
 */
export function getDeliveryIntervalLabel(interval: string, count: number): string {
  const intervalLabels: Record<string, string> = {
    DAY: count === 1 ? 'day' : 'days',
    WEEK: count === 1 ? 'week' : 'weeks',
    MONTH: count === 1 ? 'month' : 'months',
    YEAR: count === 1 ? 'year' : 'years',
  };
  return `Every ${count} ${intervalLabels[interval] || interval.toLowerCase()}`;
}
