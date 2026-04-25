const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin-controller");
const { verifyToken } = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

const adminGuard = [verifyToken, authorizeRoles("admin", "superadmin")];

router.get("/dashboard", adminGuard, adminController.getDashboard);
router.get("/users", adminGuard, adminController.getAllUsers);
router.put("/users/:id/toggle-status", adminGuard, adminController.toggleUserStatus);

module.exports = router;
