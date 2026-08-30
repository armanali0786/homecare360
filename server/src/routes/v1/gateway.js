const express = require("express");
const router  = express.Router();
const gatewayController = require("../../controllers/gateway-controller");
const { verifyToken } = require("../../middlewares/auth");

router.get("/",                                gatewayController.listGateways);
router.post("/:gateway/session/:bookingId",     verifyToken, gatewayController.createSession);
router.post("/:gateway/confirm/:sessionId",     verifyToken, gatewayController.confirmPayment);

module.exports = router;
