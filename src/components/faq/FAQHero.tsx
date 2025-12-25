"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function FAQHero() {
  return (
    <Box as="section" position="relative" minH={{ base: "40vh", md: "50vh" }} overflow="hidden">
      {/* Background Image */}
      <Box position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/5_94241ea3-dddd-41d3-a8b2-f573df8810e2.png?v=1762903700&width=3200"
          alt="FAQ Background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
        {/* Overlay */}
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.500"
        />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        minH={{ base: "40vh", md: "50vh" }}
        direction="column"
        justify="center"
        align="center"
        px={{ base: "20px", md: "30px", lg: "50px" }}
        textAlign="center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <VStack gap={{ base: 4, md: 5 }}>
            <Heading
              as="h1"
              color="white"
              fontSize={{ base: "36px", md: "48px", lg: "56px" }}
              fontWeight="600"
              lineHeight="1.1"
              letterSpacing="-0.02em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Frequently Asked Questions
            </Heading>

            <Text
              color="whiteAlpha.900"
              fontSize={{ base: "15px", md: "17px" }}
              lineHeight="1.6"
              maxW="500px"
            >
              Everything you need to know about DATE
            </Text>
          </VStack>
        </motion.div>
      </Flex>
    </Box>
  );
}
