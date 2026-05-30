import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Calendar, Clock, MapPin, Home, Banknote, CreditCard } from "lucide-react";
import { getStripeBooking } from "@/app/lib/api";

export function BookingSuccess() {
  const [params]  = useSearchParams();
  const navigate  = useNavigate();
  const bookingId = params.get("bookingId");
  const paid      = params.get("paid") === "1";

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) { setLoading(false); return; }
    getStripeBooking(bookingId)
      .then((d) => setBooking(d.booking))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [bookingId]);

  const providerName = booking?.provider
    ? (booking.provider.businessName ||
       `${booking.provider.firstName || ""} ${booking.provider.lastName || ""}`.trim())
    : "Provider";

  const ref = booking ? `HC-${booking._id.slice(-8).toUpperCase()}` : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B8A9]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-16">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden"
        >
          {/* Banner */}
          <div className={`px-8 py-10 text-center ${paid ? "bg-[#00B8A9]" : "bg-gray-700"}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-1">
              {paid ? "Payment Successful!" : "Booking Confirmed!"}
            </h1>
            <p className="text-white/80 text-sm">
              {paid ? "Your payment has been processed" : "Your service has been scheduled"}
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Ref */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Booking Reference</p>
              <p className="text-xl font-bold text-gray-900 tracking-widest">{ref}</p>
            </div>

            {booking && (
              <>
                {[
                  { icon: Home,       label: "Service",  value: booking.serviceCategory                 },
                  { icon: Home,       label: "Provider", value: providerName                            },
                  { icon: Calendar,   label: "Date",     value: booking.date                            },
                  { icon: Clock,      label: "Time",     value: booking.time                            },
                  { icon: MapPin,     label: "Address",  value: booking.location                        },
                  { icon: CreditCard, label: "Payment",  value: paid ? "Paid online (Stripe)" : "Pay on completion" },
                ].filter((r) => r.value).map(({ icon: Icon, label, value }) => (
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

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Total Amount</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{booking.totalAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </>
            )}

            <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-cyan-700 mb-1.5">What happens next</p>
              <ul className="space-y-1 text-xs text-cyan-600">
                <li>• Provider will confirm within 1 hour</li>
                <li>• You'll receive an SMS confirmation shortly</li>
                <li>• Provider calls 30 minutes before arrival</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <button
                onClick={() => navigate("/bookings")}
                className="w-full py-3 bg-[#00B8A9] text-white text-sm font-semibold rounded-xl hover:bg-[#009e96] transition-colors"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Back to home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
