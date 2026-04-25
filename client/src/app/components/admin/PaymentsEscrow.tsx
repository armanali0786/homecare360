import { motion } from "motion/react";
import { DollarSign, TrendingUp, CheckCircle2, AlertCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminBookings, updateBookingStatus } from "@/app/lib/api";
import { toast } from "react-toastify";

export function PaymentsEscrow() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getAdminBookings();
      const withPayments = (data.bookings || []).filter((b: any) => b.totalAmount > 0);
      setBookings(withPayments);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleRelease = async (id: string) => {
    try {
      await updateBookingStatus(id, "completed");
      toast.success("Payment released to provider");
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || "Failed to release");
    }
  };

  const getProviderName = (b: any) => {
    const p = b.provider;
    if (!p) return "Provider";
    return p.businessName || `${p.firstName || ""} ${p.lastName || ""}`.trim();
  };

  const getPaymentStatus = (booking: any) => {
    if (booking.status === "cancelled") return "refunded";
    if (booking.status === "completed") return "released";
    return "held";
  };

  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getProviderName(b).toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceCategory?.toLowerCase().includes(searchQuery.toLowerCase());
    const payStatus = getPaymentStatus(b);
    return matchSearch && (filter === "all" || payStatus === filter);
  });

  const totalRevenue = bookings.reduce((s, b) => s + (b.platformFee || 0), 0);
  const heldAmount = bookings.filter((b) => getPaymentStatus(b) === "held").reduce((s, b) => s + (b.totalAmount || 0), 0);
  const releasedAmount = bookings.filter((b) => getPaymentStatus(b) === "released").reduce((s, b) => s + (b.providerPayout || 0), 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "held": return "bg-yellow-100 text-yellow-700";
      case "released": return "bg-green-100 text-green-700";
      case "refunded": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Payments & Escrow
        </h1>
        <p className="text-gray-600">Manage payment transactions and provider payouts</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Platform Revenue", value: `₹${totalRevenue.toFixed(2)}`, icon: TrendingUp, color: "from-green-500 to-emerald-600", bg: "bg-green-50" },
          { label: "Funds in Escrow", value: `₹${heldAmount.toFixed(2)}`, icon: AlertCircle, color: "from-yellow-500 to-orange-500", bg: "bg-yellow-50" },
          { label: "Paid to Providers", value: `₹${releasedAmount.toFixed(2)}`, icon: CheckCircle2, color: "from-cyan-500 to-teal-600", bg: "bg-cyan-50" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium`}>{stat.label}</div>
              </div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 shadow-sm" />
        </div>
        <div className="flex gap-3 flex-wrap">
          {["all", "held", "released", "refunded"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions */}
      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-32 animate-pulse" />)}</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">No transactions found.</p></div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => {
            const payStatus = getPaymentStatus(booking);
            return (
              <motion.div key={booking._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.01, x: 4 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {booking.user?.fullName || "User"} → {getProviderName(booking)}
                        </h3>
                        <p className="text-sm text-cyan-600">{booking.serviceCategory}</p>
                        <p className="text-xs text-gray-500">{booking.date} • Booked {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(payStatus)}`}>
                        {payStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Total Amount</p>
                        <p className="font-bold text-gray-800">₹{booking.totalAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Platform Fee (15%)</p>
                        <p className="font-bold text-green-600">₹{(booking.platformFee || 0).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Provider Payout</p>
                        <p className="font-bold text-cyan-600">₹{(booking.providerPayout || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  {payStatus === "held" && (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => handleRelease(booking._id)} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium flex items-center gap-2 whitespace-nowrap">
                        <CheckCircle2 className="w-4 h-4" /> Release Funds
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
