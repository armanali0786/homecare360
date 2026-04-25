const adminService = require("../services/admin-service");

exports.getDashboard = async (req, res) => {
  try {
    const data = await adminService.getDashboardStats();
    res.json({ success: true, ...data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await adminService.toggleUserStatus(req.params.id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
