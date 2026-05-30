const express = require("express");
const router  = express.Router();
const bookingController = require("../../controllers/booking-controller");
const { verifyToken }   = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

// Customer
router.post("/",                  verifyToken, bookingController.createBooking);
router.get( "/my",                verifyToken, bookingController.getMyBookings);
router.get( "/:id/cancel-policy", verifyToken, bookingController.checkCancellationPolicy);
router.put( "/:id/cancel",        verifyToken, bookingController.cancelBooking);

// Provider
router.get("/provider/mine",        verifyToken, authorizeRoles("provider"), bookingController.getProviderBookings);
router.put("/:id/provider-cancel",  verifyToken, authorizeRoles("provider"), bookingController.providerCancelBooking);

// Admin
router.get("/",           verifyToken, authorizeRoles("admin", "superadmin"), bookingController.getAllBookings);
router.put("/:id/status", verifyToken, authorizeRoles("admin", "superadmin"), bookingController.updateBookingStatus);

module.exports = router;
