const Review  = require("../models/review");
const Booking = require("../models/booking");

exports.createReview = async (userId, data) => {
  const { providerId, bookingId, rating, comment } = data;

  // Must reference a completed booking that belongs to this user
  if (bookingId) {
    const booking = await Booking.findOne({ _id: bookingId, user: userId });
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "completed") throw new Error("You can only review completed bookings");

    const existing = await Review.findOne({ booking: bookingId, user: userId });
    if (existing) throw new Error("You already reviewed this booking");
  }

  const review = await Review.create({
    user:     userId,
    provider: providerId,
    booking:  bookingId || undefined,
    rating,
    comment: comment || "",
  });

  return review;
};

exports.getProviderReviews = async (providerId) => {
  return Review.find({ provider: providerId, status: "approved" })
    .populate("user", "fullName")
    .sort({ createdAt: -1 });
};

exports.checkReviewed = async (bookingId, userId) => {
  const existing = await Review.findOne({ booking: bookingId, user: userId });
  return { reviewed: !!existing };
};

exports.getAllReviews = async () => {
  return Review.find()
    .populate("user",     "fullName email")
    .populate("provider", "firstName lastName businessName serviceCategory")
    .sort({ createdAt: -1 });
};

exports.updateReviewStatus = async (id, status) => {
  return Review.findByIdAndUpdate(id, { status }, { new: true });
};
