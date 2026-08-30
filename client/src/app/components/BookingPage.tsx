import { motion } from "motion/react";
import {
  ArrowLeft, Check, Calendar, Clock, MapPin, ShieldCheck, Star, Tag,
  Home, Banknote, CheckCircle2, ChevronRight, X, CreditCard,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getProviderById, createBooking, createStripeSession } from "@/app/lib/api";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useUser } from "@/app/context/UserContext";
import { useLocale } from "@/app/context/LocaleContext";
import { toast } from "react-toastify";

// ── Data ──────────────────────────────────────────────────────────────────────

const ADD_ONS_MAP: Record<string, Array<{ id: string; label: string; price: number }>> = {
  "Home Cleaning": [
    { id: "fridge",   label: "Inside fridge cleaning",   price: 299 },
    { id: "oven",     label: "Inside oven cleaning",     price: 199 },
    { id: "balcony",  label: "Balcony deep clean",       price: 149 },
    { id: "sofa",     label: "Sofa vacuuming",           price: 249 },
    { id: "cupboard", label: "Inside cupboard cleaning", price: 199 },
  ],
  "Plumbing": [
    { id: "drain",  label: "Drain unblocking",      price: 349 },
    { id: "heater", label: "Water heater check",    price: 199 },
    { id: "toilet", label: "Flush mechanism repair", price: 249 },
  ],
  "Electrical": [
    { id: "fan",   label: "Ceiling fan installation", price: 199 },
    { id: "light", label: "Light / fixture fitting",  price: 149 },
    { id: "mcb",   label: "MCB / circuit breaker",    price: 299 },
  ],
  "AC Repair": [
    { id: "deep_coil",  label: "Deep coil cleaning",       price: 399  },
    { id: "gas",        label: "Gas top-up (refrigerant)", price: 1499 },
    { id: "stabilizer", label: "PCB / stabilizer check",   price: 199  },
  ],
  "Painting": [
    { id: "putty",   label: "Extra wall putty (100 sqft)", price: 999 },
    { id: "primer",  label: "Premium primer coat",         price: 599 },
    { id: "ceiling", label: "Ceiling painting",            price: 799 },
  ],
  "Pest Control": [
    { id: "bed_bug", label: "Bed bug treatment", price: 499 },
    { id: "termite", label: "Termite control",   price: 699 },
    { id: "rodent",  label: "Rodent control",    price: 399 },
  ],
  "Carpentry": [
    { id: "polish",   label: "Wood polish / finishing",    price: 399 },
    { id: "hardware", label: "Hardware replacement (5 pcs)", price: 249 },
  ],
};

const FALLBACK_ADD_ONS = [
  { id: "express", label: "Express / same-day booking", price: 299 },
  { id: "weekend", label: "Weekend / holiday slot",     price: 200 },
];

const TIME_GROUPS = [
  { key: "morning",   slots: ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"] },
  { key: "afternoon", slots: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]  },
  { key: "evening",   slots: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"]              },
];

const PROPERTY_TYPES = [
  { id: "apartment" },
  { id: "villa"     },
  { id: "house"     },
];

const PROPERTY_SIZES = ["studio", "1br", "2br", "3br", "4brplus"];

const PROMOS: Record<string, { type: "percent" | "flat"; value: number }> = {
  "WELCOME10": { type: "percent", value: 10 },
  "HC50":      { type: "flat",    value: 50 },
  "NEWUSER":   { type: "percent", value: 15 },
};

const STEP_KEYS = ["serviceDetails", "schedule", "address", "reviewPay"];

// ── Step bar ──────────────────────────────────────────────────────────────────

function StepBar({ current }: { current: number }) {
  const { t } = useTranslation("booking");
  return (
    <div className="flex items-start mb-8">
      {STEP_KEYS.map((key, i) => {
        const label  = t(`bookingPage.steps.${key}`);
        const num    = i + 1;
        const done   = num < current;
        const active = num === current;
        return (
          <div key={key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  done    ? "bg-[#00B8A9] text-white" :
                  active  ? "bg-[#00B8A9] text-white ring-4 ring-[#00B8A9]/20" :
                            "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : num}
              </div>
              <p className={`text-[11px] mt-1.5 font-medium whitespace-nowrap hidden sm:block ${
                active ? "text-[#00B8A9]" : done ? "text-gray-500" : "text-gray-400"
              }`}>
                {label}
              </p>
            </div>
            {i < STEP_KEYS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-14px] ${done ? "bg-[#00B8A9]" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Provider summary strip ────────────────────────────────────────────────────

function ProviderSummary({ provider }: { provider: any }) {
  const { t } = useTranslation("booking");
  const { formatCurrency } = useLocale();
  const name     = provider.businessName || `${provider.firstName} ${provider.lastName}`.trim();
  const imageSrc = provider.profileImage
    ? `https://homecare360.onrender.com/uploads/${provider.profileImage}`
    : "";
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <ImageWithFallback src={imageSrc} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
        <p className="text-xs text-[#00B8A9] font-medium">{provider.serviceCategory}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">
            {provider.rating || "New"} ({provider.reviewCount || 0})
          </span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[11px] text-gray-400">{t("bookingPage.startingFrom")}</p>
        <p className="text-lg font-bold text-gray-900">
          {formatCurrency(provider.hourlyRate * 2)}
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function BookingPage() {
  const { t }           = useTranslation("booking");
  const { region, regionConfig, formatCurrency } = useLocale();
  const { providerId }  = useParams();
  const navigate        = useNavigate();
  const { user }        = useUser();
  const today           = new Date().toISOString().split("T")[0];
  const isIndia         = region === "IN";

  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading]   = useState(true);
  const [step, setStep]         = useState(1);
  const [direction, setDirection] = useState(1);

  // Step 1
  const [propertyType, setPropertyType]               = useState("apartment");
  const [propertySize, setPropertySize]               = useState("2br");
  const [addOnIds, setAddOnIds]                       = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Step 2
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Step 3
  const [address, setAddress]               = useState("");
  const [floorLandmark, setFloorLandmark]   = useState("");
  const [phone, setPhone]                   = useState("");

  // Step 4
  const [promoInput, setPromoInput]     = useState("");
  const [appliedPromo, setAppliedPromo] = useState<null | {
    type: "percent" | "flat"; value: number; code: string
  }>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">(isIndia ? "cod" : "stripe");
  const [submitting, setSubmitting]       = useState(false);
  const [confirmed, setConfirmed]         = useState<any>(null);

  useEffect(() => {
    if (!providerId) return;
    getProviderById(providerId)
      .then((d) => setProvider(d.provider))
      .catch(() => setProvider(null))
      .finally(() => setLoading(false));
  }, [providerId]);

  // ── Derived pricing ──────────────────────────────────────────────────────────
  const allAddOns   = provider ? (ADD_ONS_MAP[provider.serviceCategory] || FALLBACK_ADD_ONS) : [];
  const activeAddOns = allAddOns.filter((a) => addOnIds.includes(a.id));
  const basePrice   = provider ? provider.hourlyRate * 2 : 0;
  const addOnsTotal = activeAddOns.reduce((s, a) => s + a.price, 0);
  const subtotal    = basePrice + addOnsTotal;
  const discountAmt = appliedPromo
    ? appliedPromo.type === "percent"
      ? Math.round((subtotal * appliedPromo.value) / 100)
      : Math.min(appliedPromo.value, subtotal)
    : 0;
  const afterDiscount = subtotal - discountAmt;
  const gstAmt        = Math.round(afterDiscount * regionConfig.vatRate);
  const totalAmount   = afterDiscount + gstAmt;

  const getPromoLabel = (code: string, p: { type: "percent" | "flat"; value: number }) =>
    p.type === "flat" ? t(`promo.${code}`, { amount: formatCurrency(p.value) }) : t(`promo.${code}`);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const p = PROMOS[code];
    if (!p) { toast.error(t("bookingPage.errors.invalidPromo")); return; }
    setAppliedPromo({ ...p, code });
    toast.success(t("bookingPage.promoApplied", { label: getPromoLabel(code, p) }));
  };

  const validateStep = (s: number): boolean => {
    if (s === 2 && !selectedDate) { toast.error(t("bookingPage.errors.selectDate")); return false; }
    if (s === 2 && !selectedSlot) { toast.error(t("bookingPage.errors.selectSlot")); return false; }
    if (s === 3 && !address.trim()) { toast.error(t("bookingPage.errors.enterAddress")); return false; }
    if (s === 3 && !phone.trim()) { toast.error(t("bookingPage.errors.enterPhone")); return false; }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.info(t("bookingPage.errors.loginRequired"));
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      const result = await createBooking({
        providerId: provider._id,
        serviceCategory: provider.serviceCategory,
        date: selectedDate,
        time: selectedSlot,
        location: address,
        totalAmount,
        propertyType,
        propertySize,
        addOns: activeAddOns.map((a) => ({ name: a.label, price: a.price })),
        specialInstructions,
        floorLandmark,
        paymentMethod,
        promoCode: appliedPromo ? appliedPromo.code : "",
        discountAmount: discountAmt,
        gstAmount: gstAmt,
      });

      // For Stripe: redirect to checkout
      if (paymentMethod === "stripe") {
        const session = await createStripeSession(result.booking._id);
        if (session.url) {
          window.location.href = session.url;
          return;
        }
      }

      setConfirmed(result.booking);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast.error(err.message || t("bookingPage.errors.bookingFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading / error ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B8A9]" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-500 mb-3">{t("bookingPage.providerNotFound")}</p>
          <button onClick={() => navigate(-1)} className="text-[#00B8A9] hover:underline text-sm">
            {t("bookingPage.goBack")}
          </button>
        </div>
      </div>
    );
  }

  // ── Confirmation screen ──────────────────────────────────────────────────────
  if (confirmed) {
    const providerName = provider.businessName || `${provider.firstName} ${provider.lastName}`.trim();
    const bookingRef   = `HC-${(confirmed._id || "").slice(-8).toUpperCase()}`;
    const gcalDate     = selectedDate.replace(/-/g, "");
    const gcalUrl      = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${provider.serviceCategory} — HomeCare360`)}&dates=${gcalDate}/${gcalDate}&details=${encodeURIComponent(`Booking: ${bookingRef}\nProvider: ${providerName}\nAddress: ${address}`)}&location=${encodeURIComponent(address)}`;

    return (
      <div className="min-h-screen bg-gray-50 pt-12 pb-16">
        <div className="max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden"
          >
            {/* Success banner */}
            <div className="bg-[#00B8A9] px-8 py-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, delay: 0.2 }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-1">{t("bookingPage.confirmation.title")}</h1>
              <p className="text-white/80 text-sm">{t("bookingPage.confirmation.subtitle")}</p>
            </div>

            <div className="p-6 space-y-4">
              {/* Booking ref */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">{t("bookingPage.confirmation.bookingReference")}</p>
                <p className="text-xl font-bold text-gray-900 tracking-widest">{bookingRef}</p>
              </div>

              {/* Detail rows */}
              {[
                { icon: Home,     label: t("bookingPage.confirmation.service"),  value: provider.serviceCategory },
                { icon: Star,     label: t("bookingPage.confirmation.provider"), value: providerName             },
                { icon: Calendar, label: t("bookingPage.confirmation.date"),     value: selectedDate             },
                { icon: Clock,    label: t("bookingPage.confirmation.time"),     value: selectedSlot             },
                { icon: MapPin,   label: t("bookingPage.confirmation.address"),  value: address                  },
                { icon: Banknote, label: t("bookingPage.confirmation.payment"),  value: isIndia
                    ? t("bookingPage.confirmation.paymentValueCODIN")
                    : t("bookingPage.confirmation.paymentValueCOD") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                    <p className="text-sm font-semibold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">{t("bookingPage.confirmation.totalAmount")}</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              {/* What to expect */}
              <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-cyan-700 mb-1.5">{t("bookingPage.confirmation.whatNext")}</p>
                <ul className="space-y-1 text-xs text-cyan-600">
                  <li>• {t("bookingPage.confirmation.whatNext1")}</li>
                  <li>• {t("bookingPage.confirmation.whatNext2")}</li>
                  <li>• {t("bookingPage.confirmation.whatNext3")}</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-1">
                <a
                  href={gcalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:border-[#00B8A9] hover:text-[#00B8A9] transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  {t("bookingPage.confirmation.addToCalendar")}
                </a>
                <button
                  onClick={() => navigate("/bookings")}
                  className="w-full py-3 bg-[#00B8A9] text-white text-sm font-semibold rounded-xl hover:bg-[#009e96] transition-colors"
                >
                  {t("bookingPage.confirmation.viewBookings")}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {t("bookingPage.confirmation.backHome")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Booking wizard ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-2xl mx-auto px-4">

        {/* Back */}
        <button
          onClick={() => (step > 1 ? back() : navigate(`/profile/${providerId}`))}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? t("bookingPage.back") : t("bookingPage.backToProfile")}
        </button>

        <StepBar current={step} />
        <ProviderSummary provider={provider} />

        <motion.div
          key={step}
          initial={{ opacity: 0, x: direction * 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22 }}
        >

          {/* ─ Step 1: Service Details ─────────────────────────────────────── */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">{t("bookingPage.step1.title")}</h2>

              {/* Property type */}
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700 block mb-2">{t("bookingPage.step1.propertyType")}</label>
                <div className="grid grid-cols-3 gap-2">
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setPropertyType(pt.id)}
                      className={`py-2.5 px-3 rounded-xl border text-sm font-medium text-center transition-all ${
                        propertyType === pt.id
                          ? "border-[#00B8A9] bg-cyan-50 text-[#00B8A9]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t(`bookingPage.propertyType.${pt.id}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property size */}
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700 block mb-2">{t("bookingPage.step1.propertySize")}</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_SIZES.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setPropertySize(sz)}
                      className={`py-2 px-4 rounded-full border text-sm font-medium transition-all ${
                        propertySize === sz
                          ? "border-[#00B8A9] bg-cyan-50 text-[#00B8A9]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t(`bookingPage.propertySize.${sz}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {allAddOns.length > 0 && (
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    {t("bookingPage.step1.addOns")}
                  </label>
                  <p className="text-xs text-gray-400 mb-3">
                    {t("bookingPage.step1.addOnsHint")}
                  </p>
                  <div className="space-y-2">
                    {allAddOns.map((addon) => {
                      const sel = addOnIds.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() =>
                            setAddOnIds((ids) =>
                              sel ? ids.filter((id) => id !== addon.id) : [...ids, addon.id]
                            )
                          }
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                            sel ? "border-[#00B8A9] bg-cyan-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                sel ? "border-[#00B8A9] bg-[#00B8A9]" : "border-gray-300"
                              }`}
                            >
                              {sel && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="font-medium text-gray-800">{t(`bookingPage.addOn.${addon.id}`)}</span>
                          </div>
                          <span className={`font-semibold text-xs ${sel ? "text-[#00B8A9]" : "text-gray-500"}`}>
                            +{formatCurrency(addon.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special instructions */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {t("bookingPage.step1.specialInstructions")}{" "}
                  <span className="text-gray-400 font-normal">{t("bookingPage.step1.optional")}</span>
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder={t("bookingPage.step1.specialInstructionsPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9] resize-none"
                />
              </div>

              {activeAddOns.length > 0 && (
                <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5 flex items-center justify-between text-sm">
                  <span className="text-gray-500">{t("bookingPage.step1.baseAndAddons", { count: activeAddOns.length })}</span>
                  <span className="font-bold text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
              )}

              <button
                onClick={next}
                className="w-full py-3.5 bg-[#00B8A9] text-white font-semibold rounded-xl hover:bg-[#009e96] transition-colors flex items-center justify-center gap-2"
              >
                {t("bookingPage.step1.continue")} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ─ Step 2: Schedule ────────────────────────────────────────────── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">{t("bookingPage.step2.title")}</h2>

              {/* Date */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">{t("bookingPage.step2.serviceDate")}</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={today}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9]"
                />
                {selectedDate === today && (
                  <p className="flex items-center gap-1.5 mt-2 text-xs text-amber-600">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t("bookingPage.step2.sameDayWarning")}
                  </p>
                )}
              </div>

              {/* Time slots */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-3">
                  {t("bookingPage.step2.preferredTimeSlot")}
                </label>
                <div className="space-y-5">
                  {TIME_GROUPS.map((group) => (
                    <div key={group.key}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        {t(`bookingPage.timeGroup.${group.key}`)}
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {group.slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 rounded-xl border text-xs font-medium text-center transition-all ${
                              selectedSlot === slot
                                ? "border-[#00B8A9] bg-cyan-50 text-[#00B8A9]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration note */}
              <div className="bg-gray-50 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {t("bookingPage.step2.durationLabel")}{" "}
                  <span className="font-semibold text-gray-900">{t("bookingPage.step2.durationValue")}</span>
                  <span className="text-gray-400"> {t("bookingPage.step2.durationHint")}</span>
                </p>
              </div>

              <button
                onClick={next}
                className="w-full py-3.5 bg-[#00B8A9] text-white font-semibold rounded-xl hover:bg-[#009e96] transition-colors flex items-center justify-center gap-2"
              >
                {t("bookingPage.step2.continue")} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ─ Step 3: Address ─────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                {t("bookingPage.step3.title")}
              </h2>

              <div className="space-y-4 mb-6">
                {/* Address */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">
                    {t("bookingPage.step3.fullAddress")} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t("bookingPage.step3.addressPlaceholder")}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9] resize-none"
                  />
                </div>

                {/* Floor / landmark */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">
                    {t("bookingPage.step3.floorLandmark")}{" "}
                    <span className="text-gray-400 font-normal">{t("bookingPage.step1.optional")}</span>
                  </label>
                  <input
                    type="text"
                    value={floorLandmark}
                    onChange={(e) => setFloorLandmark(e.target.value)}
                    placeholder={t("bookingPage.step3.floorLandmarkPlaceholder")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">
                    {t("bookingPage.step3.contactNumber")} <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 flex-shrink-0 gap-1.5">
                      <span>{regionConfig.phoneCode}</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("bookingPage.step3.phonePlaceholder")}
                      maxLength={10}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9]"
                    />
                  </div>
                  <p className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    {t("bookingPage.step3.callNote")}
                  </p>
                </div>
              </div>

              <button
                onClick={next}
                className="w-full py-3.5 bg-[#00B8A9] text-white font-semibold rounded-xl hover:bg-[#009e96] transition-colors flex items-center justify-center gap-2"
              >
                {t("bookingPage.step3.continue")} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ─ Step 4: Review & Pay ────────────────────────────────────────── */}
          {step === 4 && (
            <div className="space-y-4">
              {/* Order summary */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">{t("bookingPage.step4.orderSummary")}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {provider.serviceCategory} — {t(`bookingPage.propertySize.${propertySize}`)}{" "}
                      {t(`bookingPage.propertyType.${propertyType}`)}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(basePrice)}
                    </span>
                  </div>
                  {activeAddOns.map((addon) => (
                    <div key={addon.id} className="flex justify-between">
                      <span className="text-gray-500">{t(`bookingPage.addOn.${addon.id}`)}</span>
                      <span className="font-medium text-gray-700">+{formatCurrency(addon.price)}</span>
                    </div>
                  ))}
                  {discountAmt > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        {t("bookingPage.step4.promoPrefix")} {promoInput.toUpperCase()}
                      </span>
                      <span className="font-medium">−{formatCurrency(discountAmt)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>{t("bookingPage.step4.vatLabel", { label: regionConfig.vatLabel, rate: Math.round(regionConfig.vatRate * 100) })}</span>
                    <span>{formatCurrency(gstAmt)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-3 mt-1">
                    <span className="font-bold text-gray-900">{t("bookingPage.step4.totalPayable")}</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    {t("bookingPage.step4.noHiddenCharges")}
                  </p>
                </div>
              </div>

              {/* Promo code */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{t("bookingPage.step4.promoTitle")}</h3>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">
                        {promoInput.toUpperCase()}
                      </span>
                      <span className="text-xs text-emerald-600">({getPromoLabel(appliedPromo.code, appliedPromo)})</span>
                    </div>
                    <button
                      onClick={() => { setAppliedPromo(null); setPromoInput(""); }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                      placeholder={t("bookingPage.step4.promoPlaceholder")}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9]"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      {t("bookingPage.step4.apply")}
                    </button>
                  </div>
                )}
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{t("bookingPage.step4.paymentMethod")}</h3>
                <div className="space-y-2">
                  {isIndia && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl border transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#00B8A9] bg-cyan-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        paymentMethod === "cod" ? "border-[#00B8A9]" : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00B8A9]" />
                      )}
                    </div>
                    <Banknote className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="text-left flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {t("bookingPage.step4.codTitle")}
                      </p>
                      <p className="text-xs text-gray-400">
                        {t("bookingPage.step4.codDescIN")}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex-shrink-0">
                      {t("bookingPage.step4.recommended")}
                    </span>
                  </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl border transition-all ${
                      paymentMethod === "stripe"
                        ? "border-violet-400 bg-violet-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        paymentMethod === "stripe" ? "border-violet-500" : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "stripe" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                      )}
                    </div>
                    <CreditCard className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <div className="text-left flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {isIndia ? t("bookingPage.step4.onlineTitleIN") : t("bookingPage.step4.onlineTitle")}
                      </p>
                      <p className="text-xs text-gray-400">{t("bookingPage.step4.onlineDesc")}</p>
                    </div>
                    <span className="text-xs font-medium text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-full flex-shrink-0">
                      {t("bookingPage.step4.secure")}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t("bookingPage.step4.secureBooking")}
                </div>
              </div>

              {/* Cancellation policy */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-700 space-y-1">
                <p className="font-semibold">{t("bookingPage.step4.cancellationPolicy")}</p>
                <p>{t("bookingPage.step4.cancellationText", { fee: formatCurrency(regionConfig.lateFee) })}</p>
                <p>
                  {t("bookingPage.step4.redoOrRefund")}
                </p>
              </div>

              {/* Booking summary strip */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 text-xs text-gray-500">
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{selectedDate}</span>
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                <span>{selectedSlot}</span>
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                <span className="truncate">{address}</span>
              </div>

              {/* Confirm button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-4 bg-[#00B8A9] text-white font-bold text-base rounded-xl hover:bg-[#009e96] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    {t("bookingPage.step4.processing")}
                  </>
                ) : paymentMethod === "stripe" ? (
                  t("bookingPage.step4.confirmPayOnline", { amount: formatCurrency(totalAmount) })
                ) : (
                  t("bookingPage.step4.confirmBook", { amount: formatCurrency(totalAmount) })
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
