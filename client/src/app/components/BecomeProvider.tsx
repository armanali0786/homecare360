import { motion } from "motion/react";
import { User, Mail, Phone, MapPin, Briefcase, FileText, Upload, CheckCircle2, Calendar, TrendingUp, Star, Wallet } from "lucide-react";
import { SEO } from "@/app/components/SEO";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocale } from "@/app/context/LocaleContext";

const SERVICE_CATEGORIES = [
  { value: "Plumbing",    key: "plumbing"    },
  { value: "Electrical",  key: "electrical"  },
  { value: "Cleaning",    key: "cleaning"    },
  { value: "Landscaping", key: "landscaping" },
  { value: "Painting",    key: "painting"    },
  { value: "Photography", key: "photography" },
  { value: "Carpentry",   key: "carpentry"   },
  { value: "HVAC",        key: "hvac"        },
  { value: "Handyman",    key: "handyman"    },
  { value: "Domestic Help", key: "domesticHelp" },
  { value: "Other",       key: "other"       },
];

const DOMESTIC_HELP_KEYWORDS = ["domestic help", "maid", "nanny", "caregiver", "babysit", "housekeep"];
const isDomesticHelpCategory = (category: string) =>
  DOMESTIC_HELP_KEYWORDS.some((k) => category.toLowerCase().includes(k));

export function BecomeProvider() {
  const { t } = useTranslation("provider");
  const { regionConfig } = useLocale();
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
    gender: "",
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
    visaDocument: null as File | null,
    sponsorshipDocument: null as File | null,
  });

  const requiresSponsorshipDocs = isDomesticHelpCategory(formData.serviceCategory);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;

    if (!selectedFiles) return;

    const file = selectedFiles[0];

    // Validation only for profile image
    if (name === "profileImage") {
      const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!allowedImageTypes.includes(file.type)) {
        toast.error(t("becomeProvider.errors.imageType"));
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
        toast.error(t("becomeProvider.errors.docType"));
        return;
      }
    }

    // Size validation (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("becomeProvider.errors.fileSize"));
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

    if (files.visaDocument)
      formPayload.append("visaDocument", files.visaDocument);

    if (files.sponsorshipDocument)
      formPayload.append("sponsorshipDocument", files.sponsorshipDocument);

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
      toast.success(t("becomeProvider.successMessage"));
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
        gender: "",
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
        visaDocument: null,
        sponsorshipDocument: null,
      });
    } else {
      toast.error(data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-12 pb-16">
      <SEO
        title={t("becomeProvider.seoTitle")}
        url="/become-provider"
        description={t("becomeProvider.seoDescription")}
        keywords={t("becomeProvider.seoKeywords")}
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
            {t("becomeProvider.heroTitlePrefix")}{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent">
              {t("becomeProvider.heroTitleHighlight")}
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("becomeProvider.heroSubtitle")}
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
                    {step === 1 ? t("becomeProvider.steps.personalInfo") : step === 2 ? t("becomeProvider.steps.businessDetails") : t("becomeProvider.steps.verification")}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("becomeProvider.step1.title")}</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("becomeProvider.step1.firstName")}
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
                        placeholder={t("becomeProvider.step1.firstNamePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("becomeProvider.step1.lastName")}
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
                        placeholder={t("becomeProvider.step1.lastNamePlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step1.email")}
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
                      placeholder={t("becomeProvider.step1.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step1.phone")}
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
                      placeholder={`${regionConfig.phoneCode} ${t("becomeProvider.step1.phonePlaceholder")}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step1.address")}
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
                      placeholder={t("becomeProvider.step1.addressPlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("becomeProvider.step1.city")}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder={regionConfig.cities[0] || t("becomeProvider.step1.cityPlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("becomeProvider.step1.state")}</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder={t("becomeProvider.step1.statePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("becomeProvider.step1.zipCode")}</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder={t("becomeProvider.step1.zipCodePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("becomeProvider.step1.gender")}</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">{t("becomeProvider.step1.selectGender")}</option>
                      <option value="female">{t("becomeProvider.step1.female")}</option>
                      <option value="male">{t("becomeProvider.step1.male")}</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1.5">{t("becomeProvider.step1.genderHint")}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("becomeProvider.step1.profilePhoto")}
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
                        {t("becomeProvider.step1.selected", { name: files.profileImage.name })}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("becomeProvider.step2.title")}</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.serviceCategory")}
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
                      <option value="">{t("becomeProvider.step2.selectCategory")}</option>
                      {SERVICE_CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {t(`becomeProvider.categories.${category.key}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.businessName")}
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder={t("becomeProvider.step2.businessNamePlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.yearsExperience")}
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
                      placeholder={t("becomeProvider.step2.yearsExperiencePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.hourlyRate", { currency: regionConfig.currency })}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-xs">{regionConfig.currency}</span>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder={t("becomeProvider.step2.hourlyRatePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.description")}
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
                      placeholder={t("becomeProvider.step2.descriptionPlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.skills")}
                  </label>

                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder={t("becomeProvider.step2.skillsPlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    {t("becomeProvider.step2.skillsHint")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.serviceRadius")}
                  </label>
                  <input
                    type="number"
                    name="serviceRadius"
                    value={formData.serviceRadius}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder={t("becomeProvider.step2.serviceRadiusPlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("becomeProvider.step2.availability")}
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
                  >
                    <option value="">{t("becomeProvider.step2.selectAvailability")}</option>
                    <option value="weekdays">{t("becomeProvider.step2.availabilityOptions.weekdays")}</option>
                    <option value="weekends">{t("becomeProvider.step2.availabilityOptions.weekends")}</option>
                    <option value="flexible">{t("becomeProvider.step2.availabilityOptions.flexible")}</option>
                    <option value="24-7">{t("becomeProvider.step2.availabilityOptions.247")}</option>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("becomeProvider.step3.title")}</h2>

                <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{t("becomeProvider.step3.whyTitle")}</h3>
                  <p className="text-sm text-gray-600">
                    {t("becomeProvider.step3.whyText")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{t("becomeProvider.step3.idUploadTitle")}</h3>
                    <p className="text-sm text-gray-600 mb-4">{t("becomeProvider.step3.fileHint")}</p>
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
                      {t("becomeProvider.step3.chooseFile")}
                    </label>

                    {files.idDocument && (
                      <p className="text-sm mt-3 text-gray-600">
                        {files.idDocument.name}
                      </p>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{t("becomeProvider.step3.licenseUploadTitle")}</h3>
                    <p className="text-sm text-gray-600 mb-4">{t("becomeProvider.step3.fileHint")}</p>
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
                      {t("becomeProvider.step3.chooseFile")}
                    </label>

                    {files.licenseDocument && (
                      <p className="text-sm mt-3 text-gray-600">
                        {files.licenseDocument.name}
                      </p>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{t("becomeProvider.step3.insuranceUploadTitle")}</h3>
                    <p className="text-sm text-gray-600 mb-4">{t("becomeProvider.step3.fileHint")}</p>
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
                      {t("becomeProvider.step3.chooseFile")}
                    </label>

                    {files.insuranceDocument && (
                      <p className="text-sm mt-3 text-gray-600">
                        {files.insuranceDocument.name}
                      </p>
                    )}
                  </div>

                  {requiresSponsorshipDocs && (
                    <>
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                        {t("becomeProvider.step3.sponsorshipNotice")}
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">{t("becomeProvider.step3.visaUploadTitle")}</h3>
                        <p className="text-sm text-gray-600 mb-4">{t("becomeProvider.step3.fileHint")}</p>
                        <input
                          type="file"
                          name="visaDocument"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="visaUpload"
                        />

                        <label
                          htmlFor="visaUpload"
                          className="cursor-pointer bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-2 rounded-lg"
                        >
                          {t("becomeProvider.step3.chooseFile")}
                        </label>

                        {files.visaDocument && (
                          <p className="text-sm mt-3 text-gray-600">
                            {files.visaDocument.name}
                          </p>
                        )}
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">{t("becomeProvider.step3.sponsorshipUploadTitle")}</h3>
                        <p className="text-sm text-gray-600 mb-4">{t("becomeProvider.step3.fileHint")}</p>
                        <input
                          type="file"
                          name="sponsorshipDocument"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="sponsorshipUpload"
                        />

                        <label
                          htmlFor="sponsorshipUpload"
                          className="cursor-pointer bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-2 rounded-lg"
                        >
                          {t("becomeProvider.step3.chooseFile")}
                        </label>

                        {files.sponsorshipDocument && (
                          <p className="text-sm mt-3 text-gray-600">
                            {files.sponsorshipDocument.name}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>{t("becomeProvider.step3.noteTitle")}</strong> {t("becomeProvider.step3.noteText")}
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
                  {t("becomeProvider.back")}
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
                {formStep === 3 && submitting ? t("becomeProvider.submitting") : formStep === 3 ? t("becomeProvider.submitApplication") : t("becomeProvider.continue")}
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
              key: "grow",
              icon: TrendingUp,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              key: "reputation",
              icon: Star,
              color: "text-amber-500",
              bg: "bg-amber-50",
            },
            {
              key: "earn",
              icon: Wallet,
              color: "text-[#00B8A9]",
              bg: "bg-cyan-50",
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
                <h3 className="font-semibold text-gray-900 mb-1">{t(`becomeProvider.benefits.${benefit.key}.title`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`becomeProvider.benefits.${benefit.key}.desc`)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
