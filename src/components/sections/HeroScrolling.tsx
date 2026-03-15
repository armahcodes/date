"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useCart } from "@/context/CartContext";
import { getProductByHandle, getFirstSellingPlan, ShopifyProduct, ShopifyProductVariant } from "@/lib/shopify";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

export default function HeroScrolling() {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct = await getProductByHandle("superior-cola-12-pack");
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
    <Box as="section" position="relative" minH={{ base: "50vh", md: "66vh" }} overflow="hidden">
      {/* Background Image */}
      <Box position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/5_94241ea3-dddd-41d3-a8b2-f573df8810e2.png?v=1762903700&width=3200"
          alt="Superior Cola Background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        h="full"
        minH={{ base: "50vh", md: "66vh" }}
        direction="column"
        justify="flex-end"
        align="center"
        pb={{ base: 12, md: 16 }}
        px={{ base: "20px", md: "30px", lg: "50px" }}
      >
        {/* Scrolling Text */}
        <Box w="full" overflow="hidden" mb={8}>
          <Flex
            className="animate-marquee"
            style={{ "--marquee-duration": "20s" } as React.CSSProperties}
          >
            {[...Array(8)].map((_, i) => (
              <Text
                key={i}
                color="black"
                fontSize={{ base: "16px", sm: "24px", md: "40px" }}
                fontWeight="400"
                whiteSpace="nowrap"
                letterSpacing="tight"
                mx="10px"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                Superior cola, for Superior Resilience
              </Text>
            ))}
          </Flex>
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
          px={9}
          py={4}
          h="auto"
          fontSize="15px"
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
      </Flex>
    </Box>
  );
}
