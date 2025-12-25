const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "jveysj-j1.myshopify.com";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "25c926578cbad919e88a9f0fd1ff1aa9";

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: Array<{ message: string }>;
};

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    console.error("Shopify API Error:", JSON.stringify(json.errors, null, 2));
    console.error("Query:", query.slice(0, 100));
    console.error("Variables:", JSON.stringify(variables, null, 2));
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  return json.data;
}

// Types
export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface SellingPlan {
  id: string;
  name: string;
  description: string | null;
}

export interface SellingPlanGroup {
  name: string;
  sellingPlans: {
    edges: Array<{ node: SellingPlan }>;
  };
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>;
  };
  sellingPlanGroups?: {
    edges: Array<{ node: SellingPlanGroup }>;
  };
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
}

// Queries
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          sellingPlanGroups(first: 5) {
            edges {
              node {
                name
                sellingPlans(first: 5) {
                  edges {
                    node {
                      id
                      name
                      description
                    }
                  }
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
      sellingPlanGroups(first: 5) {
        edges {
          node {
            name
            sellingPlans(first: 5) {
              edges {
                node {
                  id
                  name
                  description
                }
              }
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

// API Functions
export async function getProducts(first: number = 10): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(PRODUCTS_QUERY, { first });

  return data.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>(PRODUCT_BY_HANDLE_QUERY, { handle });

  return data.productByHandle;
}

// Cart functionality
const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          sellingPlanAllocation {
            sellingPlan {
              id
              name
            }
            priceAdjustments {
              price {
                amount
                currencyCode
              }
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART_QUERY = `
  ${CART_FRAGMENT}
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export interface SellingPlanAllocation {
  sellingPlan: {
    id: string;
    name: string;
  };
  priceAdjustments: Array<{
    price: ShopifyPrice;
  }>;
}

export interface CartLine {
  id: string;
  quantity: number;
  sellingPlanAllocation?: SellingPlanAllocation | null;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyPrice;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{ node: CartLine }>;
  };
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
}

export async function createCart(variantId: string, quantity: number = 1, sellingPlanId?: string): Promise<Cart> {
  const lineItem: { merchandiseId: string; quantity: number; sellingPlanId?: string } = {
    merchandiseId: variantId,
    quantity,
  };

  if (sellingPlanId) {
    lineItem.sellingPlanId = sellingPlanId;
  }

  const data = await shopifyFetch<{
    cartCreate: {
      cart: Cart | null;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(CREATE_CART_MUTATION, {
    input: {
      lines: [lineItem],
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }

  if (!data.cartCreate.cart) {
    throw new Error(`Failed to create cart. Variant ID: ${variantId} may be invalid.`);
  }

  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{
    cart: Cart | null;
  }>(GET_CART_QUERY, { cartId });

  return data.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1, sellingPlanId?: string): Promise<Cart> {
  const lineItem: { merchandiseId: string; quantity: number; sellingPlanId?: string } = {
    merchandiseId: variantId,
    quantity,
  };

  if (sellingPlanId) {
    lineItem.sellingPlanId = sellingPlanId;
  }

  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: Cart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(ADD_TO_CART_MUTATION, {
    cartId,
    lines: [lineItem],
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: Cart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(UPDATE_CART_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: Cart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(REMOVE_FROM_CART_MUTATION, {
    cartId,
    lineIds,
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(", "));
  }

  return data.cartLinesRemove.cart;
}

// Helper to format price
export function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  }).format(amount);
}

// Helper to get the first selling plan from a product (for pre-orders)
export function getFirstSellingPlan(product: ShopifyProduct): SellingPlan | null {
  const firstGroup = product.sellingPlanGroups?.edges[0]?.node;
  if (!firstGroup) return null;

  const firstPlan = firstGroup.sellingPlans.edges[0]?.node;
  return firstPlan || null;
}

// Helper to check if a product requires a selling plan
export function requiresSellingPlan(product: ShopifyProduct): boolean {
  return (product.sellingPlanGroups?.edges.length ?? 0) > 0;
}
