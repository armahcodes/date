import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import ProductsGrid from "@/components/product/ProductsGrid";

export const metadata = {
  title: "Shop All Products | DATE",
  description: "Shop DATE functional beverages. Zero caffeine, zero sugar, with prebiotic fiber for your modern resilience.",
};

export default async function ProductsPage() {
  let products: ShopifyProduct[] = [];

  try {
    products = await getProducts(20);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <main className="flex w-full flex-col">
      <Header />

      <section className="color-scheme-1 min-h-screen relative overflow-hidden">
        {/* Ambient background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.02]"
            style={{
              background: "radial-gradient(circle, #d40055 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.02]"
            style={{
              background: "radial-gradient(circle, #3a1f87 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />
        </div>

        <div className="wrapper--full-padded py-16 md:py-24 relative">
          {/* Page Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#d40055]/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d40055]">
                Premium Collection
              </span>
              <span className="w-12 h-[1px] bg-[#d40055]/30" />
            </div>
            <h1
              className="text-black text-[42px] md:text-[56px] lg:text-[64px] font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Shop All Products
            </h1>
            <p className="text-black/50 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
              Discover the restorative power of DATE. Zero caffeine, zero sugar,
              crafted for your modern resilience.
            </p>

            {/* Pre-Order Notice */}
            <div className="inline-flex items-center gap-3 mt-8 px-5 py-3 bg-[#3a1f87]/5 rounded-full border border-[#3a1f87]/10">
              <div className="w-8 h-8 rounded-full bg-[#3a1f87] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[13px] text-black/70">
                <span className="font-semibold text-[#3a1f87]">Pre-order now</span> with a $5 refundable deposit
              </span>
            </div>
          </div>

          {/* Product Grid */}
          <ProductsGrid products={products} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
