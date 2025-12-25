"use client";

import Image from "next/image";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";

const highlights = [
  { text: "Zero Caffeine", icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Group_2073d2f1-5e42-4b9f-828a-a5b85e0a9f21.png?v=1762909885&width=100", x: 50, y: 8, side: "center", mobileOrder: 1 },
  { text: "Organic Ingredients", icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Group-3.png?v=1762909934&width=100", x: 8, y: 28, side: "left", mobileOrder: 2 },
  { text: "Zero Sugar", icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Screenshot_2025-10-08_at_9.44.03_am_cf9d0b23-8392-4648-8c83-93b7d311476b.png?v=1759883815&width=100", x: 92, y: 28, side: "right", mobileOrder: 3 },
  { text: "Non-GMO", icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Vector.png?v=1762910119&width=100", x: 8, y: 62, side: "left", mobileOrder: 4 },
  { text: "Prebiotic Fiber", icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Group-2.png?v=1762909946&width=100", x: 92, y: 68, side: "right", mobileOrder: 5 },
  { text: "Low calorie", icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Group-1.png?v=1762910106&width=100", x: 50, y: 92, side: "center", mobileOrder: 6 },
];

export default function WhyChooseDate() {
  return (
    <Box as="section" bg="#3a1f87">
      {/* Title Section */}
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} pt={{ base: "50px", md: "75px" }} pb={5} textAlign="center">
        <Heading
          as="h2"
          fontSize={{ base: "40px", md: "52px" }}
          fontWeight="600"
          color="#f5f2ec"
          lineHeight="1.15"
          letterSpacing="-0.01em"
          fontFamily="var(--font-montserrat), Montserrat, sans-serif"
        >
          Why Choose Date?
        </Heading>
      </Box>

      {/* Product Showcase */}
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} pb={{ base: "50px", md: "75px" }}>
        <Box maxW="1200px" mx="auto" position="relative">
          {/* Desktop Layout */}
          <Box display={{ base: "none", md: "block" }} position="relative" minH="600px">
            {/* Center Can */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="300px"
              maxW="100%"
              zIndex={2}
            >
              <Image
                src="https://jveysj-j1.myshopify.com/cdn/shop/files/DATECAN_Transparent_1.png?v=1762910148&width=600"
                alt="DATE Superior Cola Can"
                width={300}
                height={450}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>

            {/* Highlights positioned around */}
            {highlights.map((highlight, index) => {
              const isRight = highlight.side === "right";
              const isCenter = highlight.side === "center";

              return (
                <Flex
                  key={index}
                  position="absolute"
                  left={isRight ? "auto" : `${highlight.x}%`}
                  right={isRight ? `${100 - highlight.x}%` : "auto"}
                  top={`${highlight.y}%`}
                  transform={isCenter ? "translate(-50%, -50%)" : "translate(0, -50%)"}
                  align="center"
                  gap={3}
                  direction={isRight ? "row-reverse" : "row"}
                >
                  <Flex
                    w="50px"
                    h="50px"
                    flexShrink={0}
                    align="center"
                    justify="center"
                    bg="#d40055"
                    borderRadius="full"
                    p={2}
                  >
                    <Image
                      src={highlight.icon}
                      alt={highlight.text}
                      width={100}
                      height={100}
                      style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }}
                    />
                  </Flex>
                  <Text
                    color="#f5f2ec"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                    fontWeight="600"
                    fontSize="20px"
                    lineHeight="1.3"
                    textAlign={isRight ? "right" : "left"}
                  >
                    {highlight.text}
                  </Text>
                </Flex>
              );
            })}
          </Box>

          {/* Mobile Layout */}
          <Box display={{ base: "block", md: "none" }}>
            {/* Mobile Image */}
            <Flex justify="center" align="center" w="full" mb="30px">
              <Image
                src="https://jveysj-j1.myshopify.com/cdn/shop/files/DATECAN_Transparent_1.png?v=1762910148&width=500"
                alt="DATE Superior Cola Can"
                width={250}
                height={375}
                style={{ maxWidth: "250px", width: "auto", height: "auto", display: "block" }}
              />
            </Flex>

            {/* Mobile Highlights Grid */}
            <Grid templateColumns="1fr 1fr" gap={5}>
              {highlights
                .sort((a, b) => a.mobileOrder - b.mobileOrder)
                .map((highlight, index) => (
                  <Flex key={index} direction="column" align="center" gap={3} textAlign="center">
                    <Flex
                      w="50px"
                      h="50px"
                      flexShrink={0}
                      align="center"
                      justify="center"
                      bg="#d40055"
                      borderRadius="full"
                      p={2}
                    >
                      <Image
                        src={highlight.icon}
                        alt={highlight.text}
                        width={100}
                        height={100}
                        style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }}
                      />
                    </Flex>
                    <Text
                      color="#f5f2ec"
                      fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                      fontWeight="600"
                      fontSize="16px"
                      lineHeight="1.4"
                    >
                      {highlight.text}
                    </Text>
                  </Flex>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
