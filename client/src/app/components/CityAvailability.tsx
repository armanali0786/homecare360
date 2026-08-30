import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { useLocale, type RegionCode } from "../context/LocaleContext";

const CITY_IMAGES = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
  "https://images.unsplash.com/photo-1580674684089-5c8b0e3b1c7d?w=600&q=80",
  "https://images.unsplash.com/photo-1580835017730-4a58af5680d0?w=600&q=80",
  "https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=600&q=80",
  "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80",
];

const CITY_STATS = [
  { services: 5, pros: 8 },
  { services: 8, pros: 10 },
  { services: 9, pros: 14 },
  { services: 5, pros: 4 },
  { services: 3, pros: 2 },
  { services: 8, pros: 9 },
];

const SOON_CITIES: Record<RegionCode, string[]> = {
  AE: ["Fujairah", "Al Ain", "Umm Al Quwain"],
  SA: ["Khobar", "Abha", "Tabuk"],
  QA: ["Al Khor", "Umm Salal", "Mesaieed"],
  IN: ["Kolkata", "Jaipur", "Chandigarh", "Surat"],
};

export function CityAvailability() {
  const { t } = useTranslation("home");
  const { region, regionConfig } = useLocale();
  const cities = regionConfig.cities;
  const soon = SOON_CITIES[region] || [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">{t("cityAvailability.tag")}</span>
            <h2 className="mt-3 text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
              {t("cityAvailability.title", { region: regionConfig.label })}
            </h2>
            <p className="mt-3 text-gray-500">{t("cityAvailability.subtitle", { count: cities.length })}</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {cities.map((c, i) => {
            const stat = CITY_STATS[i % CITY_STATS.length];
            return (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <ImageWithFallback
                  src={CITY_IMAGES[i % CITY_IMAGES.length]}
                  alt={c}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1f] via-[#0d1f1f]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#00B8A9]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00B8A9] animate-pulse" /> {t("cityAvailability.live")}
                  </div>
                  <h3 className="mt-1 text-xl font-bold">{c}</h3>
                  <p className="text-xs text-white/60">{t("cityAvailability.stats", { services: stat.services, pros: stat.pros })}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {soon.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-400">{t("cityAvailability.launchingSoon")}</span>
            {soon.map(s => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed bg-white px-3.5 py-1.5 text-xs text-gray-400"
              >
                <MapPin className="h-3 w-3" /> {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
