import { neonAuthMiddleware } from "@neondatabase/neon-js/auth/next";

// Protect account routes - redirect to sign-in if not authenticated
export default neonAuthMiddleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: [
    // Protected routes
    "/account/:path*",
    // Auth routes
    "/auth/:path*",
    // API auth routes
    "/api/auth/:path*",
  ],
};
