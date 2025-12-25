"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <Box as="section" position="relative" minH={{ base: "35vh", md: "45vh" }} overflow="hidden">
      {/* Background Image */}
      <Box position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/5_94241ea3-dddd-41d3-a8b2-f573df8810e2.png?v=1762903700&width=3200"
          alt="Contact Background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
        {/* Overlay */}
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.400"
        />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        minH={{ base: "35vh", md: "45vh" }}
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
          <VStack gap={{ base: 3, md: 4 }}>
            <Heading
              as="h1"
              color="white"
              fontSize={{ base: "36px", md: "48px", lg: "56px" }}
              fontWeight="600"
              lineHeight="1.1"
              letterSpacing="-0.02em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Contact Us
            </Heading>

            <Text
              color="whiteAlpha.900"
              fontSize={{ base: "15px", md: "17px" }}
              lineHeight="1.6"
              maxW="450px"
            >
              We&apos;d love to hear from you
            </Text>
          </VStack>
        </motion.div>
      </Flex>
    </Box>
  );
}
