const Booking  = require("../models/booking");
const ProviderApplication = require("../models/provider-application");
const User     = require("../models/user");
const emailSvc = require("./email-service");
const smsSvc   = require("./sms-service");

const PLATFORM_FEE_PERCENT = 0.15;

function bookingRef(id) {
  return `HC-${id.toString().slice(-8).toUpperCase()}`;
}

// ── Parse a booking's date+time into a JS Date ───────────────────────────────
function appointmentDateTime(booking) {
  if (!booking.date) return null;
  // date: "YYYY-MM-DD", time: "10:00 AM" etc.
  const base = new Date(booking.date);
  if (booking.time) {
    const match = booking.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      let h = parseInt(match[1]);
      const m = parseInt(match[2]);
      const ampm = match[3].toUpperCase();
      if (ampm === "PM" && h !== 12) h += 12;
      if (ampm === "AM" && h === 12) h = 0;
      base.setHours(h, m, 0, 0);
    }
  }
  return base;
}

// ── Cancellation policy ───────────────────────────────────────────────────────
function getCancellationPolicy(booking) {
  const apptTime = appointmentDateTime(booking);
  if (!apptTime) return { allowed: true, fee: 0, refundNote: "Full refund issued" };

  const hoursLeft = (apptTime - Date.now()) / (1000 * 60 * 60);

  if (hoursLeft < 0) return { allowed: false, fee: 0, refundNote: "" };         // past
  if (hoursLeft < 2)  return { allowed: false, fee: 0, refundNote: "" };         // < 2h – blocked
  if (hoursLeft < 24) return { allowed: true, fee: 100, refundNote: "₹100 cancellation fee applies (less than 24h notice)" };
  return { allowed: true, fee: 0, refundNote: "Full refund — cancelled more than 24h before appointment" };
}

// ── Create booking ────────────────────────────────────────────────────────────
exports.createBooking = async (userId, data) => {
  const totalAmount   = data.totalAmount;
  const platformFee   = Math.round(totalAmount * PLATFORM_FEE_PERCENT * 100) / 100;
  const providerPayout = Math.round((totalAmount - platformFee) * 100) / 100;

  const booking = await Booking.create({
    user:            userId,
    provider:        data.providerId,
    serviceCategory: data.serviceCategory,
    date:            data.date,
    time:            data.time            || "",
    location:        data.location        || "",
    totalAmount,
    platformFee,
    providerPayout,
    propertyType:        data.propertyType        || "",
    propertySize:        data.propertySize        || "",
    addOns:              data.addOns              || [],
    specialInstructions: data.specialInstructions || "",
    floorLandmark:       data.floorLandmark       || "",
    promoCode:           data.promoCode           || "",
    discountAmount:      data.discountAmount       || 0,
    gstAmount:           data.gstAmount            || 0,
    paymentMethod:       data.paymentMethod        || "cod",
    paymentStatus:       "pending",
  });

  // Fire-and-forget notifications
  const ref = bookingRef(booking._id);
  const nd  = {
    ref,
    service:  data.serviceCategory,
    date:     data.date,
    time:     data.time || "",
    address:  data.location || "",
    total:    totalAmount,
  };

  const user = await User.findById(userId);
  if (user?.email) emailSvc.bookingConfirmed(user.email, nd);
  if (user?.phone) smsSvc.bookingConfirmed(user.phone, nd);

  // Notify provider
  const provider = await ProviderApplication.findById(data.providerId);
  if (provider?.phone) smsSvc.providerAssigned(provider.phone, nd);

  return booking;
};

// ── Get user bookings ─────────────────────────────────────────────────────────
exports.getUserBookings = async (userId) => {
  return Booking.find({ user: userId })
    .populate("provider", "firstName lastName businessName serviceCategory profileImage hourlyRate")
    .sort({ createdAt: -1 });
};

// ── Provider accept ───────────────────────────────────────────────────────────
exports.acceptBooking = async (id, userId) => {
  const providerApp = await ProviderApplication.findOne({ user: userId });
  if (!providerApp) throw new Error("Provider profile not found");

  const booking = await Booking.findOne({ _id: id, provider: providerApp._id });
  if (!booking) throw new Error("Booking not found");
  if (booking.status !== "pending") throw new Error("Only pending bookings can be accepted");

  booking.status = "upcoming";
  await booking.save();

  // Notify customer that provider accepted
  const ref  = bookingRef(booking._id);
  const user = await User.findById(booking.user);
  if (user?.email)
    emailSvc.bookingConfirmed(user.email, {
      ref,
      service:  booking.serviceCategory,
      date:     booking.date,
      time:     booking.time || "",
      address:  booking.location || "",
      total:    booking.totalAmount,
    });

  return booking;
};

// ── Customer cancel ───────────────────────────────────────────────────────────
exports.cancelBooking = async (id, userId) => {
  const booking = await Booking.findOne({ _id: id, user: userId });
  if (!booking) throw new Error("Booking not found");
  if (!["pending", "upcoming"].includes(booking.status))
    throw new Error("Only pending or upcoming bookings can be cancelled");

  const policy = getCancellationPolicy(booking);
  if (!policy.allowed) throw new Error("This booking cannot be cancelled (service starts within 2 hours)");

  booking.status = "cancelled";
  booking.cancelledBy     = "customer";
  booking.cancellationReason = "Customer requested cancellation";
  await booking.save();

  const ref = bookingRef(booking._id);
  const user = await User.findById(userId);
  if (user?.email) emailSvc.bookingCancelled(user.email, { ref, refundNote: policy.refundNote });
  if (user?.phone) smsSvc.bookingCancelled(user.phone, { ref, refundNote: policy.refundNote });

  return { booking, policy };
};

// ── Provider cancel ───────────────────────────────────────────────────────────
exports.providerCancelBooking = async (id, userId) => {
  const providerApp = await ProviderApplication.findOne({ user: userId });
  if (!providerApp) throw new Error("Provider profile not found");

  const booking = await Booking.findOne({ _id: id, provider: providerApp._id });
  if (!booking) throw new Error("Booking not found");
  if (!["pending", "upcoming"].includes(booking.status))
    throw new Error("Only pending or upcoming bookings can be cancelled");

  booking.status = "cancelled";
  booking.cancelledBy        = "provider";
  booking.cancellationReason = "Provider cancelled";
  await booking.save();

  // Penalty
  providerApp.penaltyCount = (providerApp.penaltyCount || 0) + 1;
  await providerApp.save();

  // Notify customer
  const ref  = bookingRef(booking._id);
  const user = await User.findById(booking.user);
  const refundNote = booking.paymentStatus === "paid"
    ? "Full refund will be processed within 3-5 business days"
    : "No charge was made";

  if (user?.email)
    emailSvc.bookingCancelled(user.email, { ref, refundNote, cancelledBy: "provider" });
  if (user?.phone)
    smsSvc.bookingCancelled(user.phone, { ref, refundNote });

  return { booking, penaltyCount: providerApp.penaltyCount };
};

// ── Get provider's own bookings ───────────────────────────────────────────────
exports.getProviderBookings = async (userId) => {
  const providerApp = await ProviderApplication.findOne({ user: userId });
  if (!providerApp) throw new Error("Provider profile not found");

  return Booking.find({ provider: providerApp._id })
    .populate("user", "fullName email phone")
    .sort({ createdAt: -1 });
};

// ── Cancellation policy check (public) ───────────────────────────────────────
exports.getCancellationPolicyForBooking = async (id, userId) => {
  const booking = await Booking.findOne({ _id: id, user: userId });
  if (!booking) throw new Error("Booking not found");
  return getCancellationPolicy(booking);
};

// ── Admin helpers ─────────────────────────────────────────────────────────────
exports.getAllBookings = async () => {
  return Booking.find()
    .populate("user",     "fullName email")
    .populate("provider", "firstName lastName businessName serviceCategory profileImage")
    .sort({ createdAt: -1 });
};

exports.updateBookingStatus = async (id, status) => {
  const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

  // Auto send review reminder when marked complete
  if (status === "completed") {
    const user = await User.findById(booking.user);
    const provider = await ProviderApplication.findById(booking.provider);
    const providerName = provider
      ? (provider.businessName || `${provider.firstName} ${provider.lastName}`.trim())
      : "your provider";
    if (user?.email)
      emailSvc.reviewReminder(user.email, {
        name:     user.fullName,
        service:  booking.serviceCategory,
        provider: providerName,
      });
  }

  return booking;
};
