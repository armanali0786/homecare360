const bookingService = require("../services/booking-service");

exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.user.id, req.body);
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id, req.user.id);
    res.json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
    res.json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
