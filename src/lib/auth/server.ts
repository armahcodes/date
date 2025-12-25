import { neonAuth } from "@neondatabase/neon-js/auth/next";

export async function getUser() {
  const auth = await neonAuth();
  return auth.user;
}

export async function getSession() {
  const auth = await neonAuth();
  return auth.session;
}
