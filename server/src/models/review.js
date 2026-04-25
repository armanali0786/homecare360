const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "ProviderApplication", required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
    status: {
      type: String,
      enum: ["approved", "flagged", "hidden"],
      default: "approved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
