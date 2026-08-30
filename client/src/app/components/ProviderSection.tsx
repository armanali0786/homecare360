import { TrendingUp, CalendarClock, Wallet, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";

const perkIds = [
  { id: "steadyLeads", icon: TrendingUp },
  { id: "flexibleSchedule", icon: CalendarClock },
  { id: "securePayments", icon: Wallet },
];

export function ProviderSection() {
  const { t } = useTranslation("home");
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[44px] bg-teal-50 p-10 shadow-xl md:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#00B8A9]/20 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#00B8A9]/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#00897b]">
              {t("providerSection.tag")}
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#0d1f1f] md:text-5xl">
              {t("providerSection.title")}
            </h2>
            <p className="mt-4 max-w-lg text-[#0d1f1f]/70">
              {t("providerSection.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/become-provider")}
                className="inline-flex items-center gap-2 rounded-full bg-[#0d1f1f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#0d1f1f]/90"
              >
                {t("providerSection.becomeProvider")} <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/become-provider")}
                className="inline-flex items-center gap-2 rounded-full border border-[#0d1f1f]/20 bg-white/60 px-6 py-4 text-sm font-semibold text-[#0d1f1f] backdrop-blur transition hover:bg-white/80"
              >
                {t("providerSection.watchHowItWorks")}
              </button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs text-[#0d1f1f]/60">
              <CheckCircle2 className="h-4 w-4" /> {t("providerSection.freeToJoin", { amount: formatCurrency(45000) })}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-4"
          >
            {perkIds.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl bg-[#0d1f1f] p-5 text-white shadow-xl transition hover:-translate-y-0.5"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#00B8A9] text-[#0d1f1f]">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{t(`providerSection.perks.${p.id}.title`)}</h3>
                    <p className="mt-1 text-sm text-white/65">{t(`providerSection.perks.${p.id}.text`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
