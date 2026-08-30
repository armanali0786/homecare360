import { useRef, useState, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { useLocale, REGIONS, type RegionCode, type LanguageCode } from "../context/LocaleContext";

const REGION_FLAGS: Record<RegionCode, string> = {
  AE: "🇦🇪",
  SA: "🇸🇦",
  QA: "🇶🇦",
  IN: "🇮🇳",
};

interface LocaleSwitcherProps {
  variant?: "light" | "dark";
}

export function LocaleSwitcher({ variant = "light" }: LocaleSwitcherProps) {
  const { t } = useTranslation("common");
  const { language, region, setLanguage, setRegion, regionConfig } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const textClass = variant === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-[#00B8A9]";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${textClass}`}
        aria-label={t("language")}
      >
        <Globe className="h-4 w-4" />
        <span>{REGION_FLAGS[region]} {regionConfig.currency}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-full mt-2 w-64 rounded-xl border border-gray-100 bg-white py-2 shadow-xl z-50"
          >
            <p className="px-4 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              {t("language")}
            </p>
            {(["en", "ar"] as LanguageCode[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{lang === "en" ? t("english") : t("arabic")}</span>
                {language === lang && <Check className="h-4 w-4 text-[#00B8A9]" />}
              </button>
            ))}

            <div className="my-1.5 border-t border-gray-100" />

            <p className="px-4 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              {t("region")}
            </p>
            {(Object.keys(REGIONS) as RegionCode[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setRegion(code)}
                className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  <span>{REGION_FLAGS[code]}</span>
                  <span>{REGIONS[code].label}</span>
                  <span className="text-xs text-gray-400">({REGIONS[code].currency})</span>
                </span>
                {region === code && <Check className="h-4 w-4 text-[#00B8A9]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
