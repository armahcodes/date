import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ChakraProvider } from "@/components/providers/ChakraProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedatedrink.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DATE | Ancient Seed. Modern Resilience.",
    template: "%s | DATE",
  },
  description:
    "DATE is a high performing restorative beverage crafted from upcycled date seeds. Zero caffeine, zero sugar, with prebiotic fiber for your modern resilience.",
  keywords: [
    "date beverage",
    "functional drink",
    "zero sugar",
    "zero caffeine",
    "prebiotic",
    "wellness",
    "upcycled",
    "date seeds",
    "healthy soda",
    "gut health",
  ],
  authors: [{ name: "DATE" }],
  creator: "DATE",
  publisher: "DATE",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DATE",
    title: "DATE | Ancient Seed. Modern Resilience.",
    description:
      "Experience the restorative power of upcycled date seeds. A functional beverage with zero caffeine, zero sugar, and prebiotic fiber for your modern resilience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DATE | Ancient Seed. Modern Resilience.",
    description:
      "Experience the restorative power of upcycled date seeds. Zero caffeine, zero sugar, with prebiotic fiber.",
    creator: "@thedatedrink",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.variable}>
        <ChakraProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
