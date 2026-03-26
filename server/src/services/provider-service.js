const ProviderApplication = require("../models/provider-application");

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

// exports.getApplications = async () => {
//   return ProviderApplication.find().populate("user");
// };

exports.getApplications = async () => {
  return ProviderApplication.find();
};

exports.updateStatus = async (id, status, adminId) => {
  return ProviderApplication.findByIdAndUpdate(
    id,
    {
      status,
      reviewedBy: adminId,
    },
    { new: true }
  );
};