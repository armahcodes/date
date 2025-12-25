"use client";

import { useParams } from "next/navigation";
import { AuthView } from "@neondatabase/neon-js/auth/react/ui";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AuthPage() {
  const params = useParams();
  const path = params.path as string;

  return (
    <Box as="main" display="flex" flexDirection="column" minH="100vh">
      <Header />

      <Flex
        flex={1}
        bg="#f5f5f5"
        align="center"
        justify="center"
        py={{ base: 10, md: 16 }}
        px={{ base: 4, md: 8 }}
      >
        <Box
          w="full"
          maxW="440px"
          bg="white"
          borderRadius="24px"
          p={{ base: 6, md: 10 }}
          boxShadow="0 4px 24px rgba(0,0,0,0.06)"
        >
          <AuthView pathname={path} />
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
}
