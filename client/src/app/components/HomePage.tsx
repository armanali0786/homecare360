import { Hero }                 from "@/app/components/Hero";
import { ServiceCategoriesGrid } from "@/app/components/ServiceCategoriesGrid";
import { HowItWorks }            from "@/app/components/HowItWorks";
import { PopularServices }       from "@/app/components/PopularServices";
import { Testimonials }          from "@/app/components/Testimonials";
import { WhyChoose }             from "@/app/components/WhyChoose";
import { CityAvailability }      from "@/app/components/CityAvailability";
import { PressLogos }            from "@/app/components/PressLogos";
import { ProviderSection }       from "@/app/components/ProviderSection";
import { AppDownloadBanner }     from "@/app/components/AppDownloadBanner";
import { FAQSection }            from "@/app/components/FAQSection";
import { SEO }                   from "@/app/components/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "HomeCare360",
  url: "https://homecare360.netlify.app",
  description:
    "India's trusted marketplace for verified home service professionals. Book plumbing, electrical, cleaning, AC repair, and more.",
  areaServed: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Mumbai", "Delhi"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "12000",
  },
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
        description="HomeCare360 connects you with background-verified home service professionals. Book plumbing, electrical, cleaning, AC repair, painting, and more — transparent pricing, secure payments."
        keywords="home services, plumber, electrician, house cleaning, AC repair, painting, pest control, carpentry, book home services India"
        structuredData={homeSchema}
      />

      {/* bg-gray-50 */}
      <Hero />

      {/* bg-white */}
      <ServiceCategoriesGrid />

      {/* bg-gray-50 */}
      <HowItWorks />

      {/* bg-white */}
      <PopularServices />

      {/* bg-gray-50 */}
      <Testimonials />

      {/* bg-white */}
      <WhyChoose />

      {/* bg-gray-50 */}
      <CityAvailability />

      {/* bg-white border-y */}
      <PressLogos />

      {/* bg-[#00B8A9] */}
      <ProviderSection />

      {/* bg-white */}
      <AppDownloadBanner />

      {/* bg-gray-50 */}
      <FAQSection />
    </>
  );
}
