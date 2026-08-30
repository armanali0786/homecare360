import { motion } from "motion/react";
import { Clock, Star, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";

const SERVICES = [
  {
    id: "deepCleaning",
    badgeTone: "bg-[#00B8A9] text-white",
    priceINR: 1199, rating: 4.9, reviews: 34,
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80",
    avatar: "PS",
  },
  {
    id: "electricalWork",
    badgeTone: "bg-amber-400 text-[#0d1f1f]",
    priceINR: 349, rating: 4.9, reviews: 28,
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80",
    avatar: "RM",
  },
  {
    id: "acService",
    badgeTone: "bg-[#0d1f1f] text-[#00B8A9]",
    priceINR: 499, rating: 4.8, reviews: 47,
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
    avatar: "AV",
  },
  {
    id: "plumbingRepair",
    badgeTone: "bg-rose-500 text-white",
    priceINR: 299, rating: 4.8, reviews: 22,
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=80",
    avatar: "VK",
  },
  {
    id: "wallPainting",
    badgeTone: "bg-violet-500 text-white",
    priceINR: 799, rating: 4.7, reviews: 18,
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=80",
    avatar: "SK",
  },
  {
    id: "pestControl",
    badgeTone: "bg-emerald-500 text-white",
    priceINR: 599, rating: 4.9, reviews: 31,
    img: "https://images.unsplash.com/photo-1632210037135-04786b2b3f51?w=900&q=80",
    avatar: "NK",
  },
];

export function PopularServices() {
  const { t } = useTranslation("home");
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">{t("popular.tag")}</span>
            <h2 className="mt-3 text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
              {t("popular.title")}
            </h2>
            <p className="mt-3 text-gray-500">{t("popular.subtitle")}</p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="text-sm font-semibold text-[#00B8A9] hover:text-[#007a73] transition-colors whitespace-nowrap"
          >
            {t("popular.viewAll")} →
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => (
            <motion.article
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(t(`popular.items.${svc.id}.title`))}`)}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <ImageWithFallback
                  src={svc.img}
                  alt={t(`popular.items.${svc.id}.title`)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold ${svc.badgeTone}`}>
                  {t(`popular.items.${svc.id}.badge`)}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#0d1f1f] backdrop-blur">
                  {t(`popular.items.${svc.id}.category`)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-[#0d1f1f]">{t(`popular.items.${svc.id}.title`)}</h3>
                  <span className="whitespace-nowrap text-xl font-extrabold text-[#00B8A9]">{formatCurrency(svc.priceINR)}</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-[#0d1f1f]">{svc.rating}</span> ({svc.reviews})
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {t(`popular.items.${svc.id}.duration`)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{t(`popular.items.${svc.id}.description`)}</p>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0d1f1f] text-[10px] font-bold text-[#00B8A9]">
                      {svc.avatar}
                    </span>
                    <span className="text-xs text-gray-400">{t("popular.verifiedPro")}</span>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-[#0d1f1f] px-4 py-2 text-xs font-semibold text-white transition group-hover:bg-[#00B8A9] group-hover:text-[#0d1f1f]">
                    {t("popular.bookNow")} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
