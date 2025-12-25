"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Box, Flex, Grid, Heading, Text, Button, IconButton } from "@chakra-ui/react";
import { useCart } from "@/context/CartContext";

const PRODUCT_VARIANT_ID = "gid://shopify/ProductVariant/46791091912962";
const SELLING_PLAN_ID = "gid://shopify/SellingPlan/3481010434";

export default function FeaturedProduct() {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handlePreOrder = async () => {
    setIsAdding(true);
    try {
      await addItem(PRODUCT_VARIANT_ID, quantity, SELLING_PLAN_ID);
      setQuantity(1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Box as="section" position="relative" minH="100vh" overflow="hidden">
      {/* Desktop Background */}
      <Box display={{ base: "none", md: "block" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/Desktop_-_Hero_30554176-8c2e-4af9-ba0c-ec3387e3c014.png?v=1762903700&width=3200"
          alt="DATE Product Background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
        <Box position="absolute" inset={0} bgGradient="linear(to-r, blackAlpha.400, blackAlpha.200, transparent)" />
      </Box>

      {/* Mobile Background */}
      <Box display={{ base: "block", md: "none" }} position="absolute" inset={0}>
        <Image
          src="https://jveysj-j1.myshopify.com/cdn/shop/files/2_b6631d0f-7e4e-4d99-9405-1c1c57fcbcf0.png?v=1762903700&width=1200"
          alt="DATE Product Background Mobile"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
        <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.400, transparent, transparent)" />
      </Box>

      {/* Content */}
      <Flex position="relative" zIndex={10} minH="100vh" align="center" py={16}>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 8, md: "32px" }}
          px={{ base: "20px", md: "30px", lg: "50px" }}
          w="full"
          alignItems="center"
        >
          {/* Text Content */}
          <Box order={{ base: 2, md: 1 }}>
            <Heading
              as="h2"
              color="white"
              fontSize={{ base: "30px", md: "34px" }}
              fontWeight="600"
              mb={8}
              lineHeight="1.15"
              letterSpacing="-0.01em"
              maxW="lg"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              DATE is your daily restore. Crafted for your modern resilience.
            </Heading>
            <Link href="/products/superior-cola-6-pack" style={{ textDecoration: "none" }}>
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
              >
                Pre-Order Now
              </Button>
            </Link>
          </Box>

          {/* Product Card */}
          <Flex order={{ base: 1, md: 2 }} justify={{ base: "center", md: "flex-end" }}>
            <Box
              bg="#f5f2ec"
              borderRadius="2xl"
              p={5}
              maxW="320px"
              w="full"
              boxShadow="xl"
            >
              {/* Pre-order badge */}
              <Flex align="center" gap={2} mb={3}>
                <Text
                  px="10px"
                  py={1}
                  bg="#3a1f87"
                  color="white"
                  fontSize="10px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  borderRadius="full"
                >
                  Pre-Order
                </Text>
                <Text color="blackAlpha.500" fontSize="11px">
                  Reserve with $5 deposit
                </Text>
              </Flex>

              <Link href="/products/superior-cola-6-pack">
                <Box
                  position="relative"
                  aspectRatio={1}
                  mb={4}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="whiteAlpha.500"
                >
                  <Image
                    src="https://jveysj-j1.myshopify.com/cdn/shop/files/DATECAN_Transparent_1.png?v=1762910148&width=600"
                    alt="DATE Superior Cola 6-Pack"
                    fill
                    style={{ objectFit: "contain", padding: "16px" }}
                  />
                </Box>
              </Link>

              <Heading as="h3" color="black" fontSize="16px" fontWeight="600" mb={1}>
                Superior Cola 6 Pack
              </Heading>
              <Text color="blackAlpha.600" fontSize="13px" mb={3} lineClamp={2}>
                Zero caffeine, zero sugar functional beverage with prebiotic fiber.
              </Text>

              <Flex align="center" justify="space-between" gap={3}>
                <Text color="black" fontSize="18px" fontWeight="700">
                  $24.96
                </Text>

                {/* Quantity Selector */}
                <Flex align="center" border="1px solid" borderColor="blackAlpha.200" borderRadius="full" overflow="hidden">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="ghost"
                    size="sm"
                    px={3}
                    py="6px"
                    minW="auto"
                    h="auto"
                    color="black"
                    _hover={{ bg: "blackAlpha.50" }}
                    borderRadius={0}
                  >
                    −
                  </Button>
                  <Text px={3} py="6px" color="black" fontWeight="500" fontSize="sm" minW="32px" textAlign="center">
                    {quantity}
                  </Text>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    variant="ghost"
                    size="sm"
                    px={3}
                    py="6px"
                    minW="auto"
                    h="auto"
                    color="black"
                    _hover={{ bg: "blackAlpha.50" }}
                    borderRadius={0}
                  >
                    +
                  </Button>
                </Flex>

                <Button
                  onClick={handlePreOrder}
                  disabled={isAdding}
                  bg="#d40055"
                  color="white"
                  px={4}
                  py={2}
                  h="auto"
                  fontSize="12px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                  borderRadius="full"
                  _hover={{ opacity: 0.9 }}
                  _disabled={{ opacity: 0.7 }}
                  transition="all 0.3s"
                >
                  {isAdding ? "..." : "Pre-Order"}
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Grid>
      </Flex>
    </Box>
  );
}
