"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Heading, Text, VStack, HStack, Button, SimpleGrid } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

interface Subscription {
  id: string;
  productName: string;
  productImage: string;
  variantTitle: string;
  frequency: string;
  frequencyDays: number;
  nextDelivery: string;
  status: "active" | "paused" | "cancelled";
  price: string;
  originalPrice: string;
  savings: string;
  createdAt: string;
  deliveryCount: number;
}

// Mock data - will be replaced with Shopify Subscription API
const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    productName: "Superior Cola",
    productImage: "https://jveysj-j1.myshopify.com/cdn/shop/files/product-main.png?v=1736903700&width=800",
    variantTitle: "12-Pack",
    frequency: "Every 4 weeks",
    frequencyDays: 28,
    nextDelivery: "January 15, 2025",
    status: "active",
    price: "$43.09",
    originalPrice: "$47.88",
    savings: "$4.79",
    createdAt: "December 15, 2024",
    deliveryCount: 1,
  },
];

const frequencyOptions = [
  { label: "Every 2 weeks", days: 14 },
  { label: "Every 4 weeks", days: 28 },
  { label: "Every 6 weeks", days: 42 },
];

function SubscriptionStatusBadge({ status }: { status: Subscription["status"] }) {
  const getStatusConfig = () => {
    switch (status) {
      case "active":
        return { bg: "green.100", color: "green.700", label: "Active" };
      case "paused":
        return { bg: "yellow.100", color: "yellow.700", label: "Paused" };
      case "cancelled":
        return { bg: "red.100", color: "red.700", label: "Cancelled" };
      default:
        return { bg: "gray.100", color: "gray.700", label: status };
    }
  };

  const config = getStatusConfig();

  return (
    <Box px={3} py={1} borderRadius="full" bg={config.bg} display="inline-flex">
      <Text color={config.color} fontSize="12px" fontWeight="600">
        {config.label}
      </Text>
    </Box>
  );
}

function SubscriptionCard({ subscription }: { subscription: Subscription }) {
  const [showActions, setShowActions] = useState(false);
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(subscription.frequencyDays);

  const handlePause = () => {
    // Would integrate with Shopify Subscription API
    console.log("Pause subscription:", subscription.id);
    setShowActions(false);
  };

  const handleResume = () => {
    // Would integrate with Shopify Subscription API
    console.log("Resume subscription:", subscription.id);
  };

  const handleSkip = () => {
    // Would integrate with Shopify Subscription API
    console.log("Skip next delivery:", subscription.id);
    setShowActions(false);
  };

  const handleCancel = () => {
    // Would integrate with Shopify Subscription API
    if (confirm("Are you sure you want to cancel this subscription?")) {
      console.log("Cancel subscription:", subscription.id);
    }
    setShowActions(false);
  };

  const handleUpdateFrequency = () => {
    // Would integrate with Shopify Subscription API
    console.log("Update frequency:", subscription.id, selectedFrequency);
    setShowFrequencyModal(false);
  };

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
              src={subscription.productImage}
              alt={subscription.productName}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          {/* Details */}
          <Flex flex={1} direction="column" justify="space-between" gap={4}>
            <VStack align="flex-start" gap={2}>
              <Flex justify="space-between" w="full" align="flex-start" gap={3} flexWrap="wrap">
                <VStack align="flex-start" gap={1}>
                  <Heading
                    as="h3"
                    color="black"
                    fontSize={{ base: "18px", md: "20px" }}
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    {subscription.productName}
                  </Heading>
                  <Text color="blackAlpha.600" fontSize="14px">
                    {subscription.variantTitle}
                  </Text>
                </VStack>
                <SubscriptionStatusBadge status={subscription.status} />
              </Flex>

              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4} w="full" pt={2}>
                <Box>
                  <Text color="blackAlpha.500" fontSize="11px" fontWeight="600" textTransform="uppercase" letterSpacing="0.05em">
                    Frequency
                  </Text>
                  <Text color="black" fontSize="14px" fontWeight="500" mt={1}>
                    {subscription.frequency}
                  </Text>
                </Box>
                <Box>
                  <Text color="blackAlpha.500" fontSize="11px" fontWeight="600" textTransform="uppercase" letterSpacing="0.05em">
                    Next Delivery
                  </Text>
                  <Text color="black" fontSize="14px" fontWeight="500" mt={1}>
                    {subscription.status === "paused" ? "Paused" : subscription.nextDelivery}
                  </Text>
                </Box>
                <Box>
                  <Text color="blackAlpha.500" fontSize="11px" fontWeight="600" textTransform="uppercase" letterSpacing="0.05em">
                    Deliveries
                  </Text>
                  <Text color="black" fontSize="14px" fontWeight="500" mt={1}>
                    {subscription.deliveryCount}
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>

            <Flex justify="space-between" align="center" pt={2} borderTop="1px solid" borderColor="blackAlpha.100">
              <VStack align="flex-start" gap={0}>
                <HStack gap={2}>
                  <Text color="#3a1f87" fontSize="18px" fontWeight="700">
                    {subscription.price}
                  </Text>
                  <Text color="blackAlpha.400" fontSize="14px" textDecoration="line-through">
                    {subscription.originalPrice}
                  </Text>
                </HStack>
                <Text color="green.600" fontSize="12px" fontWeight="600">
                  You save {subscription.savings} per delivery
                </Text>
              </VStack>

              <Box position="relative">
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
                  onClick={() => setShowActions(!showActions)}
                >
                  <HStack gap={2}>
                    <Text>Manage</Text>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </HStack>
                </Button>

                <AnimatePresence>
                  {showActions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        marginTop: "8px",
                        zIndex: 10,
                      }}
                    >
                      <Box
                        bg="white"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="blackAlpha.100"
                        shadow="lg"
                        overflow="hidden"
                        minW="180px"
                      >
                        <VStack align="stretch" gap={0}>
                          <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            px={4}
                            py={3}
                            h="auto"
                            fontSize="14px"
                            fontWeight="500"
                            color="black"
                            borderRadius={0}
                            _hover={{ bg: "#f5f5f5" }}
                            onClick={() => {
                              setShowFrequencyModal(true);
                              setShowActions(false);
                            }}
                          >
                            Change Frequency
                          </Button>
                          <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            px={4}
                            py={3}
                            h="auto"
                            fontSize="14px"
                            fontWeight="500"
                            color="black"
                            borderRadius={0}
                            _hover={{ bg: "#f5f5f5" }}
                            onClick={handleSkip}
                          >
                            Skip Next Delivery
                          </Button>
                          {subscription.status === "active" ? (
                            <Button
                              variant="ghost"
                              justifyContent="flex-start"
                              px={4}
                              py={3}
                              h="auto"
                              fontSize="14px"
                              fontWeight="500"
                              color="yellow.600"
                              borderRadius={0}
                              _hover={{ bg: "yellow.50" }}
                              onClick={handlePause}
                            >
                              Pause Subscription
                            </Button>
                          ) : subscription.status === "paused" ? (
                            <Button
                              variant="ghost"
                              justifyContent="flex-start"
                              px={4}
                              py={3}
                              h="auto"
                              fontSize="14px"
                              fontWeight="500"
                              color="green.600"
                              borderRadius={0}
                              _hover={{ bg: "green.50" }}
                              onClick={handleResume}
                            >
                              Resume Subscription
                            </Button>
                          ) : null}
                          <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            px={4}
                            py={3}
                            h="auto"
                            fontSize="14px"
                            fontWeight="500"
                            color="red.600"
                            borderRadius={0}
                            _hover={{ bg: "red.50" }}
                            onClick={handleCancel}
                          >
                            Cancel Subscription
                          </Button>
                        </VStack>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* Frequency Modal */}
      <AnimatePresence>
        {showFrequencyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: "20px",
            }}
            onClick={() => setShowFrequencyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                bg="white"
                borderRadius="2xl"
                p={6}
                maxW="400px"
                w="full"
              >
                <VStack align="stretch" gap={5}>
                  <Heading
                    as="h3"
                    color="black"
                    fontSize="20px"
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Change Delivery Frequency
                  </Heading>

                  <VStack align="stretch" gap={2}>
                    {frequencyOptions.map((option) => (
                      <Flex
                        key={option.days}
                        as="button"
                        align="center"
                        justify="space-between"
                        p={4}
                        borderRadius="xl"
                        border="2px solid"
                        borderColor={selectedFrequency === option.days ? "#3a1f87" : "blackAlpha.200"}
                        bg={selectedFrequency === option.days ? "#f5f2ec" : "white"}
                        cursor="pointer"
                        onClick={() => setSelectedFrequency(option.days)}
                        transition="all 0.2s"
                        _hover={{ borderColor: "#3a1f87" }}
                      >
                        <Text color="black" fontSize="15px" fontWeight="500">
                          {option.label}
                        </Text>
                        {selectedFrequency === option.days && (
                          <Box color="#3a1f87">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </Box>
                        )}
                      </Flex>
                    ))}
                  </VStack>

                  <HStack gap={3} pt={2}>
                    <Button
                      flex={1}
                      variant="outline"
                      color="blackAlpha.700"
                      borderColor="blackAlpha.300"
                      borderRadius="full"
                      py={3}
                      h="auto"
                      fontSize="14px"
                      fontWeight="600"
                      onClick={() => setShowFrequencyModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      flex={1}
                      bg="#3a1f87"
                      color="white"
                      borderRadius="full"
                      py={3}
                      h="auto"
                      fontSize="14px"
                      fontWeight="600"
                      _hover={{ bg: "#2d1869" }}
                      onClick={handleUpdateFrequency}
                    >
                      Update
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default function SubscriptionManagement() {
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
                  <HStack gap={2} color="blackAlpha.600" _hover={{ color: "#3a1f87" }} transition="color 0.2s">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <Text fontSize="13px" fontWeight="500">Back to Account</Text>
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
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Box>
                <VStack align="flex-start" gap={1} flex={1}>
                  <Text fontSize="16px" fontWeight="600">
                    Subscribe & Save 10%
                  </Text>
                  <Text fontSize="14px" color="whiteAlpha.800">
                    Free shipping on all subscription orders. Pause, skip, or cancel anytime.
                  </Text>
                </VStack>
              </Flex>
            </Box>

            {/* Subscriptions List */}
            {mockSubscriptions.length > 0 ? (
              <VStack align="stretch" gap={4}>
                {mockSubscriptions.map((subscription) => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
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
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
                    Subscribe and save 10% on every order. Never run out of your favorite DATE drinks.
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
