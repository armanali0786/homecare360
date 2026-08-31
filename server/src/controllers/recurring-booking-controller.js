const recurringService = require("../services/recurring-booking-service");

exports.create = async (req, res) => {
  try {
    const plan = await recurringService.createRecurringBooking(req.user.id, req.body);
    res.status(201).json({ success: true, plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMine = async (req, res) => {
  try {
    const plans = await recurringService.getMyRecurringBookings(req.user.id);
    res.json({ success: true, plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.pause = async (req, res) => {
  try {
    const plan = await recurringService.pause(req.params.id, req.user.id);
    res.json({ success: true, plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.resume = async (req, res) => {
  try {
    const plan = await recurringService.resume(req.params.id, req.user.id);
    res.json({ success: true, plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.cancel = async (req, res) => {
  try {
    const plan = await recurringService.cancel(req.params.id, req.user.id);
    res.json({ success: true, plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.skipNext = async (req, res) => {
  try {
    const plan = await recurringService.skipNext(req.params.id, req.user.id);
    res.json({ success: true, plan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.runDue = async (req, res) => {
  try {
    const results = await recurringService.runDueRecurringBookings();
    res.json({ success: true, ...results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
