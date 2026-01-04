"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

const MotionBox = motion.create(Box);

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "100px" }} minH="70vh">
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="900px" mx="auto">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <VStack align="stretch" gap={{ base: 8, md: 12 }}>
            {/* Header - Centered */}
            <VStack gap={4} textAlign="center" mb={4}>
              <Flex align="center" justify="center" gap={3}>
                <Box w={8} h="1px" bg="#d40055" opacity={0.4} />
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.2em"
                  color="#d40055"
                >
                  Legal
                </Text>
                <Box w={8} h="1px" bg="#d40055" opacity={0.4} />
              </Flex>
              <Heading
                as="h1"
                fontSize={{ base: "32px", md: "42px", lg: "48px" }}
                fontWeight="700"
                lineHeight={1.1}
                letterSpacing="-0.02em"
                color="black"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                {title}
              </Heading>
              <Text color="blackAlpha.500" fontSize="13px" fontWeight="500">
                Last updated: {lastUpdated}
              </Text>
            </VStack>

            {/* Content Card */}
            <Box
              bg="white"
              borderRadius="24px"
              p={{ base: 6, md: 10 }}
              border="1px solid"
              borderColor="blackAlpha.100"
              boxShadow="0 4px 40px -12px rgba(0,0,0,0.08)"
            >
              {children}
            </Box>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
  isLast?: boolean;
}

export function LegalSection({ title, children, isLast = false }: LegalSectionProps) {
  return (
    <Box
      pb={isLast ? 0 : { base: 6, md: 8 }}
      mb={isLast ? 0 : { base: 6, md: 8 }}
      borderBottom={isLast ? "none" : "1px solid"}
      borderColor="blackAlpha.100"
    >
      <Heading
        as="h2"
        fontSize={{ base: "18px", md: "20px" }}
        fontWeight="700"
        color="black"
        mb={4}
        fontFamily="var(--font-montserrat), Montserrat, sans-serif"
      >
        {title}
      </Heading>
      {children}
    </Box>
  );
}

export function LegalText({ children }: { children: ReactNode }) {
  return (
    <Text color="blackAlpha.700" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.9}>
      {children}
    </Text>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <VStack align="stretch" gap={2} pl={4} mt={3}>
      {items.map((item, index) => (
        <Flex key={index} align="flex-start" gap={3}>
          <Box
            w={1.5}
            h={1.5}
            borderRadius="full"
            bg="#d40055"
            mt={2}
            flexShrink={0}
          />
          <Text color="blackAlpha.700" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.9}>
            {item}
          </Text>
        </Flex>
      ))}
    </VStack>
  );
}

export function LegalHighlight({ children }: { children: ReactNode }) {
  return (
    <Text as="span" color="#d40055" fontWeight="600">
      {children}
    </Text>
  );
}

export function LegalContactBox({ title, email, description }: { title: string; email: string; description?: string }) {
  return (
    <Box
      mt={{ base: 6, md: 8 }}
      p={{ base: 5, md: 6 }}
      bg="linear-gradient(135deg, #3a1f87 0%, #2d1869 100%)"
      borderRadius="20px"
      textAlign="center"
      position="relative"
      overflow="hidden"
    >
      {/* Decorative element */}
      <Box
        position="absolute"
        top="-40px"
        right="-40px"
        w="120px"
        h="120px"
        borderRadius="full"
        border="1px solid"
        borderColor="whiteAlpha.100"
      />
      <Box
        position="absolute"
        bottom="-30px"
        left="-30px"
        w="80px"
        h="80px"
        borderRadius="full"
        border="1px solid"
        borderColor="whiteAlpha.100"
      />

      <VStack gap={2} position="relative">
        <Heading
          as="h3"
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="700"
          color="white"
          fontFamily="var(--font-montserrat), Montserrat, sans-serif"
        >
          {title}
        </Heading>
        {description && (
          <Text color="whiteAlpha.700" fontSize={{ base: "13px", md: "14px" }} lineHeight={1.6}>
            {description}
          </Text>
        )}
        <Text
          color="white"
          fontSize={{ base: "14px", md: "15px" }}
          fontWeight="600"
          mt={1}
        >
          {email}
        </Text>
      </VStack>
    </Box>
  );
}
