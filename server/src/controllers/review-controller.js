const reviewService = require("../services/review-service");

exports.createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.user.id, req.body);
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.checkReviewed = async (req, res) => {
  try {
    const result = await reviewService.checkReviewed(req.params.bookingId, req.user.id);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getProviderReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getProviderReviews(req.params.providerId);
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateReviewStatus = async (req, res) => {
  try {
    const review = await reviewService.updateReviewStatus(req.params.id, req.body.status);
    res.json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
