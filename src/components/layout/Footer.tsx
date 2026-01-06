"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Grid, Heading, Text, HStack, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="black">
      {/* Main Footer */}
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} pt={{ base: "50px", md: "75px" }} pb={8}>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={{ base: 8, md: "32px" }}
        >
          {/* Logo Column */}
          <Box gridColumn={{ base: "span 2", md: "span 1" }}>
            <Link href="/">
              <Box display="inline-block" mb={6}>
                <Image
                  src="https://checkout.thedatedrink.com/cdn/shop/files/DATE_white.svg?v=1749174610&width=200"
                  alt="DATE"
                  width={120}
                  height={50}
                  style={{ height: "50px", width: "auto" }}
                />
              </Box>
            </Link>
          </Box>

          {/* Quick Shop Column */}
          <Box>
            <Heading
              as="h3"
              color="white"
              fontWeight="600"
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing="0.1em"
              mb={4}
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Quick Shop
            </Heading>
            <VStack align="flex-start" gap={3}>
              <Link href="/products">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  All Products
                </Text>
              </Link>
              <Link href="/products/superior-cola-6-pack">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  Superior Cola 6-Pack
                </Text>
              </Link>
            </VStack>
          </Box>

          {/* Info Column */}
          <Box>
            <Heading
              as="h3"
              color="white"
              fontWeight="600"
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing="0.1em"
              mb={4}
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Info
            </Heading>
            <VStack align="flex-start" gap={3}>
              <Link href="/story">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  Our Story
                </Text>
              </Link>
              <Link href="/faq">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  FAQ
                </Text>
              </Link>
              <Link href="/contact">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  Contact
                </Text>
              </Link>
              <Link href="/terms">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  Terms of Service
                </Text>
              </Link>
              <Link href="/privacy-policy">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  Privacy Policy
                </Text>
              </Link>
              <Link href="/refund-policy">
                <Text color="whiteAlpha.700" fontSize="14px" _hover={{ color: "white" }} transition="color 0.3s">
                  Refund Policy
                </Text>
              </Link>
            </VStack>
          </Box>

          {/* Social Column */}
          <Box>
            <Heading
              as="h3"
              color="white"
              fontWeight="600"
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing="0.1em"
              mb={4}
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Follow Us
            </Heading>
            <HStack gap={4}>
              <a
                href="https://instagram.com/dateseedsoda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "inherit" }}
              >
                <Box
                  color="whiteAlpha.700"
                  _hover={{ color: "white" }}
                  transition="color 0.3s"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Box>
              </a>
              <a
                href="https://tiktok.com/@dateseedsoda"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                style={{ color: "inherit" }}
              >
                <Box
                  color="whiteAlpha.700"
                  _hover={{ color: "white" }}
                  transition="color 0.3s"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </Box>
              </a>
            </HStack>
          </Box>
        </Grid>
      </Box>

      {/* Bottom Bar */}
      <Box borderTop="1px solid" borderColor="whiteAlpha.100">
        <Flex
          px={{ base: "20px", md: "30px", lg: "50px" }}
          py={6}
          justify="center"
          align="center"
        >
          <Text color="whiteAlpha.500" fontSize="13px">
            © DATE {new Date().getFullYear()}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
