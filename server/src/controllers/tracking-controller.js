const trackingService = require("../services/tracking-service");

exports.startJourney = async (req, res) => {
  try {
    const booking = await trackingService.startJourney(req.params.id, req.user.id);
    res.json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.markArrived = async (req, res) => {
  try {
    const booking = await trackingService.markArrived(req.params.id, req.user.id);
    res.json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.confirmArrival = async (req, res) => {
  try {
    const booking = await trackingService.confirmArrival(req.params.id, req.user.id, req.body.code);
    res.json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getTracking = async (req, res) => {
  try {
    const data =
      req.user.role === "provider"
        ? await trackingService.getTrackingForProvider(req.params.id, req.user.id)
        : await trackingService.getTrackingForCustomer(req.params.id, req.user.id);
    res.json({ success: true, ...data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
