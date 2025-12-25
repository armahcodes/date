"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShopifyProduct, ShopifyProductVariant, formatPrice, getFirstSellingPlan } from "@/lib/shopify";
import ProductForm from "./ProductForm";

interface ProductDetailsProps {
  product: ShopifyProduct;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Sensory profile data
const sensoryProfile = {
  aroma: "Classic cola spices including cinnamon and vanilla, complemented by roasted date seed brew and dark fruit notes.",
  flavor: "Opens with bold, classic cola characteristics that evolve into earthy, roasted date seed notes with a clean finish.",
  mouthfeel: "Crisp with vibrant carbonation, medium-bodied, refreshing, and non-sticky.",
};

// Key benefits pillars
const keyBenefits = [
  {
    title: "The Ultimate Upcycle",
    description: "We rescue discarded date seeds from waste streams, transforming them into functional beverages with a focus on sustainability.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: "Rich Roast, Crisp Finish",
    description: "Nutty date seed complexity meets refreshing carbonation for a craft-quality sparkling cola alternative.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Calm Vitality",
    description: "Naturally caffeine-free formulation that provides invigoration without stimulant-related crashes.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

// Quick benefits grid
const quickBenefits = [
  { label: "Zero Caffeine", description: "Natural energy without the jitters" },
  { label: "Zero Sugar", description: "Clean taste, no compromises" },
  { label: "Prebiotic Fiber", description: "Gut-friendly wellness" },
  { label: "Low Calorie", description: "Light and refreshing" },
  { label: "Non-GMO", description: "Pure, natural ingredients" },
  { label: "Upcycled Seeds", description: "Sustainability in every sip" },
];

// Shipping info
const shippingInfo = [
  { label: "Standard Shipping", value: "3-7 business days" },
  { label: "Free Shipping", value: "On orders over $50" },
  { label: "Expedited", value: "2-3 business days" },
  { label: "Processing", value: "1-2 business days" },
];

export default function ProductDetails({ product }: ProductDetailsProps) {
  const variants = product.variants.edges.map((edge) => edge.node);
  const firstVariant = variants[0];

  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    firstVariant || null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const images = product.images.edges.map((edge) => edge.node);

  // If no variants available, show error state
  if (!selectedVariant) {
    return (
      <div className="text-center py-12">
        <p className="text-black/60">This product is currently unavailable.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #d40055 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #3a1f87 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Product Section */}
      <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">
        {/* Product Images - Left Side */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Main Image */}
          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-3xl overflow-hidden group"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
            style={{
              background: "linear-gradient(145deg, #f8f6f3 0%, #ebe7e0 100%)",
            }}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-10">
              <div className="absolute top-4 left-4 w-8 h-[2px] bg-[#d40055]/20" />
              <div className="absolute top-4 left-4 w-[2px] h-8 bg-[#d40055]/20" />
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-10">
              <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-[#3a1f87]/20" />
              <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-[#3a1f87]/20" />
            </div>

            <AnimatePresence mode="wait">
              {images[selectedImageIndex] ? (
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: isImageHovered ? 1.05 : 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[selectedImageIndex].url}
                    alt={images[selectedImageIndex].altText || product.title}
                    fill
                    className="object-contain p-8 lg:p-12"
                    priority
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="text-7xl font-bold tracking-tighter"
                    style={{
                      color: "#3a1f87",
                      opacity: 0.1,
                      fontFamily: "var(--font-montserrat), Montserrat, sans-serif"
                    }}
                  >
                    DATE
                  </span>
                </div>
              )}
            </AnimatePresence>

            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute top-4 left-4 z-20"
            >
              <div className="px-3 py-1.5 bg-[#3a1f87] rounded-full">
                <span className="text-white text-[10px] font-bold uppercase tracking-[0.15em]">
                  6 x 12oz Cans
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-4 gap-3"
            >
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "ring-2 ring-[#d40055] ring-offset-2 ring-offset-[#f5f5f5]"
                      : "ring-1 ring-black/5 hover:ring-black/20"
                  }`}
                  style={{
                    background: "linear-gradient(145deg, #f8f6f3 0%, #ebe7e0 100%)",
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} thumbnail ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Product Info - Right Side */}
        <motion.div
          className="flex flex-col lg:py-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Product Title */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d40055]">
                Functional Beverage
              </span>
              <span className="w-8 h-[1px] bg-[#d40055]/30" />
            </div>
            <h1
              className="text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-black mb-5"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              {product.title}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <p className="text-black/70 text-[16px] md:text-[17px] leading-[1.8]">
              Experience balance—rich, smooth, and full of flavor, with notes that dance on your palate from the first sip to the last. Perfect for any time of day when you&apos;re seeking a little something extra.
            </p>
          </motion.div>

          {/* Pre-Order Notice */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8"
          >
            <div
              className="relative p-5 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #3a1f87 0%, #2d1869 100%)",
              }}
            >
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 border border-white/20 rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border border-white/20 rounded-full -translate-x-1/2 translate-y-1/2" />
              </div>

              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white text-[14px] font-bold uppercase tracking-[0.05em]">
                      Pre-Order Now
                    </h4>
                    <span className="px-2 py-0.5 bg-[#d40055] rounded-full text-[10px] font-bold text-white uppercase">
                      $5 Deposit
                    </span>
                  </div>
                  <p className="text-white/70 text-[13px] leading-relaxed">
                    Reserve your order with a $5 refundable deposit. Full payment collected when we launch. Be among the first to experience DATE.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Form (Variants, Quantity + Add to Cart) */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProductForm
              variants={variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              sellingPlanId={getFirstSellingPlan(product)?.id}
            />
          </motion.div>

          {/* Quick Benefits Grid */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {quickBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 rounded-xl bg-[#f5f2ec] border border-black/5"
              >
                <div className="w-5 h-5 rounded-full bg-[#d40055] flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-black text-[11px] font-semibold">{benefit.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Sensory Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mt-20 md:mt-28"
      >
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d40055]">
            Tasting Notes
          </span>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-black mt-3"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            Sensory Profile
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Aroma */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-[#f5f2ec] to-white border border-black/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#3a1f87] flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </div>
            <h3 className="text-black text-[18px] font-bold mb-2" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              Aroma
            </h3>
            <p className="text-black/60 text-[14px] leading-relaxed">
              {sensoryProfile.aroma}
            </p>
          </motion.div>

          {/* Flavor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-[#f5f2ec] to-white border border-black/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#d40055] flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <h3 className="text-black text-[18px] font-bold mb-2" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              Flavor
            </h3>
            <p className="text-black/60 text-[14px] leading-relaxed">
              {sensoryProfile.flavor}
            </p>
          </motion.div>

          {/* Mouthfeel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-[#f5f2ec] to-white border border-black/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#3a1f87] flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
            <h3 className="text-black text-[18px] font-bold mb-2" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              Mouthfeel
            </h3>
            <p className="text-black/60 text-[14px] leading-relaxed">
              {sensoryProfile.mouthfeel}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Key Benefits Pillars */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mt-20 md:mt-28"
      >
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d40055]">
            What Sets Us Apart
          </span>
          <h2
            className="text-[28px] md:text-[36px] font-bold text-black mt-3"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            The DATE Difference
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {keyBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3a1f87] to-[#2d1869] flex items-center justify-center mb-6 text-white">
                {benefit.icon}
              </div>
              <h3
                className="text-black text-[20px] font-bold mb-3"
                style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
              >
                {benefit.title}
              </h3>
              <p className="text-black/60 text-[15px] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Shipping Information */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mt-20 md:mt-28 p-8 md:p-10 rounded-3xl bg-[#f5f2ec] border border-black/5"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d40055]">
              Delivery
            </span>
            <h2
              className="text-[24px] md:text-[28px] font-bold text-black mt-2"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Shipping Information
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {shippingInfo.map((info, index) => (
              <div key={index} className="text-center md:text-left">
                <p className="text-black/50 text-[12px] uppercase tracking-wide mb-1">{info.label}</p>
                <p className="text-black text-[14px] font-semibold">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap items-center justify-center md:justify-start gap-6 text-black/50 text-[13px]">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#3a1f87]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#3a1f87]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#3a1f87]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span>Easy returns within 30 days</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
