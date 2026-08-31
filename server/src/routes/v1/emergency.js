const express = require("express");
const router  = express.Router();
const controller = require("../../controllers/emergency-controller");
const { verifyToken } = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

router.post("/book", verifyToken, controller.book);

// Manual trigger for the scheduled SLA-breach check — admin ops/demo use, the
// real check runs automatically on a cron schedule (see src/index.js).
router.post("/check-sla", verifyToken, authorizeRoles("admin", "superadmin"), controller.checkSla);

module.exports = router;
