"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useCart } from "@/context/CartContext";
import { ShopifyProductVariant, formatPrice } from "@/lib/shopify";

interface ProductFormProps {
  variants: ShopifyProductVariant[];
  selectedVariant: ShopifyProductVariant;
  onVariantChange: (variant: ShopifyProductVariant) => void;
  sellingPlanId?: string | null;
}

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionButton = motion.create(Button);

export default function ProductForm({ variants, selectedVariant, onVariantChange, sellingPlanId }: ProductFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const { addItem } = useCart();

  const hasMultipleVariants = variants.length > 1;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant.availableForSale) return;

    setIsAdding(true);
    setError(null);

    try {
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

  const price = parseFloat(selectedVariant.price.amount);
  const compareAtPrice = selectedVariant.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : null;
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

  const variantNumericId = selectedVariant.id.split("/").pop() || selectedVariant.id;

  return (
    <VStack align="stretch" gap={5}>
      {/* Price Section */}
      <Flex align="baseline" gap={4}>
        <MotionBox
          key={selectedVariant.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Text
            fontSize={{ base: "32px", md: "38px" }}
            fontWeight="700"
            color="black"
            letterSpacing="-0.02em"
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          >
            {formatPrice(selectedVariant.price)}
          </Text>
        </MotionBox>
        {hasDiscount && (
          <HStack gap={3}>
            <Text
              fontSize="18px"
              color="blackAlpha.400"
              textDecoration="line-through"
            >
              {formatPrice(selectedVariant.compareAtPrice!)}
            </Text>
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Box
                bg="#d40055"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="11px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.05em"
              >
                Save {discountPercentage}%
              </Box>
            </MotionBox>
          </HStack>
        )}
      </Flex>

      {/* Variant Selector */}
      {hasMultipleVariants && (
        <Box>
          <Text
            fontSize="11px"
            fontWeight="700"
            color="blackAlpha.600"
            textTransform="uppercase"
            letterSpacing="0.15em"
            mb={3}
          >
            Select Option
          </Text>
          <Flex wrap="wrap" gap={3}>
            {variants.map((variant) => (
              <Box
                key={variant.id}
                as="button"
                onClick={() => variant.availableForSale && onVariantChange(variant)}
                aria-disabled={!variant.availableForSale}
                px={6}
                py={3}
                borderRadius="full"
                fontSize="13px"
                fontWeight="600"
                cursor={variant.availableForSale ? "pointer" : "not-allowed"}
                transition="all 0.3s"
                bg={selectedVariant.id === variant.id ? "#3a1f87" : "white"}
                color={selectedVariant.id === variant.id ? "white" : variant.availableForSale ? "black" : "blackAlpha.400"}
                border="2px solid"
                borderColor={selectedVariant.id === variant.id ? "#3a1f87" : "blackAlpha.100"}
                textDecoration={!variant.availableForSale ? "line-through" : "none"}
                opacity={!variant.availableForSale ? 0.5 : 1}
                _hover={{
                  borderColor: variant.availableForSale && selectedVariant.id !== variant.id ? "#3a1f87" : undefined,
                  transform: variant.availableForSale ? "translateY(-1px)" : undefined,
                }}
              >
                {variant.title}
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {/* Quantity and Add to Cart */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={4}
      >
        {/* Quantity Selector */}
        <Flex
          align="center"
          justify="space-between"
          h="56px"
          px={2}
          borderRadius="full"
          bg="linear-gradient(145deg, #ffffff 0%, #f8f6f3 100%)"
          border="1px solid"
          borderColor="blackAlpha.100"
          flexShrink={0}
          w={{ base: "full", sm: "140px" }}
        >
          <Box
            as="button"
            onClick={() => handleQuantityChange(-1)}
            w={10}
            h={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            color="blackAlpha.600"
            transition="all 0.2s"
            _hover={{ color: "#d40055", bg: "blackAlpha.50" }}
            aria-label="Decrease quantity"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </Box>
          <MotionBox
            key={quantity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Text
              fontSize="17px"
              fontWeight="700"
              color="black"
              w={10}
              textAlign="center"
            >
              {quantity}
            </Text>
          </MotionBox>
          <Box
            as="button"
            onClick={() => handleQuantityChange(1)}
            w={10}
            h={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            color="blackAlpha.600"
            transition="all 0.2s"
            _hover={{ color: "#d40055", bg: "blackAlpha.50" }}
            aria-label="Increase quantity"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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
          h="56px"
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
            boxShadow: selectedVariant.availableForSale && !addedSuccess ? "0 12px 40px -8px rgba(212, 0, 85, 0.6)" : undefined,
          }}
          _disabled={{ opacity: 0.7 }}
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
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
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
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <Text>Added!</Text>
              </MotionFlex>
            ) : !selectedVariant.availableForSale ? (
              <MotionBox
                key="soldout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Text>Sold Out</Text>
              </MotionBox>
            ) : (
              <MotionFlex
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                align="center"
                gap={3}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
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
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          >
            <Flex
              align="center"
              gap={2}
              px={4}
              py={3}
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="14px"
            >
              <Box color="red.500" flexShrink={0}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </Box>
              <Text color="red.600" fontSize="13px">{error}</Text>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </VStack>
  );
}
