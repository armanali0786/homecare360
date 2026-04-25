const Review = require("../models/review");

exports.createReview = async (userId, data) => {
  return Review.create({
    user: userId,
    provider: data.providerId,
    booking: data.bookingId || undefined,
    rating: data.rating,
    comment: data.comment || "",
  });
};

exports.getProviderReviews = async (providerId) => {
  return Review.find({ provider: providerId, status: "approved" })
    .populate("user", "fullName")
    .sort({ createdAt: -1 });
};

exports.getAllReviews = async () => {
  return Review.find()
    .populate("user", "fullName email")
    .populate("provider", "firstName lastName businessName serviceCategory")
    .sort({ createdAt: -1 });
};

exports.updateReviewStatus = async (id, status) => {
  return Review.findByIdAndUpdate(id, { status }, { new: true });
};
