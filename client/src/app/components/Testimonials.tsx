import { motion } from "motion/react";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const REVIEWS = [
  { id: "review1", initials: "FA", avatarBg: "#043A35", rating: 5 },
  { id: "review2", initials: "MA", avatarBg: "#00B8A9", rating: 5 },
  { id: "review3", initials: "NQ", avatarBg: "#D4AF37", rating: 5 },
  { id: "review4", initials: "SR", avatarBg: "#0D1F1F", rating: 5 },
  { id: "review5", initials: "MK", avatarBg: "#064E3B", rating: 5 },
  { id: "review6", initials: "TH", avatarBg: "#0284C7", rating: 5 },
];

export function Testimonials() {
  const { t } = useTranslation("home");
  const avgRating = "4.9";

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with aggregate rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-xs font-bold text-[#00B8A9] uppercase tracking-[0.2em]">{t("testimonials.tag")}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0D1F1F] mt-3">
              {t("testimonials.title")}
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              {t("testimonials.subtitle")}
            </p>
          </div>

          {/* Aggregate badge */}
          <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-3xl px-6 py-4 shadow-xl flex-shrink-0">
            <div className="text-center">
              <p className="text-3xl font-black text-[#043A35] leading-none">{avgRating}</p>
              <div className="flex gap-0.5 mt-1.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-sm font-extrabold text-[#0D1F1F]">{t("testimonials.reviewsCount")}</p>
              <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t("testimonials.verifiedCustomers")}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Review grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-teal-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${j < r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#00B8A9]/20" />
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-6 font-normal">
                  "{t(`testimonials.items.${r.id}.text`)}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-sm flex-shrink-0"
                  style={{ backgroundColor: r.avatarBg }}
                >
                  {r.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#0D1F1F] truncate">{t(`testimonials.items.${r.id}.name`)}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {t(`testimonials.items.${r.id}.service`)} · <span className="font-semibold text-gray-600">{t(`testimonials.items.${r.id}.location`)}</span>
                  </p>
                </div>
                <span className="flex-shrink-0 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  {t("testimonials.verified")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
