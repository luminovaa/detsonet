import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { CoverageAreaSection } from "@/components/layout/sections/coverage";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";


export default function Home() {
  return (
    <>
      <HeroSection />
      <PricingSection />
      <CoverageAreaSection />
      <FeaturesSection/>
      <BenefitsSection/>
      <FAQSection />
      <FooterSection />
    </>
  );
}
