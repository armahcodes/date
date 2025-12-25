"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Flex, Heading, Text, VStack, HStack, Input, Button, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function AccountSettings() {
  const [profile, setProfile] = useState<CustomerProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileSuccess(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordSuccess(false);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    // Would integrate with Shopify Customer Account API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsUpdatingProfile(false);
    setProfileSuccess(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }

    setIsUpdatingPassword(true);

    // Would integrate with Shopify Customer Account API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsUpdatingPassword(false);
    setPasswordSuccess(true);
    setPasswords({ current: "", new: "", confirm: "" });
  };

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
                <Flex justify="space-between" align="center">
                  <Heading
                    as="h2"
                    color="black"
                    fontSize="18px"
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Profile Information
                  </Heading>
                  {profileSuccess && (
                    <HStack gap={2} color="green.600">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <Text fontSize="13px" fontWeight="500">Saved</Text>
                    </HStack>
                  )}
                </Flex>

                <VStack as="form" onSubmit={handleProfileSubmit} gap={4} align="stretch">
                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                    <Box>
                      <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                        First Name
                      </Text>
                      <Input
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        placeholder="First name"
                        bg="#f5f5f5"
                        border="1px solid"
                        borderColor="blackAlpha.200"
                        borderRadius="lg"
                        px={4}
                        py={3}
                        h="auto"
                        fontSize="15px"
                        _placeholder={{ color: "blackAlpha.400" }}
                        _focus={{ borderColor: "#3a1f87", outline: "none" }}
                      />
                    </Box>
                    <Box>
                      <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                        Last Name
                      </Text>
                      <Input
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        placeholder="Last name"
                        bg="#f5f5f5"
                        border="1px solid"
                        borderColor="blackAlpha.200"
                        borderRadius="lg"
                        px={4}
                        py={3}
                        h="auto"
                        fontSize="15px"
                        _placeholder={{ color: "blackAlpha.400" }}
                        _focus={{ borderColor: "#3a1f87", outline: "none" }}
                      />
                    </Box>
                  </Grid>

                  <Box>
                    <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                      Email Address
                    </Text>
                    <Input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      placeholder="your@email.com"
                      bg="#f5f5f5"
                      border="1px solid"
                      borderColor="blackAlpha.200"
                      borderRadius="lg"
                      px={4}
                      py={3}
                      h="auto"
                      fontSize="15px"
                      _placeholder={{ color: "blackAlpha.400" }}
                      _focus={{ borderColor: "#3a1f87", outline: "none" }}
                    />
                  </Box>

                  <Box>
                    <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                      Phone Number
                    </Text>
                    <Input
                      name="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      placeholder="(555) 123-4567"
                      bg="#f5f5f5"
                      border="1px solid"
                      borderColor="blackAlpha.200"
                      borderRadius="lg"
                      px={4}
                      py={3}
                      h="auto"
                      fontSize="15px"
                      _placeholder={{ color: "blackAlpha.400" }}
                      _focus={{ borderColor: "#3a1f87", outline: "none" }}
                    />
                  </Box>

                  <Flex justify="flex-end" pt={2}>
                    <Button
                      type="submit"
                      bg="#3a1f87"
                      color="white"
                      px={6}
                      py={3}
                      h="auto"
                      fontSize="14px"
                      fontWeight="600"
                      borderRadius="full"
                      _hover={{ bg: "#2d1869" }}
                      _disabled={{ opacity: 0.7, cursor: "not-allowed" }}
                      disabled={isUpdatingProfile}
                    >
                      {isUpdatingProfile ? "Saving..." : "Save Changes"}
                    </Button>
                  </Flex>
                </VStack>
              </VStack>
            </Box>

            {/* Change Password */}
            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="blackAlpha.100"
              p={{ base: 5, md: 6 }}
            >
              <VStack align="stretch" gap={5}>
                <Flex justify="space-between" align="center">
                  <Heading
                    as="h2"
                    color="black"
                    fontSize="18px"
                    fontWeight="600"
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Change Password
                  </Heading>
                  {passwordSuccess && (
                    <HStack gap={2} color="green.600">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <Text fontSize="13px" fontWeight="500">Updated</Text>
                    </HStack>
                  )}
                </Flex>

                <VStack as="form" onSubmit={handlePasswordSubmit} gap={4} align="stretch">
                  <Box>
                    <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                      Current Password
                    </Text>
                    <Input
                      name="current"
                      type="password"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      required
                      bg="#f5f5f5"
                      border="1px solid"
                      borderColor="blackAlpha.200"
                      borderRadius="lg"
                      px={4}
                      py={3}
                      h="auto"
                      fontSize="15px"
                      _placeholder={{ color: "blackAlpha.400" }}
                      _focus={{ borderColor: "#3a1f87", outline: "none" }}
                    />
                  </Box>

                  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                    <Box>
                      <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                        New Password
                      </Text>
                      <Input
                        name="new"
                        type="password"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        bg="#f5f5f5"
                        border="1px solid"
                        borderColor="blackAlpha.200"
                        borderRadius="lg"
                        px={4}
                        py={3}
                        h="auto"
                        fontSize="15px"
                        _placeholder={{ color: "blackAlpha.400" }}
                        _focus={{ borderColor: "#3a1f87", outline: "none" }}
                      />
                    </Box>
                    <Box>
                      <Text color="black" fontSize="13px" fontWeight="600" mb={2}>
                        Confirm New Password
                      </Text>
                      <Input
                        name="confirm"
                        type="password"
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        bg="#f5f5f5"
                        border="1px solid"
                        borderColor="blackAlpha.200"
                        borderRadius="lg"
                        px={4}
                        py={3}
                        h="auto"
                        fontSize="15px"
                        _placeholder={{ color: "blackAlpha.400" }}
                        _focus={{ borderColor: "#3a1f87", outline: "none" }}
                      />
                    </Box>
                  </Grid>

                  <Flex justify="flex-end" pt={2}>
                    <Button
                      type="submit"
                      bg="#3a1f87"
                      color="white"
                      px={6}
                      py={3}
                      h="auto"
                      fontSize="14px"
                      fontWeight="600"
                      borderRadius="full"
                      _hover={{ bg: "#2d1869" }}
                      _disabled={{ opacity: 0.7, cursor: "not-allowed" }}
                      disabled={isUpdatingPassword}
                    >
                      {isUpdatingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </Flex>
                </VStack>
              </VStack>
            </Box>

            {/* Email Preferences */}
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
                        Receive shipping and delivery notifications
                      </Text>
                    </VStack>
                    <Box
                      w={12}
                      h={7}
                      borderRadius="full"
                      bg="#3a1f87"
                      position="relative"
                      cursor="pointer"
                    >
                      <Box
                        position="absolute"
                        right={1}
                        top="50%"
                        transform="translateY(-50%)"
                        w={5}
                        h={5}
                        borderRadius="full"
                        bg="white"
                        shadow="sm"
                      />
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
                        Subscription Reminders
                      </Text>
                      <Text color="blackAlpha.600" fontSize="13px">
                        Get notified before your subscription renews
                      </Text>
                    </VStack>
                    <Box
                      w={12}
                      h={7}
                      borderRadius="full"
                      bg="#3a1f87"
                      position="relative"
                      cursor="pointer"
                    >
                      <Box
                        position="absolute"
                        right={1}
                        top="50%"
                        transform="translateY(-50%)"
                        w={5}
                        h={5}
                        borderRadius="full"
                        bg="white"
                        shadow="sm"
                      />
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
                    <Box
                      w={12}
                      h={7}
                      borderRadius="full"
                      bg="blackAlpha.200"
                      position="relative"
                      cursor="pointer"
                    >
                      <Box
                        position="absolute"
                        left={1}
                        top="50%"
                        transform="translateY(-50%)"
                        w={5}
                        h={5}
                        borderRadius="full"
                        bg="white"
                        shadow="sm"
                      />
                    </Box>
                  </Flex>
                </VStack>
              </VStack>
            </Box>

            {/* Danger Zone */}
            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="red.200"
              p={{ base: 5, md: 6 }}
            >
              <VStack align="stretch" gap={4}>
                <Heading
                  as="h2"
                  color="red.600"
                  fontSize="18px"
                  fontWeight="600"
                  fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                >
                  Danger Zone
                </Heading>

                <Flex
                  align="center"
                  justify="space-between"
                  p={4}
                  bg="red.50"
                  borderRadius="xl"
                  gap={4}
                  flexWrap="wrap"
                >
                  <VStack align="flex-start" gap={0}>
                    <Text color="black" fontSize="14px" fontWeight="600">
                      Delete Account
                    </Text>
                    <Text color="blackAlpha.600" fontSize="13px">
                      Permanently delete your account and all data
                    </Text>
                  </VStack>
                  <Button
                    variant="outline"
                    color="red.600"
                    borderColor="red.300"
                    borderRadius="full"
                    px={4}
                    py={2}
                    h="auto"
                    fontSize="13px"
                    fontWeight="600"
                    _hover={{ bg: "red.600", color: "white", borderColor: "red.600" }}
                    onClick={() => {
                      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                        // Would integrate with Shopify Customer Account API
                        console.log("Delete account");
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </Flex>
              </VStack>
            </Box>
          </VStack>
        </motion.div>
      </Box>
    </Box>
  );
}
