"use client";

import Link from "next/link";
import { Box, Flex, Heading, Text, VStack, HStack, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ShopifyCustomer, ShopifyAddress } from "@/lib/shopify-customer";

interface AccountSettingsContentProps {
  customer: ShopifyCustomer;
}

function AddressCard({ address, isDefault }: { address: ShopifyAddress; isDefault?: boolean }) {
  const fullName = [address.firstName, address.lastName].filter(Boolean).join(" ");
  const addressLine = [address.address1, address.address2].filter(Boolean).join(", ");
  const cityStateZip = [
    address.city,
    address.provinceCode || address.province,
    address.zip,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Box
      p={4}
      bg="#f5f5f5"
      borderRadius="xl"
      border={isDefault ? "2px solid" : "1px solid"}
      borderColor={isDefault ? "#3a1f87" : "blackAlpha.100"}
      position="relative"
    >
      {isDefault && (
        <Box
          position="absolute"
          top={-2}
          right={3}
          bg="#3a1f87"
          color="white"
          px={2}
          py={0.5}
          borderRadius="full"
          fontSize="10px"
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          Default
        </Box>
      )}
      <VStack align="flex-start" gap={1}>
        {fullName && (
          <Text color="black" fontSize="14px" fontWeight="600">
            {fullName}
          </Text>
        )}
        {address.company && (
          <Text color="blackAlpha.600" fontSize="14px">
            {address.company}
          </Text>
        )}
        {addressLine && (
          <Text color="blackAlpha.700" fontSize="14px">
            {addressLine}
          </Text>
        )}
        {cityStateZip && (
          <Text color="blackAlpha.700" fontSize="14px">
            {cityStateZip}
          </Text>
        )}
        {address.country && (
          <Text color="blackAlpha.700" fontSize="14px">
            {address.country}
          </Text>
        )}
        {address.phone && (
          <Text color="blackAlpha.500" fontSize="13px" mt={1}>
            {address.phone}
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default function AccountSettingsContent({
  customer,
}: AccountSettingsContentProps) {
  const addresses = customer.addresses.edges.map((edge) => edge.node);
  const defaultAddressId = customer.defaultAddress?.id;

  return (
    <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "80px" }} minH="70vh">
      <Box px={{ base: "20px", md: "30px", lg: "50px" }} maxW="800px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack align="stretch" gap={6}>
            {/* Header */}
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
                Account Settings
              </Heading>
            </VStack>

            {/* Profile Information */}
            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="blackAlpha.100"
              p={{ base: 5, md: 6 }}
            >
              <VStack align="stretch" gap={5}>
                <Heading
                  as="h2"
                  color="black"
                  fontSize="18px"
                  fontWeight="600"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Profile Information
                </Heading>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Box>
                    <Text
                      color="blackAlpha.500"
                      fontSize="12px"
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      mb={1}
                    >
                      First Name
                    </Text>
                    <Text color="black" fontSize="15px">
                      {customer.firstName || "—"}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      color="blackAlpha.500"
                      fontSize="12px"
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      mb={1}
                    >
                      Last Name
                    </Text>
                    <Text color="black" fontSize="15px">
                      {customer.lastName || "—"}
                    </Text>
                  </Box>
                </Grid>

                <Box>
                  <Text
                    color="blackAlpha.500"
                    fontSize="12px"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    mb={1}
                  >
                    Email Address
                  </Text>
                  <Text color="black" fontSize="15px">
                    {customer.email}
                  </Text>
                </Box>

                <Box>
                  <Text
                    color="blackAlpha.500"
                    fontSize="12px"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    mb={1}
                  >
                    Phone Number
                  </Text>
                  <Text color="black" fontSize="15px">
                    {customer.phone || "—"}
                  </Text>
                </Box>

                <Box
                  p={4}
                  bg="#f5f5f5"
                  borderRadius="xl"
                  mt={2}
                >
                  <Flex align="center" gap={3}>
                    <Box color="blackAlpha.500">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </Box>
                    <Text color="blackAlpha.600" fontSize="13px">
                      To update your profile information, please visit your{" "}
                      <Text as="span" color="#3a1f87" fontWeight="600">
                        Shopify account settings
                      </Text>
                      .
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </Box>

            {/* Addresses */}
            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="blackAlpha.100"
              p={{ base: 5, md: 6 }}
            >
              <VStack align="stretch" gap={5}>
                <Heading
                  as="h2"
                  color="black"
                  fontSize="18px"
                  fontWeight="600"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Saved Addresses
                </Heading>

                {addresses.length > 0 ? (
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                    {addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        isDefault={address.id === defaultAddressId}
                      />
                    ))}
                  </Grid>
                ) : (
                  <Box
                    p={6}
                    bg="#f5f5f5"
                    borderRadius="xl"
                    textAlign="center"
                  >
                    <Text color="blackAlpha.600" fontSize="14px">
                      No addresses saved yet.
                    </Text>
                  </Box>
                )}

                <Box
                  p={4}
                  bg="#f5f5f5"
                  borderRadius="xl"
                >
                  <Flex align="center" gap={3}>
                    <Box color="blackAlpha.500">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </Box>
                    <Text color="blackAlpha.600" fontSize="13px">
                      To add or edit addresses, please visit your{" "}
                      <Text as="span" color="#3a1f87" fontWeight="600">
                        Shopify account settings
                      </Text>
                      .
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </Box>

            {/* Email Preferences Info */}
            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="blackAlpha.100"
              p={{ base: 5, md: 6 }}
            >
              <VStack align="stretch" gap={4}>
                <Heading
                  as="h2"
                  color="black"
                  fontSize="18px"
                  fontWeight="600"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Email Preferences
                </Heading>

                <VStack align="stretch" gap={3}>
                  <Flex
                    align="center"
                    justify="space-between"
                    p={4}
                    bg="#f5f5f5"
                    borderRadius="xl"
                  >
                    <VStack align="flex-start" gap={0}>
                      <Text color="black" fontSize="14px" fontWeight="600">
                        Order Updates
                      </Text>
                      <Text color="blackAlpha.600" fontSize="13px">
                        Shipping and delivery notifications
                      </Text>
                    </VStack>
                    <Box
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg="green.100"
                    >
                      <Text color="green.700" fontSize="12px" fontWeight="600">
                        Enabled
                      </Text>
                    </Box>
                  </Flex>

                  <Flex
                    align="center"
                    justify="space-between"
                    p={4}
                    bg="#f5f5f5"
                    borderRadius="xl"
                  >
                    <VStack align="flex-start" gap={0}>
                      <Text color="black" fontSize="14px" fontWeight="600">
                        Marketing & Promotions
                      </Text>
                      <Text color="blackAlpha.600" fontSize="13px">
                        Exclusive deals and new product announcements
                      </Text>
                    </VStack>
                    <Text color="blackAlpha.500" fontSize="12px">
                      Manage in Shopify
                    </Text>
                  </Flex>
                </VStack>
              </VStack>
            </Box>

            {/* Sign Out */}
            <Box textAlign="center" pt={4}>
              <Link href="/account/logout">
                <Text
                  fontSize="14px"
                  color="blackAlpha.500"
                  _hover={{ color: "#d40055" }}
                  transition="color 0.2s"
                  cursor="pointer"
                >
                  Sign out of your account
                </Text>
              </Link>
            </Box>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  );
}
