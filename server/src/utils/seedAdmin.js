const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function seedAdmin() {
  const admin = await User.findOne({ role: "superadmin" });

  if (!admin) {
    const password = await bcrypt.hash("superadmin123", 10);

    await User.create({
      fullName: "Super Admin",
      email: "admin@homecare360.com",
      phone: "9999999999",
      password,
      role: "superadmin",
    });

    console.log("Super Admin Created");
  }
}

module.exports = seedAdmin;