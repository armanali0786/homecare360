const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking-controller");
const { verifyToken } = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

// User routes
router.post("/", verifyToken, bookingController.createBooking);
router.get("/my", verifyToken, bookingController.getMyBookings);
router.put("/:id/cancel", verifyToken, bookingController.cancelBooking);

// Admin routes
router.get("/", verifyToken, authorizeRoles("admin", "superadmin"), bookingController.getAllBookings);
router.put("/:id/status", verifyToken, authorizeRoles("admin", "superadmin"), bookingController.updateBookingStatus);

module.exports = router;
