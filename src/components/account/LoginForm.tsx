"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Flex, Heading, Text, VStack, Input, Button, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This would integrate with Shopify Customer Account API
    // For now, redirect to Shopify's hosted login
    const shopDomain = "jveysj-j1.myshopify.com";

    if (isLogin) {
      // Redirect to Shopify login
      window.location.href = `https://${shopDomain}/account/login`;
    } else {
      // Redirect to Shopify registration
      window.location.href = `https://${shopDomain}/account/register`;
    }
  };

  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "80px", md: "120px" }} minH="70vh">
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="500px" mx="auto">
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
            p={{ base: 6, md: 10 }}
            shadow="sm"
          >
            <VStack gap={6} align="stretch">
              {/* Header */}
              <VStack gap={2} textAlign="center">
                <Heading
                  as="h1"
                  color="black"
                  fontSize={{ base: "28px", md: "34px" }}
                  fontWeight="600"
                  lineHeight="1.1"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  {isLogin ? "Welcome Back" : "Create Account"}
                </Heading>
                <Text color="blackAlpha.600" fontSize="15px">
                  {isLogin
                    ? "Sign in to manage your orders and subscriptions"
                    : "Join the DATE community"}
                </Text>
              </VStack>

              {/* Toggle Tabs */}
              <Flex
                bg="#f5f5f5"
                borderRadius="full"
                p={1}
              >
                <Button
                  flex={1}
                  bg={isLogin ? "white" : "transparent"}
                  color={isLogin ? "black" : "blackAlpha.600"}
                  borderRadius="full"
                  py={3}
                  h="auto"
                  fontSize="14px"
                  fontWeight="600"
                  shadow={isLogin ? "sm" : "none"}
                  onClick={() => setIsLogin(true)}
                  _hover={{ bg: isLogin ? "white" : "blackAlpha.100" }}
                  transition="all 0.2s"
                >
                  Sign In
                </Button>
                <Button
                  flex={1}
                  bg={!isLogin ? "white" : "transparent"}
                  color={!isLogin ? "black" : "blackAlpha.600"}
                  borderRadius="full"
                  py={3}
                  h="auto"
                  fontSize="14px"
                  fontWeight="600"
                  shadow={!isLogin ? "sm" : "none"}
                  onClick={() => setIsLogin(false)}
                  _hover={{ bg: !isLogin ? "white" : "blackAlpha.100" }}
                  transition="all 0.2s"
                >
                  Register
                </Button>
              </Flex>

              {/* Form */}
              <VStack as="form" onSubmit={handleSubmit} gap={4} align="stretch">
                {!isLogin && (
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                        First Name
                      </Text>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required={!isLogin}
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
                    <Box>
                      <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                        Last Name
                      </Text>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required={!isLogin}
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
                  </Grid>
                )}

                <Box>
                  <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                    Email Address
                  </Text>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
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

                <Box>
                  <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                    Password
                  </Text>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
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

                {!isLogin && (
                  <Box>
                    <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                      Confirm Password
                    </Text>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required={!isLogin}
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
                )}

                {isLogin && (
                  <Flex justify="flex-end">
                    <Link href="/account/recover" style={{ textDecoration: "none" }}>
                      <Text
                        color="#3a1f87"
                        fontSize="13px"
                        fontWeight="500"
                        _hover={{ textDecoration: "underline" }}
                      >
                        Forgot password?
                      </Text>
                    </Link>
                  </Flex>
                )}

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
                  {isSubmitting
                    ? "Please wait..."
                    : isLogin
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </VStack>

              {/* Divider */}
              <Flex align="center" gap={4}>
                <Box flex={1} h="1px" bg="blackAlpha.200" />
                <Text color="blackAlpha.400" fontSize="12px" fontWeight="500">
                  OR
                </Text>
                <Box flex={1} h="1px" bg="blackAlpha.200" />
              </Flex>

              {/* Continue as Guest */}
              <VStack gap={3}>
                <Link href="/products" style={{ textDecoration: "none", width: "100%" }}>
                  <Button
                    w="full"
                    variant="outline"
                    color="black"
                    borderColor="blackAlpha.300"
                    px={8}
                    py={4}
                    h="auto"
                    fontSize="14px"
                    fontWeight="600"
                    borderRadius="full"
                    _hover={{ bg: "blackAlpha.50", borderColor: "blackAlpha.400" }}
                  >
                    Continue as Guest
                  </Button>
                </Link>
                <Text color="blackAlpha.500" fontSize="12px" textAlign="center">
                  You can create an account after checkout
                </Text>
              </VStack>
            </VStack>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
