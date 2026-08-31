import { motion } from "motion/react";
import { Repeat, Pause, Play, SkipForward, XCircle, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  getMyRecurringBookings,
  pauseRecurringBooking,
  resumeRecurringBooking,
  cancelRecurringBooking,
  skipNextRecurringBooking,
} from "@/app/lib/api";
import { useLocale } from "@/app/context/LocaleContext";

export function RecurringPlansPanel() {
  const { t } = useTranslation("booking");
  const { formatCurrency } = useLocale();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      const data = await getMyRecurringBookings();
      setPlans(data.plans || []);
    } catch {
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const getProviderName = (plan: any) =>
    plan.provider?.businessName ||
    `${plan.provider?.firstName || ""} ${plan.provider?.lastName || ""}`.trim() ||
    "Provider";

  const handleAction = async (id: string, action: "pause" | "resume" | "cancel" | "skip") => {
    setBusyId(id);
    try {
      if (action === "pause") await pauseRecurringBooking(id);
      if (action === "resume") await resumeRecurringBooking(id);
      if (action === "cancel") await cancelRecurringBooking(id);
      if (action === "skip") await skipNextRecurringBooking(id);
      toast.success(t(`recurring.toast.${action}`));
      fetchPlans();
    } catch (err: any) {
      toast.error(err.message || t("recurring.toast.actionFailed"));
    } finally {
      setBusyId(null);
    }
  };

  if (loading || plans.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
        <Repeat className="w-4 h-4 text-[#00B8A9]" />
        {t("recurring.title")}
      </h2>
      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-900">{getProviderName(plan)}</p>
                <span className="text-xs text-[#00B8A9] font-medium">{plan.serviceCategory}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  plan.status === "active" ? "bg-emerald-50 text-emerald-600" :
                  plan.status === "paused" ? "bg-amber-50 text-amber-600" :
                  "bg-gray-100 text-gray-500"
                }`}>
                  {t(`recurring.status.${plan.status}`)}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>{t(`bookingPage.step4.frequency.${plan.frequency}`)}</span>
                {plan.status !== "cancelled" && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {t("recurring.nextOn", { date: plan.nextRunDate })}
                  </span>
                )}
                <span className="font-semibold text-gray-700">{formatCurrency(plan.totalAmount)}</span>
              </div>
            </div>

            {plan.status !== "cancelled" && (
              <div className="flex items-center gap-2 flex-shrink-0">
                {plan.status === "active" ? (
                  <button
                    disabled={busyId === plan._id}
                    onClick={() => handleAction(plan._id, "pause")}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-amber-300 hover:text-amber-600 transition-colors disabled:opacity-50"
                  >
                    <Pause className="w-3.5 h-3.5" /> {t("recurring.actions.pause")}
                  </button>
                ) : (
                  <button
                    disabled={busyId === plan._id}
                    onClick={() => handleAction(plan._id, "resume")}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5" /> {t("recurring.actions.resume")}
                  </button>
                )}
                {plan.status === "active" && (
                  <button
                    disabled={busyId === plan._id}
                    onClick={() => handleAction(plan._id, "skip")}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-cyan-300 hover:text-cyan-600 transition-colors disabled:opacity-50"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> {t("recurring.actions.skipNext")}
                  </button>
                )}
                <button
                  disabled={busyId === plan._id}
                  onClick={() => handleAction(plan._id, "cancel")}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <XCircle className="w-3.5 h-3.5" /> {t("recurring.actions.cancel")}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
