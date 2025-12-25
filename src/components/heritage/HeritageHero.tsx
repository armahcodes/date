"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HeritageHero() {
  return (
    <Box as="section" position="relative" minH={{ base: "60vh", md: "80vh" }} overflow="hidden">
      {/* Background Image */}
      <Box position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/Date_1.png?v=1762903894&width=1600"
          alt="Ancient desert landscape"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, blackAlpha.700, blackAlpha.300, transparent)"
        />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        minH={{ base: "60vh", md: "80vh" }}
        direction="column"
        justify="flex-end"
        align="center"
        pb={{ base: 16, md: 24 }}
        px={{ base: "20px", md: "30px", lg: "50px" }}
        textAlign="center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <VStack gap={{ base: 4, md: 6 }}>
            <Heading
              as="h1"
              color="white"
              fontSize={{ base: "42px", md: "56px", lg: "72px" }}
              fontWeight="600"
              lineHeight="1.05"
              letterSpacing="-0.02em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Ancient Heritage
            </Heading>

            <Text
              color="whiteAlpha.900"
              fontSize={{ base: "16px", md: "20px" }}
              lineHeight="1.6"
              maxW="600px"
            >
              How ancient ingenuity transformed an overlooked resource into a powerful tool for wellness
            </Text>
          </VStack>
        </motion.div>
      </Flex>
    </Box>
  );
}
