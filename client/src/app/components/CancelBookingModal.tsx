import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { AlertTriangle, X, Clock, CheckCircle2, XCircle } from "lucide-react";
import { cancelBooking, getCancellationPolicy } from "@/app/lib/api";
import { toast } from "react-toastify";

interface Policy {
  allowed:    boolean;
  fee:        number;
  refundNote: string;
}

interface Props {
  open:       boolean;
  onClose:    () => void;
  booking:    any;
  onCancelled: () => void;
}

export function CancelBookingModal({ open, onClose, booking, onCancelled }: Props) {
  const [policy,     setPolicy]     = useState<Policy | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!open || !booking) return;
    setLoading(true);
    getCancellationPolicy(booking._id)
      .then((d) => setPolicy(d.policy))
      .catch(() => setPolicy({ allowed: false, fee: 0, refundNote: "" }))
      .finally(() => setLoading(false));
  }, [open, booking]);

  const handleCancel = async () => {
    if (!policy?.allowed) return;
    setCancelling(true);
    try {
      await cancelBooking(booking._id);
      toast.success("Booking cancelled successfully");
      onCancelled();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel booking");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Cancel Booking</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-[#00B8A9] animate-spin" />
                </div>
              ) : policy ? (
                <>
                  {/* Booking info */}
                  <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{booking?.serviceCategory}</p>
                    <p className="text-xs text-gray-500">
                      {booking?.date} {booking?.time && `at ${booking.time}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">₹{booking?.totalAmount} total</p>
                  </div>

                  {/* Policy status */}
                  {policy.allowed ? (
                    <div className={`flex items-start gap-3 rounded-xl px-4 py-3 mb-5 ${
                      policy.fee > 0
                        ? "bg-amber-50 border border-amber-100"
                        : "bg-emerald-50 border border-emerald-100"
                    }`}>
                      {policy.fee > 0 ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm font-semibold mb-1 ${policy.fee > 0 ? "text-amber-700" : "text-emerald-700"}`}>
                          {policy.fee > 0 ? `₹${policy.fee} cancellation fee` : "Free cancellation"}
                        </p>
                        <p className={`text-xs ${policy.fee > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                          {policy.refundNote}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-700 mb-1">Cannot be cancelled</p>
                        <p className="text-xs text-red-600">
                          Cancellation is not allowed within 2 hours of the appointment.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cancellation policy note */}
                  <div className="flex items-start gap-2 text-xs text-gray-400 mb-6">
                    <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>Free cancellation &gt;24h · ₹100 fee &lt;24h · Not allowed &lt;2h</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:border-gray-300 transition-colors"
                    >
                      Keep Booking
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={!policy.allowed || cancelling}
                      className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {cancelling ? (
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin mx-auto" />
                      ) : (
                        "Yes, Cancel"
                      )}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
