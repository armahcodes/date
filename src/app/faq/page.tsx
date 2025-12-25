import { Metadata } from "next";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQHero from "@/components/faq/FAQHero";
import FAQAccordion from "@/components/faq/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ | DATE - Frequently Asked Questions",
  description:
    "Find answers to common questions about DATE functional beverages. Learn about our ingredients, shipping, subscriptions, and more.",
  openGraph: {
    title: "FAQ | DATE - Frequently Asked Questions",
    description:
      "Find answers to common questions about DATE functional beverages. Learn about our ingredients, shipping, subscriptions, and more.",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <FAQHero />
      <FAQAccordion />
      <Footer />
    </Flex>
  );
}
