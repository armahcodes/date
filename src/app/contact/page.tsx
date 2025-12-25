import { Metadata } from "next";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact Us | DATE - Get in Touch",
  description:
    "Have questions about DATE? Get in touch with our team. We're here to help with orders, subscriptions, and anything else you need.",
  openGraph: {
    title: "Contact Us | DATE",
    description:
      "Have questions about DATE? Get in touch with our team. We're here to help with orders, subscriptions, and anything else you need.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <ContactHero />
      <ContactForm />
      <ContactFAQ />
      <Footer />
    </Flex>
  );
}
