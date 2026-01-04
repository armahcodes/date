"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useCart } from "@/context/CartContext";
import { getProductByHandle, getFirstSellingPlan, ShopifyProduct, ShopifyProductVariant } from "@/lib/shopify";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

export default function Hero() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
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

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale || !product) return;

    setIsAdding(true);

    try {
      const sellingPlanId = getFirstSellingPlan(product)?.id;
      await addItem(selectedVariant.id, 1, sellingPlanId || undefined);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Box as="section" position="relative" minH={{ base: "550px", md: "750px" }} overflow="hidden">
      {/* Desktop Background Image */}
      <Box display={{ base: "none", md: "block" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/Hero.png?v=1762896979&width=3200"
          alt="DATE Hero"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="100vw"
        />
      </Box>

      {/* Mobile Background Image */}
      <Box display={{ base: "block", md: "none" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/51_Top_Updated.png?v=1762903893&width=1200"
          alt="DATE Hero Mobile"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          priority
          sizes="100vw"
        />
      </Box>

      {/* Content Container */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        w="full"
        direction="column"
        minH={{ base: "550px", md: "750px" }}
      >
        <Flex
          flex={1}
          align="flex-end"
          pb={{ base: 12, md: 20 }}
          px={{ base: "20px", md: "30px", lg: "50px" }}
        >
          <Box
            w={{ base: "full", md: "50%" }}
            maxW={{ md: "50%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            {/* Heading */}
            <Heading
              as="h1"
              color="#f5f5f5"
              fontSize={{ base: "30px", md: "34px" }}
              fontWeight="600"
              lineHeight="1.15"
              mb={4}
              letterSpacing="-0.01em"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Ancient Seed. Modern Resilience.
            </Heading>

            {/* Body text */}
            <Box mb={6}>
              <Text
                color="rgba(245, 245, 245, 0.9)"
                fontSize="15px"
                fontWeight="600"
                lineHeight="1.6"
              >
                Centuries ago, Desert Nomads in Arabia discovered the richness of the date seed. Inspired by this ancient tradition, we crafted a restorative blend for your modern resilience.
              </Text>
            </Box>

            {/* CTA Button */}
            <Box
              as="button"
              onClick={handleAddToCart}
              aria-disabled={isAdding || !selectedVariant?.availableForSale}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              bg={addedSuccess ? "green.500" : "#3a1f87"}
              color="white"
              px={{ base: 6, md: 7 }}
              py={{ base: 2.5, md: 3 }}
              h="auto"
              fontSize={{ base: "13px", md: "14px" }}
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.1em"
              borderRadius="full"
              border="2px solid"
              borderColor={addedSuccess ? "green.500" : "#3a1f87"}
              cursor={selectedVariant?.availableForSale && !isAdding ? "pointer" : "not-allowed"}
              transition="all 0.3s"
              _hover={{
                bg: !addedSuccess && !isAdding ? "#2d1869" : undefined,
                borderColor: !addedSuccess && !isAdding ? "#2d1869" : undefined,
              }}
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
                  <MotionBox
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text>Pre-Order Now</Text>
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
