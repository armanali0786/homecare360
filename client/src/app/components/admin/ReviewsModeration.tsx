import { motion } from "motion/react";
import { Star, Eye, EyeOff, Trash2, Flag, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminReviews, updateReviewStatus } from "@/app/lib/api";
import { toast } from "react-toastify";

export function ReviewsModeration() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getAdminReviews();
      setReviews(data.reviews || []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleStatus = async (id: string, status: string) => {
    try {
      await updateReviewStatus(id, status);
      toast.success(`Review ${status}`);
      fetchReviews();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    }
  };

  const getProviderName = (r: any) => {
    const p = r.provider;
    if (!p) return "Provider";
    return p.businessName || `${p.firstName || ""} ${p.lastName || ""}`.trim();
  };

  const filteredReviews = reviews.filter((r) => {
    const matchSearch =
      r.user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getProviderName(r).toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch && (filter === "all" || r.status === filter);
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700";
      case "flagged": return "bg-orange-100 text-orange-700";
      case "hidden": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Reviews Moderation
        </h1>
        <p className="text-gray-600">Monitor and moderate user reviews</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Reviews", value: reviews.length, color: "from-blue-500 to-cyan-600" },
          { label: "Approved", value: reviews.filter((r) => r.status === "approved").length, color: "from-green-500 to-emerald-600" },
          { label: "Flagged", value: reviews.filter((r) => r.status === "flagged").length, color: "from-orange-500 to-red-600" },
          { label: "Hidden", value: reviews.filter((r) => r.status === "hidden").length, color: "from-gray-500 to-gray-600" },
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
          <input type="text" placeholder="Search reviews..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 shadow-sm" />
        </div>
        <div className="flex gap-3 flex-wrap">
          {["all", "approved", "flagged", "hidden"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-32 animate-pulse" />)}</div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">No reviews found.</p></div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <motion.div key={review._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.01, x: 4 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{review.user?.fullName || "User"}</h3>
                        <span className="text-gray-400">→</span>
                        <span className="text-cyan-600 font-medium">{getProviderName(review)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                          ))}
                        </div>
                        <span>{review.provider?.serviceCategory}</span>
                        <span>•</span>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(review.status)}`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
                <div className="flex gap-2 items-start">
                  {review.status !== "approved" && (
                    <button onClick={() => handleStatus(review._id, "approved")} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium flex items-center gap-1">
                      <Eye className="w-4 h-4" /> Approve
                    </button>
                  )}
                  {review.status !== "flagged" && (
                    <button onClick={() => handleStatus(review._id, "flagged")} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 text-sm font-medium flex items-center gap-1">
                      <Flag className="w-4 h-4" /> Flag
                    </button>
                  )}
                  {review.status !== "hidden" && (
                    <button onClick={() => handleStatus(review._id, "hidden")} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center gap-1">
                      <EyeOff className="w-4 h-4" /> Hide
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
