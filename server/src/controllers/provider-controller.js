const providerService = require("../services/provider-service");

exports.applyProvider = async (req, res) => {
  try {
    const application = await providerService.createApplication(req.user.id, req.body, req.files);
    res.status(201).json({ success: true, message: "Application submitted successfully", application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getApprovedProviders = async (req, res) => {
  try {
    const providers = await providerService.getApprovedProviders(req.query);
    res.json({ success: true, providers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProviderById = async (req, res) => {
  try {
    const provider = await providerService.getProviderById(req.params.id);
    res.json({ success: true, provider });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.getAllProviders = async (req, res) => {
  try {
    const providers = await providerService.getAllProviders();
    res.json({ success: true, providers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await providerService.getApplications();
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const ProviderApplication = require("../models/provider-application");
    const provider = await ProviderApplication.findOne({ user: req.user.id });
    if (!provider) return res.status(404).json({ success: false, message: "Provider profile not found" });
    res.json({ success: true, provider });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await providerService.updateStatus(req.params.id, status, req.user.id);
    res.json({ success: true, application: app });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getComplianceQueue = async (req, res) => {
  try {
    const applications = await providerService.getComplianceQueue();
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const provider = await providerService.updateMyProfile(req.user.id, req.body);
    res.json({ success: true, provider });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateComplianceStatus = async (req, res) => {
  try {
    const { complianceStatus, notes } = req.body;
    const app = await providerService.updateComplianceStatus(req.params.id, complianceStatus, notes, req.user.id);
    res.json({ success: true, application: app });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
