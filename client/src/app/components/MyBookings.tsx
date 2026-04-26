import { motion } from "motion/react";
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, MessageSquare, Star } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "@/app/lib/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

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

  const handleCancel = async (id: string) => {
    try {
      await cancelBooking(id);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel");
    }
  };

  const filteredBookings = bookings.filter(
    (b) => filter === "all" || b.status === filter
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":  return { icon: AlertCircle,  color: "text-cyan-600",    bg: "bg-cyan-50",    border: "border-cyan-200",    label: "Upcoming" };
      case "completed": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: "Completed" };
      case "cancelled": return { icon: XCircle,      color: "text-red-500",     bg: "bg-red-50",     border: "border-red-200",     label: "Cancelled" };
      default:          return { icon: AlertCircle,  color: "text-gray-500",    bg: "bg-gray-50",    border: "border-gray-200",    label: "Unknown" };
    }
  };

  const stats = {
    total:     bookings.length,
    upcoming:  bookings.filter((b) => b.status === "upcoming").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const getProviderName = (booking: any) => {
    const p = booking.provider;
    if (!p) return "Provider";
    return p.businessName || `${p.firstName || ""} ${p.lastName || ""}`.trim();
  };

  const getProviderImage = (booking: any) =>
    booking.provider?.profileImage
      ? `https://homecare360.onrender.com/uploads/${booking.provider.profileImage}`
      : "";

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
              My Bookings
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your Service Appointments
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track all your home service bookings
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {[
              { label: "Total",     value: stats.total,     icon: Calendar,     color: "text-gray-700",    bg: "bg-gray-100"    },
              { label: "Upcoming",  value: stats.upcoming,  icon: AlertCircle,  color: "text-cyan-600",    bg: "bg-cyan-50"     },
              { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50"  },
              { label: "Cancelled", value: stats.cancelled, icon: XCircle,      color: "text-red-500",     bg: "bg-red-50"      },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3"
              >
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
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {[
            { id: "all",       label: "All Bookings" },
            { id: "upcoming",  label: "Upcoming"     },
            { id: "completed", label: "Completed"    },
            { id: "cancelled", label: "Cancelled"    },
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

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-semibold text-gray-900">{filteredBookings.length}</span> booking{filteredBookings.length !== 1 ? "s" : ""} found
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
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-100 p-12 text-center"
            >
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">No bookings found</h3>
              <p className="text-sm text-gray-500 mb-4">
                You don't have any {filter !== "all" ? filter : ""} bookings yet.
              </p>
              <Link
                to="/services"
                className="inline-block px-6 py-2.5 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors"
              >
                Browse Services
              </Link>
            </motion.div>
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
                  <div className="flex flex-col md:flex-row">
                    {/* Provider Image */}
                    <div className="md:w-44 h-44 md:h-auto relative overflow-hidden flex-shrink-0">
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
                          <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                            {getProviderName(booking)}
                          </h3>
                          <p className="text-sm text-[#00B8A9] font-medium">
                            {booking.serviceCategory}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {/* Status badge */}
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sc.bg} ${sc.color} ${sc.border}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {sc.label}
                          </span>
                          {/* Amount */}
                          <div className="text-right">
                            <span className="text-xl font-bold text-gray-900">₹{booking.totalAmount}</span>
                            <span className="text-xs text-gray-400 ml-0.5">total</span>
                          </div>
                        </div>
                      </div>

                      {/* Meta details */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
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
                            <span>{booking.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                        {booking.status === "upcoming" && (
                          <>
                            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors">
                              <MessageSquare className="w-3.5 h-3.5" />
                              Message Provider
                            </button>
                            <button
                              onClick={() => handleCancel(booking._id)}
                              className="px-4 py-2 border border-red-200 text-red-500 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                            >
                              Cancel Booking
                            </button>
                          </>
                        )}
                        {booking.status === "completed" && (
                          <>
                            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors">
                              <Star className="w-3.5 h-3.5" />
                              Leave a Review
                            </button>
                            <Link
                              to={`/profile/${booking.provider?._id}`}
                              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-cyan-200 hover:text-[#00B8A9] transition-colors"
                            >
                              Book Again
                            </Link>
                          </>
                        )}
                        {booking.status === "cancelled" && (
                          <Link
                            to={`/profile/${booking.provider?._id}`}
                            className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-cyan-200 hover:text-[#00B8A9] transition-colors"
                          >
                            Book Again
                          </Link>
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
    </div>
  );
}
