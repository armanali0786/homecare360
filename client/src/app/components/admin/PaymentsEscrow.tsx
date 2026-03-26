import { motion } from "motion/react";
import { DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle, Filter } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  bookingId: string;
  provider: string;
  user: string;
  amount: number;
  platformFee: number;
  providerPayout: number;
  status: "held" | "released" | "refunded";
  date: string;
  service: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    bookingId: "BK-1001",
    provider: "Mike Johnson",
    user: "Emma Wilson",
    amount: 170,
    platformFee: 25.5,
    providerPayout: 144.5,
    status: "held",
    date: "Jan 24, 2026",
    service: "Plumbing"
  },
  {
    id: "2",
    bookingId: "BK-1002",
    provider: "Sarah Williams",
    user: "Michael Chen",
    amount: 190,
    platformFee: 28.5,
    providerPayout: 161.5,
    status: "held",
    date: "Jan 24, 2026",
    service: "Electrical"
  },
  {
    id: "3",
    bookingId: "BK-1003",
    provider: "Clean Pro Services",
    user: "Sophie Brown",
    amount: 260,
    platformFee: 39,
    providerPayout: 221,
    status: "released",
    date: "Jan 20, 2026",
    service: "Cleaning"
  },
  {
    id: "4",
    bookingId: "BK-1004",
    provider: "David Martinez",
    user: "James Miller",
    amount: 630,
    platformFee: 94.5,
    providerPayout: 535.5,
    status: "refunded",
    date: "Jan 15, 2026",
    service: "Painting"
  },
];

export function PaymentsEscrow() {
  const [statusFilter, setStatusFilter] = useState<"all" | "held" | "released" | "refunded">("all");

  const filteredTransactions = transactions.filter(t => 
    statusFilter === "all" || t.status === statusFilter
  );

  const totalHeld = transactions
    .filter(t => t.status === "held")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalReleased = transactions
    .filter(t => t.status === "released")
    .reduce((sum, t) => sum + t.providerPayout, 0);

  const platformRevenue = transactions
    .filter(t => t.status === "released")
    .reduce((sum, t) => sum + t.platformFee, 0);

  const statusConfig = {
    held: { color: "bg-yellow-100 text-yellow-700", label: "Held in Escrow" },
    released: { color: "bg-green-100 text-green-700", label: "Released" },
    refunded: { color: "bg-red-100 text-red-700", label: "Refunded" }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Payments & Escrow Management
        </h1>
        <p className="text-gray-600">Monitor transactions, escrow, and provider payouts</p>
      </motion.div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Held in Escrow", value: `$${totalHeld.toLocaleString()}`, icon: Clock, color: "from-yellow-500 to-orange-500" },
          { label: "Released This Week", value: `$${totalReleased.toLocaleString()}`, icon: CheckCircle2, color: "from-green-500 to-emerald-500" },
          { label: "Platform Revenue", value: `$${platformRevenue.toLocaleString()}`, icon: TrendingUp, color: "from-cyan-500 to-teal-500" },
          { label: "Pending Payouts", value: "12", icon: AlertCircle, color: "from-blue-500 to-indigo-500" }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Payout Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-cyan-50 to-teal-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8 shadow-md"
      >
        <div className="flex items-start gap-4">
          <div className="bg-cyan-600 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2">Weekly Payout Schedule</h3>
            <p className="text-gray-600 mb-4">Next payout is scheduled for <strong>Friday, January 31, 2026</strong></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Payout Amount</p>
                <p className="text-2xl font-bold text-gray-800">$12,450</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Platform Fee (15%)</p>
                <p className="text-2xl font-bold text-cyan-600">$1,867.50</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Providers Receiving</p>
                <p className="text-2xl font-bold text-teal-600">34</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Process Manual Payout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <Filter className="w-5 h-5 text-gray-600" />
        {["all", "held", "released", "refunded"].map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStatusFilter(status as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              statusFilter === status
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Booking ID</th>
                <th className="px-6 py-4 text-left font-semibold">Provider</th>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Service</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">Platform Fee</th>
                <th className="px-6 py-4 text-left font-semibold">Provider Payout</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-cyan-600">{transaction.bookingId}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-800">{transaction.provider}</td>
                  <td className="px-6 py-4 text-gray-800">{transaction.user}</td>
                  <td className="px-6 py-4 text-gray-600">{transaction.service}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">${transaction.amount}</td>
                  <td className="px-6 py-4 text-cyan-600">${transaction.platformFee}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">${transaction.providerPayout}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[transaction.status].color}`}>
                      {statusConfig[transaction.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{transaction.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Dispute Resolution Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Dispute Resolution</h2>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Active Disputes: 2</h3>
              <p className="text-sm text-gray-600 mb-3">Requires admin review and decision</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                Review Disputes
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
