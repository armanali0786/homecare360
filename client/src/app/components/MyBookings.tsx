import { motion } from "motion/react";
import {
  Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle,
  MessageSquare, Star, CreditCard, Package,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMyBookings } from "@/app/lib/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ReviewModal }       from "@/app/components/ReviewModal";
import { CancelBookingModal } from "@/app/components/CancelBookingModal";
import { ChatDrawer }        from "@/app/components/ChatDrawer";
import { RecurringPlansPanel } from "@/app/components/RecurringPlansPanel";
import { useLocale } from "@/app/context/LocaleContext";

export function MyBookings() {
  const { t } = useTranslation("booking");
  const { formatCurrency } = useLocale();
  const [bookings,      setBookings]      = useState<any[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [filter,        setFilter]        = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  // Modal states
  const [reviewBooking,  setReviewBooking]  = useState<any>(null);
  const [cancelBooking,  setCancelBooking]  = useState<any>(null);
  const [chatBooking,    setChatBooking]    = useState<any>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getMyBookings();
      setBookings(data.bookings || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const filteredBookings = bookings.filter(
    (b) => filter === "all" || b.status === filter
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":  return { icon: AlertCircle,  color: "text-cyan-600",    bg: "bg-cyan-50",    border: "border-cyan-200",    label: t("myBookings.status.upcoming")  };
      case "completed": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: t("myBookings.status.completed") };
      case "cancelled": return { icon: XCircle,      color: "text-red-500",     bg: "bg-red-50",     border: "border-red-200",     label: t("myBookings.status.cancelled") };
      default:          return { icon: AlertCircle,  color: "text-gray-500",    bg: "bg-gray-50",    border: "border-gray-200",    label: t("myBookings.status.unknown")   };
    }
  };

  const stats = {
    total:     bookings.length,
    upcoming:  bookings.filter((b) => b.status === "upcoming").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const getProviderName  = (b: any) =>
    b.provider?.businessName ||
    `${b.provider?.firstName || ""} ${b.provider?.lastName || ""}`.trim() ||
    "Provider";

  const getProviderImage = (b: any) =>
    b.provider?.profileImage
      ? `https://homecare360.onrender.com/uploads/${b.provider.profileImage}`
      : "";

  const paymentBadge = (b: any) => {
    if (b.paymentStatus === "paid") return { label: t("myBookings.payment.paid"),    color: "text-emerald-600 bg-emerald-50" };
    if (b.paymentMethod === "cod")  return { label: t("myBookings.payment.payOnCompletion"), color: "text-amber-600 bg-amber-50" };
    return { label: t("myBookings.payment.pending"), color: "text-gray-500 bg-gray-50" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full mb-3">
              {t("myBookings.badge")}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t("myBookings.title")}</h1>
            <p className="text-sm text-gray-500 mt-1">{t("myBookings.subtitle")}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {[
              { key: "total",     label: t("myBookings.stats.total"),     value: stats.total,     icon: Calendar,     color: "text-gray-700",    bg: "bg-gray-100"   },
              { key: "upcoming",  label: t("myBookings.stats.upcoming"),  value: stats.upcoming,  icon: AlertCircle,  color: "text-cyan-600",    bg: "bg-cyan-50"    },
              { key: "completed", label: t("myBookings.stats.completed"), value: stats.completed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              { key: "cancelled", label: t("myBookings.stats.cancelled"), value: stats.cancelled, icon: XCircle,      color: "text-red-500",     bg: "bg-red-50"     },
            ].map((stat) => (
              <div key={stat.key} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecurringPlansPanel />

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {[
            { id: "all",       label: t("myBookings.tabs.all")       },
            { id: "upcoming",  label: t("myBookings.tabs.upcoming")  },
            { id: "completed", label: t("myBookings.tabs.completed") },
            { id: "cancelled", label: t("myBookings.tabs.cancelled") },
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
        </motion.div>

        <p className="text-sm text-gray-500 mb-4">
          {t("myBookings.resultsCount", { count: filteredBookings.length })}
        </p>

        {/* Booking Cards */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 h-44 animate-pulse" />
              ))}
            </div>
          ) : filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-12 text-center"
            >
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{t("myBookings.emptyTitle")}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {filter !== "all" ? t("myBookings.emptyText", { filter: t(`myBookings.tabs.${filter}`) }) : t("myBookings.emptyTextAll")}
              </p>
              <Link
                to="/services"
                className="inline-block px-6 py-2.5 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors"
              >
                {t("myBookings.browseServices")}
              </Link>
            </motion.div>
          ) : (
            filteredBookings.map((booking, index) => {
              const sc = getStatusConfig(booking.status);
              const StatusIcon = sc.icon;
              const pb = paymentBadge(booking);
              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cyan-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Provider Image */}
                    <div className="md:w-44 h-36 md:h-auto relative overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={getProviderImage(booking)}
                        alt={getProviderName(booking)}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 p-5">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">
                            HC-{booking._id?.slice(-8).toUpperCase()}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                              {getProviderName(booking)}
                            </h3>
                            {booking.isEmergency && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                                {t("myBookings.sos")}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#00B8A9] font-medium">{booking.serviceCategory}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sc.bg} ${sc.color} ${sc.border}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {sc.label}
                          </span>
                          <div className="text-right">
                            {booking.feeWaived ? (
                              <span className="text-sm font-bold text-emerald-600">{t("myBookings.freeGuarantee")}</span>
                            ) : (
                              <>
                                <span className="text-xl font-bold text-gray-900">{formatCurrency(booking.totalAmount)}</span>
                                <span className="text-xs text-gray-400 ml-0.5">{t("myBookings.total")}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Meta */}
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
                            <span className="truncate max-w-[180px]">{booking.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Add-ons */}
                      {booking.addOns?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <Package className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                          {booking.addOns.map((a: any, i: number) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {a.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Payment badge */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pb.color}`}>
                          {pb.label}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                        {booking.status === "upcoming" && (
                          <>
                            <button
                              onClick={() => { setChatBooking(booking); }}
                              className="flex items-center gap-1.5 px-4 py-2 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              {t("myBookings.messageProvider")}
                            </button>
                            <button
                              onClick={() => setCancelBooking(booking)}
                              className="px-4 py-2 border border-red-200 text-red-500 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                            >
                              {t("myBookings.cancelBooking")}
                            </button>
                          </>
                        )}
                        {booking.status === "completed" && (
                          <>
                            <button
                              onClick={() => setReviewBooking(booking)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors"
                            >
                              <Star className="w-3.5 h-3.5" />
                              {t("myBookings.leaveReview")}
                            </button>
                            <Link
                              to={`/profile/${booking.provider?._id}`}
                              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-cyan-200 hover:text-[#00B8A9] transition-colors"
                            >
                              {t("myBookings.bookAgain")}
                            </Link>
                          </>
                        )}
                        {booking.status === "cancelled" && (
                          <div className="flex items-center gap-3">
                            {booking.cancelledBy === "provider" && (
                              <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                {t("myBookings.cancelledByProvider")}
                              </span>
                            )}
                            <Link
                              to={`/profile/${booking.provider?._id}`}
                              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-cyan-200 hover:text-[#00B8A9] transition-colors"
                            >
                              {t("myBookings.bookAgain")}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Modals */}
      <ReviewModal
        open={!!reviewBooking}
        onClose={() => setReviewBooking(null)}
        booking={reviewBooking}
        onReviewed={() => { toast.success(t("myBookings.reviewSubmitted")); fetchBookings(); }}
      />

      <CancelBookingModal
        open={!!cancelBooking}
        onClose={() => setCancelBooking(null)}
        booking={cancelBooking}
        onCancelled={() => { fetchBookings(); setCancelBooking(null); }}
      />

      <ChatDrawer
        open={!!chatBooking}
        onClose={() => setChatBooking(null)}
        booking={chatBooking}
        myRole="customer"
      />
    </div>
  );
}
