const express = require("express");
const { InfoController } = require("../../controllers");
const router = express.Router();

const authRoutes    = require("./auth");
const providerRoutes = require("./provider");
const serviceRoutes  = require("./services");
const bookingRoutes  = require("./bookings");
const reviewRoutes   = require("./reviews");
const adminRoutes    = require("./admin");
const chatRoutes     = require("./chat");
const stripeRoutes   = require("./stripe");
const gatewayRoutes  = require("./gateway");
const quoteAssistantRoutes = require("./quote-assistant");

router.get("/info", InfoController.info);
router.use("/auth",     authRoutes);
router.use("/provider", providerRoutes);
router.use("/services", serviceRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reviews",  reviewRoutes);
router.use("/admin",    adminRoutes);
router.use("/chat",     chatRoutes);
router.use("/stripe",   stripeRoutes);
router.use("/gateway",  gatewayRoutes);
router.use("/quote-assistant", quoteAssistantRoutes);

module.exports = router;
