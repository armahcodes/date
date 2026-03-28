"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Flex, Heading, Text, VStack, HStack, Grid, Button, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

interface Subscription {
  id: string;
  productName: string;
  frequency: string;
  nextDelivery: string;
  status: "active" | "paused" | "cancelled";
  price: string;
}

// Mock data - will be replaced with actual Shopify Customer API data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1001",
    date: "Dec 15, 2024",
    status: "Delivered",
    total: "$47.88",
    items: 2,
  },
  {
    id: "2",
    orderNumber: "#1002",
    date: "Dec 20, 2024",
    status: "In Transit",
    total: "$95.76",
    items: 4,
  },
];

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    productName: "Superior Cola 12-Pack",
    frequency: "Every 4 weeks",
    nextDelivery: "Jan 15, 2025",
    status: "active",
    price: "$43.09/delivery",
  },
];

function DashboardCard({
  title,
  icon,
  children,
  href,
  linkText,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  linkText?: string;
}) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      border="1px solid"
      borderColor="blackAlpha.100"
      p={{ base: 5, md: 6 }}
      h="full"
    >
      <VStack align="stretch" gap={4}>
        <Flex justify="space-between" align="center">
          <HStack gap={3}>
            <Box
              w={10}
              h={10}
              borderRadius="xl"
              bg="#3a1f87"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {icon}
            </Box>
            <Heading
              as="h3"
              color="black"
              fontSize="18px"
              fontWeight="600"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              {title}
            </Heading>
          </HStack>
          {href && linkText && (
            <Link href={href} style={{ textDecoration: "none" }}>
              <Text
                color="#3a1f87"
                fontSize="13px"
                fontWeight="600"
                _hover={{ textDecoration: "underline" }}
              >
                {linkText}
              </Text>
            </Link>
          )}
        </Flex>
        {children}
      </VStack>
    </Box>
  );
}

function OrderStatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "delivered":
        return { bg: "green.100", color: "green.700" };
      case "in transit":
        return { bg: "blue.100", color: "blue.700" };
      case "processing":
        return { bg: "yellow.100", color: "yellow.700" };
      case "cancelled":
        return { bg: "red.100", color: "red.700" };
      default:
        return { bg: "gray.100", color: "gray.700" };
    }
  };

  const colors = getStatusColor();

  return (
    <Box
      px={3}
      py={1}
      borderRadius="full"
      bg={colors.bg}
      display="inline-flex"
    >
      <Text color={colors.color} fontSize="12px" fontWeight="600">
        {status}
      </Text>
    </Box>
  );
}

function SubscriptionStatusBadge({ status }: { status: Subscription["status"] }) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return { bg: "green.100", color: "green.700" };
      case "paused":
        return { bg: "yellow.100", color: "yellow.700" };
      case "cancelled":
        return { bg: "red.100", color: "red.700" };
      default:
        return { bg: "gray.100", color: "gray.700" };
    }
  };

  const colors = getStatusColor();

  return (
    <Box
      px={3}
      py={1}
      borderRadius="full"
      bg={colors.bg}
      display="inline-flex"
    >
      <Text color={colors.color} fontSize="12px" fontWeight="600" textTransform="capitalize">
        {status}
      </Text>
    </Box>
  );
}

export default function AccountDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState("Guest");

  useEffect(() => {
    // Check for customer session
    // This will be replaced with actual Shopify Customer API auth check
    const checkAuth = async () => {
      // For demo purposes, show logged-in state
      // In production, this would validate the customer token
      setIsLoggedIn(true);
      setCustomerName("John");
    };
    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return (
      <Box as="section" bg="#f5f5f5" py={{ base: "80px", md: "120px" }} minH="70vh">
        <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="500px" mx="auto" textAlign="center">
          <VStack gap={6}>
            <Heading
              as="h1"
              color="black"
              fontSize={{ base: "28px", md: "34px" }}
              fontWeight="600"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              Sign In Required
            </Heading>
            <Text color="blackAlpha.700" fontSize="15px">
              Please sign in to access your account dashboard.
            </Text>
            <Link href="/account/login" style={{ textDecoration: "none" }}>
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
              >
                Sign In
              </Button>
            </Link>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "80px" }} minH="70vh">
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="1200px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack align="stretch" gap={8}>
            {/* Header */}
            <Flex
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={4}
            >
              <VStack align="flex-start" gap={1}>
                <Heading
                  as="h1"
                  color="black"
                  fontSize={{ base: "28px", md: "36px" }}
                  fontWeight="600"
                  lineHeight="1.1"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Welcome back, {customerName}
                </Heading>
                <Text color="blackAlpha.600" fontSize="15px">
                  Manage your orders, subscriptions, and account settings
                </Text>
              </VStack>
              <Button
                variant="outline"
                color="blackAlpha.600"
                borderColor="blackAlpha.300"
                px={6}
                py={3}
                h="auto"
                fontSize="13px"
                fontWeight="600"
                borderRadius="full"
                _hover={{ bg: "blackAlpha.50", borderColor: "blackAlpha.400" }}
                onClick={() => {
                  // Sign out logic
                  window.location.href = "/account/login";
                }}
              >
                Sign Out
              </Button>
            </Flex>

            {/* Quick Stats */}
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              {[
                { label: "Total Orders", value: "2" },
                { label: "Active Subscriptions", value: "1" },
                { label: "Reward Points", value: "150" },
                { label: "Member Since", value: "Dec 2024" },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="blackAlpha.100"
                  p={4}
                  textAlign="center"
                >
                  <Text color="blackAlpha.500" fontSize="12px" fontWeight="500" textTransform="uppercase" letterSpacing="0.05em">
                    {stat.label}
                  </Text>
                  <Text color="black" fontSize="24px" fontWeight="700" mt={1}>
                    {stat.value}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            {/* Main Content Grid */}
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
              {/* Left Column */}
              <VStack align="stretch" gap={6}>
                {/* Recent Orders */}
                <DashboardCard
                  title="Recent Orders"
                  icon={
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  }
                  href="/account/orders"
                  linkText="View All"
                >
                  {mockOrders.length > 0 ? (
                    <VStack align="stretch" gap={3}>
                      {mockOrders.map((order) => (
                        <Flex
                          key={order.id}
                          justify="space-between"
                          align="center"
                          p={4}
                          bg="#f5f5f5"
                          borderRadius="xl"
                        >
                          <VStack align="flex-start" gap={1}>
                            <HStack gap={3}>
                              <Text color="black" fontSize="15px" fontWeight="600">
                                {order.orderNumber}
                              </Text>
                              <OrderStatusBadge status={order.status} />
                            </HStack>
                            <Text color="blackAlpha.600" fontSize="13px">
                              {order.date} • {order.items} items
                            </Text>
                          </VStack>
                          <Text color="black" fontSize="16px" fontWeight="700">
                            {order.total}
                          </Text>
                        </Flex>
                      ))}
                    </VStack>
                  ) : (
                    <Box textAlign="center" py={6}>
                      <Text color="blackAlpha.500" fontSize="14px">
                        No orders yet
                      </Text>
                      <Link href="/products" style={{ textDecoration: "none" }}>
                        <Button
                          mt={3}
                          size="sm"
                          bg="#3a1f87"
                          color="white"
                          borderRadius="full"
                          _hover={{ bg: "#2d1869" }}
                        >
                          Shop Now
                        </Button>
                      </Link>
                    </Box>
                  )}
                </DashboardCard>

                {/* Subscriptions */}
                <DashboardCard
                  title="Subscriptions"
                  icon={
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                  href="/account/subscriptions"
                  linkText="Manage"
                >
                  {mockSubscriptions.length > 0 ? (
                    <VStack align="stretch" gap={3}>
                      {mockSubscriptions.map((sub) => (
                        <Box
                          key={sub.id}
                          p={4}
                          bg="#f5f5f5"
                          borderRadius="xl"
                        >
                          <Flex justify="space-between" align="flex-start" mb={3}>
                            <VStack align="flex-start" gap={1}>
                              <Text color="black" fontSize="15px" fontWeight="600">
                                {sub.productName}
                              </Text>
                              <Text color="blackAlpha.600" fontSize="13px">
                                {sub.frequency}
                              </Text>
                            </VStack>
                            <SubscriptionStatusBadge status={sub.status} />
                          </Flex>
                          <Flex justify="space-between" align="center">
                            <Text color="blackAlpha.600" fontSize="13px">
                              Next delivery: {sub.nextDelivery}
                            </Text>
                            <Text color="#3a1f87" fontSize="15px" fontWeight="700">
                              {sub.price}
                            </Text>
                          </Flex>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Box textAlign="center" py={6}>
                      <Text color="blackAlpha.500" fontSize="14px">
                        No active subscriptions
                      </Text>
                      <Text color="blackAlpha.400" fontSize="12px" mt={1}>
                        Subscribe and save 10% on every order
                      </Text>
                      <Link href="/products" style={{ textDecoration: "none" }}>
                        <Button
                          mt={3}
                          size="sm"
                          bg="#3a1f87"
                          color="white"
                          borderRadius="full"
                          _hover={{ bg: "#2d1869" }}
                        >
                          Start Subscription
                        </Button>
                      </Link>
                    </Box>
                  )}
                </DashboardCard>
              </VStack>

              {/* Right Column */}
              <VStack align="stretch" gap={6}>
                {/* Account Settings */}
                <DashboardCard
                  title="Account"
                  icon={
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                >
                  <VStack align="stretch" gap={2}>
                    <Link href="/account/settings" style={{ textDecoration: "none" }}>
                      <Flex
                        align="center"
                        justify="space-between"
                        p={3}
                        borderRadius="lg"
                        _hover={{ bg: "#f5f5f5" }}
                        transition="background 0.2s"
                      >
                        <HStack gap={3}>
                          <Box color="blackAlpha.600">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </Box>
                          <Text color="black" fontSize="14px" fontWeight="500">
                            Profile Settings
                          </Text>
                        </HStack>
                        <Box color="blackAlpha.400">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Box>
                      </Flex>
                    </Link>

                    <Link href="/account/addresses" style={{ textDecoration: "none" }}>
                      <Flex
                        align="center"
                        justify="space-between"
                        p={3}
                        borderRadius="lg"
                        _hover={{ bg: "#f5f5f5" }}
                        transition="background 0.2s"
                      >
                        <HStack gap={3}>
                          <Box color="blackAlpha.600">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </Box>
                          <Text color="black" fontSize="14px" fontWeight="500">
                            Addresses
                          </Text>
                        </HStack>
                        <Box color="blackAlpha.400">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Box>
                      </Flex>
                    </Link>

                    <Link href="/account/payment" style={{ textDecoration: "none" }}>
                      <Flex
                        align="center"
                        justify="space-between"
                        p={3}
                        borderRadius="lg"
                        _hover={{ bg: "#f5f5f5" }}
                        transition="background 0.2s"
                      >
                        <HStack gap={3}>
                          <Box color="blackAlpha.600">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </Box>
                          <Text color="black" fontSize="14px" fontWeight="500">
                            Payment Methods
                          </Text>
                        </HStack>
                        <Box color="blackAlpha.400">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Box>
                      </Flex>
                    </Link>
                  </VStack>
                </DashboardCard>

                {/* Need Help */}
                <Box
                  bg="#3a1f87"
                  borderRadius="2xl"
                  p={{ base: 5, md: 6 }}
                  color="white"
                >
                  <VStack align="flex-start" gap={4}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="xl"
                      bg="whiteAlpha.200"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </Box>
                    <VStack align="flex-start" gap={2}>
                      <Heading
                        as="h3"
                        fontSize="18px"
                        fontWeight="600"
                        fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                      >
                        Need Help?
                      </Heading>
                      <Text fontSize="14px" color="whiteAlpha.800" lineHeight="1.6">
                        Our support team is here to help with any questions about your orders or subscriptions.
                      </Text>
                    </VStack>
                    <Link href="/contact" style={{ textDecoration: "none" }}>
                      <Button
                        bg="white"
                        color="#3a1f87"
                        px={6}
                        py={3}
                        h="auto"
                        fontSize="13px"
                        fontWeight="700"
                        borderRadius="full"
                        _hover={{ bg: "whiteAlpha.900" }}
                      >
                        Contact Support
                      </Button>
                    </Link>
                  </VStack>
                </Box>
              </VStack>
            </Grid>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  );
}
