const providerService = require("../services/provider-service");

exports.applyProvider = async (req, res) => {
  try {
    const application = await providerService.createApplication(
      req.user.id,
      req.body,
      req.files
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllServices = async (req, res) => {
  const apps = await providerService.getApplications();

  res.json({
    success: true,
    services: apps,
  });
};

exports.updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  const app = await providerService.updateStatus(
    req.params.id,
    status,
    req.user.id
  );

  res.json({
    success: true,
    application: app,
  });
};