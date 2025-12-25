import { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountSettings from "@/components/account/AccountSettings";

export const metadata: Metadata = {
  title: "Account Settings | DATE",
  description: "Manage your DATE account settings and preferences.",
  openGraph: {
    title: "Account Settings | DATE",
    description: "Manage your DATE account settings and preferences.",
    type: "website",
  },
};

export default function SettingsPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <AccountSettings />
      <Footer />
    </Flex>
  );
}
