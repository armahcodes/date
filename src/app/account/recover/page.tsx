import { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PasswordRecovery from "@/components/account/PasswordRecovery";

export const metadata: Metadata = {
  title: "Reset Password | DATE",
  description: "Reset your DATE account password.",
  openGraph: {
    title: "Reset Password | DATE",
    description: "Reset your DATE account password.",
    type: "website",
  },
};

export default function RecoverPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <PasswordRecovery />
      <Footer />
    </Flex>
  );
}
