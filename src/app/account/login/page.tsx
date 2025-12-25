import { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/account/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | DATE",
  description:
    "Sign in to your DATE account to manage orders, subscriptions, and more.",
  openGraph: {
    title: "Sign In | DATE",
    description:
      "Sign in to your DATE account to manage orders, subscriptions, and more.",
    type: "website",
  },
};

export default function LoginPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <LoginForm />
      <Footer />
    </Flex>
  );
}
