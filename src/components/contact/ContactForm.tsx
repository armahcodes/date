"use client";

import { useState } from "react";
import { Box, Flex, Heading, Text, VStack, Input, Textarea, Button, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "100px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="1100px" mx="auto">
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="start"
        >
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <VStack align="flex-start" gap={6}>
              <VStack align="flex-start" gap={4}>
                <Heading
                  as="h2"
                  color="black"
                  fontSize={{ base: "32px", md: "40px", lg: "46px" }}
                  fontWeight="600"
                  lineHeight="1.1"
                  letterSpacing="-0.02em"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Get in Touch
                </Heading>

                <Text
                  color="blackAlpha.700"
                  fontSize={{ base: "15px", md: "16px" }}
                  lineHeight="1.8"
                  maxW="450px"
                >
                  Have a question about DATE, your order, or just want to say hello?
                  We&apos;re here to help. Fill out the form and we&apos;ll get back to you
                  as soon as possible.
                </Text>
              </VStack>

              {/* Contact Info Cards */}
              <VStack align="stretch" gap={4} w="full" maxW="400px" mt={4}>
                <Box
                  p={5}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="blackAlpha.100"
                >
                  <Flex align="center" gap={4}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg="#3a1f87"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </Box>
                    <Box>
                      <Text color="blackAlpha.500" fontSize="12px" fontWeight="500" textTransform="uppercase" letterSpacing="0.05em">
                        Email
                      </Text>
                      <Text color="black" fontSize="15px" fontWeight="600">
                        hello@thedatedrink.com
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box
                  p={5}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="blackAlpha.100"
                >
                  <Flex align="center" gap={4}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg="#d40055"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </Box>
                    <Box>
                      <Text color="blackAlpha.500" fontSize="12px" fontWeight="500" textTransform="uppercase" letterSpacing="0.05em">
                        Social
                      </Text>
                      <Text color="black" fontSize="15px" fontWeight="600">
                        @thedatedrink
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </VStack>
            </VStack>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="blackAlpha.100"
              p={{ base: 6, md: 8 }}
            >
              {submitted ? (
                <VStack gap={4} py={10} textAlign="center">
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </Box>
                  <Heading
                    as="h3"
                    color="black"
                    fontSize="24px"
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Message Sent!
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </Text>
                </VStack>
              ) : (
                <VStack as="form" onSubmit={handleSubmit} gap={5} align="stretch">
                  <Box>
                    <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                      Full Name *
                    </Text>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
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
                      Email Address *
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
                      Subject
                    </Text>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
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
                      Message *
                    </Text>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      required
                      bg="#f5f5f5"
                      border="1px solid"
                      borderColor="blackAlpha.200"
                      borderRadius="lg"
                      px={4}
                      py={3}
                      fontSize="15px"
                      minH="150px"
                      resize="vertical"
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
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </VStack>
              )}
            </Box>
          </motion.div>
        </Grid>
      </Box>
    </Box>
  );
}
