"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function Newsletter() {
  return (
    <Box as="section" bg="#d40055" py={{ base: "50px", md: "75px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="670px" mx="auto" textAlign="center">
        <Heading
          as="h2"
          color="#f5f5f5"
          fontSize={{ base: "30px", md: "34px" }}
          fontWeight="600"
          mb={4}
          letterSpacing="-0.01em"
          lineHeight="1.15"
          fontFamily="var(--font-montserrat), Montserrat, sans-serif"
        >
          Sign up for our mailing list
        </Heading>

        <Text color="rgba(245, 245, 245, 0.8)" fontSize="15px" lineHeight="1.7" mb={6} maxW="xl" mx="auto">
          Be the first to know about DATE launches, exclusive offers, and wellness insights.
          Join our community and stay connected.
        </Text>

        {/* Klaviyo Embed Form */}
        <Box className="klaviyo-form-TV5i6J" />
      </Box>
    </Box>
  );
}
