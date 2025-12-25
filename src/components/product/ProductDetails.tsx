"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { ShopifyProduct, ShopifyProductVariant, formatPrice, getFirstSellingPlan } from "@/lib/shopify";
import ProductForm from "./ProductForm";

interface ProductDetailsProps {
  product: ShopifyProduct;
}

// Sensory profile data
const sensoryProfile = [
  {
    title: "Aroma",
    description: "Classic cola spices including cinnamon and vanilla, complemented by roasted date seed brew and dark fruit notes.",
  },
  {
    title: "Flavor",
    description: "Opens with bold, classic cola characteristics that evolve into earthy, roasted date seed notes with a clean finish.",
  },
  {
    title: "Mouthfeel",
    description: "Crisp with vibrant carbonation, medium-bodied, refreshing, and non-sticky.",
  },
];

// Key benefits
const keyBenefits = [
  { label: "Zero Caffeine", detail: "No jitters" },
  { label: "Zero Sugar", detail: "Clean taste" },
  { label: "Prebiotic Fiber", detail: "Gut health" },
  { label: "Low Calorie", detail: "Light & refreshing" },
  { label: "Non-GMO", detail: "Pure ingredients" },
  { label: "Upcycled Seeds", detail: "Sustainable" },
];

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

export default function ProductDetails({ product }: ProductDetailsProps) {
  const variants = product.variants.edges.map((edge) => edge.node);
  const firstVariant = variants[0];

  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    firstVariant || null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const images = product.images.edges.map((edge) => edge.node);

  if (!selectedVariant) {
    return (
      <Flex justify="center" align="center" py={20}>
        <Text color="blackAlpha.600" fontSize="lg">This product is currently unavailable.</Text>
      </Flex>
    );
  }

  return (
    <Box ref={containerRef}>
      {/* Main Product Section */}
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: 10, lg: 16, xl: 20 }}
        alignItems="start"
      >
        {/* Product Images - Left Side */}
        <MotionBox
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main Image */}
          <Box
            position="relative"
            aspectRatio="1"
            borderRadius="24px"
            overflow="hidden"
            bg="linear-gradient(145deg, #faf9f7 0%, #f0ede8 100%)"
            mb={4}
          >
            <AnimatePresence mode="wait">
              {images[selectedImageIndex] ? (
                <MotionBox
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  position="absolute"
                  inset={0}
                >
                  <Image
                    src={images[selectedImageIndex].url}
                    alt={images[selectedImageIndex].altText || product.title}
                    fill
                    style={{ objectFit: "contain", padding: "32px" }}
                    priority
                  />
                </MotionBox>
              ) : (
                <Flex w="full" h="full" align="center" justify="center">
                  <Text
                    fontSize="6xl"
                    fontWeight="800"
                    color="#3a1f87"
                    opacity={0.08}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    DATE
                  </Text>
                </Flex>
              )}
            </AnimatePresence>

            {/* Pack Badge */}
            <Badge
              position="absolute"
              top={5}
              left={5}
              bg="#3a1f87"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              6 × 12oz Cans
            </Badge>
          </Box>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <SimpleGrid columns={4} gap={3}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  as="button"
                  onClick={() => setSelectedImageIndex(index)}
                  position="relative"
                  aspectRatio="1"
                  borderRadius="16px"
                  overflow="hidden"
                  bg="linear-gradient(145deg, #faf9f7 0%, #f0ede8 100%)"
                  border="2px solid"
                  borderColor={selectedImageIndex === index ? "#d40055" : "transparent"}
                  transition="all 0.3s"
                  _hover={{ borderColor: selectedImageIndex === index ? "#d40055" : "blackAlpha.200" }}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: "contain", padding: "8px" }}
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </MotionBox>

        {/* Product Info - Right Side */}
        <MotionBox
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <VStack align="stretch" gap={6}>
            {/* Category Label */}
            <HStack gap={3}>
              <Text
                fontSize="11px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="#d40055"
              >
                Functional Beverage
              </Text>
              <Box w={8} h="1px" bg="#d40055" opacity={0.3} />
            </HStack>

            {/* Product Title */}
            <Heading
              as="h1"
              fontSize={{ base: "32px", md: "40px", lg: "46px" }}
              fontWeight="700"
              lineHeight={1.1}
              letterSpacing="-0.02em"
              color="black"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              {product.title}
            </Heading>

            {/* Description */}
            <Text
              fontSize={{ base: "15px", md: "16px" }}
              lineHeight={1.8}
              color="blackAlpha.700"
              maxW="lg"
            >
              Experience balance—rich, smooth, and full of flavor, with notes that dance on your palate from the first sip to the last. Perfect for any time of day when you&apos;re seeking a little something extra.
            </Text>

            {/* Pre-Order Notice */}
            <Box
              bg="linear-gradient(135deg, #3a1f87 0%, #2d1869 100%)"
              borderRadius="20px"
              p={5}
              position="relative"
              overflow="hidden"
            >
              {/* Decorative circles */}
              <Box
                position="absolute"
                top="-30px"
                right="-30px"
                w="100px"
                h="100px"
                borderRadius="full"
                border="1px solid"
                borderColor="whiteAlpha.100"
              />
              <Box
                position="absolute"
                bottom="-20px"
                left="-20px"
                w="60px"
                h="60px"
                borderRadius="full"
                border="1px solid"
                borderColor="whiteAlpha.100"
              />

              <Flex gap={4} position="relative">
                <Flex
                  w={12}
                  h={12}
                  borderRadius="14px"
                  bg="whiteAlpha.100"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Flex>
                <Box flex={1}>
                  <HStack gap={2} mb={1}>
                    <Text color="white" fontSize="14px" fontWeight="700" textTransform="uppercase" letterSpacing="0.05em">
                      Pre-Order Now
                    </Text>
                    <Badge bg="#d40055" color="white" fontSize="10px" px={2} py={0.5} borderRadius="full">
                      $5 Deposit
                    </Badge>
                  </HStack>
                  <Text color="whiteAlpha.700" fontSize="13px" lineHeight={1.6}>
                    Reserve your order with a $5 refundable deposit. Full payment collected when we launch.
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Product Form */}
            <ProductForm
              variants={variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              sellingPlanId={getFirstSellingPlan(product)?.id}
            />

            {/* Benefits Grid */}
            <SimpleGrid columns={{ base: 2, md: 3 }} gap={3} mt={2}>
              {keyBenefits.map((benefit, index) => (
                <Flex
                  key={index}
                  align="center"
                  gap={2.5}
                  p={3}
                  borderRadius="14px"
                  bg="#f8f6f3"
                  border="1px solid"
                  borderColor="blackAlpha.50"
                >
                  <Flex
                    w={5}
                    h={5}
                    borderRadius="full"
                    bg="#d40055"
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <svg width="10" height="10" fill="white" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </Flex>
                  <Text fontSize="11px" fontWeight="600" color="black">
                    {benefit.label}
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionBox>
      </Grid>

      {/* Sensory Profile Section */}
      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        mt={{ base: 20, md: 28 }}
      >
        <VStack gap={10}>
          <VStack gap={3} textAlign="center">
            <Text
              fontSize="11px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="#d40055"
            >
              Tasting Notes
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "28px", md: "36px" }}
              fontWeight="700"
              color="black"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Sensory Profile
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
            {sensoryProfile.map((item, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                p={6}
                borderRadius="20px"
                bg="linear-gradient(145deg, #faf9f7 0%, #ffffff 100%)"
                border="1px solid"
                borderColor="blackAlpha.50"
              >
                <Box
                  w={14}
                  h={14}
                  borderRadius="16px"
                  bg={index === 1 ? "#d40055" : "#3a1f87"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                >
                  {index === 0 && (
                    <svg width="28" height="28" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="28" height="28" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="28" height="28" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                  )}
                </Box>
                <Heading
                  as="h3"
                  fontSize="18px"
                  fontWeight="700"
                  color="black"
                  mb={2}
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  {item.title}
                </Heading>
                <Text fontSize="14px" lineHeight={1.7} color="blackAlpha.600">
                  {item.description}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </MotionBox>

      {/* Shipping Information */}
      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        mt={{ base: 16, md: 24 }}
        p={{ base: 6, md: 8 }}
        borderRadius="24px"
        bg="#f8f6f3"
        border="1px solid"
        borderColor="blackAlpha.50"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={6}
        >
          <Box>
            <Text
              fontSize="11px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="#d40055"
              mb={2}
            >
              Delivery
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "22px", md: "26px" }}
              fontWeight="700"
              color="black"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Shipping Information
            </Heading>
          </Box>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={6}>
            {[
              { label: "Standard", value: "3-7 days" },
              { label: "Free Shipping", value: "Over $50" },
              { label: "Expedited", value: "2-3 days" },
              { label: "Processing", value: "1-2 days" },
            ].map((info, index) => (
              <Box key={index} textAlign={{ base: "left", md: "center" }}>
                <Text fontSize="11px" color="blackAlpha.500" textTransform="uppercase" letterSpacing="0.05em" mb={1}>
                  {info.label}
                </Text>
                <Text fontSize="14px" fontWeight="600" color="black">
                  {info.value}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>

        <Flex
          mt={6}
          pt={6}
          borderTop="1px solid"
          borderColor="blackAlpha.100"
          wrap="wrap"
          gap={6}
          justify={{ base: "flex-start", md: "center" }}
        >
          {[
            { icon: "truck", text: "Free shipping over $50" },
            { icon: "shield", text: "Secure checkout" },
            { icon: "refresh", text: "Easy returns" },
          ].map((item, index) => (
            <HStack key={index} gap={2} color="blackAlpha.500" fontSize="13px">
              {item.icon === "truck" && (
                <Box color="#3a1f87">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </Box>
              )}
              {item.icon === "shield" && (
                <Box color="#3a1f87">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </Box>
              )}
              {item.icon === "refresh" && (
                <Box color="#3a1f87">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </Box>
              )}
              <Text>{item.text}</Text>
            </HStack>
          ))}
        </Flex>
      </MotionBox>
    </Box>
  );
}
