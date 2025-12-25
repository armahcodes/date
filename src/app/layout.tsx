import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ChakraProvider } from "@/components/providers/ChakraProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DATE | Ancient Seed. Modern Resilience.",
  description: "DATE is a high performing restorative beverage crafted from upcycled date seeds. Zero caffeine, zero sugar, with prebiotic fiber for your modern resilience.",
  keywords: ["date beverage", "functional drink", "zero sugar", "zero caffeine", "prebiotic", "wellness", "upcycled", "date seeds"],
  openGraph: {
    title: "DATE | Ancient Seed. Modern Resilience.",
    description: "Experience the restorative power of upcycled date seeds. A functional beverage for your modern resilience.",
    type: "website",
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
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
