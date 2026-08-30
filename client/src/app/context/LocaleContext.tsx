import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export type RegionCode = "AE" | "SA" | "QA" | "IN";
export type LanguageCode = "en" | "ar";

interface RegionConfig {
  label: string;
  currency: string;
  vatRate: number;
  vatLabel: string;
  phoneCode: string;
  locale: string;
  lateFee: number;
  /** Approximate conversion applied to prices stored in INR in the DB. */
  fxRateFromINR: number;
  cities: string[];
}

export const REGIONS: Record<RegionCode, RegionConfig> = {
  AE: {
    label: "United Arab Emirates",
    currency: "AED",
    vatRate: 0.05,
    vatLabel: "VAT",
    phoneCode: "+971",
    locale: "en-AE",
    lateFee: 40,
    fxRateFromINR: 0.044,
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  },
  SA: {
    label: "Saudi Arabia",
    currency: "SAR",
    vatRate: 0.15,
    vatLabel: "VAT",
    phoneCode: "+966",
    locale: "en-SA",
    lateFee: 40,
    fxRateFromINR: 0.045,
    cities: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"],
  },
  QA: {
    label: "Qatar",
    currency: "QAR",
    vatRate: 0,
    vatLabel: "VAT",
    phoneCode: "+974",
    locale: "en-QA",
    lateFee: 35,
    fxRateFromINR: 0.044,
    cities: ["Doha", "Al Rayyan", "Al Wakrah"],
  },
  IN: {
    label: "India",
    currency: "INR",
    vatRate: 0.18,
    vatLabel: "GST",
    phoneCode: "+91",
    locale: "en-IN",
    lateFee: 100,
    fxRateFromINR: 1,
    cities: ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai", "Pune"],
  },
};

const LANG_KEY = "hc360_lang";
const REGION_KEY = "hc360_region";

interface LocaleContextType {
  language: LanguageCode;
  region: RegionCode;
  isRTL: boolean;
  setLanguage: (lang: LanguageCode) => void;
  setRegion: (region: RegionCode) => void;
  regionConfig: RegionConfig;
  /** Formats an amount that is stored in the DB as INR into the active region's currency. */
  formatCurrency: (amountInINR: number) => string;
  /** Converts an INR amount into the active region's currency as a raw number (no formatting). */
  convertCurrency: (amountInINR: number) => number;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const [language, setLanguageState] = useState<LanguageCode>(
    () => (localStorage.getItem(LANG_KEY) as LanguageCode) || "en"
  );
  const [region, setRegionState] = useState<RegionCode>(
    () => (localStorage.getItem(REGION_KEY) as RegionCode) || "AE"
  );

  const isRTL = language === "ar";

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, isRTL, i18n]);

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem(LANG_KEY, lang);
    setLanguageState(lang);
  };

  const setRegion = (r: RegionCode) => {
    localStorage.setItem(REGION_KEY, r);
    setRegionState(r);
  };

  const regionConfig = REGIONS[region];

  const convertCurrency = (amountInINR: number) =>
    Math.round(amountInINR * regionConfig.fxRateFromINR);

  const formatCurrency = (amountInINR: number) => {
    const converted = convertCurrency(amountInINR);
    try {
      return new Intl.NumberFormat(isRTL ? `ar-${region}` : regionConfig.locale, {
        style: "currency",
        currency: regionConfig.currency,
        maximumFractionDigits: 0,
      }).format(converted);
    } catch {
      return `${regionConfig.currency} ${converted.toLocaleString()}`;
    }
  };

  const value = useMemo(
    () => ({ language, region, isRTL, setLanguage, setRegion, regionConfig, formatCurrency, convertCurrency }),
    [language, region, isRTL, regionConfig]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
};
