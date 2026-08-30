const express = require("express");
const router  = express.Router();
const quoteAssistantController = require("../../controllers/quote-assistant-controller");

router.post("/chat", quoteAssistantController.chat);

module.exports = router;
