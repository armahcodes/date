import { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubscriptionManagement from "@/components/account/SubscriptionManagement";

export const metadata: Metadata = {
  title: "Subscriptions | DATE",
  description:
    "Manage your DATE subscriptions. Pause, skip, or cancel anytime.",
  openGraph: {
    title: "Subscriptions | DATE",
    description:
      "Manage your DATE subscriptions. Pause, skip, or cancel anytime.",
    type: "website",
  },
};

export default function SubscriptionsPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <SubscriptionManagement />
      <Footer />
    </Flex>
  );
}
