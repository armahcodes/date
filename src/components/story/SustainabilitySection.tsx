"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Zero Caffeine",
    description: "Natural energy without the jitters or crash",
  },
  {
    title: "Zero Sugar",
    description: "Naturally sweetened, no artificial additives",
  },
  {
    title: "Non-GMO",
    description: "Clean ingredients you can trust",
  },
  {
    title: "Upcycled Seeds",
    description: "Reducing food waste, one bottle at a time",
  },
];

export default function SustainabilitySection() {
  return (
    <Box as="section" bg="#f5f5f5">
      <Flex
        direction={{ base: "column", lg: "row" }}
        minH={{ base: "auto", lg: "80vh" }}
      >
        {/* Content */}
        <Flex
          w={{ base: "100%", lg: "50%" }}
          align="center"
          justify="center"
          px={{ base: "20px", md: "40px", lg: "60px" }}
          py={{ base: "50px", md: "80px", lg: "100px" }}
          order={{ base: 2, lg: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <VStack align="flex-start" gap={8} maxW="500px">
              <VStack align="flex-start" gap={5}>
                <Heading
                  as="h2"
                  color="black"
                  fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                  fontWeight="600"
                  lineHeight="1.15"
                  letterSpacing="-0.01em"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Best of all, we upcycle the date seeds.
                </Heading>

                <Text color="blackAlpha.700" fontSize="15px" lineHeight="1.8">
                  What was once agricultural waste is now the heart of our beverage.
                  Every bottle of DATE helps reduce food waste while delivering
                  the restorative benefits of this ancient superfood.
                </Text>
              </VStack>

              {/* Features Grid */}
              <Grid
                templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
                gap={5}
                w="full"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box
                      p={5}
                      bg="white"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="blackAlpha.100"
                    >
                      <Text
                        color="black"
                        fontSize="15px"
                        fontWeight="600"
                        mb={1}
                      >
                        {feature.title}
                      </Text>
                      <Text
                        color="blackAlpha.600"
                        fontSize="13px"
                        lineHeight="1.5"
                      >
                        {feature.description}
                      </Text>
                    </Box>
                  </motion.div>
                ))}
              </Grid>
            </VStack>
          </motion.div>
        </Flex>

        {/* Image */}
        <Box
          w={{ base: "100%", lg: "50%" }}
          position="relative"
          minH={{ base: "350px", md: "450px", lg: "auto" }}
          order={{ base: 1, lg: 2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src="https://jveysj-j1.myshopify.com/cdn/shop/files/Date_2.png?v=1762903894&width=1600"
              alt="Upcycled date seeds"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </Box>
      </Flex>
    </Box>
  );
}
