"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Flex, Heading, Text, VStack, Input, Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This would integrate with Shopify Customer Account API
    // For now, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "80px", md: "120px" }} minH="70vh">
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="450px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="blackAlpha.100"
            p={{ base: 6, md: 8 }}
            shadow="sm"
          >
            {submitted ? (
              <VStack gap={6} textAlign="center" py={4}>
                <Box
                  w={16}
                  h={16}
                  borderRadius="full"
                  bg="green.100"
                  color="green.600"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Box>
                <VStack gap={2}>
                  <Heading
                    as="h1"
                    color="black"
                    fontSize="24px"
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Check Your Email
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" maxW="320px">
                    If an account exists for <strong>{email}</strong>, you&apos;ll receive a password reset link shortly.
                  </Text>
                </VStack>
                <Link href="/account/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outline"
                    color="#3a1f87"
                    borderColor="#3a1f87"
                    borderRadius="full"
                    px={6}
                    py={3}
                    h="auto"
                    fontSize="14px"
                    fontWeight="600"
                    _hover={{ bg: "#3a1f87", color: "white" }}
                  >
                    Back to Sign In
                  </Button>
                </Link>
              </VStack>
            ) : (
              <VStack gap={6} align="stretch">
                {/* Header */}
                <VStack gap={2} textAlign="center">
                  <Heading
                    as="h1"
                    color="black"
                    fontSize={{ base: "26px", md: "30px" }}
                    fontWeight="600"
                    lineHeight="1.1"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Reset Password
                  </Heading>
                  <Text color="blackAlpha.600" fontSize="15px">
                    Enter your email to receive a reset link
                  </Text>
                </VStack>

                {/* Form */}
                <VStack as="form" onSubmit={handleSubmit} gap={4} align="stretch">
                  <Box>
                    <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                      Email Address
                    </Text>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      bg="#f5f5f5"
                      border="1px solid"
                      borderColor="blackAlpha.200"
                      borderRadius="lg"
                      px={4}
                      py={3}
                      h="auto"
                      fontSize="15px"
                      _placeholder={{ color: "blackAlpha.400" }}
                      _focus={{ borderColor: "#3a1f87", outline: "none" }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    w="full"
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
                    _hover={{ bg: "#2d1869" }}
                    _disabled={{ opacity: 0.7, cursor: "not-allowed" }}
                    disabled={isSubmitting}
                    mt={2}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </VStack>

                {/* Back to Login */}
                <Flex justify="center" pt={2}>
                  <Link href="/account/login" style={{ textDecoration: "none" }}>
                    <HStack gap={2} color="blackAlpha.600" _hover={{ color: "#3a1f87" }} transition="color 0.2s">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      <Text fontSize="14px" fontWeight="500">Back to Sign In</Text>
                    </HStack>
                  </Link>
                </Flex>
              </VStack>
            )}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
