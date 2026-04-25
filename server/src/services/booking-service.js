const Booking = require("../models/booking");

const PLATFORM_FEE_PERCENT = 0.15;

exports.createBooking = async (userId, data) => {
  const platformFee = Math.round(data.totalAmount * PLATFORM_FEE_PERCENT * 100) / 100;
  const providerPayout = Math.round((data.totalAmount - platformFee) * 100) / 100;

  return Booking.create({
    user: userId,
    provider: data.providerId,
    serviceCategory: data.serviceCategory,
    date: data.date,
    time: data.time || "",
    location: data.location || "",
    totalAmount: data.totalAmount,
    platformFee,
    providerPayout,
  });
};

exports.getUserBookings = async (userId) => {
  return Booking.find({ user: userId })
    .populate("provider", "firstName lastName businessName serviceCategory profileImage hourlyRate")
    .sort({ createdAt: -1 });
};

exports.cancelBooking = async (id, userId) => {
  const booking = await Booking.findOne({ _id: id, user: userId });
  if (!booking) throw new Error("Booking not found");
  if (booking.status !== "upcoming") throw new Error("Only upcoming bookings can be cancelled");
  booking.status = "cancelled";
  return booking.save();
};

exports.getAllBookings = async () => {
  return Booking.find()
    .populate("user", "fullName email")
    .populate("provider", "firstName lastName businessName serviceCategory profileImage")
    .sort({ createdAt: -1 });
};

exports.updateBookingStatus = async (id, status) => {
  return Booking.findByIdAndUpdate(id, { status }, { new: true });
};
