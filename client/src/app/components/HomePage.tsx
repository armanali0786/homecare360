import { Hero }                 from "@/app/components/Hero";
import { ServiceCategoriesGrid } from "@/app/components/ServiceCategoriesGrid";
import { HowItWorks }            from "@/app/components/HowItWorks";
import { PopularServices }       from "@/app/components/PopularServices";
import { WhyChoose }             from "@/app/components/WhyChoose";
import { TrustedStats }          from "@/app/components/TrustedStats";
import { Testimonials }          from "@/app/components/Testimonials";
import { ProviderSection }       from "@/app/components/ProviderSection";
import { CityAvailability }      from "@/app/components/CityAvailability";
import { FAQSection }            from "@/app/components/FAQSection";
import { AppDownloadBanner }     from "@/app/components/AppDownloadBanner";
import { SEO }                   from "@/app/components/SEO";
import { useLocale }             from "@/app/context/LocaleContext";

export function HomePage() {
  const { regionConfig } = useLocale();

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "HomeCare360",
    url: "https://homecare360.netlify.app",
    description: `The Gulf's trusted marketplace for verified home service professionals in ${regionConfig.label}. Book plumbing, electrical, cleaning, AC repair, and more.`,
    areaServed: regionConfig.cities,
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

  return (
    <>
      <SEO
        url="/"
        description="HomeCare360 connects you with background-verified home service professionals across the Gulf. Book plumbing, electrical, cleaning, AC repair, painting, and more — transparent pricing, secure payments."
        keywords="home services, plumber, electrician, house cleaning, AC repair, painting, pest control, carpentry, book home services UAE Saudi Arabia Qatar"
        structuredData={homeSchema}
      />

      {/* bg-white */}
      <Hero />

      {/* bg-white border-t — What do you need today? */}
      <ServiceCategoriesGrid />

      {/* bg-gray-50 — Book in three simple steps */}
      <HowItWorks />

      {/* bg-white — Loved by homeowners this week */}
      <PopularServices />

      {/* bg-white — Built for trust at every step */}
      <WhyChoose />

      {/* bg-[#0d1f1f] — Trusted across India */}
      <TrustedStats />

      {/* bg-gray-50 — Customers love us */}
      <Testimonials />

      {/* bg-gradient teal — Grow your business */}
      <ProviderSection />

      {/* bg-white — Live across India */}
      <CityAvailability />

      {/* bg-gray-50 — Questions, answered */}
      <FAQSection />

      {/* bg-[#0d1f1f] — Get 10% off */}
      <AppDownloadBanner />
    </>
  );
}
