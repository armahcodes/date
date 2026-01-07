import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dateseedsoda.com";

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
    creator: "@dateseedsoda",
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
      <head>
        {/* Klaviyo On-Site Tracking */}
        <Script
          id="klaviyo-script"
          src="https://static.klaviyo.com/onsite/js/XevyP7/klaviyo.js?company_id=XevyP7"
          strategy="afterInteractive"
        />
        <Script id="klaviyo-init" strategy="afterInteractive">
          {`
            !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
          `}
        </Script>
      </head>
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
