const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user:            { type: mongoose.Schema.Types.ObjectId, ref: "User",                required: true },
    provider:        { type: mongoose.Schema.Types.ObjectId, ref: "ProviderApplication", required: true },
    serviceCategory: { type: String, required: true },
    date:            { type: String, required: true },
    time:            { type: String, default: "" },
    location:        { type: String, default: "" },
    totalAmount:     { type: Number, required: true },
    platformFee:     { type: Number, default: 0 },
    providerPayout:  { type: Number, default: 0 },
    status: {
      type:    String,
      enum:    ["pending", "upcoming", "completed", "cancelled"],
      default: "pending",
    },

    // Extended booking details
    propertyType:        { type: String, default: "" },
    propertySize:        { type: String, default: "" },
    addOns:              [{ name: String, price: Number }],
    specialInstructions: { type: String, default: "" },
    floorLandmark:       { type: String, default: "" },
    promoCode:           { type: String, default: "" },
    discountAmount:      { type: Number, default: 0 },
    gstAmount:           { type: Number, default: 0 },

    // Customer's staff-gender requirement, checked against the assigned
    // provider's gender at booking time (see booking-service.js createBooking).
    preferredStaffGender: { type: String, enum: ["any", "female", "male"], default: "any" },

    // Region / currency the booking was placed in — amounts above are stored
    // in INR (the base unit used across the platform) and converted for
    // display; these fields record what the customer actually saw & paid in.
    region:   { type: String, enum: ["AE", "SA", "QA", "IN"], default: "AE" },
    currency: { type: String, enum: ["AED", "SAR", "QAR", "INR"], default: "AED" },

    // Payment
    paymentMethod: {
      type:    String,
      enum:    ["cod", "upi", "card", "stripe", "mada", "tabby", "tamara"],
      default: "cod",
    },
    paymentStatus: {
      type:    String,
      enum:    ["pending", "paid", "refunded"],
      default: "pending",
    },
    stripeSessionId:       { type: String, default: "" },
    stripePaymentIntentId: { type: String, default: "" },

    // Cancellation
    cancelledBy:        { type: String, enum: ["customer", "provider", "admin", ""], default: "" },
    cancellationReason: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
