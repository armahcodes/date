import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProductByHandle, getProducts, formatPrice } from "@/lib/shopify";
import ProductDetails from "@/components/product/ProductDetails";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await getProducts(20);
    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;

  try {
    const product = await getProductByHandle(handle);

    if (!product) {
      return {
        title: "Product Not Found | DATE",
      };
    }

    const price = product.priceRange.minVariantPrice;
    const formattedPrice = formatPrice(price);

    return {
      title: `${product.title} | DATE`,
      description: product.description || `${product.title} - ${formattedPrice}. A restorative functional beverage crafted from antioxidant-rich upcycled date seeds.`,
      openGraph: {
        title: `${product.title} | DATE`,
        description: product.description || "A restorative functional beverage crafted from antioxidant-rich upcycled date seeds.",
        type: "website",
        images: product.featuredImage
          ? [
              {
                url: product.featuredImage.url,
                width: product.featuredImage.width,
                height: product.featuredImage.height,
                alt: product.featuredImage.altText || product.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.title} | DATE`,
        description: product.description || "A restorative functional beverage crafted from antioxidant-rich upcycled date seeds.",
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product | DATE",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;

  let product;
  try {
    product = await getProductByHandle(handle);
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <Box as="main" display="flex" flexDirection="column" w="full">
      <Header />

      <Box
        as="section"
        minH="100vh"
        bg="#f5f5f5"
        position="relative"
        overflow="hidden"
      >
        <Box
          px={{ base: "20px", md: "30px", lg: "50px" }}
          py={{ base: 10, md: 14, lg: 20 }}
          position="relative"
          maxW="1400px"
          mx="auto"
        >
          {/* Breadcrumb */}
          <Box as="nav" mb={{ base: 8, md: 10 }}>
            <HStack gap={3} fontSize="12px">
              <Link href="/">
                <Text
                  color="blackAlpha.500"
                  transition="color 0.2s"
                  _hover={{ color: "#d40055" }}
                >
                  Home
                </Text>
              </Link>
              <Box color="blackAlpha.300">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Box>
              <Link href="/products">
                <Text
                  color="blackAlpha.500"
                  transition="color 0.2s"
                  _hover={{ color: "#d40055" }}
                >
                  Shop
                </Text>
              </Link>
              <Box color="blackAlpha.300">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Box>
              <Text color="blackAlpha.700" fontWeight="500">
                {product.title}
              </Text>
            </HStack>
          </Box>

          <ProductDetails product={product} />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
