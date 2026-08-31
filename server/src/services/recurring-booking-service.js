const RecurringBooking = require("../models/recurring-booking");
const bookingService = require("./booking-service");

const FREQUENCY_DAYS = { weekly: 7, biweekly: 14, monthly: 30 };

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// data.date is the date of the booking the customer just created — that
// booking IS the first occurrence, so the plan's first *generated* occurrence
// is one interval after it.
exports.createRecurringBooking = async (userId, data) => {
  if (!FREQUENCY_DAYS[data.frequency]) throw new Error("Invalid recurring frequency");

  const nextRunDate = addDays(data.date, FREQUENCY_DAYS[data.frequency]);

  return RecurringBooking.create({
    user: userId,
    provider: data.providerId,
    serviceCategory: data.serviceCategory,
    frequency: data.frequency,
    time: data.time || "",
    location: data.location || "",
    floorLandmark: data.floorLandmark || "",
    propertyType: data.propertyType || "",
    propertySize: data.propertySize || "",
    addOns: data.addOns || [],
    specialInstructions: data.specialInstructions || "",
    preferredStaffGender: data.preferredStaffGender || "any",
    region: data.region || "AE",
    currency: data.currency || "AED",
    totalAmount: data.totalAmount,
    discountAmount: data.discountAmount || 0,
    gstAmount: data.gstAmount || 0,
    discountPercent: data.discountPercent || 0,
    paymentMethod: data.paymentMethod || "cod",
    nextRunDate,
    status: "active",
  });
};

exports.getMyRecurringBookings = async (userId) => {
  return RecurringBooking.find({ user: userId })
    .populate("provider", "firstName lastName businessName serviceCategory profileImage")
    .sort({ createdAt: -1 });
};

exports.pause = async (id, userId) => {
  const plan = await RecurringBooking.findOneAndUpdate(
    { _id: id, user: userId, status: "active" },
    { status: "paused" },
    { new: true }
  );
  if (!plan) throw new Error("Recurring plan not found or not active");
  return plan;
};

exports.resume = async (id, userId) => {
  const plan = await RecurringBooking.findOne({ _id: id, user: userId, status: "paused" });
  if (!plan) throw new Error("Recurring plan not found or not paused");

  // If it sat paused past its next run date, push it to today so it doesn't
  // immediately fire a backlog of missed occurrences.
  const today = new Date().toISOString().split("T")[0];
  if (plan.nextRunDate < today) plan.nextRunDate = today;
  plan.status = "active";
  await plan.save();
  return plan;
};

exports.cancel = async (id, userId) => {
  const plan = await RecurringBooking.findOneAndUpdate(
    { _id: id, user: userId },
    { status: "cancelled" },
    { new: true }
  );
  if (!plan) throw new Error("Recurring plan not found");
  return plan;
};

exports.skipNext = async (id, userId) => {
  const plan = await RecurringBooking.findOne({ _id: id, user: userId, status: "active" });
  if (!plan) throw new Error("Recurring plan not found or not active");
  plan.nextRunDate = addDays(plan.nextRunDate, FREQUENCY_DAYS[plan.frequency]);
  await plan.save();
  return plan;
};

// Called on a schedule (see src/index.js) and also exposed to admins as a
// manual trigger for ops/demo purposes. Advances every due plan's
// nextRunDate regardless of success so a single failure can't retry forever
// or block the rest of the batch.
exports.runDueRecurringBookings = async () => {
  const today = new Date().toISOString().split("T")[0];
  const due = await RecurringBooking.find({ status: "active", nextRunDate: { $lte: today } });

  const results = { generated: 0, failed: 0 };

  for (const plan of due) {
    try {
      const booking = await bookingService.createBooking(plan.user.toString(), {
        providerId: plan.provider.toString(),
        serviceCategory: plan.serviceCategory,
        date: plan.nextRunDate,
        time: plan.time,
        location: plan.location,
        floorLandmark: plan.floorLandmark,
        totalAmount: plan.totalAmount,
        region: plan.region,
        currency: plan.currency,
        propertyType: plan.propertyType,
        propertySize: plan.propertySize,
        addOns: plan.addOns,
        specialInstructions: plan.specialInstructions
          ? `${plan.specialInstructions} — auto-generated from recurring plan`
          : "Auto-generated from recurring plan",
        discountAmount: plan.discountAmount,
        gstAmount: plan.gstAmount,
        preferredStaffGender: plan.preferredStaffGender,
        paymentMethod: plan.paymentMethod,
      });

      plan.lastBookingId = booking._id;
      plan.occurrencesGenerated += 1;
      plan.lastRunError = "";
      results.generated++;
    } catch (err) {
      plan.lastRunError = err.message;
      results.failed++;
    }
    plan.nextRunDate = addDays(plan.nextRunDate, FREQUENCY_DAYS[plan.frequency]);
    await plan.save();
  }

  return results;
};
