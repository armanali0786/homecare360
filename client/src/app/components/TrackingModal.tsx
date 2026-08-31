import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, ShieldCheck, Navigation, Home, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { getBookingTracking, startJourney, markArrived, verifyArrival } from "@/app/lib/api";

interface TrackingModalProps {
  bookingId: string;
  open: boolean;
  onClose: () => void;
  role: "customer" | "provider";
}

export function TrackingModal({ bookingId, open, onClose, role }: TrackingModalProps) {
  const { t } = useTranslation("tracking");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");

  const fetchTracking = async () => {
    try {
      const res = await getBookingTracking(bookingId);
      setData(res);
    } catch {
      // ignore poll failures — keep showing last known state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open || !bookingId) return;
    setLoading(true);
    fetchTracking();
    const interval = setInterval(fetchTracking, 8000);
    return () => clearInterval(interval);
  }, [open, bookingId]);

  useEffect(() => {
    if (!open) setCode("");
  }, [open]);

  const handleStart = async () => {
    setBusy(true);
    try {
      await startJourney(bookingId);
      toast.success(t("toasts.started"));
      fetchTracking();
    } catch (err: any) {
      toast.error(err.message || t("toasts.failed"));
    } finally {
      setBusy(false);
    }
  };

  const handleArrived = async () => {
    setBusy(true);
    try {
      await markArrived(bookingId);
      toast.success(t("toasts.arrived"));
      fetchTracking();
    } catch (err: any) {
      toast.error(err.message || t("toasts.failed"));
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async () => {
    if (!code.trim()) return;
    setBusy(true);
    try {
      await verifyArrival(bookingId, code.trim());
      toast.success(t("toasts.verified"));
      setCode("");
      fetchTracking();
    } catch (err: any) {
      toast.error(err.message || t("toasts.codeMismatch"));
    } finally {
      setBusy(false);
    }
  };

  const tracking = data?.tracking;
  const provider = data?.provider;
  const status: string = tracking?.status || "not_started";

  const steps = [
    { key: "on_the_way", icon: Navigation, label: t("steps.onTheWay") },
    { key: "arrived", icon: MapPin, label: t("steps.arrived") },
    { key: "verified", icon: Home, label: t("steps.verified") },
  ];
  const stepIndex = steps.findIndex((s) => s.key === status);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-gray-900 mb-1">{t("title")}</h2>
            <p className="text-sm text-gray-500 mb-5">{t("subtitle")}</p>

            {loading ? (
              <div className="h-40 animate-pulse bg-gray-100 rounded-xl" />
            ) : (
              <>
                {role === "customer" && provider && (
                  <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-xl">
                    <ImageWithFallback
                      src={
                        provider.profileImage
                          ? `https://homecare360.onrender.com/uploads/${provider.profileImage}`
                          : ""
                      }
                      alt={provider.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{provider.name}</p>
                      <p className="text-xs text-gray-500">{provider.serviceCategory}</p>
                      {provider.identityVerified && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> {t("identityVerified")}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-5">
                  {steps.map((s, i) => {
                    const reached = stepIndex >= i;
                    return (
                      <div key={s.key} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center ${
                            reached ? "bg-[#00B8A9] text-white" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <s.icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[11px] text-center ${
                            reached ? "text-gray-900 font-medium" : "text-gray-400"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {status === "not_started" && role === "provider" && (
                  <button
                    onClick={handleStart}
                    disabled={busy}
                    className="w-full py-3 bg-[#00B8A9] text-white font-semibold rounded-xl hover:bg-[#009e91] transition-colors disabled:opacity-50"
                  >
                    {t("actions.startJourney")}
                  </button>
                )}
                {status === "not_started" && role === "customer" && (
                  <p className="text-sm text-gray-500 text-center py-6">{t("waitingForProvider")}</p>
                )}

                {status === "on_the_way" && (
                  <div className="text-center py-2">
                    <p className="text-3xl font-bold text-gray-900">
                      {tracking.minutesRemaining ?? "--"}
                      <span className="text-base font-medium text-gray-400"> {t("minutesAway")}</span>
                    </p>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#00B8A9]"
                        animate={{ width: `${tracking.percent}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    {role === "provider" && (
                      <button
                        onClick={handleArrived}
                        disabled={busy}
                        className="w-full mt-5 py-3 bg-[#00B8A9] text-white font-semibold rounded-xl hover:bg-[#009e91] transition-colors disabled:opacity-50"
                      >
                        {t("actions.markArrived")}
                      </button>
                    )}
                  </div>
                )}

                {status === "arrived" && role === "provider" && (
                  <div className="text-center py-2">
                    <p className="text-sm text-gray-500 mb-2">{t("showCodeHint")}</p>
                    <p className="text-4xl font-bold tracking-[0.3em] text-[#00B8A9] mb-4">
                      {tracking.verificationCode}
                    </p>
                    <p className="text-xs text-gray-400">{t("waitingForCustomerVerify")}</p>
                  </div>
                )}

                {status === "arrived" && role === "customer" && (
                  <div className="py-2">
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                      <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">{t("safetyNotice")}</p>
                    </div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      {t("enterCodeLabel")}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                          maxLength={4}
                          placeholder="0000"
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-center tracking-[0.3em] font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        />
                      </div>
                      <button
                        onClick={handleVerify}
                        disabled={busy || code.trim().length < 4}
                        className="px-5 py-2.5 bg-[#00B8A9] text-white text-sm font-semibold rounded-lg hover:bg-[#009e91] transition-colors disabled:opacity-50"
                      >
                        {t("actions.confirm")}
                      </button>
                    </div>
                  </div>
                )}

                {status === "verified" && (
                  <div className="text-center py-4">
                    <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">{t("verifiedTitle")}</p>
                    <p className="text-sm text-gray-500 mt-1">{t("verifiedSubtitle")}</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
