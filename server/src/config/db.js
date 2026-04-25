const mongoose = require("mongoose");
const seedAdmin = require("../utils/seedAdmin");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
    await seedAdmin();
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;