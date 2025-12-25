import { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountDashboard from "@/components/account/AccountDashboard";

export const metadata: Metadata = {
  title: "My Account | DATE",
  description:
    "Manage your DATE account, view orders, and manage your subscriptions.",
  openGraph: {
    title: "My Account | DATE",
    description:
      "Manage your DATE account, view orders, and manage your subscriptions.",
    type: "website",
  },
};

export default function AccountPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <AccountDashboard />
      <Footer />
    </Flex>
  );
}
