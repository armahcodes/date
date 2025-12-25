import { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrderHistory from "@/components/account/OrderHistory";

export const metadata: Metadata = {
  title: "Order History | DATE",
  description: "View your complete order history and track current orders.",
  openGraph: {
    title: "Order History | DATE",
    description: "View your complete order history and track current orders.",
    type: "website",
  },
};

export default function OrdersPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <OrderHistory />
      <Footer />
    </Flex>
  );
}
