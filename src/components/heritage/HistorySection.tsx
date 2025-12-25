"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HistorySection() {
  return (
    <Box as="section" bg="#f5f2ec" py={{ base: "60px", md: "100px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="1000px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={{ base: 8, md: 12 }} textAlign="center">
            {/* Heading */}
            <VStack gap={5}>
              <Heading
                as="h2"
                color="black"
                fontSize={{ base: "32px", md: "42px", lg: "52px" }}
                fontWeight="600"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                The History of a Wasted Resource
              </Heading>

              <Text
                color="blackAlpha.700"
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.8"
                maxW="750px"
              >
                For thousands of years, date palms have been central to life in the Arabian
                Peninsula. The fruit sustained civilizations, but the seed - making up nearly
                15% of the date - was routinely discarded.
              </Text>
            </VStack>

            {/* Image */}
            <Box
              position="relative"
              w="full"
              maxW="700px"
              aspectRatio={16 / 10}
              borderRadius="2xl"
              overflow="hidden"
            >
              <Image
                src="https://jveysj-j1.myshopify.com/cdn/shop/files/Date_2.png?v=1762903894&width=1600"
                alt="Date seeds - the overlooked resource"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </Box>

            {/* Additional Text */}
            <VStack gap={5} maxW="750px">
              <Text
                color="blackAlpha.700"
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.8"
              >
                But the Bedouin tribes knew better. In the harsh desert environment where
                nothing could be wasted, they discovered that roasting and grinding date
                seeds created a rich, aromatic beverage with remarkable restorative properties.
              </Text>

              <Text
                color="blackAlpha.700"
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.8"
              >
                This{" "}
                <Text as="span" color="black" fontWeight="600">
                  caffeine-free, naturally sweet drink
                </Text>{" "}
                became a staple of desert life - providing energy and nourishment without
                depleting the body&apos;s precious water reserves.
              </Text>
            </VStack>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  );
}
