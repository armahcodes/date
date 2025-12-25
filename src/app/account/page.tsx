import { redirect } from "next/navigation";
import Link from "next/link";
import { Box, Flex, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUser } from "@/lib/auth/server";

export const metadata = {
  title: "My Account | DATE",
  description: "Manage your DATE account, orders, and preferences.",
};

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const menuItems = [
    {
      title: "Orders",
      description: "View your order history and track deliveries",
      href: "/account/orders",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      title: "Subscriptions",
      description: "Manage your recurring orders",
      href: "/account/subscriptions",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
    },
    {
      title: "Settings",
      description: "Update your profile and preferences",
      href: "/account/settings",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <Box as="main" display="flex" flexDirection="column" minH="100vh">
      <Header />

      <Box flex={1} bg="#f5f5f5" py={{ base: 10, md: 16 }}>
        <Box
          maxW="1000px"
          mx="auto"
          px={{ base: "20px", md: "30px", lg: "50px" }}
        >
          {/* Welcome Header */}
          <VStack align="flex-start" gap={2} mb={10}>
            <Text
              fontSize="11px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="#d40055"
            >
              Welcome back
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "28px", md: "36px" }}
              fontWeight="700"
              color="black"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              {user.name || user.email}
            </Heading>
          </VStack>

          {/* Menu Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <Box
                  bg="white"
                  borderRadius="20px"
                  p={6}
                  border="1px solid"
                  borderColor="blackAlpha.50"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                    borderColor: "#3a1f87",
                  }}
                  cursor="pointer"
                  h="full"
                >
                  <Flex
                    w={12}
                    h={12}
                    borderRadius="14px"
                    bg="#3a1f87"
                    color="white"
                    align="center"
                    justify="center"
                    mb={4}
                  >
                    {item.icon}
                  </Flex>
                  <Heading
                    as="h3"
                    fontSize="18px"
                    fontWeight="700"
                    color="black"
                    mb={2}
                    fontFamily="var(--font-montserrat), Montserrat, sans-serif"
                  >
                    {item.title}
                  </Heading>
                  <Text fontSize="14px" color="blackAlpha.600" lineHeight={1.6}>
                    {item.description}
                  </Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>

          {/* Sign Out Link */}
          <Box mt={10} textAlign="center">
            <Link href="/auth/sign-out">
              <Text
                fontSize="14px"
                color="blackAlpha.500"
                _hover={{ color: "#d40055" }}
                transition="color 0.2s"
              >
                Sign out
              </Text>
            </Link>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
