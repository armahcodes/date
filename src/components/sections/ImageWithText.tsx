"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Grid, Heading, Text, Flex, VStack, HStack, Badge } from "@chakra-ui/react";
import { useCart } from "@/context/CartContext";
import { getProductByHandle, formatPrice, getFirstSellingPlan, ShopifyProduct, ShopifyProductVariant } from "@/lib/shopify";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

export default function ImageWithText() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct = await getProductByHandle("superior-cola-6-pack");
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          const variants = fetchedProduct.variants.edges.map((edge) => edge.node);
          setSelectedVariant(variants[0] || null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
    fetchProduct();
  }, []);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale || !product) return;

    setIsAdding(true);
    setError(null);

    try {
      const sellingPlanId = getFirstSellingPlan(product)?.id;
      await addItem(selectedVariant.id, quantity, sellingPlanId || undefined);
      setQuantity(1);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const price = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const variantNumericId = selectedVariant?.id.split("/").pop() || "";

  return (
    <Box as="section" bg="#f5f5f5">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} minH={{ base: "auto", md: "750px", lg: "800px" }} gap={{ base: 0, md: 0 }}>
        {/* Image Side */}
        <Box position="relative" h={{ base: "450px", md: "auto" }} order={1}>
          <Image
            src="https://jveysj-j1.myshopify.com/cdn/shop/files/Mobile_-_Hero_4.png?v=1762903700&width=1600"
            alt="DATE Superior Cola"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Box>

        {/* Content Side */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={{ base: "center", md: "flex-start" }}
          textAlign={{ base: "center", md: "left" }}
          px={{ base: "16px", sm: "20px", md: "32px", lg: "50px" }}
          py={{ base: 8, sm: 10, md: 16 }}
          order={2}
        >
          {/* Subheading */}
          <Text
            fontSize={{ base: "11px", md: "14px" }}
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.2em"
            color="blackAlpha.700"
            mb={4}
          >
            Revitalize & elevate. No Sugar. No caffeine.
          </Text>

          {/* Heading */}
          <Heading
            as="h2"
            color="black"
            fontSize={{ base: "30px", md: "40px" }}
            fontWeight="600"
            mb={4}
            lineHeight="1.15"
            letterSpacing="-0.01em"
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          >
            The flavor you&apos;ll love, the resilience you deserve.
          </Heading>

          {/* Body text */}
          <Text
            color="blackAlpha.800"
            fontSize="15px"
            lineHeight="1.7"
            mb={8}
            maxW="lg"
          >
            We utilized the ancient ingredient of date seeds in an innovative, familiar and beloved
            taste profile. DATE Superior Cola delivers a surprisingly delightful flavor, lowering
            the barrier to trial and making your restorative ritual something to look forward to.
          </Text>

          {/* Product Purchase Form */}
          {selectedVariant && (
            <VStack align={{ base: "center", md: "stretch" }} gap={5} maxW="md" w="full">
              {/* Pre-Order Notice */}
              <Box
                bg="linear-gradient(135deg, #3a1f87 0%, #2d1869 100%)"
                borderRadius="16px"
                p={4}
                position="relative"
                overflow="hidden"
                w="full"
              >
                <Box
                  position="absolute"
                  top="-20px"
                  right="-20px"
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                />
                <Flex gap={3} position="relative" align="center">
                  <Flex
                    w={10}
                    h={10}
                    borderRadius="12px"
                    bg="whiteAlpha.100"
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Flex>
                  <Box flex={1}>
                    <HStack gap={2}>
                      <Text color="white" fontSize="13px" fontWeight="700" textTransform="uppercase" letterSpacing="0.05em">
                        Pre-Order Now
                      </Text>
                      <Badge bg="#d40055" color="white" fontSize="9px" px={2} py={0.5} borderRadius="full">
                        $5 Deposit
                      </Badge>
                    </HStack>
                    <Text color="whiteAlpha.700" fontSize="12px" mt={0.5}>
                      Reserve with a refundable deposit
                    </Text>
                  </Box>
                </Flex>
              </Box>

              {/* Price */}
              <Box>
                <Text
                  fontSize={{ base: "28px", md: "34px" }}
                  fontWeight="700"
                  color="black"
                  letterSpacing="-0.02em"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  {formatPrice(selectedVariant.price)}
                </Text>
                <Text
                  fontSize="14px"
                  fontWeight="500"
                  color="blackAlpha.600"
                  mt={1}
                >
                  6 - Pack
                </Text>
              </Box>

              {/* Quantity and Add to Cart */}
              <Flex direction={{ base: "column", sm: "row" }} gap={3} w="full">
                {/* Quantity Selector */}
                <Flex
                  align="center"
                  justify="space-between"
                  h="52px"
                  px={2}
                  borderRadius="full"
                  bg="white"
                  border="1px solid"
                  borderColor="blackAlpha.100"
                  flexShrink={0}
                  w={{ base: "full", sm: "130px" }}
                >
                  <Box
                    as="button"
                    onClick={() => handleQuantityChange(-1)}
                    w={9}
                    h={9}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    color="blackAlpha.600"
                    transition="all 0.2s"
                    _hover={{ color: "#d40055", bg: "blackAlpha.50" }}
                    aria-label="Decrease quantity"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  </Box>
                  <Text fontSize="16px" fontWeight="700" color="black" w={8} textAlign="center">
                    {quantity}
                  </Text>
                  <Box
                    as="button"
                    onClick={() => handleQuantityChange(1)}
                    w={9}
                    h={9}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    color="blackAlpha.600"
                    transition="all 0.2s"
                    _hover={{ color: "#d40055", bg: "blackAlpha.50" }}
                    aria-label="Increase quantity"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </Box>
                </Flex>

                {/* Add to Cart Button */}
                <Box
                  as="button"
                  onClick={handleAddToCart}
                  aria-disabled={isAdding || !selectedVariant.availableForSale}
                  flex={1}
                  h="52px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={3}
                  borderRadius="full"
                  fontSize="13px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  cursor={selectedVariant.availableForSale && !isAdding ? "pointer" : "not-allowed"}
                  transition="all 0.3s"
                  bg={addedSuccess ? "green.500" : selectedVariant.availableForSale ? "#d40055" : "blackAlpha.300"}
                  color="white"
                  boxShadow={selectedVariant.availableForSale && !addedSuccess ? "0 8px 30px -8px rgba(212, 0, 85, 0.5)" : "none"}
                  _hover={{
                    bg: selectedVariant.availableForSale && !addedSuccess && !isAdding ? "#b30048" : undefined,
                    transform: selectedVariant.availableForSale && !isAdding ? "translateY(-2px)" : undefined,
                  }}
                  data-native-pre-order-btn=""
                  data-starting-variant={variantNumericId}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <MotionFlex
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        align="center"
                        gap={2}
                      >
                        <MotionBox
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <circle opacity={0.25} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path opacity={0.75} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        </MotionBox>
                        <Text>Adding...</Text>
                      </MotionFlex>
                    ) : addedSuccess ? (
                      <MotionFlex
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        align="center"
                        gap={2}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <Text>Added!</Text>
                      </MotionFlex>
                    ) : (
                      <MotionFlex
                        key="add"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        align="center"
                        gap={3}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <Text>Pre-Order</Text>
                        <Text opacity={0.7}>•</Text>
                        <Text fontWeight="500">
                          {formatPrice({ amount: (price * quantity).toFixed(2), currencyCode: selectedVariant.price.currencyCode })}
                        </Text>
                      </MotionFlex>
                    )}
                  </AnimatePresence>
                </Box>
              </Flex>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <MotionBox
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      px={4}
                      py={3}
                      bg="red.50"
                      border="1px solid"
                      borderColor="red.200"
                      borderRadius="12px"
                    >
                      <Box color="red.500" flexShrink={0}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                      </Box>
                      <Text color="red.600" fontSize="12px">{error}</Text>
                    </Flex>
                  </MotionBox>
                )}
              </AnimatePresence>
            </VStack>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
