"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Grid, Heading, Text, Button } from "@chakra-ui/react";

export default function ImageWithText() {
  return (
    <Box as="section" bg="#f5f5f5">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} minH={{ base: "500px", md: "750px", lg: "800px" }}>
        {/* Image Side */}
        <Box position="relative" h={{ base: "450px", md: "auto" }} order={1}>
          <Image
            src="https://jveysj-j1.myshopify.com/cdn/shop/files/Mobile_-_Hero_4.png?v=1762903700&width=1600"
            alt="DATE Superior Cola"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Box>

        {/* Content Side */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={{ base: "20px", md: "32px", lg: "50px" }}
          py={{ base: 12, md: 16 }}
          order={2}
        >
          {/* Subheading */}
          <Text
            fontSize={{ base: "11px", md: "14px" }}
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.2em"
            color="blackAlpha.700"
            mb={4}
          >
            Revitalize & elevate. No Sugar. No caffeine.
          </Text>

          {/* Heading */}
          <Heading
            as="h2"
            color="black"
            fontSize={{ base: "30px", md: "40px" }}
            fontWeight="600"
            mb={4}
            lineHeight="1.15"
            letterSpacing="-0.01em"
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          >
            The flavor you&apos;ll love, the resilience you deserve.
          </Heading>

          {/* Body text */}
          <Text
            color="blackAlpha.800"
            fontSize="15px"
            lineHeight="1.7"
            mb={6}
            maxW="lg"
          >
            We utilized the ancient ingredient of date seeds in an innovative, familiar and beloved
            taste profile. DATE Superior Cola delivers a surprisingly delightful flavor, lowering
            the barrier to trial and making your restorative ritual something to look forward to.
          </Text>

          {/* CTA Button */}
          <Link href="/story" style={{ alignSelf: "flex-start", textDecoration: "none" }}>
            <Button
              bg="#3a1f87"
              color="white"
              px={7}
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
              Learn more
            </Button>
          </Link>
        </Box>
      </Grid>
    </Box>
  );
}
