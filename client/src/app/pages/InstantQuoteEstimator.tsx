import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, CheckCircle, ArrowRight, ShieldCheck,
  IndianRupee, Loader2, Sparkles,
} from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { getServices } from "@/app/lib/api";
import { useNavigate } from "react-router-dom";

interface ApiService { _id: string; name: string; icon: string; basePrice: number; isEnabled: boolean; }

const PROPERTY_TYPES = [
  { id: "apartment",  name: "Apartment",   icon: "🏢", multiplier: 0.8  },
  { id: "house",      name: "House",        icon: "🏠", multiplier: 1.0  },
  { id: "condo",      name: "Condo",        icon: "🏗️", multiplier: 0.9  },
  { id: "townhouse",  name: "Townhouse",    icon: "🏘️", multiplier: 0.95 },
  { id: "commercial", name: "Commercial",   icon: "🏬", multiplier: 1.5  },
];

const PROPERTY_SIZES = [
  { id: "small",  name: "Small",       desc: "< 1,000 sq ft",     multiplier: 0.8  },
  { id: "medium", name: "Medium",      desc: "1,000–2,000 sq ft", multiplier: 1.0  },
  { id: "large",  name: "Large",       desc: "2,000–3,000 sq ft", multiplier: 1.3  },
  { id: "xlarge", name: "Extra Large", desc: "> 3,000 sq ft",     multiplier: 1.6  },
];

const URGENCY = [
  { id: "standard",  name: "Standard",  desc: "3–5 business days", multiplier: 1.0, emoji: "📆", tag: "Best Value",  tagColor: "emerald" },
  { id: "priority",  name: "Priority",  desc: "1–2 days",           multiplier: 1.3, emoji: "⚡", tag: "+30%",        tagColor: "amber"   },
  { id: "emergency", name: "Emergency", desc: "Same day",            multiplier: 1.8, emoji: "🚨", tag: "+80%",        tagColor: "red"     },
];

const ADDONS = [
  { id: "warranty",   name: "Extended Warranty", desc: "12-month parts & labor coverage", price: 150, icon: "🛡️" },
  { id: "eco",        name: "Eco-Friendly",       desc: "Sustainable, low-impact materials", price: 200, icon: "🌿" },
  { id: "weekend",    name: "Weekend Service",    desc: "Saturday & Sunday availability",   price: 300, icon: "📅" },
  { id: "inspection", name: "Full Inspection",    desc: "Detailed written report included", price: 200, icon: "🔍" },
];

const STEPS = ["Service", "Property", "Size", "Urgency", "Add-ons"];

const fmt = (n: number) => n.toLocaleString("en-IN");

const MultiplierBadge = ({ m }: { m: number }) => {
  if (m === 1.0) return <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Standard</span>;
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
  const navigate = useNavigate();
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
        title="Instant Quote Estimator"
        url="/quote-estimator"
        description="Get an instant price estimate for home care services. Live pricing as you configure — no waiting, no callbacks."
        keywords="home care cost estimator, instant quote, home service price calculator"
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
            Instant Quote Estimator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-white/80"
          >
            Live pricing updates as you configure — no waiting, no callbacks
          </motion.p>
        </div>
      </section>

      {/* Step progress bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[64px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            {STEPS.map((label, i) => {
              const sn   = i + 1;
              const done = step > sn;
              const active = step === sn;
              return (
                <button
                  key={label}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What service do you need?</h2>
                <p className="text-sm text-gray-500 mb-6">Choose a service to see live pricing on the right</p>

                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin" />
                    <p>Loading services…</p>
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
                        <div className="text-xs text-[#00B8A9] font-semibold mt-1">from ₹{fmt(svc.basePrice)}</div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2 — Property Type */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of property?</h2>
                <p className="text-sm text-gray-500 mb-6">Property type affects the base rate</p>
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
                      <div className="text-sm font-bold text-gray-900">{pt.name}</div>
                      <MultiplierBadge m={pt.multiplier} />
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                  ← Back to Services
                </button>
              </motion.div>
            )}

            {/* Step 3 — Property Size */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How large is your property?</h2>
                <p className="text-sm text-gray-500 mb-6">Larger properties take more time and materials</p>
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
                      <div className="text-sm font-bold text-gray-900">{ps.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{ps.desc}</div>
                      <div className="mt-2">
                        <MultiplierBadge m={ps.multiplier} />
                      </div>
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                  ← Back
                </button>
              </motion.div>
            )}

            {/* Step 4 — Urgency */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">When do you need it?</h2>
                <p className="text-sm text-gray-500 mb-6">Faster scheduling comes at a premium</p>
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
                      <div className="text-sm font-bold text-gray-900 mb-0.5">{u.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{u.desc}</div>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        u.tagColor === "emerald" ? "bg-emerald-50 text-emerald-600" :
                        u.tagColor === "amber"   ? "bg-amber-50 text-amber-600"     :
                                                    "bg-red-50 text-red-600"
                      }`}>
                        {u.tag}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => setStep(3)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                  ← Back
                </button>
              </motion.div>
            )}

            {/* Step 5 — Add-ons */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Any add-ons?</h2>
                <p className="text-sm text-gray-500 mb-6">Optional — select any that apply. Price updates live.</p>
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
                            <span className="text-sm font-bold text-gray-900">{addon.name}</span>
                            {selected && <CheckCircle className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{addon.desc}</div>
                          <div className="text-xs font-semibold text-[#00B8A9] mt-1.5">+₹{fmt(addon.price)}</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button onClick={() => setStep(4)} className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] font-medium transition-colors">
                    ← Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBook}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Find {quote.service?.name} Providers
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
                <span className="text-xs font-semibold uppercase tracking-widest opacity-70">Live Estimate</span>
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
                  {quote.service ? `₹${fmt(grandTotal)}` : "—"}
                </motion.div>
              </AnimatePresence>
              <p className="text-xs opacity-60 mt-1.5">Estimated · final price set by provider</p>
            </div>

            {/* Breakdown */}
            <div className="p-5">
              {!quote.service ? (
                <div className="text-center py-8 text-gray-400">
                  <IndianRupee className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Select a service to see your live estimate</p>
                </div>
              ) : (
                <div className="space-y-0">

                  {/* Service base */}
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-600 flex items-center gap-1.5">
                      <span>{quote.service.icon}</span> {quote.service.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">₹{fmt(quote.service.basePrice)}</span>
                  </div>

                  {/* Property type */}
                  {pType && (
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{pType.icon} {pType.name}</span>
                      <MultiplierBadge m={pType.multiplier} />
                    </div>
                  )}
                  {!pType && step > 1 && (
                    <div className="py-2.5 border-b border-gray-100 text-xs text-gray-400 italic">Property type: not selected</div>
                  )}

                  {/* Property size */}
                  {pSize && (
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-sm text-gray-600">📐 {pSize.name}</span>
                      <MultiplierBadge m={pSize.multiplier} />
                    </div>
                  )}
                  {!pSize && step > 2 && (
                    <div className="py-2.5 border-b border-gray-100 text-xs text-gray-400 italic">Size: not selected</div>
                  )}

                  {/* Urgency */}
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{urgency.emoji} {urgency.name}</span>
                    <MultiplierBadge m={urgency.multiplier} />
                  </div>

                  {/* Subtotal (shows when at least property type is chosen) */}
                  {(pType || pSize) && (
                    <div className="flex items-center justify-between py-2.5 border-b border-dashed border-gray-200 bg-gray-50 -mx-5 px-5">
                      <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                      <span className="text-sm font-bold text-gray-900">₹{fmt(subtotal)}</span>
                    </div>
                  )}

                  {/* Add-ons */}
                  {addOns.length > 0 && (
                    <div className="pt-2">
                      {addOns.map((a) => (
                        <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">{a.icon} {a.name}</span>
                          <span className="text-sm font-medium text-[#00B8A9]">+₹{fmt(a.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Grand total */}
                  <div className="flex items-center justify-between pt-3 mt-1">
                    <span className="font-bold text-gray-900">Total Estimate</span>
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 1.1, color: "#00B8A9" }}
                      animate={{ scale: 1, color: "#111827" }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold"
                    >
                      ₹{fmt(grandTotal)}
                    </motion.span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBook}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    Browse {quote.service.name} Providers
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <button
                    onClick={resetQuote}
                    className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Start over
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    All providers are verified & background-checked
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
              <p className="font-semibold mb-1">💡 Save money tip</p>
              <p>Standard scheduling costs up to 80% less than emergency rates. Book 3+ days ahead for the best value.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Info strip */}
      <section className="py-14 px-4 bg-white border-t border-gray-100 mt-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "Instant Estimates",  desc: "Live pricing that updates as you configure — no forms, no waiting." },
            { icon: "🔒", title: "No Hidden Fees",     desc: "Every cost factor is shown upfront in the breakdown." },
            { icon: "🛡️", title: "Verified Providers", desc: "Every provider on our platform is background-checked and insured." },
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
