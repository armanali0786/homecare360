import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, MapPin, Star, ShieldCheck, BadgeCheck,
  Sparkles, CheckCircle2, Clock, ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";

const chips = ["Cleaning", "Plumbing", "Electrical", "Painting", "AC Repair", "Carpentry"];

export function Hero() {
  const { t } = useTranslation("hero");
  const { regionConfig } = useLocale();
  const [city, setCity] = useState(regionConfig.cities[0]);
  const [showCities, setShowCities] = useState(false);
  const [query, setQuery] = useState("");
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
    navigate(`/services?${p.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50/60 via-white to-cyan-50/40">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#00B8A9]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-40 h-72 w-72 rounded-full bg-[#00B8A9]/15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-16 pb-24 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00B8A9]/30 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-[#0d1f1f] shadow-md backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[#00B8A9]" />
            {t("trustBadge")}
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-[#0d1f1f] sm:text-6xl lg:text-[72px]">
            {t("titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-[#00B8A9] to-emerald-500 bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-500">
            {t("subtitle")}
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col items-stretch gap-2 rounded-2xl border bg-white/80 p-2 shadow-xl backdrop-blur md:flex-row md:items-center md:rounded-full md:p-2"
          >
            <div className="relative flex items-center gap-2 rounded-full px-4 py-3 md:border-r" ref={dropdownRef}>
              <MapPin className="h-4 w-4 text-[#00B8A9] flex-shrink-0" />
              <button
                type="button"
                onClick={() => setShowCities(v => !v)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#0d1f1f] bg-transparent focus:outline-none"
              >
                {city}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showCities ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showCities && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-20 min-w-[160px]"
                  >
                    {regionConfig.cities.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setCity(c); setShowCities(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${c === city ? "font-semibold text-[#00B8A9]" : "text-gray-700"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent py-3 text-sm placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-[#0d1f1f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0d1f1f]/90"
            >
              Search
            </button>
          </form>

          {/* Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-400">{t("popular")}</span>
            {chips.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => navigate(`/services?service=${encodeURIComponent(c)}`)}
                className="rounded-full border bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#0d1f1f] backdrop-blur transition hover:border-[#00B8A9] hover:text-[#00B8A9] hover:shadow-md"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0d1f1f]">4.2</span>
              <span className="text-sm text-gray-400">{t("rating")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck className="h-4 w-4 text-[#00B8A9]" />
              <span className="font-semibold text-[#0d1f1f]">5+</span>
              <span className="text-gray-400">{t("jobsDone")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-[#00B8A9]" />
              <span className="text-gray-400">{t("verifiedProfessionals")}</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="relative mx-auto hidden w-full max-w-[540px] lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-xl ring-1 ring-black/5">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1024&q=80"
              alt="Verified home service professional"
              className="h-full w-full object-cover"
              width={1024}
              height={1280}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1f]/40 via-transparent to-transparent" />
          </div>

          {/* Booking confirmed */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="absolute -left-6 top-10 w-[230px] rounded-2xl bg-white/85 backdrop-blur-sm p-4 shadow-xl border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-[#00B8A9]" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-400">{t("bookingConfirmed")}</p>
                <p className="text-sm font-bold text-[#0d1f1f]">{t("todayAt3pm")}</p>
              </div>
            </div>
          </motion.div>

          {/* Rating card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="absolute -right-4 bottom-16 w-[260px] rounded-2xl bg-white/85 backdrop-blur-sm p-4 shadow-xl border border-gray-100"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold text-[#0d1f1f]">{t("reviewQuote")}</p>
            <p className="mt-1 text-xs text-gray-400">{t("reviewAuthor")}</p>
          </motion.div>

          {/* Same-day badge */}
          <div className="absolute -bottom-4 left-8 flex items-center gap-2 rounded-full bg-[#0d1f1f] px-4 py-2.5 text-white shadow-xl">
            <Clock className="h-4 w-4 text-[#00B8A9]" />
            <span className="text-xs font-semibold">{t("sameDayBooking")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
