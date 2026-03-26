import { motion } from "motion/react";
import { Calendar, Clock, MapPin, DollarSign, CheckCircle2, XCircle, AlertCircle, MessageSquare, Star } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useState } from "react";

interface Booking {
  id: string;
  provider: {
    name: string;
    service: string;
    image: string;
    rating: number;
  };
  date: string;
  time: string;
  location: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  bookingDate: string;
}

const bookings: Booking[] = [
  {
    id: "1",
    provider: {
      name: "Sarah Williams",
      service: "Electrical",
      image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
    },
    date: "January 28, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "123 Main St, New York, NY 10001",
    price: 190,
    status: "upcoming",
    bookingDate: "January 23, 2026",
  },
  {
    id: "2",
    provider: {
      name: "Mike Johnson",
      service: "Plumbing",
      image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsJTIwd29ya3xlbnwxfHx8fDE3NjkxNTA5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
    },
    date: "January 20, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "123 Main St, New York, NY 10001",
    price: 170,
    status: "completed",
    bookingDate: "January 15, 2026",
  },
  {
    id: "3",
    provider: {
      name: "Clean Pro Services",
      service: "Cleaning",
      image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkxODY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
    },
    date: "January 25, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "123 Main St, New York, NY 10001",
    price: 260,
    status: "upcoming",
    bookingDate: "January 22, 2026",
  },
  {
    id: "4",
    provider: {
      name: "David Martinez",
      service: "Painting",
      image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkwODAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
    },
    date: "January 10, 2026",
    time: "8:00 AM - 5:00 PM",
    location: "123 Main St, New York, NY 10001",
    price: 630,
    status: "completed",
    bookingDate: "January 5, 2026",
  },
  {
    id: "5",
    provider: {
      name: "Green Thumb Landscaping",
      service: "Landscaping",
      image: "https://images.unsplash.com/photo-1626075218494-89e92b375502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGluZyUyMGdhcmRlbnxlbnwxfHx8fDE3NjkxODc5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
    },
    date: "January 15, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "123 Main St, New York, NY 10001",
    price: 300,
    status: "cancelled",
    bookingDate: "January 10, 2026",
  },
];

export function MyBookings() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const filteredBookings = bookings.filter(
    (booking) => filter === "all" || booking.status === filter
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          icon: AlertCircle,
          color: "text-cyan-600",
          bg: "bg-cyan-50",
          label: "Upcoming",
        };
      case "completed":
        return {
          icon: CheckCircle2,
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          label: "Completed",
        };
      case "cancelled":
        return {
          icon: XCircle,
          color: "text-red-600",
          bg: "bg-red-50",
          label: "Cancelled",
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bg: "bg-gray-50",
          label: "Unknown",
        };
    }
  };

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your service appointments and history</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-2 mb-8 inline-flex gap-2"
        >
          {[
            { id: "all", label: "All" },
            { id: "upcoming", label: "Upcoming" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === tab.id
                  ? "bg-gradient-to-r from-cyan-600 to-emerald-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">You don't have any {filter !== "all" ? filter : ""} bookings yet.</p>
              <button className="bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                Browse Services
              </button>
            </motion.div>
          ) : (
            filteredBookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Provider Image */}
                    <div className="lg:w-64 h-48 lg:h-auto relative overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={booking.provider.image}
                        alt={booking.provider.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className={`absolute top-4 right-4 ${statusConfig.bg} ${statusConfig.color} px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{statusConfig.label}</span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.provider.name}</h3>
                          <p className="text-cyan-600 font-medium mb-2">{booking.provider.service}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{booking.provider.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">${booking.price}</div>
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

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium text-gray-900">{booking.time}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 md:col-span-2">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">{booking.location}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                        {booking.status === "upcoming" && (
                          <>
                            <button className="flex-1 min-w-[140px] bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Message Provider
                            </button>
                            <button className="flex-1 min-w-[140px] border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
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
                            <button className="flex-1 min-w-[140px] border-2 border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors">
                              Book Again
                            </button>
                          </>
                        )}
                        {booking.status === "cancelled" && (
                          <button className="flex-1 min-w-[140px] border-2 border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors">
                            Book Again
                          </button>
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
