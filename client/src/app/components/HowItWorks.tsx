import { motion } from "motion/react";
import { Search, UserCheck, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const stepIds = [
  { n: "01", id: "chooseService", icon: Search },
  { n: "02", id: "selectProvider", icon: UserCheck },
  { n: "03", id: "bookAndRelax", icon: CalendarCheck },
];

export function HowItWorks() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">{t("howItWorks.tag")}</span>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
            {t("howItWorks.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Connector */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-16 hidden h-px bg-gradient-to-r from-transparent via-[#00B8A9]/60 to-transparent md:block" />

          {stepIds.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="group relative rounded-3xl border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -top-4 right-6 rounded-full bg-[#0d1f1f] px-3 py-1 text-[11px] font-bold tracking-widest text-[#00B8A9]">
                  {t("howItWorks.step", { n: s.n })}
                </div>
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal-50 text-[#0d1f1f] shadow-md">
                  <Icon className="h-7 w-7 text-[#00B8A9]" strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 text-center text-2xl font-bold text-[#0d1f1f]">{t(`howItWorks.steps.${s.id}.title`)}</h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-gray-500">{t(`howItWorks.steps.${s.id}.text`)}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => navigate("/services")}
            className="bg-[#00B8A9] hover:bg-[#009e96] text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            {t("howItWorks.browseServices")} →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
