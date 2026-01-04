import { Metadata } from "next";
import { Flex, VStack } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalPageLayout, {
  LegalSection,
  LegalText,
  LegalList,
  LegalContactBox,
} from "@/components/legal/LegalPageLayout";

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

      <LegalPageLayout title="Refund & Return Policy" lastUpdated="December 25, 2024">
        <VStack align="stretch" gap={0}>
          <LegalSection title="No Refunds Once Order is Shipped">
            <LegalText>
              Once your order has been confirmed and shipped, we are unable to process refunds.
              This policy applies to all orders, including pre-orders. Please review your order
              carefully before completing your purchase.
            </LegalText>
          </LegalSection>

          <LegalSection title="Pre-Order Deposits">
            <LegalText>
              Pre-order deposits are fully refundable until your order is confirmed for shipment.
              Once your pre-order transitions to a confirmed order and shipping is initiated,
              the standard no-refund policy applies.
            </LegalText>
          </LegalSection>

          <LegalSection title="Returns for Defective Products Only">
            <LegalText>
              We only accept returns for products that are defective or damaged upon arrival.
              Returns are not accepted for products that are not defective. To be eligible for
              a return due to a defect:
            </LegalText>
            <LegalList
              items={[
                "You must contact us within 48 hours of receiving your order",
                "You must provide photographic evidence of the defect",
                "The product must be in its original packaging",
                "Our team will review and approve the return request",
              ]}
            />
          </LegalSection>

          <LegalSection title="How to Request a Return">
            <LegalText>
              To initiate a return for a defective product, please email us at support@thedatedrink.com
              with the subject line &quot;Defective Product Return&quot; and include your order number,
              description of the defect, and photos showing the issue.
            </LegalText>
          </LegalSection>

          <LegalSection title="Shipping Costs" isLast>
            <LegalText>
              For approved returns of defective products, we will provide a prepaid return
              shipping label. We will not be responsible for return shipping costs for
              non-defective products or returns that do not meet our return criteria.
            </LegalText>
          </LegalSection>

          <LegalContactBox
            title="Questions about returns?"
            email="support@thedatedrink.com"
            description="We're here to help with any questions about our refund policy."
          />
        </VStack>
      </LegalPageLayout>

      <Footer />
    </Flex>
  );
}
