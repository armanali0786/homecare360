import { motion } from "motion/react";
import { Star, Eye, EyeOff, Trash2, Flag, Filter } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface Review {
  id: string;
  user: {
    name: string;
    image: string;
  };
  provider: {
    name: string;
    service: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: string;
  bookingId: string;
  status: "approved" | "flagged" | "hidden";
  helpful: number;
}

const reviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Emma Wilson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    provider: {
      name: "Mike Johnson",
      service: "Plumbing",
      image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=100"
    },
    rating: 5,
    comment: "Mike did an excellent job fixing our leaky pipes! Very professional, arrived on time, and cleaned up after himself. Would definitely hire again!",
    date: "Jan 23, 2026",
    bookingId: "BK-1001",
    status: "approved",
    helpful: 12
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    provider: {
      name: "Sarah Williams",
      service: "Electrical",
      image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?w=100"
    },
    rating: 5,
    comment: "Sarah is amazing! She rewired our entire living room and everything works perfectly. Very knowledgeable and explained everything clearly.",
    date: "Jan 22, 2026",
    bookingId: "BK-1002",
    status: "approved",
    helpful: 8
  },
  {
    id: "3",
    user: {
      name: "James Miller",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
    },
    provider: {
      name: "Clean Pro Services",
      service: "Cleaning",
      image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?w=100"
    },
    rating: 1,
    comment: "Terrible service. They showed up late and did a horrible job. Don't waste your money!!!",
    date: "Jan 20, 2026",
    bookingId: "BK-1003",
    status: "flagged",
    helpful: 0
  },
  {
    id: "4",
    user: {
      name: "Sophie Brown",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    provider: {
      name: "David Martinez",
      service: "Painting",
      image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=100"
    },
    rating: 4,
    comment: "Good work overall. A bit pricey but the quality was there. Took longer than expected but the final result looks great.",
    date: "Jan 18, 2026",
    bookingId: "BK-1004",
    status: "approved",
    helpful: 5
  },
];

export function ReviewsModeration() {
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "flagged" | "hidden">("all");
  const [ratingFilter, setRatingFilter] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");

  const filteredReviews = reviews.filter(review => {
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    return matchesStatus && matchesRating;
  });

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const flaggedCount = reviews.filter(r => r.status === "flagged").length;

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
          Reviews & Ratings Moderation
        </h1>
        <p className="text-gray-600">Monitor and moderate user reviews</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Reviews", value: reviews.length, color: "from-blue-500 to-cyan-600" },
          { label: "Average Rating", value: avgRating, icon: "⭐", color: "from-yellow-500 to-orange-500" },
          { label: "Flagged Reviews", value: flaggedCount, color: "from-red-500 to-orange-600" },
          { label: "This Week", value: "23 new", color: "from-green-500 to-emerald-600" }
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
            <div className="text-3xl font-bold text-gray-800">
              {stat.icon && <span className="mr-2">{stat.icon}</span>}
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Status:</span>
          {["all", "approved", "flagged", "hidden"].map((status) => (
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

        <div className="flex items-center gap-3 flex-wrap">
          <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
          <span className="text-sm font-medium text-gray-700">Rating:</span>
          {["all", "5", "4", "3", "2", "1"].map((rating) => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRatingFilter(rating as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                ratingFilter === rating
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {rating === "all" ? "All" : `${rating} ⭐`}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Flagged Reviews Alert */}
      {flaggedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <Flag className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Flagged Reviews Require Attention</h3>
              <p className="text-sm text-gray-600">{flaggedCount} review{flaggedCount > 1 ? 's' : ''} flagged for potential violations</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
              review.status === "flagged" ? "border-red-300" : "border-gray-100"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* User Info */}
              <div className="flex items-start gap-4 flex-1">
                <ImageWithFallback
                  src={review.user.image}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{review.user.name}</h3>
                      <p className="text-sm text-gray-600">Reviewed on {review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Booking: <span className="font-semibold text-cyan-600">{review.bookingId}</span></span>
                    <span>•</span>
                    <span>{review.helpful} found helpful</span>
                  </div>
                </div>
              </div>

              {/* Provider Info */}
              <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
                <p className="text-xs text-gray-500 mb-2">Reviewed Provider</p>
                <div className="flex items-center gap-3 mb-3">
                  <ImageWithFallback
                    src={review.provider.image}
                    alt={review.provider.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{review.provider.name}</p>
                    <p className="text-xs text-gray-600">{review.provider.service}</p>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${
                  review.status === "approved" ? "bg-green-100 text-green-700" :
                  review.status === "flagged" ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 min-w-[120px]">
                {review.status === "approved" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium"
                  >
                    <EyeOff className="w-4 h-4" />
                    Hide
                  </motion.button>
                )}
                {review.status === "hidden" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Show
                  </motion.button>
                )}
                {review.status === "flagged" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Approve
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rating Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Rating Distribution</h2>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = (count / reviews.length) * 100;
            
            return (
              <div key={rating} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-12">{rating} ⭐</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-16">{count} ({percentage.toFixed(0)}%)</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
