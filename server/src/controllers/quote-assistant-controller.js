const quoteAssistantService = require("../services/quote-assistant-service");

exports.chat = async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: "messages[] is required" });
    }

    const result = await quoteAssistantService.chat({ messages });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
