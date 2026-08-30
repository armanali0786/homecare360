import { motion } from "motion/react";
import {
  ArrowUpRight, Sparkles, Wrench, Zap, AirVent,
  Paintbrush, Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";

const CATEGORIES = [
  { id: "deepCleaning", catId: "houseCleaning", priceINR: 199, icon: Sparkles, tint: "from-cyan-200/60 to-cyan-100/60", rating: 4.9 },
  { id: "plumbing",     catId: "plumbing",      priceINR: 299, icon: Wrench,   tint: "from-blue-200/60 to-indigo-100/60", rating: 4.8 },
  { id: "electrician",  catId: "electrical",    priceINR: 349, icon: Zap,       tint: "from-amber-200/60 to-yellow-100/60", rating: 4.9 },
  { id: "acService",    catId: "acApplianceRepair", priceINR: 299, icon: AirVent, tint: "from-sky-200/60 to-cyan-100/60", rating: 4.7 },
  { id: "painting",     catId: "painting",      priceINR: 799, icon: Paintbrush,tint: "from-rose-200/60 to-pink-100/60", rating: 4.8 },
];

export function ServiceCategoriesGrid() {
  const { t } = useTranslation("home");
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">{t("categories.tag")}</span>
            <h2 className="mt-3 text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
              {t("categories.title")}
            </h2>
            <p className="mt-3 text-gray-500">
              {t("categories.subtitle")}
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="text-sm font-semibold text-[#00B8A9] hover:text-[#007a73] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t("categories.viewAll")} →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {CATEGORIES.map((s, i) => {
            const Icon = s.icon;
            const name = t(`categories.items.${s.id}.name`);
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                onClick={() => navigate(`/services?category=${s.catId}&service=${encodeURIComponent(name)}`)}
                className="group relative overflow-hidden rounded-3xl border bg-white p-5 transition-all duration-300 hover:border-[#00B8A9]/40 hover:shadow-lg text-left rtl:text-right cursor-pointer"
              >
                <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.tint}`}>
                  <Icon className="h-6 w-6 text-[#0d1f1f]" strokeWidth={2.2} />
                </div>
                <h3 className="text-base font-bold text-[#0d1f1f]">{name}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                  <span>{t("categories.from")} <span className="font-semibold text-[#0d1f1f]">{formatCurrency(s.priceINR)}</span></span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>{t(`categories.items.${s.id}.time`)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-[#0d1f1f]">{s.rating}</span>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-gray-400 transition group-hover:bg-[#00B8A9] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 rtl:rotate-90" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
