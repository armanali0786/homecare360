import { motion } from "motion/react";
import { Clock, Star, ArrowRight, UserCheck, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";

const SERVICES = [
  {
    id: "deepCleaning",
    catId: "houseCleaning",
    badgeTone: "bg-[#043A35] text-[#D4AF37] border border-[#D4AF37]/30",
    hasFemalePro: true,
    priceINR: 1199, rating: 4.9, reviews: 342,
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80",
    avatar: "FA",
  },
  {
    id: "acService",
    catId: "acApplianceRepair",
    badgeTone: "bg-teal-700 text-white",
    hasFemalePro: false,
    priceINR: 499, rating: 4.9, reviews: 512,
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
    avatar: "MA",
  },
  {
    id: "electricalWork",
    catId: "electrical",
    badgeTone: "bg-[#0D1F1F] text-amber-300",
    hasFemalePro: false,
    priceINR: 349, rating: 4.8, reviews: 218,
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80",
    avatar: "KA",
  },
  {
    id: "plumbingRepair",
    catId: "plumbing",
    badgeTone: "bg-blue-900 text-white",
    hasFemalePro: false,
    priceINR: 299, rating: 4.8, reviews: 194,
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=80",
    avatar: "SA",
  },
  {
    id: "wallPainting",
    catId: "painting",
    badgeTone: "bg-amber-800 text-white",
    hasFemalePro: false,
    priceINR: 799, rating: 4.9, reviews: 156,
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=80",
    avatar: "TA",
  },
  {
    id: "pestControl",
    catId: "pestControl",
    badgeTone: "bg-emerald-900 text-emerald-200",
    hasFemalePro: true,
    priceINR: 599, rating: 4.9, reviews: 289,
    img: "https://images.unsplash.com/photo-1632210037135-04786b2b3f51?w=900&q=80",
    avatar: "HA",
  },
];

export function PopularServices() {
  const { t } = useTranslation("home");
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();

  const handleWhatsAppBooking = (serviceTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Hi HomeCare360, I'd like to book ${serviceTitle} in Dubai/UAE.`);
    window.open(`https://wa.me/917319977276?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B8A9]">{t("popular.tag")}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0D1F1F] md:text-5xl">
              {t("popular.title")}
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-500">
              {t("popular.subtitle")}
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#00B8A9] hover:text-[#043A35] transition-colors whitespace-nowrap"
          >
            {t("popular.viewAll")} →
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => {
            const title = t(`popular.items.${svc.id}.title`);
            return (
              <motion.article
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => navigate(`/services?category=${svc.catId}&service=${encodeURIComponent(title)}`)}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#00B8A9]/40 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <ImageWithFallback
                      src={svc.img}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold shadow-md ${svc.badgeTone}`}>
                      {t(`popular.items.${svc.id}.badge`)}
                    </div>

                    {svc.hasFemalePro && (
                      <div className="absolute right-4 top-4 rounded-full bg-emerald-950/90 text-amber-300 border border-amber-400/30 px-3 py-1 text-[11px] font-bold shadow-md flex items-center gap-1 backdrop-blur">
                        <UserCheck className="w-3 h-3 text-amber-300" />
                        <span>{t("popular.femaleProAvailable")}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-[#0D1F1F] group-hover:text-[#00B8A9] transition-colors leading-snug">
                        {title}
                      </h3>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block font-medium">{t("categories.from")}</span>
                        <span className="whitespace-nowrap text-lg font-black text-[#043A35]">{formatCurrency(svc.priceINR)}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#0D1F1F]">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span>{svc.rating}</span>
                        <span className="text-gray-400 font-normal">({svc.reviews})</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        <span>{t(`popular.items.${svc.id}.duration`)}</span>
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-gray-600 line-clamp-2">
                      {t(`popular.items.${svc.id}.description`)}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0D1F1F] text-[10px] font-bold text-[#D4AF37]">
                        {svc.avatar}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-500">{t("popular.verifiedPro")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleWhatsAppBooking(title, e)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors shadow-sm"
                        title={t("popular.bookWhatsApp")}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0D1F1F] px-4 py-2 text-xs font-bold text-white transition-all group-hover:bg-[#00B8A9] group-hover:text-[#0D1F1F]"
                      >
                        {t("popular.bookNow")} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
