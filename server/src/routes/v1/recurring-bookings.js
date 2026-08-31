const express = require("express");
const router  = express.Router();
const controller = require("../../controllers/recurring-booking-controller");
const { verifyToken }   = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/rbac");

router.post("/",             verifyToken, controller.create);
router.get("/my",            verifyToken, controller.getMine);
router.put("/:id/pause",     verifyToken, controller.pause);
router.put("/:id/resume",    verifyToken, controller.resume);
router.put("/:id/cancel",    verifyToken, controller.cancel);
router.put("/:id/skip-next", verifyToken, controller.skipNext);

// Manual trigger for the scheduled job — admin ops/demo use, the real
// generation runs automatically on a cron schedule (see src/index.js).
router.post("/run-due", verifyToken, authorizeRoles("admin", "superadmin"), controller.runDue);

module.exports = router;
