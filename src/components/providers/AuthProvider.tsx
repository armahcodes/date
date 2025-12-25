"use client";

import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react/ui";
import { authClient } from "@/lib/auth/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider authClient={authClient}>
      {children}
    </NeonAuthUIProvider>
  );
}
