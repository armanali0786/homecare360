import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Star, X, Send, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { createReview } from "@/app/lib/api";
import { toast } from "react-toastify";

interface Props {
  open:       boolean;
  onClose:    () => void;
  booking:    any;
  onReviewed: () => void;
}

export function ReviewModal({ open, onClose, booking, onReviewed }: Props) {
  const { t } = useTranslation("booking");
  const [rating,      setRating]      = useState(0);
  const [hovered,     setHovered]     = useState(0);
  const [comment,     setComment]     = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [done,        setDone]        = useState(false);

  const providerName = booking?.provider
    ? (booking.provider.businessName ||
       `${booking.provider.firstName || ""} ${booking.provider.lastName || ""}`.trim())
    : t("chatDrawer.providerFallback");

  const reset = () => {
    setRating(0); setHovered(0); setComment(""); setDone(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async () => {
    if (!rating) { toast.error(t("reviewModal.ratingRequired")); return; }
    setSubmitting(true);
    try {
      await createReview({
        providerId: booking.provider?._id,
        bookingId:  booking._id,
        rating,
        comment,
      });
      setDone(true);
      onReviewed();
    } catch (err: any) {
      toast.error(err.message || t("reviewModal.submitFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const labels = [
    t("reviewModal.labels.1"),
    t("reviewModal.labels.2"),
    t("reviewModal.labels.3"),
    t("reviewModal.labels.4"),
    t("reviewModal.labels.5"),
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {done ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#00B8A9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#00B8A9]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("reviewModal.thanksTitle")}</h3>
                <p className="text-sm text-gray-500 mb-6">{t("reviewModal.thanksText")}</p>
                <button
                  onClick={handleClose}
                  className="px-8 py-2.5 bg-[#00B8A9] text-white text-sm font-semibold rounded-xl hover:bg-[#009e96] transition-colors"
                >
                  {t("reviewModal.done")}
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{t("reviewModal.title")}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{providerName} · {booking?.serviceCategory}</p>
                  </div>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Stars */}
                <div className="px-6 py-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hovered || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200 fill-gray-100"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {(hovered || rating) > 0 && (
                    <p className="text-center text-sm font-semibold text-[#00B8A9] mb-4">
                      {labels[(hovered || rating) - 1]}
                    </p>
                  )}

                  {/* Comment */}
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("reviewModal.writeReview")} <span className="text-gray-400 font-normal">{t("reviewModal.optional")}</span>
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t("reviewModal.commentPlaceholder")}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/30 focus:border-[#00B8A9] resize-none"
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !rating}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-[#00B8A9] text-white text-sm font-semibold rounded-xl hover:bg-[#009e96] transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t("reviewModal.submit")}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
