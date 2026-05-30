import { motion } from "motion/react";
import {
  Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle,
  IndianRupee, Star, TrendingUp, AlertTriangle, MessageSquare,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { getProviderBookings, getMyProviderProfile, providerCancelBooking } from "@/app/lib/api";
import { toast } from "react-toastify";
import { ChatDrawer } from "@/app/components/ChatDrawer";
import { Link } from "react-router-dom";

export function ProviderDashboard() {
  const [profile,   setProfile]   = useState<any>(null);
  const [bookings,  setBookings]  = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [chatOpen,  setChatOpen]  = useState(false);
  const [chatBooking, setChatBooking] = useState<any>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [profileData, bookingData] = await Promise.all([
        getMyProviderProfile(),
        getProviderBookings(),
      ]);
      setProfile(profileData.provider);
      setBookings(bookingData.bookings || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const filteredBookings = bookings.filter((b) => filter === "all" || b.status === filter);

  const stats = {
    total:     bookings.length,
    upcoming:  bookings.filter((b) => b.status === "upcoming").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    earned:    bookings
      .filter((b) => b.status === "completed")
      .reduce((s, b) => s + (b.providerPayout || 0), 0),
  };

  const handleProviderCancel = async (bookingId: string) => {
    if (!confirm("Cancel this booking? A penalty will be recorded on your profile.")) return;
    setCancelling(bookingId);
    try {
      await providerCancelBooking(bookingId);
      toast.success("Booking cancelled. Customer has been notified.");
      fetchAll();
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel");
    } finally {
      setCancelling(null);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":  return { icon: AlertCircle,  color: "text-cyan-600",    bg: "bg-cyan-50",    border: "border-cyan-200",    label: "Upcoming"  };
      case "completed": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: "Completed" };
      case "cancelled": return { icon: XCircle,      color: "text-red-500",     bg: "bg-red-50",     border: "border-red-200",     label: "Cancelled" };
      default:          return { icon: AlertCircle,  color: "text-gray-500",    bg: "bg-gray-50",    border: "border-gray-200",    label: "Unknown"   };
    }
  };

  const getCustomerName = (b: any) => b.user?.fullName || "Customer";
  const getCustomerPhone = (b: any) => b.user?.phone || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full mb-3">
              Provider Dashboard
            </span>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {profile?.businessName ||
                   `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
                   "My Dashboard"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{profile?.serviceCategory}</p>
              </div>
              {profile?.penaltyCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {profile.penaltyCount} cancellation penalty{profile.penaltyCount > 1 ? "s" : ""}
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5"
          >
            {[
              { label: "Total Jobs",  value: stats.total,     icon: Calendar,     color: "text-gray-700",    bg: "bg-gray-100"   },
              { label: "Upcoming",    value: stats.upcoming,  icon: AlertCircle,  color: "text-cyan-600",    bg: "bg-cyan-50"    },
              { label: "Completed",   value: stats.completed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Total Earned",
                value: `₹${stats.earned.toLocaleString("en-IN")}`,
                icon: IndianRupee,  color: "text-violet-600",  bg: "bg-violet-50" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Payout notice */}
      {profile && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Payout Balance</p>
                <p className="text-xs text-gray-400">
                  {profile.stripeAccountStatus === "active"
                    ? "Payouts active via Stripe Connect"
                    : "Set up Stripe Connect to receive automated payouts"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-400">Pending payout</p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{bookings
                    .filter((b) => b.status === "completed" && b.paymentStatus === "paid")
                    .reduce((s: number, b: any) => s + (b.providerPayout || 0), 0)
                    .toLocaleString("en-IN")}
                </p>
              </div>
              {profile.stripeAccountStatus !== "active" && (
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toast.info("Stripe Connect onboarding coming soon"); }}
                  className="px-4 py-2 bg-[#00B8A9] text-white text-xs font-semibold rounded-lg hover:bg-[#009e96] transition-colors whitespace-nowrap"
                >
                  Connect Stripe
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bookings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {[
            { id: "all",       label: "All Jobs"  },
            { id: "upcoming",  label: "Upcoming"  },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === tab.id
                  ? "bg-[#00B8A9] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-cyan-200 hover:text-[#00B8A9]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 h-40 animate-pulse" />
            ))
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No bookings found.</p>
            </div>
          ) : (
            filteredBookings.map((booking, index) => {
              const sc = getStatusConfig(booking.status);
              const StatusIcon = sc.icon;
              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cyan-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-base font-semibold text-gray-900">{getCustomerName(booking)}</p>
                        <p className="text-sm text-[#00B8A9] font-medium">{booking.serviceCategory}</p>
                        {getCustomerPhone(booking) && (
                          <p className="text-xs text-gray-400 mt-0.5">📞 +91 {getCustomerPhone(booking)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sc.bg} ${sc.color} ${sc.border}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {sc.label}
                        </span>
                        <div className="text-right">
                          <span className="text-xl font-bold text-gray-900">₹{booking.providerPayout?.toLocaleString("en-IN") || 0}</span>
                          <span className="text-xs text-gray-400 ml-0.5">yours</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{booking.date}</span>
                      </div>
                      {booking.time && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{booking.time}</span>
                        </div>
                      )}
                      {booking.location && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate max-w-[200px]">{booking.location}</span>
                        </div>
                      )}
                    </div>

                    {booking.addOns?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {booking.addOns.map((a: any, i: number) => (
                          <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {a.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                      {booking.status === "upcoming" && (
                        <>
                          <button
                            onClick={() => { setChatBooking(booking); setChatOpen(true); }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Message Customer
                          </button>
                          <button
                            onClick={() => handleProviderCancel(booking._id)}
                            disabled={cancelling === booking._id}
                            className="px-4 py-2 border border-red-200 text-red-500 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {cancelling === booking._id ? "Cancelling…" : "Cancel Job"}
                          </button>
                        </>
                      )}
                      {booking.status === "completed" && (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          Job complete · payout ₹{booking.providerPayout?.toLocaleString("en-IN") || 0}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        open={chatOpen}
        onClose={() => { setChatOpen(false); setChatBooking(null); }}
        booking={chatBooking}
        myRole="provider"
      />
    </div>
  );
}
