"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HeritageSection() {
  return (
    <Box as="section" bg="#f5f5f5">
      <Flex
        direction={{ base: "column", lg: "row" }}
        minH={{ base: "auto", lg: "80vh" }}
      >
        {/* Image */}
        <Box
          w={{ base: "100%", lg: "50%" }}
          position="relative"
          minH={{ base: "350px", md: "450px", lg: "auto" }}
          order={{ base: 1, lg: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src="https://jveysj-j1.myshopify.com/cdn/shop/files/Date_1.png?v=1762903894&width=1600"
              alt="Saudi Arabian date palm heritage"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </Box>

        {/* Content */}
        <Flex
          w={{ base: "100%", lg: "50%" }}
          align="center"
          justify="center"
          px={{ base: "20px", md: "40px", lg: "60px" }}
          py={{ base: "50px", md: "80px", lg: "100px" }}
          order={{ base: 2, lg: 2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VStack align="flex-start" gap={6} maxW="500px">
              <Heading
                as="h2"
                color="black"
                fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                fontWeight="600"
                lineHeight="1.15"
                letterSpacing="-0.01em"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                The answer wasn&apos;t in a lab - it was in heritage.
              </Heading>

              <VStack align="flex-start" gap={4} color="blackAlpha.700" fontSize="15px" lineHeight="1.8">
                <Text>
                  A trip to Saudi Arabia changed everything. There, they discovered
                  that for centuries, desert nomads had been using date seeds -
                  typically discarded - to create a restorative drink.
                </Text>
                <Text>
                  The ancient beverage was{" "}
                  <Text as="span" color="black" fontWeight="600">
                    zero caffeine, zero sugar, and packed with fiber and antioxidants
                  </Text>
                  . It was exactly what they had been searching for.
                </Text>
              </VStack>
            </VStack>
          </motion.div>
        </Flex>
      </Flex>
    </Box>
  );
}
