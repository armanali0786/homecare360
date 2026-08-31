const Booking = require("../models/booking");
const ProviderApplication = require("../models/provider-application");

function randomEta() {
  return 8 + Math.floor(Math.random() * 18); // 8–25 minutes — a realistic local dispatch window
}

function randomCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

async function getProviderOwnedBooking(bookingId, userId) {
  const providerApp = await ProviderApplication.findOne({ user: userId });
  if (!providerApp) throw new Error("Provider profile not found");

  const booking = await Booking.findOne({ _id: bookingId, provider: providerApp._id });
  if (!booking) throw new Error("Booking not found");
  return booking;
}

function computeProgress(tracking) {
  if (!tracking || tracking.status === "not_started") return { percent: 0, minutesRemaining: null };
  if (tracking.status !== "on_the_way") return { percent: 100, minutesRemaining: 0 };

  const elapsedMin = (Date.now() - new Date(tracking.startedAt).getTime()) / 60000;
  const percent = Math.max(0, Math.min(96, Math.round((elapsedMin / tracking.etaMinutes) * 100)));
  const minutesRemaining = Math.max(0, Math.ceil(tracking.etaMinutes - elapsedMin));
  return { percent, minutesRemaining };
}

// ── Provider: start journey ──────────────────────────────────────────────────
exports.startJourney = async (bookingId, userId) => {
  const booking = await getProviderOwnedBooking(bookingId, userId);
  if (booking.status !== "upcoming") throw new Error("Journey can only be started for an accepted booking");
  if (booking.tracking?.status && booking.tracking.status !== "not_started")
    throw new Error("Journey has already been started for this booking");

  booking.tracking = {
    status:           "on_the_way",
    etaMinutes:       randomEta(),
    startedAt:        new Date(),
    verificationCode: randomCode(),
  };
  await booking.save();
  return booking;
};

// ── Provider: mark arrived ───────────────────────────────────────────────────
exports.markArrived = async (bookingId, userId) => {
  const booking = await getProviderOwnedBooking(bookingId, userId);
  if (booking.tracking?.status !== "on_the_way")
    throw new Error("Start the journey before marking arrival");

  booking.tracking.status    = "arrived";
  booking.tracking.arrivedAt = new Date();
  await booking.save();
  return booking;
};

// ── Customer: confirm the code the technician gave them in person ───────────
exports.confirmArrival = async (bookingId, userId, code) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) throw new Error("Booking not found");
  if (booking.tracking?.status !== "arrived")
    throw new Error("Your technician hasn't marked arrival yet");

  const submitted = String(code || "").trim();
  if (!submitted || submitted !== booking.tracking.verificationCode) {
    throw new Error(
      "That code doesn't match. Do not let this person in — contact support immediately if you're unsure."
    );
  }

  booking.tracking.status     = "verified";
  booking.tracking.verifiedAt = new Date();
  await booking.save();
  return booking;
};

// ── Customer view: never includes the raw verification code ─────────────────
exports.getTrackingForCustomer = async (bookingId, userId) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId }).populate(
    "provider",
    "firstName lastName businessName serviceCategory profileImage status"
  );
  if (!booking) throw new Error("Booking not found");

  const progress = computeProgress(booking.tracking);
  const p = booking.provider;

  return {
    tracking: {
      status:          booking.tracking?.status || "not_started",
      etaMinutes:      booking.tracking?.etaMinutes || 0,
      arrivedAt:       booking.tracking?.arrivedAt || null,
      verifiedAt:      booking.tracking?.verifiedAt || null,
      ...progress,
    },
    provider: p
      ? {
          name:             p.businessName || `${p.firstName || ""} ${p.lastName || ""}`.trim(),
          profileImage:     p.profileImage || "",
          serviceCategory:  p.serviceCategory,
          identityVerified: p.status === "approved",
        }
      : null,
  };
};

// ── Provider view: includes the code so they can show/tell it in person ─────
exports.getTrackingForProvider = async (bookingId, userId) => {
  const booking = await getProviderOwnedBooking(bookingId, userId);
  const progress = computeProgress(booking.tracking);

  return {
    tracking: {
      status:           booking.tracking?.status || "not_started",
      etaMinutes:       booking.tracking?.etaMinutes || 0,
      verificationCode: booking.tracking?.verificationCode || "",
      arrivedAt:        booking.tracking?.arrivedAt || null,
      verifiedAt:       booking.tracking?.verifiedAt || null,
      ...progress,
    },
  };
};
