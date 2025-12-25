"use client";

import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Traditionally Caffeine-Free",
    description:
      "Unlike coffee or tea, date seed beverages provided sustained energy without caffeine. The ancient Bedouin relied on this gentle boost to navigate long desert journeys without the crash or dehydration that comes with stimulants.",
  },
  {
    title: "A Legacy of Upcycling",
    description:
      "Centuries before sustainability became a modern concern, desert cultures practiced it out of necessity. Every part of the date palm served a purpose - the fronds for shelter, the fruit for food, and the seeds for this remarkable beverage.",
  },
  {
    title: "A Symbol of Ingenuity & Resourcefulness",
    description:
      "The date seed drink represents more than nutrition - it embodies a mindset. The ability to see potential where others see waste, to create value from the overlooked. This is the spirit that DATE brings to the modern world.",
  },
];

export default function HeritageFeatures() {
  return (
    <Box as="section" bg="#f5f2ec" py={{ base: "60px", md: "100px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="1200px" mx="auto">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={{ base: 8, md: 10, lg: 12 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <VStack
                align="center"
                textAlign="center"
                gap={4}
                h="full"
                p={{ base: 6, md: 8 }}
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="blackAlpha.100"
              >
                {/* Number indicator */}
                <Box
                  w={10}
                  h={10}
                  borderRadius="full"
                  bg="#3a1f87"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="14px"
                  fontWeight="700"
                >
                  {index + 1}
                </Box>

                <Heading
                  as="h3"
                  color="black"
                  fontSize={{ base: "20px", md: "22px" }}
                  fontWeight="600"
                  lineHeight="1.2"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  {feature.title}
                </Heading>

                <Text
                  color="blackAlpha.700"
                  fontSize="14px"
                  lineHeight="1.8"
                >
                  {feature.description}
                </Text>
              </VStack>
            </motion.div>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
