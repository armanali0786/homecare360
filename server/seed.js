require("dotenv").config();
const mongoose = require("mongoose");
const seedDemoData = require("./src/utils/seedDemoData");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected — seeding demo data...\n");

  await seedDemoData();

  await mongoose.disconnect();
  console.log("\nDone. Disconnected from MongoDB.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
