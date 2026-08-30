import { motion } from "motion/react";
import { ShieldCheck, CreditCard, Banknote, Smartphone, Split, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function PaymentMethodsRow() {
  const { t } = useTranslation("home");

  const methods = [
    {
      id: "cod",
      titleKey: "paymentMethods.cashOnDelivery",
      icon: Banknote,
      color: "from-emerald-50 to-teal-50 border-emerald-200 text-emerald-900",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      id: "applePay",
      titleKey: "paymentMethods.applePay",
      icon: Smartphone,
      color: "from-gray-900 to-slate-900 border-gray-800 text-white",
      iconBg: "bg-white text-black",
    },
    {
      id: "tabby",
      titleKey: "paymentMethods.tabby",
      icon: Split,
      color: "from-emerald-900 to-[#043A35] border-[#D4AF37]/30 text-white",
      iconBg: "bg-[#D4AF37] text-[#0D1F1F]",
    },
    {
      id: "tamara",
      titleKey: "paymentMethods.tamara",
      icon: Sparkles,
      color: "from-amber-900/90 to-yellow-900/80 border-amber-500/30 text-white",
      iconBg: "bg-amber-400 text-amber-950",
    },
    {
      id: "cards",
      titleKey: "paymentMethods.cards",
      icon: CreditCard,
      color: "from-slate-800 to-slate-900 border-slate-700 text-white",
      iconBg: "bg-teal-500 text-white",
    },
  ];

  return (
    <section className="py-16 bg-[#0D1F1F] text-white relative overflow-hidden border-y border-[#D4AF37]/20">
      {/* Geometric background accent */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            {t("paymentMethods.tag")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl text-white">
            {t("paymentMethods.title")}
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70">
            {t("paymentMethods.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {methods.map((m, i) => {
            const Icon = m.icon;
            const title = t(m.titleKey);
            const badge = t(`paymentMethods.badges.${m.id}`);
            const sub = t(`paymentMethods.subs.${m.id}`);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative flex flex-col justify-between rounded-2xl border bg-gradient-to-b p-5 backdrop-blur shadow-lg hover:border-[#D4AF37] transition-all duration-300 ${m.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${m.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/10 text-[#D4AF37] border border-[#D4AF37]/20">
                      {badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug">{title}</h3>
                  <p className="text-xs text-white/70 mt-1">{sub}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37]">
                  <CheckIcon />
                  <span>{t("paymentMethods.zeroInterest")}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-[#D4AF37]" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}
