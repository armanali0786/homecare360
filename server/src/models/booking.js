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
      enum:    ["upcoming", "completed", "cancelled"],
      default: "upcoming",
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

    // Payment
    paymentMethod: {
      type:    String,
      enum:    ["cod", "upi", "card"],
      default: "cod",
    },
    paymentStatus: {
      type:    String,
      enum:    ["pending", "paid", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
