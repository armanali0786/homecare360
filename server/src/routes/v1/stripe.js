const express = require("express");
const router  = express.Router();
const stripeController = require("../../controllers/stripe-controller");
const { verifyToken }  = require("../../middlewares/auth");

// Stripe webhook must receive raw body — mount this BEFORE json middleware in app
router.post("/webhook", express.raw({ type: "application/json" }), stripeController.webhook);

// Authenticated
router.post("/session/:bookingId",  verifyToken, stripeController.createSession);
router.get( "/booking/:bookingId",  verifyToken, stripeController.getSessionStatus);

module.exports = router;
