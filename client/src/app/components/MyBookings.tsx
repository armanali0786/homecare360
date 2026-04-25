import { motion } from "motion/react";
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, MessageSquare, Star } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "@/app/lib/api";
import { toast } from "react-toastify";

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
      case "upcoming": return { icon: AlertCircle, color: "text-cyan-600", bg: "bg-cyan-50", label: "Upcoming" };
      case "completed": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", label: "Completed" };
      case "cancelled": return { icon: XCircle, color: "text-red-600", bg: "bg-red-50", label: "Cancelled" };
      default: return { icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-50", label: "Unknown" };
    }
  };

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
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
      ? `http://localhost:5000/uploads/${booking.provider.profileImage}`
      : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your service appointments and history</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                <p className="text-2xl md:text-3xl font-bold text-cyan-600">{stats.upcoming}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cancelled</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-xl shadow-lg p-2 mb-8 inline-flex gap-2">
          {[{ id: "all", label: "All" }, { id: "upcoming", label: "Upcoming" }, { id: "completed", label: "Completed" }, { id: "cancelled", label: "Cancelled" }].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === tab.id ? "bg-gradient-to-r from-cyan-600 to-emerald-500 text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Bookings List */}
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl shadow-lg h-48 animate-pulse" />)}
            </div>
          ) : filteredBookings.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">You don't have any {filter !== "all" ? filter : ""} bookings yet.</p>
              <a href="/services" className="inline-block bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                Browse Services
              </a>
            </motion.div>
          ) : (
            filteredBookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;
              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-64 h-48 lg:h-auto relative overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={getProviderImage(booking)}
                        alt={getProviderName(booking)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className={`absolute top-4 right-4 ${statusConfig.bg} ${statusConfig.color} px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{statusConfig.label}</span>
                      </div>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{getProviderName(booking)}</h3>
                          <p className="text-cyan-600 font-medium mb-2">{booking.serviceCategory}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">₹{booking.totalAmount}</div>
                          <div className="text-sm text-gray-500">Total</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5 text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium text-gray-900">{booking.date}</p>
                          </div>
                        </div>

                        {booking.time && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Clock className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Time</p>
                              <p className="font-medium text-gray-900">{booking.time}</p>
                            </div>
                          </div>
                        )}

                        {booking.location && (
                          <div className="flex items-start gap-3 md:col-span-2">
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium text-gray-900">{booking.location}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                        {booking.status === "upcoming" && (
                          <>
                            <button className="flex-1 min-w-[140px] bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Message Provider
                            </button>
                            <button
                              onClick={() => handleCancel(booking._id)}
                              className="flex-1 min-w-[140px] border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              Cancel Booking
                            </button>
                          </>
                        )}
                        {booking.status === "completed" && (
                          <>
                            <button className="flex-1 min-w-[140px] bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                              <Star className="w-4 h-4" />
                              Leave a Review
                            </button>
                            <a href={`/profile/${booking.provider?._id}`} className="flex-1 min-w-[140px] border-2 border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors text-center">
                              Book Again
                            </a>
                          </>
                        )}
                        {booking.status === "cancelled" && (
                          <a href={`/profile/${booking.provider?._id}`} className="flex-1 min-w-[140px] border-2 border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors text-center">
                            Book Again
                          </a>
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
