const Booking = require("../models/booking");
const ProviderApplication = require("../models/provider-application");
const Service = require("../models/service");
const bookingService = require("./booking-service");

// Urgent, same-day surcharge — reflects the real premium urgent trades charge
// for a call-out outside a normal scheduled slot.
const EMERGENCY_SURCHARGE_PERCENT = 0.25;
const RESPONSE_WINDOW_MINUTES = 60;

// VAT isn't available server-side the way it is in the client's LocaleContext
// (emergency bookings skip the client pricing wizard entirely), so it's
// mirrored here for the regions this platform serves.
const VAT_RATE_BY_REGION = { AE: 0.05, SA: 0.15, QA: 0, IN: 0.18 };

// Maps an SOS category to the real serviceCategory used across the platform
// and the specific seeded Service whose basePrice anchors the emergency quote.
const EMERGENCY_CATEGORIES = {
  plumbing:   { serviceCategory: "Plumbing",             serviceName: "Emergency Plumbing Visit",        fallbackPrice: 1800 },
  electrical: { serviceCategory: "Electrical",           serviceName: "Wiring & Switchboard Repair",     fallbackPrice: 2000 },
  ac:         { serviceCategory: "AC & Appliance Repair", serviceName: "AC Deep Service",                fallbackPrice: 2200 },
  other:      { serviceCategory: "Handyman",             serviceName: "General Handyman Visit",          fallbackPrice: 1200 },
};

exports.EMERGENCY_CATEGORIES = EMERGENCY_CATEGORIES;

exports.findEmergencyProvider = async (serviceCategory, city) => {
  const query = { status: "approved", emergencyAvailable: true, serviceCategory };
  const candidates = await ProviderApplication.find(query).lean();
  if (candidates.length === 0) return null;

  if (city) {
    const sameCity = candidates.find((p) => (p.city || "").toLowerCase() === city.toLowerCase());
    if (sameCity) return sameCity;
  }
  return candidates[0];
};

exports.createEmergencyBooking = async (userId, data) => {
  const categoryDef = EMERGENCY_CATEGORIES[data.category];
  if (!categoryDef) throw new Error("Invalid emergency category");

  const provider = await exports.findEmergencyProvider(categoryDef.serviceCategory, data.city);
  if (!provider) {
    throw new Error("No emergency-ready providers are available for this category right now. Please try normal booking or call support.");
  }

  const service = await Service.findOne({ name: categoryDef.serviceName });
  const basePrice = service?.basePrice ?? categoryDef.fallbackPrice;

  const subtotal = Math.round(basePrice * (1 + EMERGENCY_SURCHARGE_PERCENT));
  const vatRate = VAT_RATE_BY_REGION[data.region] ?? VAT_RATE_BY_REGION.AE;
  const gstAmount = Math.round(subtotal * vatRate);
  const totalAmount = subtotal + gstAmount;

  const today = new Date().toISOString().split("T")[0];
  const responseDeadline = new Date(Date.now() + RESPONSE_WINDOW_MINUTES * 60 * 1000);

  const booking = await bookingService.createBooking(userId, {
    providerId: provider._id,
    serviceCategory: categoryDef.serviceCategory,
    date: today,
    time: "ASAP",
    location: data.location || "",
    totalAmount,
    region: data.region || "AE",
    currency: data.currency || "AED",
    gstAmount,
    specialInstructions: data.description || "",
    paymentMethod: "cod",
    isEmergency: true,
    emergencySurchargePercent: Math.round(EMERGENCY_SURCHARGE_PERCENT * 100),
    responseDeadline,
  });

  return { booking, provider, responseWindowMinutes: RESPONSE_WINDOW_MINUTES };
};

// Run on a short interval (see src/index.js) — enforces the response
// guarantee: any emergency booking still unaccepted past its deadline gets
// marked breached, and its fee is waived if the customer hasn't paid yet.
exports.checkSlaBreaches = async () => {
  const overdue = await Booking.find({
    isEmergency: true,
    status: "pending",
    slaBreached: false,
    responseDeadline: { $lt: new Date() },
  });

  for (const booking of overdue) {
    booking.slaBreached = true;
    if (booking.paymentStatus !== "paid") booking.feeWaived = true;
    await booking.save();
  }

  return { breached: overdue.length };
};
