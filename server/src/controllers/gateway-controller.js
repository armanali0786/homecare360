const gatewayService  = require("../services/gulf-gateway-service");
const bookingService  = require("../services/booking-service");
const Booking         = require("../models/booking");
const ProviderApplication = require("../models/provider-application");

exports.listGateways = (req, res) => {
  res.json({ success: true, gateways: gatewayService.listGateways() });
};

exports.createSession = async (req, res) => {
  try {
    const { gateway, bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "Not your booking" });

    const provider = await ProviderApplication.findById(booking.provider);
    const providerName = provider
      ? (provider.businessName || `${provider.firstName} ${provider.lastName}`.trim())
      : "Provider";

    const session = await gatewayService.createCheckoutSession(gateway, booking, providerName);
    await Booking.findByIdAndUpdate(bookingId, { paymentMethod: gateway });

    res.json({ success: true, ...session });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { gateway, sessionId } = req.params;
    const session = await gatewayService.confirmPayment(gateway, sessionId);

    await Booking.findByIdAndUpdate(session.bookingId, { paymentStatus: "paid" });

    res.json({ success: true, session });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
