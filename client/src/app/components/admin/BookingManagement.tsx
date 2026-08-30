import { motion } from "motion/react";
import { Search, Calendar, MapPin, CheckCircle2, XCircle, AlertCircle, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getAdminBookings, updateBookingStatus,
  getProviderBookings, providerAcceptBooking, providerCancelBooking,
} from "@/app/lib/api";
import { useUser } from "@/app/context/UserContext";
import { useLocale } from "@/app/context/LocaleContext";
import { toast } from "react-toastify";
import { ChatDrawer } from "@/app/components/ChatDrawer";

export function BookingManagement() {
  const { t } = useTranslation("admin");
  const { formatCurrency } = useLocale();
  const { user } = useUser();
  const isProvider = user?.role === "provider";

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [acting, setActing] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatBooking, setChatBooking] = useState<any>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = isProvider ? await getProviderBookings() : await getAdminBookings();
      setBookings(data.bookings || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [isProvider]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateBookingStatus(id, status);
      toast.success(t("bookings.toast.updated"));
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || t("bookings.toast.updateFailed"));
    }
  };

  const handleAccept = async (id: string) => {
    setActing(id);
    try {
      await providerAcceptBooking(id);
      toast.success(t("bookings.toast.accepted"));
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || t("bookings.toast.acceptFailed"));
    } finally {
      setActing(null);
    }
  };

  const handleProviderCancel = async (id: string, isPending: boolean) => {
    const msg = isPending ? t("bookings.confirm.decline") : t("bookings.confirm.cancel");
    if (!confirm(msg)) return;
    setActing(id);
    try {
      await providerCancelBooking(id);
      toast.success(isPending ? t("bookings.toast.declined") : t("bookings.toast.cancelled"));
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || t("bookings.toast.cancelFailed"));
    } finally {
      setActing(null);
    }
  };

  const getProviderName = (b: any) => {
    const p = b.provider;
    if (!p) return t("bookings.defaultProvider");
    return p.businessName || `${p.firstName || ""} ${p.lastName || ""}`.trim();
  };

  const filteredBookings = bookings.filter((b) => {
    const userName = b.user?.fullName || "";
    const pName = getProviderName(b);
    const matchSearch =
      userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceCategory?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch && (filter === "all" || b.status === filter);
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":   return { icon: AlertCircle,  color: "text-amber-600",   bg: "bg-amber-50",   label: t("bookings.statusLabel.pending") };
      case "upcoming":  return { icon: AlertCircle,  color: "text-cyan-600",    bg: "bg-cyan-50",    label: t("bookings.statusLabel.upcoming") };
      case "completed": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", label: t("bookings.statusLabel.completed") };
      case "cancelled": return { icon: XCircle,      color: "text-red-600",     bg: "bg-red-50",     label: t("bookings.statusLabel.cancelled") };
      default:          return { icon: AlertCircle,  color: "text-gray-600",    bg: "bg-gray-50",    label: status        };
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {t("bookings.title")}
        </h1>
        <p className="text-gray-600">{t("bookings.subtitle")}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {(isProvider ? [
          { label: t("bookings.statsProvider.newRequests"), value: bookings.filter((b) => b.status === "pending").length,   color: "from-amber-500 to-orange-500" },
          { label: t("bookings.statsProvider.upcoming"),     value: bookings.filter((b) => b.status === "upcoming").length,   color: "from-cyan-500 to-teal-600"   },
          { label: t("bookings.statsProvider.completed"),    value: bookings.filter((b) => b.status === "completed").length,  color: "from-green-500 to-emerald-600"},
          { label: t("bookings.statsProvider.total"),        value: bookings.length,                                          color: "from-blue-500 to-cyan-600"   },
        ] : [
          { label: t("bookings.statsAdmin.total"),     value: bookings.length,                                             color: "from-blue-500 to-cyan-600"   },
          { label: t("bookings.statsAdmin.upcoming"),  value: bookings.filter((b) => b.status === "upcoming").length,      color: "from-cyan-500 to-teal-600"   },
          { label: t("bookings.statsAdmin.completed"), value: bookings.filter((b) => b.status === "completed").length,     color: "from-green-500 to-emerald-600"},
          { label: t("bookings.statsAdmin.cancelled"), value: bookings.filter((b) => b.status === "cancelled").length,     color: "from-red-500 to-orange-600"  },
        ]).map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium mb-2`}>{stat.label}</div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder={t("bookings.searchPlaceholder")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 shadow-sm" />
        </div>
        <div className="flex gap-3 flex-wrap">
          {(isProvider
            ? ["all", "pending", "upcoming", "completed", "cancelled"]
            : ["all", "upcoming", "completed", "cancelled"]
          ).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}>
              {f === "pending" ? t("bookings.filters.requestsCount", { count: bookings.filter(b => b.status === "pending").length }) : t(`bookings.filters.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-36 animate-pulse" />)}</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">{t("bookings.empty")}</p></div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => {
            const statusConfig = getStatusConfig(booking.status);
            const StatusIcon = statusConfig.icon;
            return (
              <motion.div key={booking._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.01, x: 4 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {booking.user?.fullName || t("bookings.defaultUser")} → {getProviderName(booking)}
                        </h3>
                        <p className="text-sm text-cyan-600 font-medium">{booking.serviceCategory}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" /> {statusConfig.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        {booking.date}
                      </div>
                      {booking.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span className="truncate">{booking.location}</span>
                        </div>
                      )}
                      <div className="font-semibold text-gray-800">{formatCurrency(booking.totalAmount)}</div>
                    </div>
                  </div>

                  {isProvider ? (
                    <div className="flex flex-wrap gap-2">
                      {booking.status === "pending" && (
                        <>
                          <button disabled={acting === booking._id} onClick={() => handleAccept(booking._id)} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium flex items-center gap-1 disabled:opacity-50">
                            <CheckCircle2 className="w-4 h-4" /> {acting === booking._id ? t("bookings.actions.loading") : t("bookings.actions.accept")}
                          </button>
                          <button onClick={() => { setChatBooking(booking); setChatOpen(true); }} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 text-sm font-medium flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" /> {t("bookings.actions.message")}
                          </button>
                          <button disabled={acting === booking._id} onClick={() => handleProviderCancel(booking._id, true)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium flex items-center gap-1 disabled:opacity-50">
                            <XCircle className="w-4 h-4" /> {t("bookings.actions.decline")}
                          </button>
                        </>
                      )}
                      {booking.status === "upcoming" && (
                        <>
                          <button onClick={() => { setChatBooking(booking); setChatOpen(true); }} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 text-sm font-medium flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" /> {t("bookings.actions.messageCustomer")}
                          </button>
                          <button disabled={acting === booking._id} onClick={() => handleProviderCancel(booking._id, false)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium flex items-center gap-1 disabled:opacity-50">
                            <XCircle className="w-4 h-4" /> {t("bookings.actions.cancelJob")}
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    booking.status === "upcoming" && (
                      <div className="flex gap-2">
                        <button onClick={() => handleStatusChange(booking._id, "completed")} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> {t("bookings.actions.complete")}
                        </button>
                        <button onClick={() => handleStatusChange(booking._id, "cancelled")} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> {t("bookings.actions.cancel")}
                        </button>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ChatDrawer
        open={chatOpen}
        onClose={() => { setChatOpen(false); setChatBooking(null); }}
        booking={chatBooking}
        myRole="provider"
      />
    </motion.div>
  );
}
