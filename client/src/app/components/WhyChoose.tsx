import { motion } from "motion/react";
import { ShieldCheck, UserCheck, Banknote, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  { id: "verified", icon: ShieldCheck, accent: "border-teal-200 bg-teal-50/50 text-[#00B8A9]" },
  { id: "femaleStaff", icon: UserCheck, accent: "border-amber-200 bg-amber-50/50 text-[#D4AF37]" },
  { id: "pricing", icon: Banknote, accent: "border-emerald-200 bg-emerald-50/50 text-emerald-600" },
  { id: "insurance", icon: ShieldAlert, accent: "border-blue-200 bg-blue-50/50 text-blue-600" },
];

export function WhyChoose() {
  const { t } = useTranslation("home");

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-teal-50/30 to-white">
      <div className="pointer-events-none absolute inset-0 bg-islamic-light-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B8A9]">{t("trustStrip.tag")}</span>
          <h2 className="mt-3 text-3xl font-black text-[#0D1F1F] md:text-5xl">
            {t("trustStrip.title")}
          </h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
            {t("trustStrip.subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#00B8A9]/30"
              >
                <div>
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl border shadow-sm ${f.accent}`}>
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#0D1F1F] leading-snug">
                    {t(`trustStrip.items.${f.id}.title`)}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-gray-500">
                    {t(`trustStrip.items.${f.id}.text`)}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-100">
                  <p className="text-2xl font-black text-[#043A35] leading-none">
                    {t(`trustStrip.items.${f.id}.stat`)}
                  </p>
                  <p className="text-xs font-semibold text-[#00B8A9] mt-1">
                    {t(`trustStrip.items.${f.id}.statSub`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
