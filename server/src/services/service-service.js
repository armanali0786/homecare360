const Service = require("../models/service");

exports.getAllServices = async () => {
  return Service.find().sort({ name: 1 });
};

exports.getEnabledServices = async () => {
  return Service.find({ isEnabled: true }).sort({ name: 1 });
};

exports.createService = async (data) => {
  return Service.create(data);
};

exports.updateService = async (id, data) => {
  return Service.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteService = async (id) => {
  return Service.findByIdAndDelete(id);
};
