"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box as="section" position="relative" minH={{ base: "550px", md: "750px" }} overflow="hidden">
      {/* Desktop Background Image */}
      <Box display={{ base: "none", md: "block" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/Hero.png?v=1762896979&width=3200"
          alt="DATE Hero"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="100vw"
        />
      </Box>

      {/* Mobile Background Image */}
      <Box display={{ base: "block", md: "none" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/51_Top_Updated.png?v=1762903893&width=1200"
          alt="DATE Hero Mobile"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          priority
          sizes="100vw"
        />
      </Box>

      {/* Content Container */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        w="full"
        direction="column"
        minH={{ base: "550px", md: "750px" }}
      >
        <Flex
          flex={1}
          align="flex-end"
          pb={{ base: 12, md: 20 }}
          px={{ base: "20px", md: "30px", lg: "50px" }}
        >
          <Box
            w={{ base: "full", md: "50%" }}
            maxW={{ md: "50%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            {/* Heading */}
            <Heading
              as="h1"
              color="#f5f5f5"
              fontSize={{ base: "30px", md: "34px" }}
              fontWeight="600"
              lineHeight="1.15"
              mb={4}
              letterSpacing="-0.01em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Ancient Seed. Modern Resilience.
            </Heading>

            {/* Body text */}
            <Box mb={6}>
              <Text
                color="rgba(245, 245, 245, 0.9)"
                fontSize="15px"
                fontWeight="600"
                lineHeight="1.6"
              >
                Centuries ago, Desert Nomads in Arabia discovered the richness of the date seed. Inspired by this ancient tradition, we crafted a restorative blend for your modern resilience.
              </Text>
            </Box>

            {/* CTA Button */}
            <Link href="/products" style={{ textDecoration: "none" }}>
              <Button
                bg="#3a1f87"
                color="white"
                px={{ base: 6, md: 7 }}
                py={{ base: 2.5, md: 3 }}
                h="auto"
                fontSize={{ base: "13px", md: "14px" }}
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.1em"
                borderRadius="full"
                border="2px solid"
                borderColor="#3a1f87"
                _hover={{ bg: "#2d1869", borderColor: "#2d1869" }}
                transition="all 0.3s"
              >
                Pre-Order Now
              </Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
