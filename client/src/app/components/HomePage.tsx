import { RamadanBanner }        from "@/app/components/RamadanBanner";
import { Hero }                 from "@/app/components/Hero";
import { ServiceCategoriesGrid } from "@/app/components/ServiceCategoriesGrid";
import { HowItWorks }            from "@/app/components/HowItWorks";
import { PopularServices }       from "@/app/components/PopularServices";
import { TrendingServices }      from "@/app/components/TrendingServices";
import { WhyChoose }             from "@/app/components/WhyChoose";
import { PaymentMethodsRow }     from "@/app/components/PaymentMethodsRow";
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
      ratingValue: "4.9",
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
        description="HomeCare360 connects you with background-verified home service professionals across the Gulf. Book plumbing, electrical, female cleaning staff, AC repair, painting, and pest control — transparent AED pricing, Apple Pay, COD & Tabby installments."
        keywords="home services UAE, plumber Dubai, electrician Abu Dhabi, female house cleaning Dubai, AC repair UAE, painting Dubai, pest control GCC, Tabby home services"
        structuredData={homeSchema}
      />

      {/* Top Ramadan & Eid Seasonal Offer Banner */}
      <RamadanBanner />

      {/* Hero with search, Emirate dropdown & Female Pro toggle */}
      <Hero />

      {/* Service Categories Grid */}
      <ServiceCategoriesGrid />

      {/* Popular Services Grid (Deep Cleaning, Plumbing, Electrician, AC, Painting, Pest) */}
      <PopularServices />

      {/* How It Works (3 Steps) */}
      <HowItWorks />

      {/* Trending Services (Curated GCC solutions) */}
      <TrendingServices />

      {/* Trust Strip / Badges */}
      <WhyChoose />

      {/* Payment Gateways (COD, Apple Pay, Tabby, Tamara, Mada, Visa/MC) */}
      <PaymentMethodsRow />

      {/* Testimonials from GCC Homeowners */}
      <Testimonials />

      {/* Provider CTA */}
      <ProviderSection />

      {/* Cities Availability */}
      <CityAvailability />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* App Download CTA */}
      <AppDownloadBanner />
    </>
  );
}
