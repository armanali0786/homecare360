import { motion } from "motion/react";
import { SlidersHorizontal, ShieldCheck, Wallet, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function HowItWorks() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  const steps = [
    {
      n: 1,
      id: "chooseService",
      icon: SlidersHorizontal,
      badgeKey: "howItWorks.badges.step1",
      color: "border-[#00B8A9] text-[#00B8A9] bg-teal-50/50",
    },
    {
      n: 2,
      id: "selectProvider",
      icon: ShieldCheck,
      badgeKey: "howItWorks.badges.step2",
      color: "border-[#D4AF37] text-[#D4AF37] bg-amber-50/50",
    },
    {
      n: 3,
      id: "bookAndRelax",
      icon: Wallet,
      badgeKey: "howItWorks.badges.step3",
      color: "border-emerald-600 text-emerald-600 bg-emerald-50/50",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B8A9]">{t("howItWorks.tag")}</span>
          <h2 className="mt-3 text-3xl font-black text-[#0D1F1F] md:text-5xl">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-3xl bg-white p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:border-teal-200 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-xs font-black uppercase tracking-widest text-[#043A35] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                      {t("howItWorks.step", { n: s.n })}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${s.color}`}>
                      {t(s.badgeKey)}
                    </span>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-[#0D1F1F] text-[#D4AF37] flex items-center justify-center shadow-lg mb-6">
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  <h3 className="text-xl font-bold text-[#0D1F1F] mb-3">
                    {t(`howItWorks.steps.${s.id}.title`)}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-500">
                    {t(`howItWorks.steps.${s.id}.text`)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t("howItWorks.satisfaction", "100% Satisfaction Guaranteed")}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 rounded-full bg-[#0D1F1F] hover:bg-[#043A35] px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            {t("howItWorks.browseServices")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </section>
  );
}
