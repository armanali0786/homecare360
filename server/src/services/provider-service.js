const ProviderApplication = require("../models/provider-application");
const Review = require("../models/review");
const User   = require("../models/user");

// Domestic-help / live-in staff categories require sponsor-visa paperwork on
// top of the standard verification documents (Gulf labour-law requirement for
// maids, nannies, caregivers). Matched by keyword so admins can add new such
// categories from Services Management without a code change.
const DOMESTIC_HELP_KEYWORDS = ["domestic help", "maid", "nanny", "caregiver", "babysit", "housekeep"];

exports.isDomesticHelpCategory = (serviceCategory = "") => {
  const lower = serviceCategory.toLowerCase();
  return DOMESTIC_HELP_KEYWORDS.some((k) => lower.includes(k));
};

exports.createApplication = async (userId, data, files) => {
  const isDomesticHelp = exports.isDomesticHelpCategory(data.serviceCategory);

  const application = await ProviderApplication.create({
    user: userId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    serviceCategory: data.serviceCategory,
    gender: data.gender,
    yearsExperience: data.yearsExperience,
    businessName: data.businessName,
    description: data.description,
    hourlyRate: data.hourlyRate,
    availability: data.availability,
    serviceRadius: data.serviceRadius,
    tags: data.tags ? JSON.parse(data.tags) : [],
    profileImage: files?.profileImage?.[0]?.filename,
    documents: {
      idDocument: files?.idDocument?.[0]?.filename,
      licenseDocument: files?.licenseDocument?.[0]?.filename,
      insuranceDocument: files?.insuranceDocument?.[0]?.filename,
      visaDocument: files?.visaDocument?.[0]?.filename,
      sponsorshipDocument: files?.sponsorshipDocument?.[0]?.filename,
    },
    complianceStatus: isDomesticHelp ? "pending" : "not_applicable",
  });
  return application;
};

exports.getApprovedProviders = async (filters = {}) => {
  const query = { status: "approved" };
  if (filters.serviceCategory) query.serviceCategory = { $regex: filters.serviceCategory, $options: "i" };
  if (filters.city) query.city = { $regex: filters.city, $options: "i" };
  if (filters.gender) query.gender = filters.gender;

  const providers = await ProviderApplication.find(query).lean();

  const enriched = await Promise.all(
    providers.map(async (p) => {
      const reviews = await Review.find({ provider: p._id, status: "approved" });
      const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
      return { ...p, rating: Math.round(avg * 10) / 10, reviewCount: reviews.length };
    })
  );

  return enriched;
};

exports.getProviderById = async (id) => {
  const provider = await ProviderApplication.findById(id).lean();
  if (!provider) throw new Error("Provider not found");

  const reviews = await Review.find({ provider: id, status: "approved" })
    .populate("user", "fullName")
    .sort({ createdAt: -1 });

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    stars: star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return {
    ...provider,
    rating: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
    reviews,
    reviewsBreakdown: breakdown,
  };
};

exports.getApplications = async () => {
  return ProviderApplication.find().sort({ createdAt: -1 });
};

exports.getAllProviders = async () => {
  return ProviderApplication.find().sort({ createdAt: -1 });
};

exports.updateStatus = async (id, status, adminId) => {
  const application = await ProviderApplication.findByIdAndUpdate(
    id,
    { status, reviewedBy: adminId },
    { new: true }
  );

  if (application?.user) {
    // Sync User.role with application status so provider-gated routes work immediately
    const newRole = status === "approved" ? "provider" : "user";
    await User.findByIdAndUpdate(application.user, { role: newRole });
  }

  return application;
};

exports.updateComplianceStatus = async (id, complianceStatus, notes, adminId) => {
  if (!["pending", "verified", "rejected"].includes(complianceStatus)) {
    throw new Error("Invalid compliance status");
  }

  const application = await ProviderApplication.findByIdAndUpdate(
    id,
    {
      complianceStatus,
      complianceNotes: notes || "",
      complianceReviewedBy: adminId,
      complianceReviewedAt: new Date(),
    },
    { new: true }
  );
  if (!application) throw new Error("Application not found");
  return application;
};

exports.getComplianceQueue = async () => {
  return ProviderApplication.find({ complianceStatus: { $ne: "not_applicable" } }).sort({ createdAt: -1 });
};

// Fields a provider may edit about their own profile after approval — kept as
// an explicit allowlist so this endpoint can't be used to self-approve or
// touch compliance/review fields.
const SELF_UPDATE_FIELDS = ["emergencyAvailable"];

exports.updateMyProfile = async (userId, data) => {
  const update = {};
  for (const key of SELF_UPDATE_FIELDS) {
    if (data[key] !== undefined) update[key] = data[key];
  }

  const provider = await ProviderApplication.findOneAndUpdate({ user: userId }, update, { new: true });
  if (!provider) throw new Error("Provider profile not found");
  return provider;
};
