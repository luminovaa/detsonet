import { ContactSection } from "@/components/layout/sections/contact";
import { CoverageAreaSection } from "@/components/layout/sections/coverage";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { LogoMarqueeSection } from "@/components/layout/sections/logo";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ProblemsSection } from "@/components/layout/sections/problems";


export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemsSection/>
      <PricingSection />
      <CoverageAreaSection />
      {/* <FeaturesSection/> */}
      <LogoMarqueeSection/>
      <FAQSection />
      <FooterSection />
    </>
  );
}
