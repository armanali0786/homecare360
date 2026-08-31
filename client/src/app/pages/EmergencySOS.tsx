import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Droplet, Zap, Wind, Wrench, Phone, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUser } from "@/app/context/UserContext";
import { useLocale } from "@/app/context/LocaleContext";
import { bookEmergency } from "@/app/lib/api";

const CATEGORIES = [
  { id: "plumbing",   icon: Droplet },
  { id: "electrical", icon: Zap },
  { id: "ac",         icon: Wind },
  { id: "other",      icon: Wrench },
] as const;

export function EmergencySOS() {
  const { t } = useTranslation("emergency");
  const { user } = useUser();
  const { region, regionConfig, formatCurrency } = useLocale();
  const navigate = useNavigate();

  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!user) {
      toast.info(t("loginRequired"));
      navigate("/login");
      return;
    }
    if (!category) {
      toast.error(t("selectCategory"));
      return;
    }
    if (!location.trim()) {
      toast.error(t("enterLocation"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await bookEmergency({
        category,
        location,
        description,
        region,
        currency: regionConfig.currency,
      });
      setResult(res);
    } catch (err: any) {
      toast.error(err.message || t("bookingFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    const providerName =
      result.provider?.businessName ||
      `${result.provider?.firstName || ""} ${result.provider?.lastName || ""}`.trim();

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-white rounded-2xl border border-gray-100 shadow-xl p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">{t("matched.title")}</h1>
          <p className="text-sm text-gray-500 mb-6">
            {t("matched.subtitle", { minutes: result.responseWindowMinutes })}
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{t("matched.provider")}</span>
              <span className="font-semibold text-gray-900">{providerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t("matched.total")}</span>
              <span className="font-semibold text-gray-900">{formatCurrency(result.booking.totalAmount)}</span>
            </div>
          </div>

          <p className="flex items-center justify-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-3 mb-6">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            {t("matched.guarantee", { minutes: result.responseWindowMinutes })}
          </p>

          <button
            onClick={() => navigate("/bookings")}
            className="w-full py-3 bg-[#0d1f1f] text-white rounded-xl font-semibold hover:bg-[#0d1f1f]/90 transition-colors"
          >
            {t("matched.viewBookings")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-red-600 to-rose-700 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl mb-5"
          >
            <AlertTriangle className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("heroTitle")}</h1>
          <p className="text-white/85">{t("heroSubtitle")}</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">{t("whatsWrong")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                  category === id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-red-200"
                }`}
              >
                <Icon className={`w-6 h-6 ${category === id ? "text-red-600" : "text-gray-400"}`} />
                <span className="text-sm font-semibold text-gray-900">{t(`categories.${id}`)}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 overflow-hidden"
            >
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" /> {t("locationLabel")}
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t("locationPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {t("descriptionLabel")} <span className="text-gray-400 font-normal">{t("optional")}</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("descriptionPlaceholder")}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: submitting ? 1 : 1.01 }}
          whileTap={{ scale: submitting ? 1 : 0.99 }}
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting ? t("matching") : (
            <>
              {t("getHelpNow")} <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4">
          <Phone className="w-3.5 h-3.5" /> {t("surchargeNote")}
        </p>
      </div>
    </div>
  );
}
