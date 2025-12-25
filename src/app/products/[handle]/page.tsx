import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
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
    <main className="flex w-full flex-col">
      <Header />

      <section className="color-scheme-1 min-h-screen relative overflow-hidden">
        {/* Subtle ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-[0.015]"
            style={{
              background: "radial-gradient(circle, #d40055 0%, transparent 60%)",
              transform: "translate(20%, -20%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.015]"
            style={{
              background: "radial-gradient(circle, #3a1f87 0%, transparent 60%)",
              transform: "translate(-20%, 20%)",
            }}
          />
        </div>

        <div className="wrapper--full-padded py-10 md:py-16 lg:py-20 relative">
          {/* Breadcrumb */}
          <nav className="mb-8 md:mb-12">
            <ol className="flex items-center gap-3 text-[12px]">
              <li>
                <Link
                  href="/"
                  className="text-black/40 hover:text-[#d40055] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li className="text-black/20">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-black/40 hover:text-[#d40055] transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
              <li className="text-black/20">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </li>
              <li className="text-black/70 font-medium">{product.title}</li>
            </ol>
          </nav>

          <ProductDetails product={product} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
