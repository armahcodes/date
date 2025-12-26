import { Metadata } from "next";
import { Box, Flex, Heading, Text, VStack, Container } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | DATE",
  description:
    "Learn how DATE collects, uses, and protects your personal information. Your privacy is important to us.",
  openGraph: {
    title: "Privacy Policy | DATE",
    description:
      "Learn how DATE collects, uses, and protects your personal information. Your privacy is important to us.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />

      <Box as="section" bg="#f5f5f5" py={{ base: "60px", md: "80px" }} minH="70vh">
        <Container maxW="800px" px={{ base: "20px", md: "30px" }}>
          <VStack align="stretch" gap={8}>
            {/* Header */}
            <VStack align="flex-start" gap={3}>
              <Text
                fontSize="11px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.2em"
                color="#d40055"
              >
                Legal
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: "32px", md: "42px" }}
                fontWeight="700"
                lineHeight={1.1}
                color="black"
                fontFamily="var(--font-montserrat), Montserrat, sans-serif"
              >
                Privacy Policy
              </Heading>
              <Text color="blackAlpha.600" fontSize="14px">
                Last updated: December 25, 2024
              </Text>
            </VStack>

            {/* Content */}
            <Box
              bg="white"
              borderRadius="24px"
              p={{ base: 6, md: 8 }}
              border="1px solid"
              borderColor="blackAlpha.100"
            >
              <VStack align="stretch" gap={8}>
                {/* Introduction */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Introduction
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    DATE ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard your information when
                    you visit our website or make a purchase from us.
                  </Text>
                </Box>

                {/* Information We Collect */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Information We Collect
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8} mb={4}>
                    We may collect information about you in a variety of ways:
                  </Text>
                  <VStack align="stretch" gap={4}>
                    <Box>
                      <Text color="black" fontSize="15px" fontWeight="600" mb={1}>
                        Personal Data
                      </Text>
                      <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                        Name, email address, shipping address, billing address, phone number, and
                        payment information when you make a purchase or create an account.
                      </Text>
                    </Box>
                    <Box>
                      <Text color="black" fontSize="15px" fontWeight="600" mb={1}>
                        Automatically Collected Data
                      </Text>
                      <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                        IP address, browser type, operating system, access times, and pages viewed
                        when you visit our site.
                      </Text>
                    </Box>
                  </VStack>
                </Box>

                {/* How We Use Your Information */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    How We Use Your Information
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8} mb={4}>
                    We use the information we collect to:
                  </Text>
                  <VStack align="stretch" gap={2} pl={4}>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • Process and fulfill your orders
                    </Text>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • Send you order confirmations and shipping updates
                    </Text>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • Communicate with you about products, promotions, and updates
                    </Text>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • Improve our website and customer experience
                    </Text>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • Prevent fraudulent transactions and protect against errors
                    </Text>
                  </VStack>
                </Box>

                {/* Sharing Your Information */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Sharing Your Information
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    We do not sell, trade, or rent your personal information to third parties. We may
                    share your information with trusted third-party service providers who assist us in
                    operating our website, processing payments, and fulfilling orders. These providers
                    are bound by confidentiality agreements and are only permitted to use your
                    information as necessary to provide their services.
                  </Text>
                </Box>

                {/* Data Security */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Data Security
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    We implement appropriate security measures to protect your personal information
                    from unauthorized access, alteration, disclosure, or destruction. All payment
                    transactions are processed through secure, encrypted connections.
                  </Text>
                </Box>

                {/* Cookies */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Cookies
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    We use cookies and similar tracking technologies to enhance your browsing
                    experience, analyze site traffic, and understand where our visitors come from.
                    You can control cookie settings through your browser preferences.
                  </Text>
                </Box>

                {/* Your Rights */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Your Rights
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    You have the right to access, correct, or delete your personal information.
                    You may also opt out of marketing communications at any time by clicking the
                    unsubscribe link in our emails or contacting us directly.
                  </Text>
                </Box>

                {/* Changes to This Policy */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Changes to This Policy
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    We may update this Privacy Policy from time to time. We will notify you of any
                    changes by posting the new Privacy Policy on this page and updating the "Last
                    updated" date.
                  </Text>
                </Box>

                {/* Contact Us */}
                <Box
                  p={5}
                  bg="#f5f5f5"
                  borderRadius="16px"
                >
                  <Heading
                    as="h2"
                    fontSize="18px"
                    fontWeight="700"
                    color="black"
                    mb={2}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Contact Us
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="14px" lineHeight={1.7}>
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <Text as="span" color="#d40055" fontWeight="600">
                      privacy@thedatedrink.com
                    </Text>
                  </Text>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Flex>
  );
}
