"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function StoryCTA() {
  return (
    <Box as="section" bg="#f5f2ec" py={{ base: "60px", md: "100px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          gap={{ base: 10, lg: 16 }}
          maxW="1200px"
          mx="auto"
        >
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Box
              position="relative"
              w={{ base: "280px", md: "350px", lg: "400px" }}
              h={{ base: "350px", md: "440px", lg: "500px" }}
            >
              <Image
                src="https://jveysj-j1.myshopify.com/cdn/shop/files/25.png?v=1762903700&width=800"
                alt="DATE Superior Cola"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
              />
            </Box>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VStack
              align={{ base: "center", lg: "flex-start" }}
              gap={6}
              textAlign={{ base: "center", lg: "left" }}
              maxW="450px"
            >
              <Text
                fontSize="12px"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="blackAlpha.500"
                fontWeight="500"
              >
                Ready to experience it?
              </Text>

              <Heading
                as="h2"
                color="black"
                fontSize={{ base: "32px", md: "42px", lg: "48px" }}
                fontWeight="600"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                Experience Superior Cola
              </Heading>

              <Text
                color="blackAlpha.700"
                fontSize="15px"
                lineHeight="1.8"
              >
                Join thousands who have discovered the restorative power of DATE.
                Zero caffeine, zero sugar, zero compromise.
              </Text>

              <Link href="/products/superior-cola-6-pack" style={{ textDecoration: "none" }}>
                <Button
                  bg="#3a1f87"
                  color="white"
                  px={8}
                  py={4}
                  h="auto"
                  fontSize="14px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  borderRadius="full"
                  border="2px solid"
                  borderColor="#3a1f87"
                  _hover={{ bg: "#2d1869", borderColor: "#2d1869" }}
                  transition="all 0.3s"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  Shop The Ritual
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </VStack>
          </motion.div>
        </Flex>
      </Box>
    </Box>
  );
}
