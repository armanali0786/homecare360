const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/review-controller");
const { verifyToken } = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

// Public
router.get("/provider/:providerId", reviewController.getProviderReviews);

// User
router.post("/", verifyToken, reviewController.createReview);

// Admin
router.get("/", verifyToken, authorizeRoles("admin", "superadmin"), reviewController.getAllReviews);
router.put("/:id/status", verifyToken, authorizeRoles("admin", "superadmin"), reviewController.updateReviewStatus);

module.exports = router;
