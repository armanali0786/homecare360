const emergencyService = require("../services/emergency-service");

exports.book = async (req, res) => {
  try {
    const result = await emergencyService.createEmergencyBooking(req.user.id, req.body);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.checkSla = async (req, res) => {
  try {
    const result = await emergencyService.checkSlaBreaches();
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
