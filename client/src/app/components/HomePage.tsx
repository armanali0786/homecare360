import { Hero } from "@/app/components/Hero";
import { PopularServices } from "@/app/components/PopularServices";
import { HowItWorks } from "@/app/components/HowItWorks";
import { WhyChoose } from "@/app/components/WhyChoose";
import { Testimonials } from "@/app/components/Testimonials";
import { ProviderSection } from "@/app/components/ProviderSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <PopularServices />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <ProviderSection />
    </>
  );
}
