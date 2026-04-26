import { motion } from "motion/react";
import { User, Mail, Phone, MapPin, Briefcase, FileText, Upload, CheckCircle2, Calendar, TrendingUp, Star, IndianRupee } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { useState } from "react";
import { toast } from "react-toastify";

const serviceCategories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Landscaping",
  "Painting",
  "Photography",
  "Carpentry",
  "HVAC",
  "Handyman",
  "Other",
];

export function BecomeProvider() {
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    serviceCategory: "",
    yearsExperience: "",
    businessName: "",
    description: "",
    hourlyRate: "",
    availability: "",
    tags: "",
    serviceRadius: "",
  });
  const [files, setFiles] = useState({
    profileImage: null as File | null,
    idDocument: null as File | null,
    licenseDocument: null as File | null,
    insuranceDocument: null as File | null,
  });


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;

    if (!selectedFiles) return;

    const file = selectedFiles[0];

    // Validation only for profile image
    if (name === "profileImage") {
      const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!allowedImageTypes.includes(file.type)) {
        toast.error("Profile image must be PNG, JPG or JPEG");
        return;
      }
    }

    // Validation for documents
    if (name !== "profileImage") {
      const allowedDocTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/pdf",
      ];

      if (!allowedDocTypes.includes(file.type)) {
        toast.error("Documents must be PNG, JPG, JPEG or PDF");
        return;
      }
    }

    // Size validation (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be less than 5MB");
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formStep < 3) {
      setFormStep(formStep + 1);
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    const token = localStorage.getItem("token");

    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "tags") {
        formPayload.append(key, value);
      }
    });

    if (formData.tags) {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim());

      formPayload.append("tags", JSON.stringify(tagsArray));
    }
    // append files
    if (files.profileImage)
      formPayload.append("profileImage", files.profileImage);

    if (files.idDocument)
      formPayload.append("idDocument", files.idDocument);

    if (files.licenseDocument)
      formPayload.append("licenseDocument", files.licenseDocument);

    if (files.insuranceDocument)
      formPayload.append("insuranceDocument", files.insuranceDocument);

    const res = await fetch(
      "https://homecare360.onrender.com/api/v1/provider/apply",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success(
        "Application submitted successfully! We'll review your information within 2-3 business days."
      );
      setFormStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        serviceCategory: "",
        yearsExperience: "",
        businessName: "",
        description: "",
        hourlyRate: "",
        availability: "",
        tags: "",
        serviceRadius: "",
      });
      setFiles({
        profileImage: null,
        idDocument: null,
        licenseDocument: null,
        insuranceDocument: null,
      });
    } else {
      toast.error(data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-12 pb-16">
      <SEO
        title="Become a Care Provider"
        url="/become-provider"
        description="Join Homecare360 as a verified care provider. Grow your caregiving business, set your own schedule, and connect with families who need your expertise."
        keywords="become home care provider, caregiver jobs, register as caregiver, home care business, join homecare360 provider"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Become a{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent">
              Service Provider
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of trusted professionals and start growing your business today
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${formStep >= step
                      ? "bg-gradient-to-r from-cyan-600 to-emerald-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {formStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                  </motion.div>
                  <span className="text-xs mt-2 font-medium text-gray-600">
                    {step === 1 ? "Personal Info" : step === 2 ? "Business Details" : "Verification"}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all duration-300 ${formStep > step ? "bg-gradient-to-r from-cyan-600 to-emerald-500" : "bg-gray-200"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="123 Main Street"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo
                    </label>

                    <input
                      type="file"
                      name="profileImage"
                      accept=".png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="w-full"
                    />

                    {files.profileImage && (
                      <p className="text-xs text-gray-500 mt-1">
                        Selected: {files.profileImage.name}
                      </p>
                    )}
                  </div>


                </div>
              </motion.div>
            )}

            {/* Step 2: Business Details */}
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Details</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="serviceCategory"
                      value={formData.serviceCategory}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
                    >
                      <option value="">Select a category</option>
                      {serviceCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Your Business Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="75"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Description *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                      placeholder="Describe your services, expertise, and what makes you stand out..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills / Services *
                  </label>

                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Example: Wiring, Panel Upgrade, Smart Home"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    Comma separated skills
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Radius (km)
                  </label>
                  <input
                    type="number"
                    name="serviceRadius"
                    value={formData.serviceRadius}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays Only</option>
                    <option value="weekends">Weekends Only</option>
                    <option value="flexible">Flexible Schedule</option>
                    <option value="24-7">24/7 Emergency Services</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Verification */}
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification Documents</h2>

                <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Why do we need these documents?</h3>
                  <p className="text-sm text-gray-600">
                    We verify all service providers to maintain the highest quality and safety standards for our customers.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Upload ID or Driver's License</h3>
                    <p className="text-sm text-gray-600 mb-4">PNG, JPG or PDF (max. 5MB)</p>
                    <input
                      type="file"
                      name="idDocument"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="idUpload"
                    />

                    <label
                      htmlFor="idUpload"
                      className="cursor-pointer bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-2 rounded-lg"
                    >
                      Choose File
                    </label>

                    {files.idDocument && (
                      <p className="text-sm mt-3 text-gray-600">
                        {files.idDocument.name}
                      </p>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Upload Professional License/Certificate</h3>
                    <p className="text-sm text-gray-600 mb-4">PNG, JPG or PDF (max. 5MB)</p>
                    <input
                      type="file"
                      name="licenseDocument"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="licenseUpload"
                    />

                    <label
                      htmlFor="licenseUpload"
                      className="cursor-pointer bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-2 rounded-lg"
                    >
                      Choose File
                    </label>

                    {files.licenseDocument && (
                      <p className="text-sm mt-3 text-gray-600">
                        {files.licenseDocument.name}
                      </p>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Upload Insurance Certificate (Optional)</h3>
                    <p className="text-sm text-gray-600 mb-4">PNG, JPG or PDF (max. 5MB)</p>
                    <input
                      type="file"
                      name="insuranceDocument"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="insuranceUpload"
                    />

                    <label
                      htmlFor="insuranceUpload"
                      className="cursor-pointer bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-2 rounded-lg"
                    >
                      Choose File
                    </label>

                    {files.insuranceDocument && (
                      <p className="text-sm mt-3 text-gray-600">
                        {files.insuranceDocument.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> All documents will be securely stored and reviewed within 2-3 business days. You'll receive an email once your application is approved.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {formStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setFormStep(formStep - 1)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </motion.button>
              )}
              {formStep === 1 && <div />}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={formStep === 3 && submitting}
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-emerald-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStep === 3 && submitting ? "Submitting..." : formStep === 3 ? "Submit Application" : "Continue"}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid md:grid-cols-3 gap-5"
        >
          {[
            {
              icon: TrendingUp,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              title: "Grow Your Business",
              description: "Reach thousands of verified customers across your city",
            },
            {
              icon: Star,
              color: "text-amber-500",
              bg: "bg-amber-50",
              title: "Build Your Reputation",
              description: "Collect real reviews and earn your Verified badge",
            },
            {
              icon: IndianRupee,
              color: "text-[#00B8A9]",
              bg: "bg-cyan-50",
              title: "Earn on Your Terms",
              description: "Set your own hourly rate and schedule. Weekly payouts.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-100 p-6 flex gap-4"
            >
              <div className={`w-11 h-11 ${benefit.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
