import { motion } from "motion/react";
import { Shield, CheckCircle, Lock, Users, AlertCircle, FileCheck } from "lucide-react";

export function Safety() {
  const safetyFeatures = [
    {
      icon: <Shield size={32} />,
      title: "Verified Professionals",
      description: "Every service provider undergoes comprehensive background checks and credential verification before joining our platform.",
    },
    {
      icon: <Lock size={32} />,
      title: "Secure Payments",
      description: "All transactions are encrypted and processed through secure payment gateways. Your financial information is never stored on our servers.",
    },
    {
      icon: <FileCheck size={32} />,
      title: "Insurance Coverage",
      description: "All professionals are required to maintain valid insurance coverage to protect you and your property.",
    },
    {
      icon: <Users size={32} />,
      title: "Reviewed Ratings",
      description: "Read authentic reviews from verified customers to make informed decisions about service providers.",
    },
    {
      icon: <AlertCircle size={32} />,
      title: "24/7 Support",
      description: "Our safety team is available around the clock to address any concerns or incidents that may arise.",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Quality Assurance",
      description: "Regular quality checks and performance monitoring ensure consistent service standards.",
    },
  ];

  const verificationSteps = [
    {
      step: "1",
      title: "Identity Verification",
      description: "Government-issued ID verification and address confirmation",
    },
    {
      step: "2",
      title: "Background Check",
      description: "Comprehensive criminal background screening",
    },
    {
      step: "3",
      title: "License Verification",
      description: "Validation of professional licenses and certifications",
    },
    {
      step: "4",
      title: "Insurance Check",
      description: "Confirmation of liability and workers' compensation insurance",
    },
    {
      step: "5",
      title: "Reference Verification",
      description: "Professional reference checks and work history review",
    },
  ];

  const safetyTips = [
    "Always communicate through our platform for documented interactions",
    "Review service provider profiles, ratings, and reviews carefully",
    "Report any suspicious behavior or safety concerns immediately",
    "Keep your account information secure and never share passwords",
    "Verify the identity of service providers before allowing entry",
    "Use our secure payment system for all transactions",
    "Provide feedback after each service to help maintain quality",
    "Contact our support team if you have any safety questions",
  ];

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
            <Shield size={40} className="text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Your <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">Safety</span> is Our Priority
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            We've built comprehensive safety measures to protect you, your home, and your family
          </motion.p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            How We Keep You Safe
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] text-white rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Our Verification Process
          </motion.h2>
          <div className="space-y-6">
            {verificationSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Safety Tips for Customers
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {safetyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#E0F7F5] to-white p-6 rounded-xl shadow-md flex items-start gap-3"
              >
                <CheckCircle className="text-[#00B8A9] flex-shrink-0 mt-0.5" size={20} />
                <p className="text-gray-700">{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Report a Safety Concern
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 text-white/90"
          >
            If you experience any safety issues, contact our 24/7 safety team immediately
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#00B8A9] rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Call Safety Hotline
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
            >
              Submit Report Online
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
