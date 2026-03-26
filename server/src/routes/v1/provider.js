const express = require("express");
const router = express.Router();

const providerController = require("../../controllers/provider-controller");

const { verifyToken } = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

const upload = require("../../middlewares/upload");

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

router.get(
  "/services",
  // verifyToken,
  // authorizeRoles("admin", "superadmin", "user"),
  providerController.getAllServices
);

router.put(
  "/applications/:id",
  verifyToken,
  authorizeRoles("admin", "superadmin"),
  providerController.updateApplicationStatus
);

module.exports = router;