const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

const authRoutes = require("./auth");
const providerRoutes = require("./provider");
router.get('/info', InfoController.info);
router.use("/provider", providerRoutes);
router.use('/auth', authRoutes);

module.exports = router;