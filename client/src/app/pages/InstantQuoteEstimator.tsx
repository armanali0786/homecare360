import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Home, MapPin, Calendar, IndianRupee, CheckCircle, ArrowRight } from "lucide-react";

interface QuoteData {
  service: string;
  propertyType: string;
  propertySize: string;
  urgency: string;
  additionalServices: string[];
}

export function InstantQuoteEstimator() {
  const [step, setStep] = useState(1);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    service: "",
    propertyType: "",
    propertySize: "",
    urgency: "standard",
    additionalServices: [],
  });

  const services = [
    { id: "plumbing", name: "Plumbing", basePrice: 400, icon: "🔧" },
    { id: "electrical", name: "Electrical", basePrice: 500, icon: "⚡" },
    { id: "cleaning", name: "House Cleaning", basePrice: 300, icon: "🧹" },
    { id: "landscaping", name: "Landscaping", basePrice: 800, icon: "🌿" },
    { id: "painting", name: "Painting", basePrice: 1500, icon: "🎨" },
    { id: "hvac", name: "HVAC Service", basePrice: 1000, icon: "❄️" },
    { id: "carpentry", name: "Carpentry", basePrice: 600, icon: "🔨" },
    { id: "appliance", name: "Appliance Repair", basePrice: 400, icon: "🔌" },
  ];

  const propertyTypes = [
    { id: "apartment", name: "Apartment", multiplier: 0.8 },
    { id: "house", name: "Single Family Home", multiplier: 1.0 },
    { id: "condo", name: "Condo", multiplier: 0.9 },
    { id: "townhouse", name: "Townhouse", multiplier: 0.95 },
    { id: "commercial", name: "Commercial", multiplier: 1.5 },
  ];

  const propertySizes = [
    { id: "small", name: "Small (< 1000 sq ft)", multiplier: 0.8 },
    { id: "medium", name: "Medium (1000-2000 sq ft)", multiplier: 1.0 },
    { id: "large", name: "Large (2000-3000 sq ft)", multiplier: 1.3 },
    { id: "xlarge", name: "Extra Large (> 3000 sq ft)", multiplier: 1.6 },
  ];

  const urgencyOptions = [
    { id: "standard", name: "Standard (3-5 days)", multiplier: 1.0 },
    { id: "priority", name: "Priority (1-2 days)", multiplier: 1.3 },
    { id: "emergency", name: "Emergency (Same day)", multiplier: 1.8 },
  ];

  const additionalServices = [
    { id: "warranty", name: "Extended Warranty", price: 150 },
    { id: "eco", name: "Eco-Friendly Materials", price: 200 },
    { id: "weekend", name: "Weekend Service", price: 300 },
    { id: "inspection", name: "Full Inspection Report", price: 200 },
  ];

  const calculateQuote = () => {
    const selectedService = services.find((s) => s.id === quoteData.service);
    const selectedPropertyType = propertyTypes.find((p) => p.id === quoteData.propertyType);
    const selectedSize = propertySizes.find((s) => s.id === quoteData.propertySize);
    const selectedUrgency = urgencyOptions.find((u) => u.id === quoteData.urgency);

    if (!selectedService || !selectedPropertyType || !selectedSize || !selectedUrgency) {
      return 0;
    }

    let total = selectedService.basePrice;
    total *= selectedPropertyType.multiplier;
    total *= selectedSize.multiplier;
    total *= selectedUrgency.multiplier;

    quoteData.additionalServices.forEach((addId) => {
      const addon = additionalServices.find((a) => a.id === addId);
      if (addon) total += addon.price;
    });

    return Math.round(total);
  };

  const handleServiceSelect = (serviceId: string) => {
    setQuoteData({ ...quoteData, service: serviceId });
    setStep(2);
  };

  const handlePropertyTypeSelect = (typeId: string) => {
    setQuoteData({ ...quoteData, propertyType: typeId });
    setStep(3);
  };

  const handleSizeSelect = (sizeId: string) => {
    setQuoteData({ ...quoteData, propertySize: sizeId });
    setStep(4);
  };

  const handleUrgencySelect = (urgencyId: string) => {
    setQuoteData({ ...quoteData, urgency: urgencyId });
    setStep(5);
  };

  const toggleAdditionalService = (serviceId: string) => {
    setQuoteData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter((id) => id !== serviceId)
        : [...prev.additionalServices, serviceId],
    }));
  };

  const handleGetQuote = () => {
    setShowQuote(true);
  };

  const resetQuote = () => {
    setQuoteData({
      service: "",
      propertyType: "",
      propertySize: "",
      urgency: "standard",
      additionalServices: [],
    });
    setStep(1);
    setShowQuote(false);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] rounded-full mb-6"
          >
            <Calculator size={40} className="text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Instant Quote <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">Estimator</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Get an instant estimate for your home service needs in just a few clicks
          </motion.p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: step >= stepNum ? 1 : 0.8,
                    backgroundColor: step >= stepNum ? "#00B8A9" : "#E5E7EB",
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= stepNum ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step > stepNum ? <CheckCircle size={20} /> : stepNum}
                </motion.div>
                {stepNum < 5 && (
                  <div className="flex-1 h-1 mx-2 bg-gray-200 rounded">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: step > stepNum ? "100%" : "0%" }}
                      className="h-full bg-[#00B8A9] rounded"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex justify-between mt-2 text-xs text-gray-600">
            <span>Service</span>
            <span>Property</span>
            <span>Size</span>
            <span>Urgency</span>
            <span>Final Quote</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {step === 1 && !showQuote && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What service do you need?</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {services.map((service, index) => (
                    <motion.button
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        quoteData.service === service.id
                          ? "border-[#00B8A9] bg-[#E0F7F5]"
                          : "border-gray-200 bg-white hover:border-[#00B8A9]"
                      } shadow-md hover:shadow-lg`}
                    >
                      <div className="text-4xl mb-3">{service.icon}</div>
                      <div className="font-bold text-gray-900 mb-1">{service.name}</div>
                      <div className="text-sm text-gray-600">From ₹{service.basePrice}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Property Type */}
            {step === 2 && !showQuote && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What type of property?</h2>
                <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {propertyTypes.map((type, index) => (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePropertyTypeSelect(type.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        quoteData.propertyType === type.id
                          ? "border-[#00B8A9] bg-[#E0F7F5]"
                          : "border-gray-200 bg-white hover:border-[#00B8A9]"
                      } shadow-md hover:shadow-lg`}
                    >
                      <Home className="mx-auto mb-3 text-[#00B8A9]" size={32} />
                      <div className="font-bold text-gray-900 text-sm">{type.name}</div>
                    </motion.button>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button onClick={() => setStep(1)} className="text-[#00B8A9] hover:text-[#2B5F5F] font-medium">
                    ← Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Property Size */}
            {step === 3 && !showQuote && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How large is your property?</h2>
                <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {propertySizes.map((size, index) => (
                    <motion.button
                      key={size.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSizeSelect(size.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        quoteData.propertySize === size.id
                          ? "border-[#00B8A9] bg-[#E0F7F5]"
                          : "border-gray-200 bg-white hover:border-[#00B8A9]"
                      } shadow-md hover:shadow-lg`}
                    >
                      <MapPin className="mx-auto mb-3 text-[#00B8A9]" size={32} />
                      <div className="font-bold text-gray-900 text-sm">{size.name}</div>
                    </motion.button>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button onClick={() => setStep(2)} className="text-[#00B8A9] hover:text-[#2B5F5F] font-medium">
                    ← Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Urgency */}
            {step === 4 && !showQuote && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">When do you need service?</h2>
                <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {urgencyOptions.map((urgency, index) => (
                    <motion.button
                      key={urgency.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUrgencySelect(urgency.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        quoteData.urgency === urgency.id
                          ? "border-[#00B8A9] bg-[#E0F7F5]"
                          : "border-gray-200 bg-white hover:border-[#00B8A9]"
                      } shadow-md hover:shadow-lg`}
                    >
                      <Calendar className="mx-auto mb-3 text-[#00B8A9]" size={32} />
                      <div className="font-bold text-gray-900 mb-1">{urgency.name}</div>
                      <div className="text-xs text-gray-600">
                        {urgency.multiplier > 1 && `+${Math.round((urgency.multiplier - 1) * 100)}%`}
                        {urgency.multiplier === 1 && "Standard rate"}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button onClick={() => setStep(3)} className="text-[#00B8A9] hover:text-[#2B5F5F] font-medium">
                    ← Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Additional Services */}
            {step === 5 && !showQuote && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Any additional services?</h2>
                <p className="text-gray-600 text-center mb-8">Optional - Select any that apply</p>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
                  {additionalServices.map((addon, index) => (
                    <motion.button
                      key={addon.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleAdditionalService(addon.id)}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        quoteData.additionalServices.includes(addon.id)
                          ? "border-[#00B8A9] bg-[#E0F7F5]"
                          : "border-gray-200 bg-white hover:border-[#00B8A9]"
                      } shadow-md hover:shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900">{addon.name}</div>
                          <div className="text-sm text-gray-600">+₹{addon.price}</div>
                        </div>
                        {quoteData.additionalServices.includes(addon.id) && (
                          <CheckCircle className="text-[#00B8A9]" size={24} />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="text-center space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetQuote}
                    className="px-8 py-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                  >
                    <IndianRupee size={24} />
                    Get My Instant Quote
                  </motion.button>
                  <div>
                    <button onClick={() => setStep(4)} className="text-[#00B8A9] hover:text-[#2B5F5F] font-medium">
                      ← Back
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quote Result */}
            {showQuote && (
              <motion.div
                key="quote"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-[#E0F7F5] to-white rounded-3xl shadow-2xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] rounded-full mb-6"
                    >
                      <IndianRupee size={40} className="text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Estimated Quote</h2>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="text-6xl font-bold bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent my-6"
                    >
                      ₹{calculateQuote()}
                    </motion.div>
                    <p className="text-gray-600">This is an estimated quote. Final price may vary based on specific requirements.</p>
                  </div>

                  {/* Quote Breakdown */}
                  <div className="bg-white rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">Quote Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium text-gray-900">
                          {services.find((s) => s.id === quoteData.service)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Property Type:</span>
                        <span className="font-medium text-gray-900">
                          {propertyTypes.find((p) => p.id === quoteData.propertyType)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Property Size:</span>
                        <span className="font-medium text-gray-900">
                          {propertySizes.find((s) => s.id === quoteData.propertySize)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service Timing:</span>
                        <span className="font-medium text-gray-900">
                          {urgencyOptions.find((u) => u.id === quoteData.urgency)?.name}
                        </span>
                      </div>
                      {quoteData.additionalServices.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Add-ons:</span>
                          <span className="font-medium text-gray-900">
                            {quoteData.additionalServices.length} selected
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      Book This Service Now
                      <ArrowRight size={20} />
                    </motion.button>
                    <button
                      onClick={resetQuote}
                      className="w-full px-6 py-3 bg-white border-2 border-[#00B8A9] text-[#00B8A9] rounded-lg font-medium hover:bg-[#E0F7F5] transition-all"
                    >
                      Get Another Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calculator size={32} />,
                title: "Instant Estimates",
                description: "Get accurate price estimates in seconds without waiting for callbacks",
              },
              {
                icon: <CheckCircle size={32} />,
                title: "No Hidden Fees",
                description: "Transparent pricing with all costs clearly outlined upfront",
              },
              {
                icon: <IndianRupee size={32} />,
                title: "Best Value",
                description: "Compare quotes and choose the option that fits your budget",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] text-white rounded-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
