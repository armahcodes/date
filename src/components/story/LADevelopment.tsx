"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function LADevelopment() {
  return (
    <Box as="section" position="relative" minH={{ base: "500px", md: "80vh" }} overflow="hidden">
      {/* Background Image */}
      <Box position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/5_94241ea3-dddd-41d3-a8b2-f573df8810e2.png?v=1762903700&width=3200"
          alt="Los Angeles palm trees"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
        {/* Overlay */}
        <Box position="absolute" inset={0} bg="blackAlpha.400" />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        minH={{ base: "500px", md: "80vh" }}
        align="center"
        justify="center"
        px={{ base: "20px", md: "40px", lg: "60px" }}
        py={{ base: "60px", md: "100px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={6} maxW="800px" textAlign="center">
            <Heading
              as="h2"
              color="white"
              fontSize={{ base: "28px", md: "40px", lg: "48px" }}
              fontWeight="600"
              lineHeight="1.15"
              letterSpacing="-0.01em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Back in LA, the mission was clear: bring this ancient wisdom to the modern world.
            </Heading>

            <VStack gap={4} color="whiteAlpha.900" fontSize={{ base: "15px", md: "17px" }} lineHeight="1.8">
              <Text maxW="650px">
                Months of experimentation in their kitchen led to the perfect formula.
                A carbonated date seed beverage that captured the essence of the original -
                naturally sweet, deeply satisfying, and genuinely good for you.
              </Text>
              <Text maxW="650px">
                They called it{" "}
                <Text as="span" fontWeight="700">
                  DATE
                </Text>
                .
              </Text>
            </VStack>
          </VStack>
        </motion.div>
      </Flex>
    </Box>
  );
}
