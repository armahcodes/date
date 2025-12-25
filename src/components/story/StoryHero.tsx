"use client";

import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function StoryHero() {
  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "80px", md: "120px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="900px" mx="auto" textAlign="center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <VStack gap={{ base: 6, md: 8 }}>
            {/* Eyebrow */}
            <Text
              fontSize="12px"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="blackAlpha.500"
              fontWeight="500"
            >
              Our Story
            </Text>

            {/* Main Title */}
            <Heading
              as="h1"
              color="black"
              fontSize={{ base: "40px", md: "56px", lg: "64px" }}
              fontWeight="600"
              lineHeight="1.1"
              letterSpacing="-0.02em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Ancient Roots.
              <br />
              Modern Vibe.
            </Heading>

            {/* Subtitle */}
            <Text
              color="blackAlpha.700"
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight="1.8"
              maxW="650px"
              mx="auto"
            >
              In 2024, two friends in Los Angeles set out to create something different -
              a beverage that could restore and revitalize without the crash of caffeine
              or the guilt of sugar. What they discovered wasn&apos;t a new ingredient,
              but an ancient one.
            </Text>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  );
}
