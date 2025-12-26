"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Grid, Heading, Button } from "@chakra-ui/react";

export default function FeaturedProduct() {
  return (
    <Box as="section" position="relative" minH={{ base: "500px", md: "600px" }} overflow="hidden">
      {/* Desktop Background */}
      <Box display={{ base: "none", md: "block" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/Desktop_-_Hero_30554176-8c2e-4af9-ba0c-ec3387e3c014.png?v=1762903700&width=3200"
          alt="DATE Product Background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
        <Box position="absolute" inset={0} bgGradient="linear(to-r, blackAlpha.500, blackAlpha.300, transparent)" />
      </Box>

      {/* Mobile Background */}
      <Box display={{ base: "block", md: "none" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/2_b6631d0f-7e4e-4d99-9405-1c1c57fcbcf0.png?v=1762903700&width=1200"
          alt="DATE Product Background Mobile"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
        <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.500, transparent, transparent)" />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        minH={{ base: "500px", md: "600px" }}
        align="center"
        py={16}
        px={{ base: "20px", md: "30px", lg: "50px" }}
      >
        <Box maxW="lg">
          <Heading
            as="h2"
            color="white"
            fontSize={{ base: "30px", md: "38px" }}
            fontWeight="600"
            mb={8}
            lineHeight="1.15"
            letterSpacing="-0.01em"
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          >
            DATE is your daily restore. Crafted for your modern resilience.
          </Heading>
          <Link href="/products/superior-cola-6-pack" style={{ textDecoration: "none" }}>
            <Button
              bg="#d40055"
              color="white"
              px={8}
              py={4}
              h="auto"
              fontSize="14px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.1em"
              borderRadius="full"
              _hover={{ bg: "#b30048", transform: "translateY(-2px)" }}
              transition="all 0.3s"
              boxShadow="0 8px 30px -8px rgba(212, 0, 85, 0.5)"
            >
              Pre-Order Now
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
