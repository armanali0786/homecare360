import { motion } from "motion/react";
import { Search, Filter, Calendar, Clock, MapPin, DollarSign, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface Booking {
  id: string;
  bookingId: string;
  user: {
    name: string;
    image: string;
  };
  provider: {
    name: string;
    service: string;
    image: string;
  };
  date: string;
  time: string;
  location: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

const bookings: Booking[] = [
  {
    id: "1",
    bookingId: "BK-1001",
    user: {
      name: "Emma Wilson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    provider: {
      name: "Mike Johnson",
      service: "Plumbing",
      image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=100"
    },
    date: "Jan 28, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "123 Main St, New York, NY",
    price: 170,
    status: "upcoming",
    createdAt: "Jan 23, 2026"
  },
  {
    id: "2",
    bookingId: "BK-1002",
    user: {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    provider: {
      name: "Sarah Williams",
      service: "Electrical",
      image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?w=100"
    },
    date: "Jan 25, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "456 Oak Ave, Brooklyn, NY",
    price: 190,
    status: "upcoming",
    createdAt: "Jan 22, 2026"
  },
  {
    id: "3",
    bookingId: "BK-1003",
    user: {
      name: "Sophie Brown",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    provider: {
      name: "Clean Pro Services",
      service: "Cleaning",
      image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?w=100"
    },
    date: "Jan 20, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "789 Pine Rd, Queens, NY",
    price: 260,
    status: "completed",
    createdAt: "Jan 18, 2026"
  },
  {
    id: "4",
    bookingId: "BK-1004",
    user: {
      name: "James Miller",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
    },
    provider: {
      name: "David Martinez",
      service: "Painting",
      image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=100"
    },
    date: "Jan 15, 2026",
    time: "8:00 AM - 5:00 PM",
    location: "321 Elm St, Manhattan, NY",
    price: 630,
    status: "cancelled",
    createdAt: "Jan 10, 2026"
  },
];

export function BookingManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    upcoming: { icon: Clock, color: "bg-blue-100 text-blue-700", label: "Upcoming" },
    completed: { icon: CheckCircle2, color: "bg-green-100 text-green-700", label: "Completed" },
    cancelled: { icon: XCircle, color: "bg-red-100 text-red-700", label: "Cancelled" }
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
          Booking Management
        </h1>
        <p className="text-gray-600">View and manage all platform bookings</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Bookings", value: bookings.length, color: "from-blue-500 to-cyan-600" },
          { label: "Upcoming", value: bookings.filter(b => b.status === "upcoming").length, color: "from-cyan-500 to-teal-600" },
          { label: "Completed", value: bookings.filter(b => b.status === "completed").length, color: "from-green-500 to-emerald-600" },
          { label: "Cancelled", value: bookings.filter(b => b.status === "cancelled").length, color: "from-red-500 to-orange-600" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium mb-2`}>
              {stat.label}
            </div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by booking ID, user, or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          {["all", "upcoming", "completed", "cancelled"].map((status) => (
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
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => {
          const StatusIcon = statusConfig[booking.status].icon;
          
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Booking ID and Status */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold mb-2">
                    {booking.bookingId}
                  </div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[booking.status].color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig[booking.status].label}
                  </span>
                </div>

                {/* User and Provider */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Customer</p>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={booking.user.image}
                        alt={booking.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{booking.user.name}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Provider</p>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={booking.provider.image}
                        alt={booking.provider.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{booking.provider.name}</p>
                        <p className="text-sm text-gray-600">{booking.provider.service}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    {booking.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    {booking.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    {booking.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                    <DollarSign className="w-4 h-4" />
                    ${booking.price}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 min-w-[140px]">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium text-sm"
                  >
                    View Details
                  </motion.button>
                  {booking.status === "upcoming" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium text-sm"
                  >
                    Resolve Dispute
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                Created on {booking.createdAt}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
