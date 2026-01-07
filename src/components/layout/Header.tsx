"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Flex, IconButton, Container, HStack, VStack } from "@chakra-ui/react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/products", label: "Shop" },
    { href: "/story", label: "Our Story" },
    { href: "/heritage", label: "Ancient Heritage" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Header Backfill */}
      <Box h={{ base: "60px", lg: "80px" }} />

      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        bg="#f5f5f5"
        boxShadow={scrolled ? "sm" : "none"}
        transition="all 0.3s"
      >
        {/* Mobile Header */}
        <Box display={{ base: "block", lg: "none" }} py={4}>
          <Flex
            px={{ base: "20px", md: "30px" }}
            align="center"
            justify="space-between"
            position="relative"
          >
            {/* Left - Menu & Search */}
            <HStack gap={1}>
              <IconButton
                aria-label="Toggle menu"
                variant="ghost"
                color="black"
                ml={-2}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                _hover={{ color: "#d40055" }}
              >
                {mobileMenuOpen ? (
                  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </IconButton>

              <IconButton
                aria-label="Search"
                variant="ghost"
                color="black"
                _hover={{ color: "#d40055" }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </IconButton>
            </HStack>

            {/* Center - Logo */}
            <Box position="absolute" left="50%" transform="translateX(-50%)">
              <Link href="/">
                <Image
                  src="https://checkout.dateseedsoda.com/cdn/shop/files/DATE_LOGO_Horizontal_BLACK.svg?v=1759192513&width=170"
                  alt="DATE"
                  width={160}
                  height={36}
                  style={{ height: "36px", width: "auto" }}
                  priority
                />
              </Link>
            </Box>

            {/* Right - Cart */}
            <HStack gap={1}>
              <Box position="relative">
                <IconButton
                  aria-label="Cart"
                  variant="ghost"
                  color="black"
                  onClick={openCart}
                  _hover={{ color: "#d40055" }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </IconButton>
                {itemCount > 0 && (
                  <Flex
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    w="16px"
                    h="16px"
                    bg="#d40055"
                    color="white"
                    fontSize="9px"
                    fontWeight="bold"
                    borderRadius="full"
                    align="center"
                    justify="center"
                  >
                    {itemCount}
                  </Flex>
                )}
              </Box>
            </HStack>
          </Flex>
        </Box>

        {/* Desktop Header */}
        <Box display={{ base: "none", lg: "block" }} py={5}>
          <Flex
            px={{ base: "30px", lg: "50px" }}
            align="center"
            justify="space-between"
            position="relative"
          >
            {/* Left - Logo */}
            <Box flexShrink={0}>
              <Link href="/">
                <Image
                  src="https://checkout.dateseedsoda.com/cdn/shop/files/DATE_LOGO_Horizontal_BLACK.svg?v=1759192513&width=200"
                  alt="DATE"
                  width={190}
                  height={44}
                  style={{ height: "44px", width: "auto" }}
                  priority
                />
              </Link>
            </Box>

            {/* Center - Navigation */}
            <Flex
              as="nav"
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              gap={8}
              align="center"
            >
              {navLinks.map((link) => (
                <Box key={link.href} position="relative" role="group">
                  <Link href={link.href}>
                    <Box
                      as="span"
                      color="black"
                      fontSize="16px"
                      fontWeight="500"
                      textTransform="uppercase"
                      letterSpacing="0.02em"
                      transition="color 0.3s"
                      _groupHover={{ color: "#d40055" }}
                    >
                      {link.label}
                    </Box>
                  </Link>
                  <Box
                    position="absolute"
                    bottom="-4px"
                    left={0}
                    w={0}
                    h="2px"
                    bg="#d40055"
                    transition="width 0.3s"
                    _groupHover={{ w: "full" }}
                  />
                </Box>
              ))}
            </Flex>

            {/* Right - Icons */}
            <HStack gap={2}>
              <IconButton
                aria-label="Search"
                variant="ghost"
                color="black"
                _hover={{ color: "#d40055" }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </IconButton>

              <Box position="relative">
                <IconButton
                  aria-label="Cart"
                  variant="ghost"
                  color="black"
                  onClick={openCart}
                  _hover={{ color: "#d40055" }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </IconButton>
                {itemCount > 0 && (
                  <Flex
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    w="16px"
                    h="16px"
                    bg="#d40055"
                    color="white"
                    fontSize="9px"
                    fontWeight="bold"
                    borderRadius="full"
                    align="center"
                    justify="center"
                  >
                    {itemCount}
                  </Flex>
                )}
              </Box>
            </HStack>
          </Flex>
        </Box>

        {/* Mobile Menu Drawer */}
        <Box
          display={{ base: "block", lg: "none" }}
          position="fixed"
          inset={0}
          top="60px"
          zIndex={40}
          visibility={mobileMenuOpen ? "visible" : "hidden"}
          opacity={mobileMenuOpen ? 1 : 0}
          transition="all 0.3s"
        >
          {/* Overlay */}
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.400"
            opacity={mobileMenuOpen ? 1 : 0}
            transition="opacity 0.3s"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            w="85%"
            maxW="360px"
            bg="#d40055"
            transform={mobileMenuOpen ? "translateX(0)" : "translateX(-100%)"}
            transition="transform 0.3s"
          >
            <VStack as="nav" px={{ base: 4, sm: 6 }} py={{ base: 6, sm: 8 }} gap={1} align="stretch">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <Box
                    color="white"
                    fontSize="18px"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="0.02em"
                    py={3}
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{ bg: "whiteAlpha.100" }}
                    transition="background 0.3s"
                  >
                    {link.label}
                  </Box>
                </Link>
              ))}
            </VStack>

            {/* Mobile Menu Footer */}
            <Box position="absolute" bottom={0} left={0} right={0} p={6} borderTop="1px solid" borderColor="whiteAlpha.200">
              <HStack gap={4}>
                <a
                  href="https://instagram.com/dateseedsoda"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: "inherit" }}
                >
                  <Box
                    color="whiteAlpha.800"
                    _hover={{ color: "white" }}
                    transition="color 0.3s"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Box>
                </a>
                <a
                  href="https://tiktok.com/@dateseedsoda"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  style={{ color: "inherit" }}
                >
                  <Box
                    color="whiteAlpha.800"
                    _hover={{ color: "white" }}
                    transition="color 0.3s"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </Box>
                </a>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
