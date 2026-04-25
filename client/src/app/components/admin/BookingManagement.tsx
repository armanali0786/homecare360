import { motion } from "motion/react";
import { Search, Calendar, MapPin, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminBookings, updateBookingStatus } from "@/app/lib/api";
import { toast } from "react-toastify";

export function BookingManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getAdminBookings();
      setBookings(data.bookings || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateBookingStatus(id, status);
      toast.success("Booking updated");
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    }
  };

  const getProviderName = (b: any) => {
    const p = b.provider;
    if (!p) return "Provider";
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
      case "upcoming": return { icon: AlertCircle, color: "text-cyan-600", bg: "bg-cyan-50", label: "Upcoming" };
      case "completed": return { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", label: "Completed" };
      case "cancelled": return { icon: XCircle, color: "text-red-600", bg: "bg-red-50", label: "Cancelled" };
      default: return { icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-50", label: status };
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Booking Management
        </h1>
        <p className="text-gray-600">Monitor and manage all bookings on the platform</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total", value: bookings.length, color: "from-blue-500 to-cyan-600" },
          { label: "Upcoming", value: bookings.filter((b) => b.status === "upcoming").length, color: "from-cyan-500 to-teal-600" },
          { label: "Completed", value: bookings.filter((b) => b.status === "completed").length, color: "from-green-500 to-emerald-600" },
          { label: "Cancelled", value: bookings.filter((b) => b.status === "cancelled").length, color: "from-red-500 to-orange-600" },
        ].map((stat, index) => (
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
          <input type="text" placeholder="Search bookings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 shadow-sm" />
        </div>
        <div className="flex gap-3 flex-wrap">
          {["all", "upcoming", "completed", "cancelled"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-36 animate-pulse" />)}</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">No bookings found.</p></div>
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
                          {booking.user?.fullName || "User"} → {getProviderName(booking)}
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
                      <div className="font-semibold text-gray-800">₹{booking.totalAmount}</div>
                    </div>
                  </div>

                  {booking.status === "upcoming" && (
                    <div className="flex gap-2">
                      <button onClick={() => handleStatusChange(booking._id, "completed")} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Complete
                      </button>
                      <button onClick={() => handleStatusChange(booking._id, "cancelled")} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
