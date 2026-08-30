import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Gift, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function RamadanBanner() {
  const { t } = useTranslation("home");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative z-40 bg-gradient-to-r from-[#043A35] via-[#064E3B] to-[#0D1F1F] text-white shadow-md border-b border-[#D4AF37]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-[#0D1F1F] shadow-sm">
              <Gift className="h-3 w-3" />
              {t("ramadanBanner.badge")}
            </span>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D4AF37] hidden md:block" />
              <p className="font-medium text-white/95">
                <span className="font-bold text-[#D4AF37]">{t("ramadanBanner.title")}:</span>{" "}
                {t("ramadanBanner.subtitle")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] hover:bg-[#F59E0B] px-3.5 py-1 text-xs font-bold text-[#0D1F1F] transition-all transform hover:scale-105"
            >
              {t("ramadanBanner.cta")}
              <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={t("ramadanBanner.dismiss")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
