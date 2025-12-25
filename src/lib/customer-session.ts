/**
 * Customer Session Management
 *
 * Handles storing and retrieving Shopify Customer Account API tokens
 * using HTTP-only cookies for security.
 */

import { cookies } from 'next/headers';
import { CustomerTokens, refreshAccessToken } from './shopify-customer';

const COOKIE_NAME = 'shopify_customer_session';
const VERIFIER_COOKIE = 'shopify_oauth_verifier';
const STATE_COOKIE = 'shopify_oauth_state';
const NONCE_COOKIE = 'shopify_oauth_nonce';

interface SessionData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  idToken?: string;
}

/**
 * Store OAuth state for verification
 */
export async function storeOAuthState(
  codeVerifier: string,
  state: string,
  nonce: string
): Promise<void> {
  const cookieStore = await cookies();

  // Store for 10 minutes (OAuth flow should complete quickly)
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 600,
    path: '/',
  };

  cookieStore.set(VERIFIER_COOKIE, codeVerifier, options);
  cookieStore.set(STATE_COOKIE, state, options);
  cookieStore.set(NONCE_COOKIE, nonce, options);
}

/**
 * Get and clear OAuth state
 */
export async function getAndClearOAuthState(): Promise<{
  codeVerifier: string | null;
  state: string | null;
  nonce: string | null;
}> {
  const cookieStore = await cookies();

  const codeVerifier = cookieStore.get(VERIFIER_COOKIE)?.value || null;
  const state = cookieStore.get(STATE_COOKIE)?.value || null;
  const nonce = cookieStore.get(NONCE_COOKIE)?.value || null;

  // Clear the OAuth cookies
  cookieStore.delete(VERIFIER_COOKIE);
  cookieStore.delete(STATE_COOKIE);
  cookieStore.delete(NONCE_COOKIE);

  return { codeVerifier, state, nonce };
}

/**
 * Store customer session tokens
 */
export async function setCustomerSession(tokens: CustomerTokens): Promise<void> {
  const cookieStore = await cookies();

  const sessionData: SessionData = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresAt: tokens.expiresAt,
    idToken: tokens.idToken,
  };

  // Encrypt session data in production (for now, using JSON)
  const sessionValue = Buffer.from(JSON.stringify(sessionData)).toString('base64');

  cookieStore.set(COOKIE_NAME, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
}

/**
 * Get customer session, refreshing token if needed
 */
export async function getCustomerSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const sessionData: SessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    );

    // Check if token is expired or will expire in the next 5 minutes
    const expiresIn = sessionData.expiresAt - Date.now();
    if (expiresIn < 5 * 60 * 1000) {
      // Token expired or expiring soon, try to refresh
      try {
        const newTokens = await refreshAccessToken(sessionData.refreshToken);
        await setCustomerSession(newTokens);
        return {
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
          expiresAt: newTokens.expiresAt,
          idToken: newTokens.idToken,
        };
      } catch (error) {
        console.error('Failed to refresh token:', error);
        // Clear invalid session
        await clearCustomerSession();
        return null;
      }
    }

    return sessionData;
  } catch (error) {
    console.error('Failed to parse session:', error);
    await clearCustomerSession();
    return null;
  }
}

/**
 * Get just the access token (convenience method)
 */
export async function getCustomerAccessToken(): Promise<string | null> {
  const session = await getCustomerSession();
  return session?.accessToken || null;
}

/**
 * Get the ID token for logout
 */
export async function getCustomerIdToken(): Promise<string | null> {
  const session = await getCustomerSession();
  return session?.idToken || null;
}

/**
 * Clear customer session
 */
export async function clearCustomerSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Check if customer is authenticated
 */
export async function isCustomerAuthenticated(): Promise<boolean> {
  const session = await getCustomerSession();
  return session !== null;
}
