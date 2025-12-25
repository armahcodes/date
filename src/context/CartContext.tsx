"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import {
  Cart,
  CartLine,
  createCart,
  addToCart as addToCartAPI,
  updateCartLine,
  removeFromCart as removeFromCartAPI,
  getCart,
  formatPrice,
} from "@/lib/shopify";

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  itemCount: number;
  subtotal: string;
  checkoutUrl: string | null;
  addItem: (variantId: string, quantity?: number, sellingPlanId?: string) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (cartId) {
        try {
          const existingCart = await getCart(cartId);
          if (existingCart) {
            setCart(existingCart);
          } else {
            // Cart no longer exists, clear the stored ID
            localStorage.removeItem(CART_ID_KEY);
          }
        } catch (error) {
          console.error("Error loading cart:", error);
          localStorage.removeItem(CART_ID_KEY);
        }
      }
    };
    loadCart();
  }, []);

  // Calculate item count from cart lines
  const itemCount = cart?.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0) || 0;

  // Format subtotal
  const subtotal = cart?.cost.subtotalAmount
    ? formatPrice(cart.cost.subtotalAmount)
    : "$0.00";

  // Checkout URL
  const checkoutUrl = cart?.checkoutUrl || null;

  const addItem = useCallback(async (variantId: string, quantity: number = 1, sellingPlanId?: string) => {
    if (!variantId) {
      throw new Error("Variant ID is required");
    }

    setIsLoading(true);
    try {
      let updatedCart: Cart;

      if (cart?.id) {
        // Add to existing cart
        updatedCart = await addToCartAPI(cart.id, variantId, quantity, sellingPlanId);
      } else {
        // Create new cart
        updatedCart = await createCart(variantId, quantity, sellingPlanId);
      }

      if (!updatedCart?.id) {
        throw new Error("Failed to create or update cart");
      }

      localStorage.setItem(CART_ID_KEY, updatedCart.id);
      setCart(updatedCart);
      setIsOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return;

    setIsLoading(true);
    try {
      const updatedCart = await removeFromCartAPI(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return;

    if (quantity < 1) {
      await removeItem(lineId);
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cart, removeItem]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        itemCount,
        subtotal,
        checkoutUrl,
        addItem,
        removeItem,
        updateQuantity,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Helper hook to get cart lines as a flat array
export function useCartLines(): CartLine[] {
  const { cart } = useCart();
  return cart?.lines.edges.map(({ node }) => node) || [];
}
