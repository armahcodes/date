"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Flex, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How do subscriptions work?",
    answer:
      "Subscribe and save 10% on every order. You choose the frequency - every 2, 4, or 6 weeks. You can pause, skip, or cancel anytime through your account portal. No commitments, full flexibility.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within the United States. We're working on expanding to international markets soon. Sign up for our newsletter to be the first to know when we launch in your country!",
  },
  {
    question: "What is your return policy?",
    answer:
      "We want you to love DATE. If you're not completely satisfied with your purchase, contact us within 30 days of delivery and we'll make it right. For pre-orders, your $5 deposit is fully refundable if you change your mind before launch.",
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <Box
      borderBottom="1px solid"
      borderColor="blackAlpha.100"
    >
      <Flex
        as="button"
        w="full"
        py={5}
        align="center"
        justify="space-between"
        textAlign="left"
        onClick={onToggle}
        cursor="pointer"
        _hover={{ color: "#3a1f87" }}
        transition="color 0.2s"
      >
        <Text
          color={isOpen ? "#3a1f87" : "black"}
          fontSize={{ base: "15px", md: "16px" }}
          fontWeight="600"
          pr={4}
          transition="color 0.2s"
        >
          {item.question}
        </Text>
        <Box
          flexShrink={0}
          color={isOpen ? "#3a1f87" : "blackAlpha.400"}
          transition="all 0.3s"
          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </Box>
      </Flex>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Box pb={5}>
              <Text
                color="blackAlpha.700"
                fontSize={{ base: "14px", md: "15px" }}
                lineHeight="1.8"
              >
                {item.answer}
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box as="section" bg="#f5f2ec" py={{ base: "60px", md: "80px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="800px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <VStack gap={8}>
            {/* Header */}
            <VStack gap={3} textAlign="center">
              <Heading
                as="h2"
                color="black"
                fontSize={{ base: "28px", md: "34px" }}
                fontWeight="600"
                lineHeight="1.15"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                Frequently Asked Questions
              </Heading>
              <Text color="blackAlpha.600" fontSize="15px">
                Quick answers to common questions
              </Text>
            </VStack>

            {/* Accordion */}
            <Box
              w="full"
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="blackAlpha.100"
              overflow="hidden"
              px={{ base: 5, md: 8 }}
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </Box>

            {/* CTA */}
            <VStack gap={3} textAlign="center" pt={4}>
              <Text color="blackAlpha.600" fontSize="14px">
                Can&apos;t find what you&apos;re looking for?
              </Text>
              <Link href="/faq" style={{ textDecoration: "none" }}>
                <Button
                  variant="outline"
                  color="#3a1f87"
                  borderColor="#3a1f87"
                  px={6}
                  py={3}
                  h="auto"
                  fontSize="13px"
                  fontWeight="600"
                  borderRadius="full"
                  _hover={{ bg: "#3a1f87", color: "white" }}
                  transition="all 0.3s"
                >
                  View All FAQs
                </Button>
              </Link>
            </VStack>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  );
}
