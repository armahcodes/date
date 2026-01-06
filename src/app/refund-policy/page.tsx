import { Metadata } from "next";
import { Flex, VStack } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalPageLayout, {
  LegalSection,
  LegalText,
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

      <LegalPageLayout title="Refund & Return Policy" lastUpdated="January 6, 2025">
        <VStack align="stretch" gap={0}>
          <LegalSection title="Damages and Issues">
            <LegalText>
              Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
            </LegalText>
          </LegalSection>

          <LegalSection title="Returns & Refunds">
            <LegalText>
              We do not accept returns. We do, however, offer refunds for damaged or incorrect product.
            </LegalText>
            <LegalText>
              To be eligible for a refund, you must contact us at support@dateseedsoda.com within 10 days of delivery and provide the required photo documentation of the damaged or incorrect item(s) and the receipt or proof of purchase.
            </LegalText>
            <LegalText>
              To be eligible for a refund, your item must be in the same condition that you received it.
            </LegalText>
          </LegalSection>

          <LegalSection title="Refund Process" isLast>
            <LegalText>
              We will notify you once we&apos;ve received your refund request. If approved, you&apos;ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </LegalText>
            <LegalText>
              If more than 15 business days have passed since we&apos;ve approved your refund, please contact us at support@dateseedsoda.com.
            </LegalText>
          </LegalSection>

          <LegalContactBox
            title="Questions about refunds?"
            email="support@dateseedsoda.com"
            description="You can always contact us for any refund question."
          />
        </VStack>
      </LegalPageLayout>

      <Footer />
    </Flex>
  );
}
