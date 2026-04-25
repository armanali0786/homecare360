const User = require("../models/user");
const ProviderApplication = require("../models/provider-application");
const Booking = require("../models/booking");
const Review = require("../models/review");

exports.getDashboardStats = async () => {
  const [totalUsers, totalProviders, totalBookings, pendingApplications] = await Promise.all([
    User.countDocuments({ role: { $ne: "admin" } }),
    ProviderApplication.countDocuments({ status: "approved" }),
    Booking.countDocuments(),
    ProviderApplication.countDocuments({ status: "pending" }),
  ]);

  const revenueAgg = await Booking.aggregate([
    { $match: { status: { $ne: "cancelled" } } },
    { $group: { _id: null, total: { $sum: "$platformFee" } } },
  ]);
  const totalRevenue = revenueAgg[0]?.total || 0;

  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const bookingsByMonth = await Booking.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const revenueByMonth = await Booking.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo }, status: { $ne: "cancelled" } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        revenue: { $sum: "$platformFee" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const topServices = await Booking.aggregate([
    { $group: { _id: "$serviceCategory", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const recentBookings = await Booking.find()
    .populate("user", "fullName")
    .populate("provider", "firstName lastName")
    .sort({ createdAt: -1 })
    .limit(5);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return {
    metrics: { totalUsers, totalProviders, totalBookings, totalRevenue, pendingApplications },
    bookingsData: bookingsByMonth.map((b) => ({
      month: monthNames[b._id.month - 1],
      bookings: b.count,
    })),
    revenueData: revenueByMonth.map((r) => ({
      month: monthNames[r._id.month - 1],
      revenue: Math.round(r.revenue),
    })),
    topServices: topServices.map((s, i) => ({
      name: s._id || "Other",
      value: s.count,
      color: ["#0891b2", "#06b6d4", "#10b981", "#14b8a6", "#059669"][i] || "#9ca3af",
    })),
    recentActivities: recentBookings.map((b) => ({
      id: b._id,
      type: "booking",
      title: b.status === "upcoming" ? "New booking created" : `Booking ${b.status}`,
      description: `${b.user?.fullName || "User"} booked ${b.serviceCategory} service`,
      time: b.createdAt,
    })),
  };
};

exports.getAllUsers = async () => {
  return User.find({ role: { $in: ["user", "provider"] } }).select("-password").sort({ createdAt: -1 });
};

exports.toggleUserStatus = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.isActive = !user.isActive;
  return user.save();
};
