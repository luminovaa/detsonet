import { ContactSection } from "@/components/layout/sections/contact";
import { CoverageAreaSection } from "@/components/layout/sections/coverage";
import { FAQSection } from "@/components/layout/sections/faq";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";


export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SponsorsSection /> */}
      {/* <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection /> */}
      <PricingSection />
      {/* <ContactSection /> */}
      <CoverageAreaSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
