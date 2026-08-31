import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, MapPin, Star, BadgeCheck,
  Sparkles, CheckCircle2, Clock, ChevronDown, UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";

const chipList = [
  { id: "deepCleaning", catId: "houseCleaning", labelKey: "hero.chips.deepCleaning", fallback: "Deep Cleaning" },
  { id: "acService", catId: "acApplianceRepair", labelKey: "hero.chips.acService", fallback: "AC Repair & Wash" },
  { id: "plumbing", catId: "plumbing", labelKey: "hero.chips.plumbing", fallback: "Plumbing" },
  { id: "electrician", catId: "electrical", labelKey: "hero.chips.electrician", fallback: "Electrician" },
  { id: "painting", catId: "painting", labelKey: "hero.chips.painting", fallback: "Wall Painting" },
  { id: "pestControl", catId: "pestControl", labelKey: "hero.chips.pestControl", fallback: "Pest Control" },
];

export function Hero() {
  const { t } = useTranslation("home");
  const { regionConfig } = useLocale();
  const [city, setCity] = useState(regionConfig.cities[0]);
  const [showCities, setShowCities] = useState(false);
  const [query, setQuery] = useState("");
  const [femaleProOnly, setFemaleProOnly] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCity(regionConfig.cities[0]);
  }, [regionConfig]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCities(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (query) p.set("service", query);
    p.set("location", city);
    if (femaleProOnly) p.set("gender", "female");
    navigate(`/services?${p.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#043A35]/5 via-white to-[#0D1F1F]/5 pt-6 pb-20 lg:pt-10 lg:pb-28">
      {/* Background Islamic Pattern Accent */}
      <div className="pointer-events-none absolute inset-0 bg-islamic-light-pattern opacity-60" />

      {/* Decorative Glow Orbs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#00B8A9]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#0D1F1F] shadow-md backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              <span className="font-bold">{t("hero.trustBadge")}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-[#0D1F1F] sm:text-5xl lg:text-[62px]">
              {t("hero.titleLine1")}{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#043A35] via-[#00B8A9] to-[#D4AF37] bg-clip-text text-transparent">
                {t("hero.titleLine2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-xl text-base sm:text-lg text-gray-600 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* Search Bar Form */}
            <form
              onSubmit={handleSearch}
              className="mt-8 rounded-3xl border border-gray-200 bg-white p-2.5 shadow-2xl backdrop-blur-md transition-all focus-within:border-[#00B8A9] focus-within:ring-2 focus-within:ring-[#00B8A9]/20"
            >
              <div className="flex flex-col md:flex-row items-stretch gap-2">
                {/* Emirate Dropdown */}
                <div className="relative flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 border border-gray-100 md:border-none z-20" ref={dropdownRef}>
                  <MapPin className="h-4 w-4 text-[#00B8A9] shrink-0" />
                  <button
                    type="button"
                    onClick={() => setShowCities(v => !v)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D1F1F] focus:outline-none"
                  >
                    <span>{city}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showCities ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {showCities && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-50 min-w-[220px]"
                      >
                        <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Select Emirate / City
                        </div>
                        {regionConfig.cities.map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => { setCity(c); setShowCities(false); }}
                            className={`w-full text-left rtl:text-right px-4 py-2.5 text-sm transition-colors hover:bg-teal-50 flex items-center justify-between cursor-pointer ${c === city ? "font-bold text-[#00B8A9] bg-teal-50/80" : "text-gray-700"}`}
                          >
                            <span>{c}</span>
                            {c === city && <CheckCircle2 className="h-4 w-4 text-[#00B8A9]" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden md:block w-px bg-gray-200 my-2" />

                {/* Service Query Input */}
                <div className="flex flex-1 items-center gap-2 px-3 py-1">
                  <Search className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={t("hero.searchPlaceholder")}
                    className="w-full bg-transparent py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none font-medium"
                  />
                </div>

                {/* Search Action Button */}
                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-to-r from-[#043A35] to-[#0D1F1F] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98] shrink-0"
                >
                  {t("hero.searchButton", "Search")}
                </button>
              </div>

              {/* Female Professional Filter Bar */}
              <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 px-2">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-700 hover:text-[#043A35]">
                  <input
                    type="checkbox"
                    checked={femaleProOnly}
                    onChange={e => setFemaleProOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#00B8A9] focus:ring-[#00B8A9]"
                  />
                  <UserCheck className="h-4 w-4 text-[#00B8A9]" />
                  <span>{t("hero.femaleProBadge")}</span>
                </label>

                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{t("hero.insuredPolicy")}</span>
                </div>
              </div>
            </form>

            {/* Quick Service Chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("hero.popular")}</span>
              {chipList.map(c => {
                const label = t(c.labelKey, c.fallback);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => navigate(`/services?category=${c.catId}&service=${encodeURIComponent(label)}`)}
                    className="rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#0D1F1F] shadow-sm backdrop-blur transition-all hover:border-[#00B8A9] hover:text-[#00B8A9] hover:shadow cursor-pointer"
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Trust Stat Strip */}
            <div className="mt-10 pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-500">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs font-bold text-[#0D1F1F]">4.9</span>
                </div>
                <span className="text-xs text-gray-500 mt-1">{t("hero.rating")}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-black text-[#043A35]">50,000+</span>
                <span className="text-xs text-gray-500 mt-0.5">{t("hero.jobsDone")}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-black text-[#00B8A9] flex items-center gap-1">
                  <BadgeCheck className="h-4 w-4" /> 100% Vetted
                </span>
                <span className="text-xs text-gray-500 mt-0.5">{t("hero.verifiedProfessionals")}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Visual Card & Hero Image */}
          <div className="relative mx-auto hidden w-full max-w-[500px] lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-2xl border-4 border-white ring-1 ring-black/5">
              <img
                src="/hero-technician.png"
                alt="Emirates ID verified home service technician in Dubai"
                className="h-full w-full object-cover"
                width={1024}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F1F]/60 via-transparent to-transparent" />
            </div>

            {/* Badge overlay 1: Booking Confirmed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -left-6 top-10 w-[240px] rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 flex-shrink-0 text-[#00B8A9]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t("hero.bookingConfirmed")}</p>
                  <p className="text-xs font-extrabold text-[#0D1F1F]">{t("hero.todayAt3pm")}</p>
                </div>
              </div>
            </motion.div>

            {/* Badge overlay 2: Customer Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -right-4 bottom-16 w-[270px] rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-gray-900 ml-1">5.0</span>
              </div>
              <p className="mt-2 text-xs font-medium text-gray-700 italic">{t("hero.reviewQuote")}</p>
              <p className="mt-1 text-[11px] font-bold text-[#00B8A9]">{t("hero.reviewAuthor")}</p>
            </motion.div>

            {/* Badge overlay 3: Same-day & Weekend Availability */}
            <div className="absolute -bottom-4 left-8 flex items-center gap-2 rounded-full bg-[#0D1F1F] px-4 py-2.5 text-white shadow-2xl border border-[#D4AF37]/40">
              <Clock className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-xs font-bold">{t("hero.sameDayBooking")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
