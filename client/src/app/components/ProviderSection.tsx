import { TrendingUp, CalendarClock, Wallet, ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const perkIds = [
  { id: "steadyLeads", icon: TrendingUp },
  { id: "flexibleSchedule", icon: CalendarClock },
  { id: "securePayments", icon: Wallet },
];

export function ProviderSection() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#043A35] via-[#064E3B] to-[#0D1F1F] p-8 md:p-16 text-white shadow-2xl border border-[#D4AF37]/30">
          {/* Geometric pattern accent */}
          <div className="pointer-events-none absolute inset-0 bg-islamic-pattern opacity-40" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <Building2 className="w-3.5 h-3.5" />
                {t("providerSection.tag")}
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight text-white md:text-5xl">
                {t("providerSection.title")}
              </h2>
              <p className="mt-4 max-w-lg text-white/80 text-sm md:text-base leading-relaxed">
                {t("providerSection.subtitle")}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/become-provider")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] hover:bg-[#F59E0B] px-8 py-4 text-sm font-bold text-[#0D1F1F] shadow-xl transition-all transform hover:scale-105"
                >
                  {t("providerSection.becomeProvider")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => navigate("/become-provider")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {t("providerSection.watchHowItWorks")}
                </button>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                <CheckCircle2 className="h-4 w-4" />
                <span>{t("providerSection.freeToJoin")}</span>
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
                    className="flex items-start gap-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 p-6 text-white shadow-xl transition hover:border-[#D4AF37]"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#D4AF37] text-[#0D1F1F] shadow-lg font-bold">
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{t(`providerSection.perks.${p.id}.title`)}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/70">{t(`providerSection.perks.${p.id}.text`)}</p>
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
