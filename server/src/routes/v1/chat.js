const express = require("express");
const router  = express.Router();
const chatController = require("../../controllers/chat-controller");
const { verifyToken }  = require("../../middlewares/auth");

router.get( "/:bookingId/messages",        verifyToken, chatController.getMessages);
router.post("/:bookingId/messages",        verifyToken, chatController.sendMessage);

module.exports = router;
