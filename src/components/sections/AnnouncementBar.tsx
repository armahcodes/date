"use client";

import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";

const announcements = [
  {
    icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/DATE_Icons_-_Black_White_2_4.png?v=1762909803&width=80",
    text: "Elevate Your Day",
    iconWidth: 40,
  },
  {
    icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Vector-1.png?v=1762897073&width=60",
    text: "Zero Caffeine",
    iconWidth: 30,
  },
  {
    icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/DNA.png?v=1762897073&width=80",
    text: "Revitalize & Invigorate",
    iconWidth: 40,
  },
  {
    icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Group.png?v=1762897073&width=60",
    text: "No Sugar",
    iconWidth: 30,
  },
  {
    icon: "https://jveysj-j1.myshopify.com/cdn/shop/files/Screenshot_2025-11-03_at_11.06.32_am_1.png?v=1762897073&width=140",
    text: "Upcycled Date Seeds",
    iconWidth: 70,
  },
];

export default function AnnouncementBar() {
  return (
    <Box
      as="section"
      bg="#3a1f87"
      overflow="hidden"
      py="10px"
    >
      <Box position="relative">
        <Flex
          className="animate-marquee"
          style={{ "--marquee-duration": "25s" } as React.CSSProperties}
        >
          {[...Array(6)].map((_, setIndex) => (
            <Flex key={setIndex} align="center">
              {announcements.map((item, index) => (
                <Flex
                  key={`${setIndex}-${index}`}
                  align="center"
                  whiteSpace="nowrap"
                  mx="10px"
                >
                  <Box
                    position="relative"
                    flexShrink={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mr={2}
                    w={`${item.iconWidth}px`}
                    h="28px"
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={item.iconWidth}
                      height={28}
                      style={{
                        objectFit: "contain",
                        maxHeight: "28px",
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </Box>
                  <Text color="#f5f2ec" fontSize={{ base: "11px", md: "13px" }} fontWeight="700">
                    {item.text}
                  </Text>
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
