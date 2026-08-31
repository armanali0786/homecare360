const mongoose = require("mongoose");

// A recurring plan generates a real Booking automatically on each due date
// (see recurring-booking-service.js runDueRecurringBookings, run on a cron
// schedule from src/index.js). Pricing is snapshotted at creation time and
// reused for every generated occurrence — it stays locked until the customer
// sets up a new plan, the same principle most real subscription services use.
const recurringBookingSchema = new mongoose.Schema(
  {
    user:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "ProviderApplication", required: true },
    serviceCategory: { type: String, required: true },

    frequency: { type: String, enum: ["weekly", "biweekly", "monthly"], required: true },
    time:          { type: String, default: "" },
    location:      { type: String, default: "" },
    floorLandmark: { type: String, default: "" },

    propertyType:        { type: String, default: "" },
    propertySize:        { type: String, default: "" },
    addOns:              [{ name: String, price: Number }],
    specialInstructions: { type: String, default: "" },
    preferredStaffGender: { type: String, enum: ["any", "female", "male"], default: "any" },

    region:   { type: String, enum: ["AE", "SA", "QA", "IN"], default: "AE" },
    currency: { type: String, enum: ["AED", "SAR", "QAR", "INR"], default: "AED" },

    totalAmount:     { type: Number, required: true },
    discountAmount:  { type: Number, default: 0 },
    gstAmount:       { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0 },
    paymentMethod:   {
      type: String,
      enum: ["cod", "upi", "card", "stripe", "mada", "tabby", "tamara"],
      default: "cod",
    },

    nextRunDate: { type: String, required: true }, // "YYYY-MM-DD"
    status: { type: String, enum: ["active", "paused", "cancelled"], default: "active" },

    occurrencesGenerated: { type: Number, default: 0 },
    lastBookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    lastRunError:  { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecurringBooking", recurringBookingSchema);
