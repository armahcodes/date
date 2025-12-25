"use client";

import { Box, Heading } from "@chakra-ui/react";

export default function CommunityAchieving() {
  return (
    <Box as="section">
      {/* Purple Header */}
      <Box bg="#3a1f87" py={{ base: 10, md: 14 }} textAlign="center">
        <Heading
          as="h2"
          color="white"
          fontSize={{ base: "28px", md: "42px", lg: "48px" }}
          fontWeight="600"
          lineHeight="1.15"
          letterSpacing="-0.01em"
          fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          px={{ base: "20px", md: "30px" }}
        >
          What our community is achieving
        </Heading>
      </Box>
    </Box>
  );
}
