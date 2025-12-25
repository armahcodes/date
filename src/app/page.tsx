import { Flex } from "@chakra-ui/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AnnouncementBar from "@/components/sections/AnnouncementBar";
import ImageWithText from "@/components/sections/ImageWithText";
import WhyChooseDate from "@/components/sections/WhyChooseDate";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
// import Timeline from "@/components/sections/Timeline";
import CommunityAchieving from "@/components/sections/CommunityAchieving";
import HeroScrolling from "@/components/sections/HeroScrolling";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <Flex as="main" w="full" direction="column" overflow="hidden">
      <Header />
      <Hero />
      <AnnouncementBar />
      <ImageWithText />
      <WhyChooseDate />
      <FeaturedProduct />
      {/* <Timeline /> */}
      <CommunityAchieving />
      <HeroScrolling />
      <Newsletter />
      <Footer />
    </Flex>
  );
}
