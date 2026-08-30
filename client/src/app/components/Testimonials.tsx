import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const REVIEWS = [
  { id: "review1", initials: "FA", avatarBg: "#0891b2", rating: 5 },
  { id: "review2", initials: "MH", avatarBg: "#16a34a", rating: 5 },
  { id: "review3", initials: "NA", avatarBg: "#7c3aed", rating: 4 },
  { id: "review4", initials: "SR", avatarBg: "#d97706", rating: 5 },
  { id: "review5", initials: "KJ", avatarBg: "#e11d48", rating: 5 },
  { id: "review6", initials: "AK", avatarBg: "#2563eb", rating: 4 },
];

export function Testimonials() {
  const { t } = useTranslation("home");
  const avgRating = "4.9";
  const totalReviews = "20+";

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with aggregate rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs font-bold text-[#00B8A9] uppercase tracking-widest mb-2">{t("testimonials.tag")}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t("testimonials.title")}
            </h2>
            <p className="text-gray-500 mt-1.5 text-sm md:text-base">
              {t("testimonials.subtitle", { count: totalReviews })}
            </p>
          </div>

          {/* Aggregate badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-gray-900 leading-none">{avgRating}</p>
              <div className="flex gap-px mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div>
              <p className="text-sm font-semibold text-gray-700">{t("testimonials.reviewsCount", { count: totalReviews })}</p>
              <p className="text-xs text-gray-400">{t("testimonials.verifiedCustomers")}</p>
            </div>
          </div>
        </motion.div>

        {/* Review grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Top: quote icon + stars */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${j < r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gray-100 fill-gray-100" />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                "{t(`testimonials.items.${r.id}.text`)}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: r.avatarBg }}
                >
                  {r.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{t(`testimonials.items.${r.id}.name`)}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {t(`testimonials.items.${r.id}.service`)} · {t(`testimonials.items.${r.id}.location`)}
                  </p>
                </div>
                <span className="ml-auto flex-shrink-0 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
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
