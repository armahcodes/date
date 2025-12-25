"use client";

import { useState } from "react";
import { Box, Flex, Heading, Text, Input, Button, VStack } from "@chakra-ui/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email, firstName });
  };

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

        <VStack as="form" onSubmit={handleSubmit} gap={4} maxW="md" mx="auto" w="full">
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            w="full"
            px={5}
            py={3}
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="full"
            color="white"
            fontSize="14px"
            _placeholder={{ color: "whiteAlpha.600" }}
            _focus={{ borderColor: "white", outline: "none" }}
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          />

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            w="full"
            px={5}
            py={3}
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="full"
            color="white"
            fontSize="14px"
            _placeholder={{ color: "whiteAlpha.600" }}
            _focus={{ borderColor: "white", outline: "none" }}
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          />

          <Button
            type="submit"
            w="full"
            bg="#3a1f87"
            color="white"
            px={8}
            py={3}
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
          >
            Join
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
