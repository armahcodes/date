"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Flex, Heading, Text, Button, VStack } from "@chakra-ui/react";

const timelineItems = [
  {
    image: "https://jveysj-j1.myshopify.com/cdn/shop/files/Date_1.png?v=1762903894&width=1600",
    subheading: "The beginning",
    title: "The first seed.",
    text: "Centuries ago Desert Nomads in Arabia discovered that upcycling a previously discarded part of the date fruit (the seed) transformed it into a powerful tool for wellness.",
  },
  {
    image: "https://jveysj-j1.myshopify.com/cdn/shop/files/Date_2.png?v=1762903894&width=1600",
    subheading: "The Middle",
    title: "Upcycling the seed.",
    text: "We champion sustainability by using upcycled date seeds, transforming this agricultural byproduct into the core of our functional beverage.\n\nInstead of heading to a landfill, we transform the seeds to unlock their rich flavor and antioxidant goodness, creating a beverage that's both a restorative choice and positive for the planet.",
  },
  {
    image: "https://jveysj-j1.myshopify.com/cdn/shop/files/26.png?v=1762903894&width=1600",
    subheading: "The end",
    title: "Date Functional Beverage.",
    text: "Experience DATE, a functional beverage blending a great, familiar taste with the antioxidant-rich goodness of upcycled date seeds. Inspired by an ancient seed, it's a restorative blend crafted for your modern resilience.\n\nIt's your daily partner for feeling restored, refreshed, and ready for anything.",
    buttonText: "Pre-Order Now",
    buttonLink: "/products",
  },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled through the section
      // We want to start changing at 0 and end at the last item when section bottom hits viewport bottom
      const scrollProgress = -sectionTop / (sectionHeight - viewportHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Map to index (0, 1, 2 for 3 items)
      const newIndex = Math.min(
        Math.floor(clampedProgress * timelineItems.length),
        timelineItems.length - 1
      );

      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <Box as="section" bg="#f5f5f5">
      {/* Desktop Layout */}
      <Box
        ref={sectionRef}
        display={{ base: "none", md: "block" }}
        position="relative"
        h={`${timelineItems.length * 100}vh`}
      >
        {/* Sticky container - stays pinned while scrolling */}
        <Flex
          position="sticky"
          top={0}
          h="100vh"
          w="full"
        >
          {/* Left: Content */}
          <Flex
            w="50%"
            h="full"
            direction="column"
            justify="center"
            px={{ base: "30px", lg: "50px" }}
          >
            {/* Section Header */}
            <Box mb={8}>
              <Heading
                as="h2"
                color="black"
                fontSize={{ base: "34px", md: "40px" }}
                fontWeight="600"
                mb={5}
                lineHeight="1.15"
                letterSpacing="-0.01em"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                The Story: Ancient Seed. Modern Resilience.
              </Heading>
              <VStack align="flex-start" gap={4} maxW="lg" color="blackAlpha.800" fontSize="15px" lineHeight="1.7">
                <Text fontWeight="600">
                  Discovered Centuries ago by Desert Nomads in Arabia. Re-Imagined in the present day in California.
                </Text>
                <Text fontWeight="600">
                  DATE is a restorative blend, crafted with antioxidant-rich date seeds to help you Revitalize & Elevate.
                </Text>
              </VStack>
            </Box>

            {/* Timeline Content */}
            <Box position="relative" w="full" maxW="lg" minH="300px">
              {timelineItems.map((item, index) => (
                <Box
                  key={index}
                  style={{
                    transition: "all 0.5s ease-out",
                    opacity: index === activeIndex ? 1 : 0,
                    position: index === 0 ? "relative" : "absolute",
                    top: index === 0 ? undefined : 0,
                    left: index === 0 ? undefined : 0,
                    right: index === 0 ? undefined : 0,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                    transform: index === activeIndex ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <Box position="relative" pl={10}>
                    {/* Timeline line */}
                    <Box position="absolute" left={0} top={0} bottom={0} w="1px" bg="blackAlpha.200" />

                    {/* Dot */}
                    <Box
                      position="absolute"
                      left={0}
                      top={1}
                      w={3}
                      h={3}
                      borderRadius="full"
                      transform="translateX(-50%)"
                      transition="all 0.3s"
                      bg="#d40055"
                    />

                    {/* Subheading */}
                    <Text
                      fontSize="12px"
                      textTransform="uppercase"
                      letterSpacing="0.15em"
                      color="blackAlpha.500"
                      fontWeight="500"
                      mb={3}
                    >
                      {item.subheading}
                    </Text>

                    {/* Title */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "28px", lg: "34px" }}
                      fontWeight="600"
                      color="black"
                      mb={4}
                      lineHeight="1.15"
                      fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                    >
                      {item.title}
                    </Heading>

                    {/* Text */}
                    <Text
                      color="blackAlpha.700"
                      fontSize="15px"
                      lineHeight="1.7"
                      mb={6}
                      whiteSpace="pre-line"
                    >
                      {item.text}
                    </Text>

                    {/* Button */}
                    {item.buttonText && item.buttonLink && (
                      <Link href={item.buttonLink} style={{ textDecoration: "none" }}>
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
                          display="inline-flex"
                          alignItems="center"
                          gap={2}
                        >
                          {item.buttonText}
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Button>
                      </Link>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Flex>

          {/* Right: Image */}
          <Box w="50%" h="full" position="relative" overflow="hidden">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: index,
                }}
                initial={false}
                animate={{
                  y: index <= activeIndex ? "0%" : "100%",
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 0, 0, 1],
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="50vw"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </Box>
        </Flex>

        {/* Progress indicator */}
        <Flex
          position="fixed"
          right={8}
          top="50%"
          transform="translateY(-50%)"
          direction="column"
          gap={2}
          zIndex={20}
          display={{ base: "none", lg: "flex" }}
        >
          {timelineItems.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={index === activeIndex ? "#d40055" : "blackAlpha.300"}
              transition="all 0.3s"
            />
          ))}
        </Flex>
      </Box>

      {/* Mobile Layout */}
      <Box display={{ base: "block", md: "none" }}>
        <Box px="20px" py="50px">
          {/* Section Header */}
          <Box textAlign="left" mb={8}>
            <Heading
              as="h2"
              color="black"
              fontSize="28px"
              fontWeight="600"
              mb={4}
              lineHeight="1.15"
              letterSpacing="-0.01em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              The Story: Ancient Seed. Modern Resilience.
            </Heading>
            <VStack align="flex-start" gap={3} color="blackAlpha.800" fontSize="14px" lineHeight="1.7">
              <Text fontWeight="600">
                Discovered Centuries ago by Desert Nomads in Arabia. Re-Imagined in the present day in California.
              </Text>
              <Text fontWeight="600">
                DATE is a restorative blend, crafted with antioxidant-rich date seeds to help you Revitalize & Elevate.
              </Text>
            </VStack>
          </Box>

          {/* Mobile Timeline Items */}
          <VStack gap={10}>
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ width: "100%" }}
              >
                <VStack gap={4} align="stretch">
                  {/* Image */}
                  <Box position="relative" aspectRatio={4 / 3} borderRadius="xl" overflow="hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100vw"
                    />
                  </Box>

                  {/* Content */}
                  <Box position="relative" pl={6}>
                    <Box position="absolute" left={0} top={0} bottom={0} w="1px" bg="blackAlpha.100" />
                    <Box
                      position="absolute"
                      left={0}
                      top={1}
                      w="10px"
                      h="10px"
                      borderRadius="full"
                      transform="translateX(-50%)"
                      bg="#d40055"
                    />

                    <Text
                      fontSize="12px"
                      textTransform="uppercase"
                      letterSpacing="0.15em"
                      color="blackAlpha.500"
                      fontWeight="500"
                      mb={2}
                    >
                      {item.subheading}
                    </Text>

                    <Heading
                      as="h3"
                      fontSize="22px"
                      fontWeight="600"
                      color="black"
                      mb={3}
                      lineHeight="1.15"
                      fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                    >
                      {item.title}
                    </Heading>

                    <Text
                      color="blackAlpha.700"
                      fontSize="14px"
                      lineHeight="1.7"
                      mb={5}
                      whiteSpace="pre-line"
                    >
                      {item.text}
                    </Text>

                    {item.buttonText && item.buttonLink && (
                      <Link href={item.buttonLink} style={{ textDecoration: "none" }}>
                        <Button
                          bg="#3a1f87"
                          color="white"
                          px={6}
                          py={3}
                          h="auto"
                          fontSize="13px"
                          fontWeight="700"
                          textTransform="uppercase"
                          letterSpacing="0.1em"
                          borderRadius="full"
                          border="2px solid"
                          borderColor="#3a1f87"
                          _hover={{ bg: "#2d1869", borderColor: "#2d1869" }}
                          transition="all 0.3s"
                          display="inline-flex"
                          alignItems="center"
                          gap={2}
                        >
                          {item.buttonText}
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Button>
                      </Link>
                    )}
                  </Box>
                </VStack>
              </motion.div>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
