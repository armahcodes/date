import { Metadata } from "next";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TermsContent from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | DATE",
  description:
    "Read the Terms of Service for DATE. These terms describe your rights and responsibilities when using our services and purchasing our products.",
  openGraph: {
    title: "Terms of Service | DATE",
    description:
      "Read the Terms of Service for DATE. These terms describe your rights and responsibilities when using our services and purchasing our products.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <TermsContent />
      <Footer />
    </Flex>
  );
}
