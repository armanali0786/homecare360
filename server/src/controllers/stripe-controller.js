const stripeService  = require("../services/stripe-service");
const bookingService = require("../services/booking-service");
const Booking        = require("../models/booking");
const ProviderApplication = require("../models/provider-application");
const User           = require("../models/user");

exports.createSession = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "Not your booking" });

    const [provider, user] = await Promise.all([
      ProviderApplication.findById(booking.provider),
      User.findById(req.user.id, "fullName email"),
    ]);

    const providerName = provider
      ? (provider.businessName || `${provider.firstName} ${provider.lastName}`.trim())
      : "Provider";

    const session = await stripeService.createCheckoutSession(
      { ...booking.toObject(), userName: user?.fullName, userEmail: user?.email },
      providerName
    );

    res.json({ success: true, url: session.url, sessionId: session.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.webhook = async (req, res) => {
  try {
    const sig   = req.headers["stripe-signature"];
    const event = stripeService.constructWebhookEvent(req.body, sig);

    if (event.type === "checkout.session.completed") {
      const session   = event.data.object;
      const bookingId = session.metadata?.bookingId;
      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "paid" });
      }
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getSessionStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("provider", "firstName lastName businessName serviceCategory");
    if (!booking) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
