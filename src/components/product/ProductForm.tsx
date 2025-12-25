"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShopifyProductVariant, formatPrice } from "@/lib/shopify";

interface ProductFormProps {
  variants: ShopifyProductVariant[];
  selectedVariant: ShopifyProductVariant;
  onVariantChange: (variant: ShopifyProductVariant) => void;
  sellingPlanId?: string | null;
}

export default function ProductForm({ variants, selectedVariant, onVariantChange, sellingPlanId }: ProductFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const { addItem } = useCart();

  const hasMultipleVariants = variants.length > 1;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant.availableForSale) return;

    setIsAdding(true);
    setError(null);

    try {
      // Pass selling plan ID for pre-order products
      await addItem(selectedVariant.id, quantity, sellingPlanId || undefined);
      setQuantity(1);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const price = parseFloat(selectedVariant.price.amount);
  const compareAtPrice = selectedVariant.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : null;
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

  // Extract numeric variant ID from Shopify GID (e.g., "gid://shopify/ProductVariant/123456" -> "123456")
  const variantNumericId = selectedVariant.id.split("/").pop() || selectedVariant.id;

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="flex items-baseline gap-4">
        <motion.span
          key={selectedVariant.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-black text-[36px] md:text-[42px] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          {formatPrice(selectedVariant.price)}
        </motion.span>
        {hasDiscount && (
          <>
            <span className="text-black/30 text-[20px] line-through">
              {formatPrice(selectedVariant.compareAtPrice!)}
            </span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-1.5 bg-[#d40055] text-white text-[11px] font-bold uppercase tracking-wider rounded-full"
            >
              Save {discountPercentage}%
            </motion.span>
          </>
        )}
      </div>

      {/* Variant Selector */}
      {hasMultipleVariants && (
        <div>
          <label className="block text-black/70 text-[12px] font-bold mb-3 uppercase tracking-[0.15em]">
            Select Option
          </label>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <motion.button
                key={variant.id}
                onClick={() => onVariantChange(variant)}
                disabled={!variant.availableForSale}
                whileHover={variant.availableForSale ? { scale: 1.02 } : {}}
                whileTap={variant.availableForSale ? { scale: 0.98 } : {}}
                className={`relative px-6 py-3 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                  selectedVariant.id === variant.id
                    ? "bg-[#3a1f87] text-white shadow-lg shadow-[#3a1f87]/20"
                    : variant.availableForSale
                    ? "bg-white text-black border-2 border-black/10 hover:border-[#3a1f87]/30"
                    : "bg-black/5 text-black/30 border-2 border-black/5 cursor-not-allowed line-through"
                }`}
              >
                {variant.title}
                {selectedVariant.id === variant.id && (
                  <motion.div
                    layoutId="activeVariant"
                    className="absolute inset-0 rounded-full border-2 border-[#3a1f87]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Selector */}
        <div
          className="flex items-center justify-between rounded-full h-[60px] px-2"
          style={{
            background: "linear-gradient(145deg, #ffffff 0%, #f5f2ec 100%)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03)",
          }}
        >
          <motion.button
            onClick={() => handleQuantityChange(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center text-black/60 hover:text-[#d40055] hover:bg-[#d40055]/5 rounded-full transition-all"
            aria-label="Decrease quantity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </motion.button>
          <motion.span
            key={quantity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 text-center text-black text-[18px] font-bold"
          >
            {quantity}
          </motion.span>
          <motion.button
            onClick={() => handleQuantityChange(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center text-black/60 hover:text-[#d40055] hover:bg-[#d40055]/5 rounded-full transition-all"
            aria-label="Increase quantity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isAdding || !selectedVariant.availableForSale}
          whileHover={selectedVariant.availableForSale && !isAdding ? { scale: 1.02 } : {}}
          whileTap={selectedVariant.availableForSale && !isAdding ? { scale: 0.98 } : {}}
          data-native-pre-order-btn=""
          data-starting-variant={variantNumericId}
          className={`relative flex-1 h-[60px] flex items-center justify-center gap-3 text-white text-[14px] font-bold uppercase tracking-[0.12em] rounded-full overflow-hidden transition-all duration-300 ${
            selectedVariant.availableForSale
              ? addedSuccess
                ? "bg-green-600"
                : "bg-[#d40055] hover:bg-[#b30048]"
              : "bg-black/20 cursor-not-allowed"
          } disabled:opacity-70 disabled:cursor-not-allowed`}
          style={{
            boxShadow: selectedVariant.availableForSale && !addedSuccess ? "0 10px 40px -10px rgba(212, 0, 85, 0.5)" : "none",
          }}
        >
          {/* Animated gradient overlay */}
          {selectedVariant.availableForSale && !addedSuccess && !isAdding && (
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              }}
            />
          )}

          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </motion.div>
                <span>Adding...</span>
              </motion.div>
            ) : addedSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Pre-Order Confirmed!</span>
              </motion.div>
            ) : !selectedVariant.availableForSale ? (
              <motion.span
                key="soldout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Sold Out
              </motion.span>
            ) : (
              <motion.div
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pre-Order</span>
                <span className="opacity-60">•</span>
                <span className="font-normal opacity-90">
                  {formatPrice({ amount: (price * quantity).toFixed(2), currencyCode: selectedVariant.price.currencyCode })}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl"
          >
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-red-600 text-[13px]">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
