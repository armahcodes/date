"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HeritageCTA() {
  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "100px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          gap={{ base: 10, lg: 16 }}
          maxW="1100px"
          mx="auto"
        >
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Box
              position="relative"
              w={{ base: "260px", md: "320px", lg: "380px" }}
              h={{ base: "320px", md: "400px", lg: "470px" }}
            >
              <Image
                src="https://jveysj-j1.myshopify.com/cdn/shop/files/25.png?v=1762903700&width=800"
                alt="DATE Superior Cola 6 Pack"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
              />
            </Box>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VStack
              align={{ base: "center", lg: "flex-start" }}
              gap={6}
              textAlign={{ base: "center", lg: "left" }}
              maxW="480px"
            >
              <Text
                fontSize="12px"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="blackAlpha.500"
                fontWeight="500"
              >
                Taste the heritage
              </Text>

              <Heading
                as="h2"
                color="black"
                fontSize={{ base: "32px", md: "40px", lg: "48px" }}
                fontWeight="600"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                Experience the Ancient Wisdom
              </Heading>

              <Text
                color="blackAlpha.700"
                fontSize="15px"
                lineHeight="1.8"
              >
                DATE Superior Cola brings centuries of desert wisdom to your daily routine.
                Non-GMO, zero caffeine, zero sugar - just pure, restorative goodness from
                upcycled date seeds.
              </Text>

              {/* Product Info */}
              <Box
                p={5}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="blackAlpha.100"
                w="full"
                maxW="320px"
              >
                <VStack gap={3}>
                  <Text color="black" fontSize="16px" fontWeight="600">
                    Superior Cola 6 Pack
                  </Text>
                  <Text color="#3a1f87" fontSize="24px" fontWeight="700">
                    $24.96
                  </Text>
                  <Text color="blackAlpha.500" fontSize="12px">
                    $5 refundable deposit per pack
                  </Text>
                </VStack>
              </Box>

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
                  Pre-Order Now
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
