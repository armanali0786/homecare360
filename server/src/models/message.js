const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    booking:    { type: mongoose.Schema.Types.ObjectId, ref: "Booking",  required: true },
    sender:     { type: mongoose.Schema.Types.ObjectId, ref: "User",     required: true },
    senderRole: { type: String, enum: ["customer", "provider"],          required: true },
    senderName: { type: String, default: "" },
    text:       { type: String, required: true },
    read:       { type: Boolean, default: false },
  },
  { timestamps: true }
);

messageSchema.index({ booking: 1, createdAt: 1 });

module.exports = mongoose.model("Message", messageSchema);
