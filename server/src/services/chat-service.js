const Message = require("../models/message");
const Booking  = require("../models/booking");

exports.getMessages = async (bookingId) => {
  return Message.find({ booking: bookingId })
    .sort({ createdAt: 1 })
    .lean();
};

exports.saveMessage = async ({ bookingId, senderId, senderRole, senderName, text }) => {
  return Message.create({
    booking:    bookingId,
    sender:     senderId,
    senderRole,
    senderName: senderName || "",
    text,
  });
};

exports.markRead = async (bookingId, readerRole) => {
  const otherRole = readerRole === "customer" ? "provider" : "customer";
  await Message.updateMany(
    { booking: bookingId, senderRole: otherRole, read: false },
    { read: true }
  );
};

exports.unreadCount = async (bookingId, readerRole) => {
  const otherRole = readerRole === "customer" ? "provider" : "customer";
  return Message.countDocuments({ booking: bookingId, senderRole: otherRole, read: false });
};
