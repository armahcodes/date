"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Text, Button, IconButton, VStack, HStack, Spinner } from "@chakra-ui/react";
import { useCart, useCartLines } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import { trackStartedCheckout, generateEventId, KlaviyoCartItem } from "@/lib/klaviyo";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    itemCount,
    subtotal,
    checkoutUrl,
    updateQuantity,
    removeItem,
    isLoading,
    cart,
  } = useCart();
  const cartLines = useCartLines();

  // Handle checkout click - track Started Checkout event
  const handleCheckoutClick = () => {
    if (!cart || !checkoutUrl) return;

    const klaviyoItems: KlaviyoCartItem[] = cartLines.map((line) => ({
      ProductID: line.merchandise.id,
      ProductName: `${line.merchandise.product.title} - ${line.merchandise.title}`,
      Quantity: line.quantity,
      ItemPrice: parseFloat(line.merchandise.price.amount),
      RowTotal: parseFloat(line.merchandise.price.amount) * line.quantity,
      ProductURL: `/products/${line.merchandise.product.handle}`,
      ImageURL: line.merchandise.product.featuredImage?.url,
      ProductCategories: ["Functional Beverage"],
    }));

    const cartTotal = klaviyoItems.reduce((sum, item) => sum + item.RowTotal, 0);
    const itemNames = cartLines.map((line) => line.merchandise.product.title);

    trackStartedCheckout({
      $event_id: generateEventId(cart.id),
      $value: cartTotal,
      ItemNames: itemNames,
      CheckoutURL: checkoutUrl,
      Categories: ["Functional Beverage"],
      Items: klaviyoItems,
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeCart]);

  return (
    <>
      {/* Overlay */}
      <Box
        position="fixed"
        inset={0}
        bg="blackAlpha.400"
        zIndex={60}
        transition="opacity 0.3s"
        opacity={isOpen ? 1 : 0}
        pointerEvents={isOpen ? "auto" : "none"}
        onClick={closeCart}
      />

      {/* Drawer */}
      <Box
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        w="full"
        maxW={{ base: "100%", sm: "420px" }}
        bg="#f5f5f5"
        zIndex={70}
        transition="transform 0.3s"
        transform={isOpen ? "translateX(0)" : "translateX(100%)"}
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Flex align="center" justify="space-between" px={6} py={5} borderBottom="1px solid" borderColor="blackAlpha.100">
          <Heading
            as="h3"
            color="black"
            fontSize="20px"
            fontWeight="600"
            display="flex"
            alignItems="center"
            gap={2}
            fontFamily="var(--font-montserrat), Montserrat, sans-serif"
          >
            Your Pre-Orders
            <Text as="span" fontSize="14px" fontWeight="400" color="blackAlpha.600">
              ({itemCount})
            </Text>
          </Heading>
          <IconButton
            aria-label="Close cart"
            variant="ghost"
            color="black"
            onClick={closeCart}
            mr={-2}
            _hover={{ color: "#d40055" }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </Flex>

        {/* Loading overlay */}
        {isLoading && (
          <Flex position="absolute" inset={0} bg="whiteAlpha.500" zIndex={10} align="center" justify="center">
            <Spinner size="lg" color="#3a1f87" borderWidth="2px" />
          </Flex>
        )}

        {/* Cart Items */}
        <Box flex={1} overflowY="auto" px={6} py={4}>
          {cartLines.length === 0 ? (
            <Flex direction="column" align="center" justify="center" h="full" textAlign="center">
              <Box color="blackAlpha.200" mb={4}>
                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </Box>
              <Text color="blackAlpha.600" fontSize="15px" mb={6}>
                Your cart is empty
              </Text>
              <Link href="/products" onClick={closeCart} style={{ textDecoration: "none" }}>
                <Button
                  bg="#3a1f87"
                  color="white"
                  px={8}
                  py={3}
                  h="auto"
                  fontSize="14px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  borderRadius="full"
                  _hover={{ bg: "#2d1869" }}
                >
                  Continue Shopping
                </Button>
              </Link>
            </Flex>
          ) : (
            <VStack gap={6} align="stretch">
              {cartLines.map((line) => (
                <Flex key={line.id} gap={4}>
                  {/* Image */}
                  <Link href={`/products/${line.merchandise.product.handle}`} onClick={closeCart}>
                    <Box
                      position="relative"
                      w="80px"
                      h="80px"
                      bg="#f5f2ec"
                      borderRadius="lg"
                      overflow="hidden"
                      flexShrink={0}
                    >
                      {line.merchandise.product.featuredImage ? (
                        <Image
                          src={line.merchandise.product.featuredImage.url}
                          alt={line.merchandise.product.featuredImage.altText || line.merchandise.product.title}
                          fill
                          style={{ objectFit: "contain", padding: "8px" }}
                        />
                      ) : (
                        <Flex w="full" h="full" align="center" justify="center" color="blackAlpha.200">
                          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </Flex>
                      )}
                    </Box>
                  </Link>

                  {/* Details */}
                  <Box flex={1} minW={0}>
                    <Link href={`/products/${line.merchandise.product.handle}`} onClick={closeCart}>
                      <Text
                        color="black"
                        fontSize="14px"
                        fontWeight="600"
                        _hover={{ color: "#d40055" }}
                        transition="color 0.3s"
                        lineClamp={2}
                      >
                        {line.merchandise.product.title}
                      </Text>
                    </Link>

                    {line.merchandise.title !== "Default Title" && (
                      <Text color="blackAlpha.500" fontSize="12px" mt="2px">
                        {line.merchandise.title}
                      </Text>
                    )}

                    <HStack gap={2} mt={1}>
                      <Text color="black" fontSize="14px" fontWeight="700">
                        {formatPrice(line.merchandise.price)}
                      </Text>
                    </HStack>

                    {/* Quantity Controls */}
                    <Flex align="center" justify="space-between" mt={3}>
                      <Flex align="center" border="1px solid" borderColor="blackAlpha.200" borderRadius="full">
                        <IconButton
                          aria-label="Decrease quantity"
                          variant="ghost"
                          size="sm"
                          w={8}
                          h={8}
                          minW="auto"
                          color="black"
                          borderRadius="full"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          _hover={{ bg: "blackAlpha.50" }}
                          _disabled={{ opacity: 0.5 }}
                        >
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </IconButton>
                        <Text w={8} textAlign="center" color="black" fontSize="14px" fontWeight="500">
                          {line.quantity}
                        </Text>
                        <IconButton
                          aria-label="Increase quantity"
                          variant="ghost"
                          size="sm"
                          w={8}
                          h={8}
                          minW="auto"
                          color="black"
                          borderRadius="full"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          _hover={{ bg: "blackAlpha.50" }}
                          _disabled={{ opacity: 0.5 }}
                        >
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </IconButton>
                      </Flex>

                      <IconButton
                        aria-label="Remove item"
                        variant="ghost"
                        size="sm"
                        color="blackAlpha.400"
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        _hover={{ color: "#d40055" }}
                        _disabled={{ opacity: 0.5 }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </IconButton>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>

        {/* Footer */}
        {cartLines.length > 0 && (
          <Box borderTop="1px solid" borderColor="blackAlpha.100" px={6} py={5}>
            <VStack gap={4}>
              {/* Subtotal */}
              <Flex align="center" justify="space-between" w="full">
                <Text color="black" fontSize="15px">
                  Subtotal
                </Text>
                <Text color="black" fontSize="18px" fontWeight="700">
                  {subtotal}
                </Text>
              </Flex>

              {/* Pre-order info */}
              <Flex align="center" gap={2} px={3} py={2} bg="rgba(58, 31, 135, 0.05)" borderRadius="lg" border="1px solid" borderColor="rgba(58, 31, 135, 0.1)" w="full">
                <Box color="#3a1f87" flexShrink={0}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Box>
                <Text color="blackAlpha.600" fontSize="11px">
                  $5 refundable deposit secures your pre-order. Full payment on launch.
                </Text>
              </Flex>

              {/* Checkout Button */}
              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  style={{ width: "100%", textDecoration: "none" }}
                  onClick={handleCheckoutClick}
                >
                  <Button
                    w="full"
                    bg="#d40055"
                    color="white"
                    px={8}
                    py={4}
                    h="auto"
                    fontSize="14px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    borderRadius="full"
                    _hover={{ bg: "#b30048" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Complete Pre-Order
                  </Button>
                </a>
              ) : (
                <Button
                  w="full"
                  bg="rgba(212, 0, 85, 0.5)"
                  color="white"
                  px={8}
                  py={4}
                  h="auto"
                  fontSize="14px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  borderRadius="full"
                  cursor="not-allowed"
                  disabled
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Complete Pre-Order
                </Button>
              )}

              {/* Continue Shopping Link */}
              <Button
                variant="ghost"
                w="full"
                color="black"
                fontSize="14px"
                fontWeight="500"
                onClick={closeCart}
                textDecoration="underline"
                textUnderlineOffset="4px"
                _hover={{ color: "#d40055" }}
              >
                Continue Shopping
              </Button>
            </VStack>
          </Box>
        )}
      </Box>
    </>
  );
}
