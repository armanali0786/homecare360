const serviceService = require("../services/service-service");

exports.getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEnabledServices = async (req, res) => {
  try {
    const services = await serviceService.getEnabledServices();
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await serviceService.updateService(req.params.id, req.body);
    res.json({ success: true, service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await serviceService.deleteService(req.params.id);
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
