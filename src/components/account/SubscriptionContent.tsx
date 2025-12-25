"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Heading, Text, VStack, HStack, Button, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ShopifySubscriptionContract,
  formatPrice,
  formatDate,
  getSubscriptionStatusLabel,
  getDeliveryIntervalLabel,
} from "@/lib/shopify-customer";

interface SubscriptionContentProps {
  subscriptions: ShopifySubscriptionContract[];
}

function SubscriptionStatusBadge({ status }: { status: string }) {
  const getStatusConfig = () => {
    const normalizedStatus = status.toUpperCase();
    switch (normalizedStatus) {
      case "ACTIVE":
        return { bg: "green.100", color: "green.700" };
      case "PAUSED":
        return { bg: "yellow.100", color: "yellow.700" };
      case "CANCELLED":
      case "EXPIRED":
      case "FAILED":
        return { bg: "red.100", color: "red.700" };
      default:
        return { bg: "gray.100", color: "gray.700" };
    }
  };

  const config = getStatusConfig();
  const label = getSubscriptionStatusLabel(status);

  return (
    <Box px={3} py={1} borderRadius="full" bg={config.bg} display="inline-flex">
      <Text color={config.color} fontSize="12px" fontWeight="600">
        {label}
      </Text>
    </Box>
  );
}

function SubscriptionCard({
  subscription,
}: {
  subscription: ShopifySubscriptionContract;
}) {
  const firstLine = subscription.lines.edges[0]?.node;
  const imageUrl =
    firstLine?.variantImage?.url ||
    "https://jveysj-j1.myshopify.com/cdn/shop/files/product-main.png?v=1736903700&width=800";
  const productTitle = firstLine?.title || "Subscription";
  const totalPrice = firstLine?.currentPrice;
  const quantity = firstLine?.quantity || 1;

  const frequencyLabel = getDeliveryIntervalLabel(
    subscription.deliveryPolicy.interval,
    subscription.deliveryPolicy.intervalCount
  );

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      border="1px solid"
      borderColor="blackAlpha.100"
      overflow="hidden"
    >
      <Box p={{ base: 5, md: 6 }}>
        <Flex gap={{ base: 4, md: 6 }} direction={{ base: "column", md: "row" }}>
          {/* Product Image */}
          <Box
            w={{ base: "full", md: "140px" }}
            h={{ base: "180px", md: "140px" }}
            borderRadius="xl"
            overflow="hidden"
            bg="#f5f5f5"
            flexShrink={0}
            position="relative"
          >
            <Image
              src={imageUrl}
              alt={productTitle}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          {/* Details */}
          <Flex flex={1} direction="column" justify="space-between" gap={4}>
            <VStack align="flex-start" gap={2}>
              <Flex
                justify="space-between"
                w="full"
                align="flex-start"
                gap={3}
                flexWrap="wrap"
              >
                <VStack align="flex-start" gap={1}>
                  <Heading
                    as="h3"
                    color="black"
                    fontSize={{ base: "18px", md: "20px" }}
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    {productTitle}
                  </Heading>
                  <Text color="blackAlpha.600" fontSize="14px">
                    Qty: {quantity}
                  </Text>
                </VStack>
                <SubscriptionStatusBadge status={subscription.status} />
              </Flex>

              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4} w="full" pt={2}>
                <Box>
                  <Text
                    color="blackAlpha.500"
                    fontSize="11px"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                  >
                    Frequency
                  </Text>
                  <Text color="black" fontSize="14px" fontWeight="500" mt={1}>
                    {frequencyLabel}
                  </Text>
                </Box>
                <Box>
                  <Text
                    color="blackAlpha.500"
                    fontSize="11px"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                  >
                    Next Billing
                  </Text>
                  <Text color="black" fontSize="14px" fontWeight="500" mt={1}>
                    {subscription.status === "PAUSED"
                      ? "Paused"
                      : subscription.nextBillingDate
                      ? formatDate(subscription.nextBillingDate)
                      : "—"}
                  </Text>
                </Box>
                {totalPrice && (
                  <Box>
                    <Text
                      color="blackAlpha.500"
                      fontSize="11px"
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                    >
                      Price
                    </Text>
                    <Text color="black" fontSize="14px" fontWeight="500" mt={1}>
                      {formatPrice(totalPrice)}
                    </Text>
                  </Box>
                )}
              </SimpleGrid>
            </VStack>

            <Flex
              justify="space-between"
              align="center"
              pt={4}
              borderTop="1px solid"
              borderColor="blackAlpha.100"
            >
              <Text color="blackAlpha.500" fontSize="13px">
                Manage your subscription in Shopify
              </Text>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="outline"
                  color="blackAlpha.700"
                  borderColor="blackAlpha.300"
                  borderRadius="full"
                  px={4}
                  py={2}
                  h="auto"
                  fontSize="13px"
                  fontWeight="600"
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  Need Help?
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default function SubscriptionContent({
  subscriptions,
}: SubscriptionContentProps) {
  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "80px" }} minH="70vh">
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="900px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack align="stretch" gap={6}>
            {/* Header */}
            <Flex justify="space-between" align="flex-start">
              <VStack align="flex-start" gap={1}>
                <Link href="/account" style={{ textDecoration: "none" }}>
                  <HStack
                    gap={2}
                    color="blackAlpha.600"
                    _hover={{ color: "#3a1f87" }}
                    transition="color 0.2s"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <Text fontSize="13px" fontWeight="500">
                      Back to Account
                    </Text>
                  </HStack>
                </Link>
                <Heading
                  as="h1"
                  color="black"
                  fontSize={{ base: "28px", md: "36px" }}
                  fontWeight="600"
                  lineHeight="1.1"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Subscriptions
                </Heading>
                <Text color="blackAlpha.600" fontSize="15px">
                  Manage your recurring deliveries
                </Text>
              </VStack>
            </Flex>

            {/* Subscription Benefits Banner */}
            <Box
              bg="#3a1f87"
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              color="white"
            >
              <Flex align="center" gap={4} flexWrap="wrap">
                <Box
                  w={12}
                  h={12}
                  borderRadius="xl"
                  bg="whiteAlpha.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Box>
                <VStack align="flex-start" gap={1} flex={1}>
                  <Text fontSize="16px" fontWeight="600">
                    Subscribe & Save 10%
                  </Text>
                  <Text fontSize="14px" color="whiteAlpha.800">
                    Free shipping on all subscription orders. Pause, skip, or
                    cancel anytime.
                  </Text>
                </VStack>
              </Flex>
            </Box>

            {/* Subscriptions List */}
            {subscriptions.length > 0 ? (
              <VStack align="stretch" gap={4}>
                {subscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                  />
                ))}
              </VStack>
            ) : (
              <Box
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="blackAlpha.100"
                p={{ base: 8, md: 12 }}
                textAlign="center"
              >
                <VStack gap={4}>
                  <Box
                    w={16}
                    h={16}
                    borderRadius="full"
                    bg="#f5f5f5"
                    color="blackAlpha.400"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <svg
                      width="32"
                      height="32"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </Box>
                  <Heading
                    as="h2"
                    color="black"
                    fontSize="22px"
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    No Active Subscriptions
                  </Heading>
                  <Text color="blackAlpha.600" fontSize="15px" maxW="350px">
                    Subscribe and save 10% on every order. Never run out of your
                    favorite DATE drinks.
                  </Text>
                  <Link href="/products" style={{ textDecoration: "none" }}>
                    <Button
                      bg="#3a1f87"
                      color="white"
                      px={8}
                      py={4}
                      h="auto"
                      fontSize="14px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.1em"
                      borderRadius="full"
                      _hover={{ bg: "#2d1869" }}
                      mt={2}
                    >
                      Start a Subscription
                    </Button>
                  </Link>
                </VStack>
              </Box>
            )}
          </VStack>
        </motion.div>
      </Box>
    </Box>
  );
}
