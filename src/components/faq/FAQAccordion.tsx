"use client";

import { useState } from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "About DATE",
    items: [
      {
        question: "What is DATE?",
        answer:
          "DATE is the first ever functional beverage made with upcycled date seeds. Inspired by an ancient Arabian tradition, we've crafted a modern, carbonated drink that delivers natural energy and wellness benefits without caffeine or sugar.",
      },
      {
        question: "What does it taste like?",
        answer:
          "DATE Superior Cola has a familiar, natural cola flavor elevated with a unique date seed profile. It's subtly sweet, deeply satisfying, and refreshingly different. Think of your favorite cola, but cleaner and more complex.",
      },
      {
        question: "Does it have caffeine or sugar?",
        answer:
          "No! DATE is completely caffeine-free and contains zero sugar. We use natural sweeteners to achieve our signature taste without any of the downsides of traditional sodas or energy drinks.",
      },
      {
        question: "What are the health benefits?",
        answer:
          "DATE is packed with antioxidants and prebiotic fiber from upcycled date seeds. It supports gut health, provides sustained natural energy without the crash, and helps you stay hydrated. It's a truly functional beverage designed for your modern resilience.",
      },
    ],
  },
  {
    title: "Upcycled & Non-GMO",
    items: [
      {
        question: "What is an upcycled date seed?",
        answer:
          "Date seeds make up nearly 15% of the date fruit and are typically discarded as agricultural waste. We upcycle these seeds - roasting and processing them to extract their rich flavor and nutritional benefits. This reduces food waste while creating something delicious.",
      },
      {
        question: "Does DATE have any GMO ingredients?",
        answer:
          "No, DATE is completely Non-GMO. We're committed to using only clean, natural ingredients that you can trust. Every bottle is made with integrity and transparency.",
      },
    ],
  },
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "Can I make a one-time purchase?",
        answer:
          "Absolutely! A single 6-pack of DATE Superior Cola costs $24.96. However, if you love it (and we think you will), our subscription option saves you 10% on every order.",
      },
      {
        question: "Where do you ship?",
        answer:
          "We currently ship nationwide across the United States. We're working on expanding to international markets soon - sign up for our newsletter to be the first to know!",
      },
      {
        question: "How much is shipping?",
        answer:
          "Standard Shipping (3-7 days) is $5.99 for all orders within the continental United States. Orders over $74 qualify for free shipping!",
      },
      {
        question: "Can I change or cancel my subscription?",
        answer:
          "Yes, you have full control over your subscription. You can pause, skip, modify, or cancel anytime through your account portal. No commitments, no hassle.",
      },
      {
        question: "What is the pre-order process?",
        answer:
          "Pre-orders require a $5 refundable deposit per pack to secure your order. Once we launch, you'll be charged the remaining balance and your order will ship. The deposit is fully refundable if you change your mind before launch.",
      },
    ],
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

function FAQCategorySection({ category }: { category: FAQCategory }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        border="1px solid"
        borderColor="blackAlpha.100"
        overflow="hidden"
      >
        {/* Category Header */}
        <Box
          px={{ base: 5, md: 8 }}
          py={5}
          bg="#f5f2ec"
          borderBottom="1px solid"
          borderColor="blackAlpha.100"
        >
          <Heading
            as="h2"
            color="black"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight="600"
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          >
            {category.title}
          </Heading>
        </Box>

        {/* Questions */}
        <Box px={{ base: 5, md: 8 }}>
          {category.items.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}

export default function FAQAccordion() {
  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "50px", md: "80px" }}>
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="900px" mx="auto">
        <VStack gap={{ base: 6, md: 8 }}>
          {faqData.map((category, index) => (
            <FAQCategorySection key={index} category={category} />
          ))}
        </VStack>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            mt={{ base: 10, md: 14 }}
            p={{ base: 6, md: 10 }}
            bg="#3a1f87"
            borderRadius="2xl"
            textAlign="center"
          >
            <VStack gap={4}>
              <Heading
                as="h3"
                color="white"
                fontSize={{ base: "22px", md: "26px" }}
                fontWeight="600"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                Still have questions?
              </Heading>
              <Text
                color="whiteAlpha.800"
                fontSize={{ base: "14px", md: "15px" }}
                lineHeight="1.7"
                maxW="400px"
              >
                We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
              </Text>
              <a href="/contact" style={{ textDecoration: "none" }}>
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  mt={2}
                  px={7}
                  py={3}
                  bg="white"
                  color="#3a1f87"
                  fontSize="14px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  borderRadius="full"
                  transition="all 0.3s"
                  _hover={{ bg: "#f5f2ec" }}
                >
                  Contact Us
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Box>
              </a>
            </VStack>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
