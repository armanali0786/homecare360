const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/service-controller");
const { verifyToken } = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

// Public
router.get("/", serviceController.getAllServices);
router.get("/enabled", serviceController.getEnabledServices);

// Admin only
router.post("/", verifyToken, authorizeRoles("admin", "superadmin"), serviceController.createService);
router.put("/:id", verifyToken, authorizeRoles("admin", "superadmin"), serviceController.updateService);
router.delete("/:id", verifyToken, authorizeRoles("admin", "superadmin"), serviceController.deleteService);

module.exports = router;
