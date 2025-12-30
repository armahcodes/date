"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

export default function HeroScrolling() {
  return (
    <Box as="section" position="relative" minH={{ base: "50vh", md: "66vh" }} overflow="hidden">
      {/* Background Image */}
      <Box position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/5_94241ea3-dddd-41d3-a8b2-f573df8810e2.png?v=1762903700&width=3200"
          alt="Superior Cola Background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        minH={{ base: "50vh", md: "66vh" }}
        direction="column"
        justify="flex-end"
        align="center"
        pb={{ base: 12, md: 16 }}
        px={{ base: "20px", md: "30px", lg: "50px" }}
      >
        {/* Scrolling Text */}
        <Box w="full" overflow="hidden" mb={8}>
          <Flex
            className="animate-marquee"
            style={{ "--marquee-duration": "20s" } as React.CSSProperties}
          >
            {[...Array(8)].map((_, i) => (
              <Text
                key={i}
                color="black"
                fontSize={{ base: "16px", sm: "24px", md: "40px" }}
                fontWeight="400"
                whiteSpace="nowrap"
                letterSpacing="tight"
                mx="10px"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                Superior cola, for Superior Resilience
              </Text>
            ))}
          </Flex>
        </Box>

        {/* CTA Button */}
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Button
            bg="#3a1f87"
            color="white"
            px={9}
            py={4}
            h="auto"
            fontSize="15px"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.1em"
            borderRadius="full"
            border="2px solid"
            borderColor="#3a1f87"
            _hover={{ bg: "#2d1869", borderColor: "#2d1869" }}
            transition="all 0.3s"
          >
            Pre-Order Now
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
