import { Metadata } from "next";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeritageHero from "@/components/heritage/HeritageHero";
import HistorySection from "@/components/heritage/HistorySection";
import LegacySection from "@/components/heritage/LegacySection";
import HeritageFeatures from "@/components/heritage/HeritageFeatures";
import HeritageCTA from "@/components/heritage/HeritageCTA";

export const metadata: Metadata = {
  title: "Ancient Heritage | DATE - How Ancient Ingenuity Transformed a Resource",
  description:
    "Discover the ancient heritage behind DATE. Learn how Bedouin tribes transformed overlooked date seeds into a powerful restorative beverage centuries ago.",
  openGraph: {
    title: "Ancient Heritage | DATE",
    description:
      "Discover the ancient heritage behind DATE. Learn how Bedouin tribes transformed overlooked date seeds into a powerful restorative beverage centuries ago.",
    type: "website",
  },
};

export default function AncientHeritagePage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <HeritageHero />
      <HistorySection />
      <LegacySection />
      <HeritageFeatures />
      <HeritageCTA />
      <Footer />
    </Flex>
  );
}
