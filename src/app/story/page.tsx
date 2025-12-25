import { Metadata } from "next";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoryHero from "@/components/story/StoryHero";
import HeritageSection from "@/components/story/HeritageSection";
import LADevelopment from "@/components/story/LADevelopment";
import SustainabilitySection from "@/components/story/SustainabilitySection";
import StoryCTA from "@/components/story/StoryCTA";

export const metadata: Metadata = {
  title: "Our Story | DATE - Ancient Roots. Modern Vibe.",
  description:
    "Discover the story behind DATE. From ancient Arabian heritage to modern Los Angeles, learn how we crafted a functional beverage from upcycled date seeds.",
  openGraph: {
    title: "Our Story | DATE - Ancient Roots. Modern Vibe.",
    description:
      "Discover the story behind DATE. From ancient Arabian heritage to modern Los Angeles, learn how we crafted a functional beverage from upcycled date seeds.",
    type: "website",
  },
};

export default function OurStoryPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <StoryHero />
      <HeritageSection />
      <LADevelopment />
      <SustainabilitySection />
      <StoryCTA />
      <Footer />
    </Flex>
  );
}
