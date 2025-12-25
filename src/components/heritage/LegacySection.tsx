"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function LegacySection() {
  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "100px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="1000px" mx="auto">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={{ base: 10, lg: 16 }}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1 }}
          >
            <Box
              position="relative"
              w="full"
              aspectRatio={4 / 5}
              maxW={{ base: "100%", lg: "400px" }}
              borderRadius="2xl"
              overflow="hidden"
              mx={{ base: "auto", lg: 0 }}
            >
              <Image
                src="https://jveysj-j1.myshopify.com/cdn/shop/files/26.png?v=1762903894&width=1600"
                alt="DATE Superior Cola - Legacy of ingenuity"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </Box>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            <VStack align={{ base: "center", lg: "flex-start" }} gap={6} textAlign={{ base: "center", lg: "left" }}>
              <Heading
                as="h2"
                color="black"
                fontSize={{ base: "32px", md: "40px", lg: "46px" }}
                fontWeight="600"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                A Legacy of Ingenuity
              </Heading>

              <VStack align={{ base: "center", lg: "flex-start" }} gap={5} color="blackAlpha.700" fontSize={{ base: "15px", md: "16px" }} lineHeight="1.8">
                <Text>
                  What made the date seed drink special wasn&apos;t just its taste - it was
                  what it represented. A culture that refused to waste, that found value
                  where others saw refuse.
                </Text>

                <Text>
                  The Bedouin didn&apos;t just survive the desert; they thrived in it. Their{" "}
                  <Text as="span" color="black" fontWeight="600">
                    restorative resilience
                  </Text>{" "}
                  came from understanding their environment and using every resource wisely.
                </Text>

                <Text>
                  DATE carries forward this{" "}
                  <Text as="span" color="black" fontWeight="600">
                    resourceful spirit
                  </Text>
                  . We&apos;ve taken the same overlooked ingredient and transformed it into
                  a modern beverage that honors its ancient origins while meeting today&apos;s
                  standards for taste and wellness.
                </Text>
              </VStack>
            </VStack>
          </motion.div>
        </Flex>
      </Box>
    </Box>
  );
}
