import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import ManifestoSection from "@/components/home/ManifestoSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      {/* 1. Fullscreen Hero */}
      <HeroSection />

      {/* 2. Stats Section */}
      <StatsSection />

      {/* 6. Testimonials Section */}
      <TestimonialsSection />

      {/* 3. Featured Rooms */}
      <FeaturedRooms />

      {/* 4. Manifesto Section */}
      <ManifestoSection />

      {/* 5. Gallery Section */}
      <GallerySection />



      {/* 7. FAQ Section */}
      <FAQSection />

      {/* 8. Call to Action */}
      <CTASection />
    </>
  );
}
