import { motion } from "motion/react";
import { Clock, Star, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";

const ITEMS = [
  {
    id: "smartHome",
    badgeTone: "bg-[#D4AF37] text-[#0D1F1F] font-bold",
    priceINR: 2499, rating: 4.9, reviews: 124,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    avatar: "AH",
  },
  {
    id: "gardenArchitecture",
    badgeTone: "bg-emerald-500 text-white font-bold",
    priceINR: 1899, rating: 4.8, reviews: 88,
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
    avatar: "RA",
  },
];

export function TrendingServices() {
  const { t } = useTranslation("home");
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#0D1F1F] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              {t("trending.tag")}
            </span>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              {t("trending.title")}
            </h2>
            <p className="mt-3 max-w-lg text-white/70 text-sm md:text-base">
              {t("trending.subtitle")}
            </p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="text-sm font-bold text-[#D4AF37] hover:text-white transition-colors"
          >
            {t("trending.exploreOffers", "Explore Special Offers →")}
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onClick={() => navigate("/services")}
              className="group overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src={it.img}
                    alt={t(`trending.items.${it.id}.title`)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F1F] via-[#0D1F1F]/30 to-transparent" />
                  <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] shadow-lg ${it.badgeTone}`}>
                    {t(`trending.items.${it.id}.badge`)}
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#0D1F1F] backdrop-blur">
                    {t(`trending.items.${it.id}.category`)}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">{t(`trending.items.${it.id}.title`)}</h3>
                    <span className="whitespace-nowrap text-xl font-black text-[#D4AF37]">{formatCurrency(it.priceINR)}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-4 text-xs text-white/60">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-white">{it.rating}</span> ({it.reviews})
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#D4AF37]" /> {t(`trending.items.${it.id}.duration`)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-white/70">{t(`trending.items.${it.id}.description`)}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#0D1F1F]">
                      {it.avatar}
                    </span>
                    <span className="text-xs text-white/70 font-medium">{t("trending.verifiedPro")}</span>
                  </div>

                  <button className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#0D1F1F] transition hover:bg-white">
                    {t("trending.bookNow")} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
