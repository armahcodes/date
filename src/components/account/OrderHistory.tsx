"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Heading, Text, VStack, HStack, Button, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "processing" | "shipped" | "in_transit" | "delivered" | "cancelled";
  total: string;
  subtotal: string;
  shipping: string;
  tax: string;
  items: OrderItem[];
  trackingNumber?: string;
  trackingUrl?: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

// Mock data - will be replaced with Shopify Customer API
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1002",
    date: "December 20, 2024",
    status: "in_transit",
    total: "$105.34",
    subtotal: "$95.76",
    shipping: "$0.00",
    tax: "$9.58",
    trackingNumber: "1Z999AA10123456784",
    trackingUrl: "https://www.ups.com/track",
    items: [
      {
        id: "1",
        name: "Superior Cola 12-Pack",
        quantity: 2,
        price: "$47.88",
        image: "https://jveysj-j1.myshopify.com/cdn/shop/files/product-main.png?v=1736903700&width=800",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
    },
  },
  {
    id: "2",
    orderNumber: "#1001",
    date: "December 15, 2024",
    status: "delivered",
    total: "$52.67",
    subtotal: "$47.88",
    shipping: "$0.00",
    tax: "$4.79",
    items: [
      {
        id: "1",
        name: "Superior Cola 12-Pack",
        quantity: 1,
        price: "$47.88",
        image: "https://jveysj-j1.myshopify.com/cdn/shop/files/product-main.png?v=1736903700&width=800",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
    },
  },
];

function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const getStatusConfig = () => {
    switch (status) {
      case "processing":
        return { bg: "yellow.100", color: "yellow.700", label: "Processing" };
      case "shipped":
        return { bg: "blue.100", color: "blue.700", label: "Shipped" };
      case "in_transit":
        return { bg: "blue.100", color: "blue.700", label: "In Transit" };
      case "delivered":
        return { bg: "green.100", color: "green.700", label: "Delivered" };
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

function OrderCard({ order, isExpanded, onToggle }: { order: Order; isExpanded: boolean; onToggle: () => void }) {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      border="1px solid"
      borderColor="blackAlpha.100"
      overflow="hidden"
    >
      {/* Order Header */}
      <Flex
        p={{ base: 4, md: 6 }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        cursor="pointer"
        onClick={onToggle}
        _hover={{ bg: "blackAlpha.50" }}
        transition="background 0.2s"
      >
        <VStack align="flex-start" gap={2}>
          <HStack gap={3} flexWrap="wrap">
            <Text color="black" fontSize="18px" fontWeight="700">
              Order {order.orderNumber}
            </Text>
            <OrderStatusBadge status={order.status} />
          </HStack>
          <Text color="blackAlpha.600" fontSize="14px">
            Placed on {order.date} • {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
          </Text>
        </VStack>

        <HStack gap={4}>
          <Text color="black" fontSize="20px" fontWeight="700">
            {order.total}
          </Text>
          <Box
            color="blackAlpha.400"
            transition="transform 0.2s"
            transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Box>
        </HStack>
      </Flex>

      {/* Order Details (Expandable) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box borderTop="1px solid" borderColor="blackAlpha.100" p={{ base: 4, md: 6 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
              {/* Left - Items */}
              <VStack align="stretch" gap={4}>
                <Text color="black" fontSize="14px" fontWeight="700" textTransform="uppercase" letterSpacing="0.05em">
                  Items
                </Text>
                {order.items.map((item) => (
                  <Flex key={item.id} gap={4}>
                    <Box
                      w="80px"
                      h="80px"
                      borderRadius="lg"
                      overflow="hidden"
                      bg="#f5f5f5"
                      flexShrink={0}
                      position="relative"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <VStack align="flex-start" justify="center" gap={1}>
                      <Text color="black" fontSize="15px" fontWeight="600">
                        {item.name}
                      </Text>
                      <Text color="blackAlpha.600" fontSize="13px">
                        Qty: {item.quantity} × {item.price}
                      </Text>
                    </VStack>
                  </Flex>
                ))}

                {/* Order Summary */}
                <Box pt={4} borderTop="1px solid" borderColor="blackAlpha.100">
                  <VStack align="stretch" gap={2}>
                    <Flex justify="space-between">
                      <Text color="blackAlpha.600" fontSize="14px">Subtotal</Text>
                      <Text color="black" fontSize="14px">{order.subtotal}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="blackAlpha.600" fontSize="14px">Shipping</Text>
                      <Text color="black" fontSize="14px">{order.shipping === "$0.00" ? "Free" : order.shipping}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="blackAlpha.600" fontSize="14px">Tax</Text>
                      <Text color="black" fontSize="14px">{order.tax}</Text>
                    </Flex>
                    <Flex justify="space-between" pt={2} borderTop="1px solid" borderColor="blackAlpha.100">
                      <Text color="black" fontSize="15px" fontWeight="700">Total</Text>
                      <Text color="black" fontSize="15px" fontWeight="700">{order.total}</Text>
                    </Flex>
                  </VStack>
                </Box>
              </VStack>

              {/* Right - Shipping Info */}
              <VStack align="stretch" gap={6}>
                {/* Shipping Address */}
                <Box>
                  <Text color="black" fontSize="14px" fontWeight="700" textTransform="uppercase" letterSpacing="0.05em" mb={3}>
                    Shipping Address
                  </Text>
                  <Box p={4} bg="#f5f5f5" borderRadius="xl">
                    <VStack align="flex-start" gap={1}>
                      <Text color="black" fontSize="14px" fontWeight="600">
                        {order.shippingAddress.name}
                      </Text>
                      <Text color="blackAlpha.700" fontSize="14px">
                        {order.shippingAddress.address}
                      </Text>
                      <Text color="blackAlpha.700" fontSize="14px">
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                      </Text>
                    </VStack>
                  </Box>
                </Box>

                {/* Tracking */}
                {order.trackingNumber && (
                  <Box>
                    <Text color="black" fontSize="14px" fontWeight="700" textTransform="uppercase" letterSpacing="0.05em" mb={3}>
                      Tracking
                    </Text>
                    <Box p={4} bg="#f5f5f5" borderRadius="xl">
                      <VStack align="flex-start" gap={3}>
                        <Text color="blackAlpha.700" fontSize="14px">
                          Tracking #: <Text as="span" color="black" fontWeight="600">{order.trackingNumber}</Text>
                        </Text>
                        {order.trackingUrl && (
                          <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <Button
                              size="sm"
                              bg="#3a1f87"
                              color="white"
                              borderRadius="full"
                              px={4}
                              _hover={{ bg: "#2d1869" }}
                            >
                              Track Package
                            </Button>
                          </a>
                        )}
                      </VStack>
                    </Box>
                  </Box>
                )}

                {/* Actions */}
                <HStack gap={3} flexWrap="wrap">
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
                    View Invoice
                  </Button>
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
                </HStack>
              </VStack>
            </SimpleGrid>
          </Box>
        </motion.div>
      )}
    </Box>
  );
}

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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
            <Flex justify="space-between" align="center">
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
                  Order History
                </Heading>
              </VStack>
            </Flex>

            {/* Orders List */}
            {mockOrders.length > 0 ? (
              <VStack align="stretch" gap={4}>
                {mockOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isExpanded={expandedOrder === order.id}
                    onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
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
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </Box>
                  <Heading
                    as="h2"
                    color="black"
                    fontSize="22px"
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    No Orders Yet
                  </Heading>
                  <Text color="blackAlpha.600" fontSize="15px" maxW="300px">
                    Looks like you haven&apos;t placed any orders. Start shopping to see your orders here.
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
                      Shop Now
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
