import { Metadata } from "next";
import { Box, Flex, Heading, Text, VStack, Container } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund & Return Policy | DATE",
  description:
    "Learn about DATE's refund and return policies. We want you to be completely satisfied with your purchase.",
  openGraph: {
    title: "Refund & Return Policy | DATE",
    description:
      "Learn about DATE's refund and return policies. We want you to be completely satisfied with your purchase.",
    type: "website",
  },
};

export default function RefundPolicyPage() {
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
                Refund & Return Policy
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
                {/* No Refunds Once Shipped */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    No Refunds Once Order is Shipped
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    Once your order has been confirmed and shipped, we are unable to process refunds.
                    This policy applies to all orders, including pre-orders. Please review your order
                    carefully before completing your purchase.
                  </Text>
                </Box>

                {/* Pre-Order Deposits */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Pre-Order Deposits
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    Pre-order deposits are fully refundable until your order is confirmed for shipment.
                    Once your pre-order transitions to a confirmed order and shipping is initiated,
                    the standard no-refund policy applies.
                  </Text>
                </Box>

                {/* Returns for Defective Products */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Returns for Defective Products Only
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8} mb={4}>
                    We only accept returns for products that are defective or damaged upon arrival.
                    Returns are not accepted for products that are not defective. To be eligible for
                    a return due to a defect:
                  </Text>
                  <VStack align="stretch" gap={2} pl={4}>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • You must contact us within 48 hours of receiving your order
                    </Text>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • You must provide photographic evidence of the defect
                    </Text>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • The product must be in its original packaging
                    </Text>
                    <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                      • Our team will review and approve the return request
                    </Text>
                  </VStack>
                </Box>

                {/* How to Request a Return */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    How to Request a Return
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    To initiate a return for a defective product, please email us at{" "}
                    <Text as="span" color="#d40055" fontWeight="600">
                      support@thedatedrink.com
                    </Text>{" "}
                    with the subject line "Defective Product Return" and include your order number,
                    description of the defect, and photos showing the issue.
                  </Text>
                </Box>

                {/* Shipping Costs */}
                <Box>
                  <Heading
                    as="h2"
                    fontSize="20px"
                    fontWeight="700"
                    color="black"
                    mb={3}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    Shipping Costs
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="15px" lineHeight={1.8}>
                    For approved returns of defective products, we will provide a prepaid return
                    shipping label. We will not be responsible for return shipping costs for
                    non-defective products or returns that do not meet our return criteria.
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
                    Questions?
                  </Heading>
                  <Text color="blackAlpha.700" fontSize="14px" lineHeight={1.7}>
                    If you have any questions about our refund and return policy, please contact us
                    at{" "}
                    <Text as="span" color="#d40055" fontWeight="600">
                      support@thedatedrink.com
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
