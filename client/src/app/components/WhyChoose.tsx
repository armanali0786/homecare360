import { motion } from "motion/react";
import { ShieldCheck, DollarSign, Lock, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  { id: "verified",    icon: ShieldCheck },
  { id: "pricing",     icon: DollarSign },
  { id: "payments",    icon: Lock },
  { id: "support",     icon: Headphones },
];

export function WhyChoose() {
  const { t } = useTranslation("home");

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-50/60 via-white to-cyan-50/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">{t("whyChoose.tag")}</span>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
            {t("whyChoose.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-500">
            {t("whyChoose.subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative flex flex-col rounded-3xl bg-white/70 backdrop-blur-sm border border-gray-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-[#00B8A9] shadow-sm">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-[#0d1f1f]">{t(`whyChoose.items.${f.id}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 flex-1">{t(`whyChoose.items.${f.id}.text`)}</p>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-[#00B8A9] to-emerald-500 bg-clip-text text-transparent leading-none">
                    {t(`whyChoose.items.${f.id}.stat`)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{t(`whyChoose.items.${f.id}.statSub`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
