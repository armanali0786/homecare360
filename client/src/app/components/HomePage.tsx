import { Hero } from "@/app/components/Hero";
import { PopularServices } from "@/app/components/PopularServices";
import { HowItWorks } from "@/app/components/HowItWorks";
import { WhyChoose } from "@/app/components/WhyChoose";
import { Testimonials } from "@/app/components/Testimonials";
import { ProviderSection } from "@/app/components/ProviderSection";
import { SEO } from "@/app/components/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Homecare360",
  url: "https://homecare360.netlify.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://homecare360.netlify.app/services?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export function HomePage() {
  return (
    <>
      <SEO
        url="/"
        description="Homecare360 connects you with verified home care professionals. Book caregivers, elder care, companion care, and health services at your doorstep."
        keywords="home care services, caregiving, elder care, companion care, in-home health services, book caregiver"
        structuredData={homeSchema}
      />
      <Hero />
      <PopularServices />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <ProviderSection />
    </>
  );
}
