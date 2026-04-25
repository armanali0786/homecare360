const ProviderApplication = require("../models/provider-application");
const Review = require("../models/review");

exports.createApplication = async (userId, data, files) => {
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
    },
  });
  return application;
};

exports.getApprovedProviders = async (filters = {}) => {
  const query = { status: "approved" };
  if (filters.serviceCategory) query.serviceCategory = { $regex: filters.serviceCategory, $options: "i" };
  if (filters.city) query.city = { $regex: filters.city, $options: "i" };

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
  return ProviderApplication.findByIdAndUpdate(
    id,
    { status, reviewedBy: adminId },
    { new: true }
  );
};
