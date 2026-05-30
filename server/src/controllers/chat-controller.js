const chatService = require("../services/chat-service");
const Booking     = require("../models/booking");
const ProviderApplication = require("../models/provider-application");

async function resolveRole(userId, bookingId) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  if (booking.user.toString() === userId) return { booking, role: "customer" };

  const providerApp = await ProviderApplication.findOne({ user: userId });
  if (providerApp && booking.provider.toString() === providerApp._id.toString())
    return { booking, role: "provider" };

  throw new Error("Not authorized for this booking");
}

exports.getMessages = async (req, res) => {
  try {
    const { booking, role } = await resolveRole(req.user.id, req.params.bookingId);
    await chatService.markRead(booking._id, role);
    const messages = await chatService.getMessages(booking._id);
    res.json({ success: true, messages });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { booking, role } = await resolveRole(req.user.id, req.params.bookingId);
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ success: false, message: "Message text required" });

    const msg = await chatService.saveMessage({
      bookingId:  booking._id,
      senderId:   req.user.id,
      senderRole: role,
      senderName: req.user.fullName || "",
      text:       text.trim(),
    });
    res.status(201).json({ success: true, message: msg });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
