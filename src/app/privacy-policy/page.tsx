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

      <LegalPageLayout title="Privacy Policy" lastUpdated="December 25, 2024">
        <VStack align="stretch" gap={0}>
          <LegalSection title="Introduction">
            <LegalText>
              DATE (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when
              you visit our website or make a purchase from us.
            </LegalText>
          </LegalSection>

          <LegalSection title="Information We Collect">
            <LegalText>
              We may collect information about you in a variety of ways:
            </LegalText>
            <VStack align="stretch" gap={4} mt={4}>
              <LegalSection title="Personal Data" isLast>
                <LegalText>
                  Name, email address, shipping address, billing address, phone number, and
                  payment information when you make a purchase or create an account.
                </LegalText>
              </LegalSection>
              <LegalSection title="Automatically Collected Data" isLast>
                <LegalText>
                  IP address, browser type, operating system, access times, and pages viewed
                  when you visit our site.
                </LegalText>
              </LegalSection>
            </VStack>
          </LegalSection>

          <LegalSection title="How We Use Your Information">
            <LegalText>
              We use the information we collect to:
            </LegalText>
            <LegalList
              items={[
                "Process and fulfill your orders",
                "Send you order confirmations and shipping updates",
                "Communicate with you about products, promotions, and updates",
                "Improve our website and customer experience",
                "Prevent fraudulent transactions and protect against errors",
              ]}
            />
          </LegalSection>

          <LegalSection title="Sharing Your Information">
            <LegalText>
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information with trusted third-party service providers who assist us in
              operating our website, processing payments, and fulfilling orders. These providers
              are bound by confidentiality agreements and are only permitted to use your
              information as necessary to provide their services.
            </LegalText>
          </LegalSection>

          <LegalSection title="Data Security">
            <LegalText>
              We implement appropriate security measures to protect your personal information
              from unauthorized access, alteration, disclosure, or destruction. All payment
              transactions are processed through secure, encrypted connections.
            </LegalText>
          </LegalSection>

          <LegalSection title="Cookies">
            <LegalText>
              We use cookies and similar tracking technologies to enhance your browsing
              experience, analyze site traffic, and understand where our visitors come from.
              You can control cookie settings through your browser preferences.
            </LegalText>
          </LegalSection>

          <LegalSection title="Your Rights">
            <LegalText>
              You have the right to access, correct, or delete your personal information.
              You may also opt out of marketing communications at any time by clicking the
              unsubscribe link in our emails or contacting us directly.
            </LegalText>
          </LegalSection>

          <LegalSection title="Changes to This Policy" isLast>
            <LegalText>
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the &quot;Last
              updated&quot; date.
            </LegalText>
          </LegalSection>

          <LegalContactBox
            title="Questions about your privacy?"
            email="support@dateseedsoda.com"
            description="We're here to help with any privacy-related concerns."
          />
        </VStack>
      </LegalPageLayout>

      <Footer />
    </Flex>
  );
}
