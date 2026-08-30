import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, CheckCircle, ArrowRight, ShieldCheck,
  Wallet, Loader2, Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/app/components/SEO";
import { getServices } from "@/app/lib/api";
import { useLocale } from "@/app/context/LocaleContext";
import { useNavigate } from "react-router-dom";
import { QuoteAssistantChat } from "@/app/components/QuoteAssistantChat";

interface ApiService { _id: string; name: string; icon: string; basePrice: number; isEnabled: boolean; }

const PROPERTY_TYPES = [
  { id: "apartment",  icon: "🏢", multiplier: 0.8  },
  { id: "house",      icon: "🏠", multiplier: 1.0  },
  { id: "condo",      icon: "🏗️", multiplier: 0.9  },
  { id: "townhouse",  icon: "🏘️", multiplier: 0.95 },
  { id: "commercial", icon: "🏬", multiplier: 1.5  },
];

const PROPERTY_SIZES = [
  { id: "small",  multiplier: 0.8  },
  { id: "medium", multiplier: 1.0  },
  { id: "large",  multiplier: 1.3  },
  { id: "xlarge", multiplier: 1.6  },
];

const URGENCY = [
  { id: "standard",  multiplier: 1.0, emoji: "📆", tagColor: "emerald" },
  { id: "priority",  multiplier: 1.3, emoji: "⚡", tagColor: "amber"   },
  { id: "emergency", multiplier: 1.8, emoji: "🚨", tagColor: "red"     },
];

const ADDONS = [
  { id: "warranty",   price: 150, icon: "🛡️" },
  { id: "eco",        price: 200, icon: "🌿" },
  { id: "weekend",    price: 300, icon: "📅" },
  { id: "inspection", price: 200, icon: "🔍" },
];

const STEP_KEYS = ["service", "property", "size", "urgency", "addOns"];

const MultiplierBadge = ({ m }: { m: number }) => {
  const { t } = useTranslation("booking");
  if (m === 1.0) return <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{t("quoteEstimator.standard")}</span>;
  const savings = m < 1;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
      savings ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
    }`}>
      {savings ? `−${Math.round((1 - m) * 100)}%` : `+${Math.round((m - 1) * 100)}%`}
    </span>
  );
};

export function InstantQuoteEstimator() {
  const { t } = useTranslation("booking");
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"wizard" | "assistant">("wizard");
  const [step, setStep]       = useState(1);
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading]   = useState(true);
  const [quote, setQuote] = useState({
    service:      null as ApiService | null,
    propertyType: "",
    propertySize: "",
    urgency:      "standard",
    addOns:       [] as string[],
  });

  useEffect(() => {
    getServices()
      .then((d) => setServices((d.services ?? []).filter((s: ApiService) => s.isEnabled)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pType   = PROPERTY_TYPES.find((p) => p.id === quote.propertyType);
  const pSize   = PROPERTY_SIZES.find((s) => s.id === quote.propertySize);
  const urgency = URGENCY.find((u) => u.id === quote.urgency) ?? URGENCY[0];
  const addOns  = ADDONS.filter((a) => quote.addOns.includes(a.id));

  const subtotal = (() => {
    if (!quote.service) return 0;
    let p = quote.service.basePrice;
    if (pType) p *= pType.multiplier;
    if (pSize) p *= pSize.multiplier;
    p *= urgency.multiplier;
    return Math.round(p);
  })();

  const addOnsTotal = addOns.reduce((s, a) => s + a.price, 0);
  const grandTotal  = subtotal + addOnsTotal;

  const toggleAddon = (id: string) =>
    setQuote((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(id)
        ? prev.addOns.filter((x) => x !== id)
        : [...prev.addOns, id],
    }));

  const handleBook = () => navigate("/services");

  const resetQuote = () => {
    setQuote({ service: null, propertyType: "", propertySize: "", urgency: "standard", addOns: [] });
    setStep(1);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <SEO
        title={t("quoteEstimator.seoTitle")}
        url="/quote-estimator"
        description={t("quoteEstimator.seoDescription")}
        keywords={t("quoteEstimator.seoKeywords")}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00B8A9] via-[#009e96] to-[#2B5F5F] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-5"
          >
            <Calculator className="w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            {t("quoteEstimator.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-white/80"
          >
            {t("quoteEstimator.heroSubtitle")}
          </motion.p>

          <div className="mt-6 inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setMode("wizard")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                mode === "wizard" ? "bg-white text-[#0d1f1f]" : "text-white/80 hover:text-white"
              }`}
            >
              {t("quoteEstimator.modeWizard")}
            </button>
            <button
              onClick={() => setMode("assistant")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                mode === "assistant" ? "bg-white text-[#0d1f1f]" : "text-white/80 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t("quoteEstimator.modeAssistant")}
            </button>
          </div>
        </div>
      </section>

      {mode === "assistant" ? (
        <div className="max-w-2xl mx-auto px-4 py-10">
          <QuoteAssistantChat />
        </div>
      ) : (
      <>
      {/* Step progress bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[64px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            {STEP_KEYS.map((key, i) => {
              const label = t(`quoteEstimator.steps.${key}`);
              const sn   = i + 1;
              const done = step > sn;
              const active = step === sn;
              return (
                <button
                  key={key}
                  onClick={() => done && setStep(sn)}
                  disabled={!done}
                  className={`flex-1 py-3.5 text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1 ${
                    active ? "border-[#00B8A9] text-[#00B8A9]" :
                    done   ? "border-emerald-400 text-emerald-600 hover:bg-gray-50 cursor-pointer" :
                             "border-transparent text-gray-400 cursor-default"
                  }`}
                >
                  {done && <CheckCircle className="w-3.5 h-3.5 hidden sm:inline" />}
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden font-bold">{sn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:grid lg:grid-cols-[1fr_340px] gap-8 items-start">

        {/* ── LEFT: Wizard ── */}
        <div className="mb-8 lg:mb-0">
          <AnimatePresence mode="wait">

            {/* Step 1 — Service */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("quoteEstimator.step1.title")}</h2>
                <p className="text-sm text-gray-500 mb-6">{t("quoteEstimator.step1.subtitle")}</p>

                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin" />
                    <p>{t("quoteEstimator.step1.loading")}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((svc, i) => (
                      <motion.button
                        key={svc._id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,184,169,0.15)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setQuote({ ...quote, service: svc }); setStep(2); }}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${
                          quote.service?._id === svc._id
                            ? "border-[#00B8A9] bg-cyan-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-[#00B8A9]"
                        }`}
                      >
                        <div className="text-3xl mb-3">{svc.icon}</div>
                        <div className="text-sm font-bold text-gray-900 leading-tight">{svc.name}</div>
                        <div className="text-xs text-[#00B8A9] font-semibold mt-1">{t("quoteEstimator.step1.from", { price: formatCurrency(svc.basePrice) })}</div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2 — Property Type */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("quoteEstimator.step2.title")}</h2>
                <p className="text-sm text-gray-500 mb-6">{t("quoteEstimator.step2.subtitle")}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {PROPERTY_TYPES.map((pt, i) => (
                    <motion.button
                      key={pt.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setQuote({ ...quote, propertyType: pt.id }); setStep(3); }}
                      className={`p-5 rounded-2xl border-2 text-center transition-all ${
                        quote.propertyType === pt.id
                          ? "border-[#00B8A9] bg-cyan-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-[#00B8A9] hover:shadow-md"
                      }`}
                    >
                      <div className="text-3xl mb-2">{pt.icon}</div>
                      <div className="text-sm font-bold text-gray-900">{t(`quoteEstimator.propertyType.${pt.id}`)}</div>
                      <MultiplierBadge m={pt.multiplier} />
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                  {t("quoteEstimator.step2.back")}
                </button>
              </motion.div>
            )}

            {/* Step 3 — Property Size */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("quoteEstimator.step3.title")}</h2>
                <p className="text-sm text-gray-500 mb-6">{t("quoteEstimator.step3.subtitle")}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {PROPERTY_SIZES.map((ps, i) => (
                    <motion.button
                      key={ps.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setQuote({ ...quote, propertySize: ps.id }); setStep(4); }}
                      className={`p-5 rounded-2xl border-2 text-left transition-all ${
                        quote.propertySize === ps.id
                          ? "border-[#00B8A9] bg-cyan-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-[#00B8A9] hover:shadow-md"
                      }`}
                    >
                      <div className="text-2xl mb-2">📐</div>
                      <div className="text-sm font-bold text-gray-900">{t(`quoteEstimator.propertySize.${ps.id}.name`)}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{t(`quoteEstimator.propertySize.${ps.id}.desc`)}</div>
                      <div className="mt-2">
                        <MultiplierBadge m={ps.multiplier} />
                      </div>
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                  {t("quoteEstimator.step3.back")}
                </button>
              </motion.div>
            )}

            {/* Step 4 — Urgency */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("quoteEstimator.step4.title")}</h2>
                <p className="text-sm text-gray-500 mb-6">{t("quoteEstimator.step4.subtitle")}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mb-6">
                  {URGENCY.map((u, i) => (
                    <motion.button
                      key={u.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setQuote({ ...quote, urgency: u.id }); setStep(5); }}
                      className={`p-5 rounded-2xl border-2 text-left transition-all ${
                        quote.urgency === u.id
                          ? "border-[#00B8A9] bg-cyan-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-[#00B8A9] hover:shadow-md"
                      }`}
                    >
                      <div className="text-2xl mb-2">{u.emoji}</div>
                      <div className="text-sm font-bold text-gray-900 mb-0.5">{t(`quoteEstimator.urgency.${u.id}.name`)}</div>
                      <div className="text-xs text-gray-500 mb-2">{t(`quoteEstimator.urgency.${u.id}.desc`)}</div>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        u.tagColor === "emerald" ? "bg-emerald-50 text-emerald-600" :
                        u.tagColor === "amber"   ? "bg-amber-50 text-amber-600"     :
                                                    "bg-red-50 text-red-600"
                      }`}>
                        {t(`quoteEstimator.urgency.${u.id}.tag`)}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => setStep(3)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                  {t("quoteEstimator.step4.back")}
                </button>
              </motion.div>
            )}

            {/* Step 5 — Add-ons */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("quoteEstimator.step5.title")}</h2>
                <p className="text-sm text-gray-500 mb-6">{t("quoteEstimator.step5.subtitle")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {ADDONS.map((addon, i) => {
                    const selected = quote.addOns.includes(addon.id);
                    return (
                      <motion.button
                        key={addon.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                          selected
                            ? "border-[#00B8A9] bg-cyan-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-[#00B8A9] hover:shadow-md"
                        }`}
                      >
                        <span className="text-2xl flex-shrink-0">{addon.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-gray-900">{t(`quoteEstimator.addOn.${addon.id}.name`)}</span>
                            {selected && <CheckCircle className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{t(`quoteEstimator.addOn.${addon.id}.desc`)}</div>
                          <div className="text-xs font-semibold text-[#00B8A9] mt-1.5">+{formatCurrency(addon.price)}</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button onClick={() => setStep(4)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                    {t("quoteEstimator.step5.back")}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBook}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    {t("quoteEstimator.step5.findProviders", { service: quote.service?.name })}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Live Price Summary ── */}
        <div className="lg:sticky lg:top-[120px]">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">

            {/* Price header */}
            <div className="bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 opacity-70" />
                <span className="text-xs font-semibold uppercase tracking-widest opacity-70">{t("quoteEstimator.summary.liveEstimate")}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={grandTotal}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl font-bold"
                >
                  {quote.service ? formatCurrency(grandTotal) : "—"}
                </motion.div>
              </AnimatePresence>
              <p className="text-xs opacity-60 mt-1.5">{t("quoteEstimator.summary.estimatedNote")}</p>
            </div>

            {/* Breakdown */}
            <div className="p-5">
              {!quote.service ? (
                <div className="text-center py-8 text-gray-400">
                  <Wallet className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">{t("quoteEstimator.summary.selectPrompt")}</p>
                </div>
              ) : (
                <div className="space-y-0">

                  {/* Service base */}
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-600 flex items-center gap-1.5">
                      <span>{quote.service.icon}</span> {quote.service.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(quote.service.basePrice)}</span>
                  </div>

                  {/* Property type */}
                  {pType && (
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{pType.icon} {t(`quoteEstimator.propertyType.${pType.id}`)}</span>
                      <MultiplierBadge m={pType.multiplier} />
                    </div>
                  )}
                  {!pType && step > 1 && (
                    <div className="py-2.5 border-b border-gray-100 text-xs text-gray-400 italic">{t("quoteEstimator.summary.propertyTypeNotSelected")}</div>
                  )}

                  {/* Property size */}
                  {pSize && (
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-sm text-gray-600">📐 {t(`quoteEstimator.propertySize.${pSize.id}.name`)}</span>
                      <MultiplierBadge m={pSize.multiplier} />
                    </div>
                  )}
                  {!pSize && step > 2 && (
                    <div className="py-2.5 border-b border-gray-100 text-xs text-gray-400 italic">{t("quoteEstimator.summary.sizeNotSelected")}</div>
                  )}

                  {/* Urgency */}
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{urgency.emoji} {t(`quoteEstimator.urgency.${urgency.id}.name`)}</span>
                    <MultiplierBadge m={urgency.multiplier} />
                  </div>

                  {/* Subtotal (shows when at least property type is chosen) */}
                  {(pType || pSize) && (
                    <div className="flex items-center justify-between py-2.5 border-b border-dashed border-gray-200 bg-gray-50 -mx-5 px-5">
                      <span className="text-sm text-gray-500 font-medium">{t("quoteEstimator.summary.subtotal")}</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(subtotal)}</span>
                    </div>
                  )}

                  {/* Add-ons */}
                  {addOns.length > 0 && (
                    <div className="pt-2">
                      {addOns.map((a) => (
                        <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">{a.icon} {t(`quoteEstimator.addOn.${a.id}.name`)}</span>
                          <span className="text-sm font-medium text-[#00B8A9]">+{formatCurrency(a.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Grand total */}
                  <div className="flex items-center justify-between pt-3 mt-1">
                    <span className="font-bold text-gray-900">{t("quoteEstimator.summary.totalEstimate")}</span>
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 1.1, color: "#00B8A9" }}
                      animate={{ scale: 1, color: "#111827" }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold"
                    >
                      {formatCurrency(grandTotal)}
                    </motion.span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBook}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    {t("quoteEstimator.summary.browseProviders", { service: quote.service.name })}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <button
                    onClick={resetQuote}
                    className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {t("quoteEstimator.summary.startOver")}
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    {t("quoteEstimator.summary.verifiedNote")}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          {quote.service && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700"
            >
              <p className="font-semibold mb-1">{t("quoteEstimator.tip.title")}</p>
              <p>{t("quoteEstimator.tip.text")}</p>
            </motion.div>
          )}
        </div>
      </div>
      </>
      )}

      {/* Info strip */}
      <section className="py-14 px-4 bg-white border-t border-gray-100 mt-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: "⚡", key: "instant" },
            { icon: "🔒", key: "noFees" },
            { icon: "🛡️", key: "verified" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`quoteEstimator.infoStrip.${item.key}.title`)}</h3>
              <p className="text-sm text-gray-500">{t(`quoteEstimator.infoStrip.${item.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
