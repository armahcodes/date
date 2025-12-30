"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";

interface ProductsGridProps {
  products: ShopifyProduct[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-50px" });

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center">
          <svg className="w-10 h-10 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-black/50 text-[16px]">No products available at the moment.</p>
        <p className="text-black/30 text-[14px] mt-2">Check back soon for new arrivals.</p>
      </motion.div>
    );
  }

  return (
    <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10">
      {products.map((product, index) => {
        const price = product.priceRange.minVariantPrice;
        const comparePrice = product.variants.edges[0]?.node?.compareAtPrice;
        const hasDiscount = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/products/${product.handle}`}
              className="group block"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-shadow duration-500"
              >
                {/* Product Image */}
                <div
                  className="relative aspect-square overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, #f8f6f3 0%, #ebe7e0 100%)",
                  }}
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-3 left-3 w-6 h-6 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#d40055]/30" />
                    <div className="absolute top-0 left-0 w-[1.5px] h-4 bg-[#d40055]/30" />
                  </div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 right-0 w-4 h-[1.5px] bg-[#3a1f87]/30" />
                    <div className="absolute bottom-0 right-0 w-[1.5px] h-4 bg-[#3a1f87]/30" />
                  </div>

                  {product.featuredImage ? (
                    <div className="relative w-full h-full p-8 lg:p-10">
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        className="text-5xl font-bold tracking-tighter opacity-10"
                        style={{
                          color: "#3a1f87",
                          fontFamily: "var(--font-montserrat), Montserrat, sans-serif"
                        }}
                      >
                        DATE
                      </span>
                    </div>
                  )}

                  {/* Sale Badge */}
                  {hasDiscount && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="absolute top-4 left-4 z-20"
                    >
                      <div className="px-3 py-1.5 bg-[#d40055] text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-full shadow-lg shadow-[#d40055]/30">
                        Sale
                      </div>
                    </motion.div>
                  )}

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <span className="px-6 py-2.5 bg-white text-black text-[12px] font-bold uppercase tracking-[0.1em] rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2
                      className="text-black text-[18px] md:text-[20px] font-semibold leading-tight group-hover:text-[#d40055] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                    >
                      {product.title}
                    </h2>
                  </div>

                  <p className="text-black/50 text-[13px] md:text-[14px] leading-relaxed mb-5 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-black text-[22px] font-bold tracking-tight">
                        {formatPrice(price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-black/30 text-[14px] line-through">
                          {formatPrice(comparePrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[#d40055] group-hover:text-[#b30048] transition-colors">
                      <span className="text-[12px] font-bold uppercase tracking-[0.1em]">Shop</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
