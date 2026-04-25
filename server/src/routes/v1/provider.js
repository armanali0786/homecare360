const express = require("express");
const router = express.Router();
const providerController = require("../../controllers/provider-controller");
const { verifyToken } = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");
const upload = require("../../middlewares/upload");

// Public - browse approved providers
router.get("/list", providerController.getApprovedProviders);
router.get("/profile/:id", providerController.getProviderById);

// User - apply as provider
router.post(
  "/apply",
  verifyToken,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
    { name: "licenseDocument", maxCount: 1 },
    { name: "insuranceDocument", maxCount: 1 },
  ]),
  providerController.applyProvider
);

// Admin
router.get("/applications", verifyToken, authorizeRoles("admin", "superadmin"), providerController.getApplications);
router.get("/all", verifyToken, authorizeRoles("admin", "superadmin"), providerController.getAllProviders);
router.put("/applications/:id", verifyToken, authorizeRoles("admin", "superadmin"), providerController.updateApplicationStatus);

module.exports = router;
