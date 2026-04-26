import { motion } from "motion/react";
import { SEO } from "@/app/components/SEO";

export function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number, address)",
        "Account credentials and preferences",
        "Payment and billing information",
        "Service booking and transaction history",
        "Communications between users and service providers",
        "Device and usage information",
        "Location data when you use our services",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To process transactions and send notifications",
        "To improve and personalize your experience",
        "To communicate with you about services and updates",
        "To ensure safety and prevent fraud",
        "To comply with legal obligations",
        "To analyze usage patterns and improve our platform",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "With service providers to fulfill your bookings",
        "With payment processors for transaction handling",
        "With service providers who help us operate our platform",
        "When required by law or legal process",
        "With your consent for specific purposes",
        "We never sell your personal information to third parties",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We use industry-standard encryption for data transmission",
        "Secure servers with restricted access",
        "Regular security audits and updates",
        "Employee training on data protection",
        "Two-factor authentication options",
        "Secure payment processing through certified providers",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Opt-out of marketing communications",
        "Export your data in portable format",
        "Withdraw consent for data processing",
        "Lodge a complaint with regulatory authorities",
      ],
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use essential cookies for platform functionality",
        "Analytics cookies to understand usage patterns",
        "Preference cookies to remember your settings",
        "You can control cookie settings in your browser",
        "Some features may not work without cookies",
      ],
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title="Privacy Policy"
        url="/privacy-policy"
        description="Read Homecare360's Privacy Policy to understand how we collect, use, and protect your personal information when using our home care platform."
        keywords="homecare360 privacy policy, data protection, personal information, privacy"
        noIndex={false}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Privacy <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-4"
          >
            Last updated: March 11, 2026
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#00B8A9] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us About Privacy</h2>
              <div className="bg-gradient-to-br from-[#E0F7F5] to-white p-8 rounded-2xl">
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy or how we handle your data, please contact us:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> privacy@homecare360.com</li>
                  <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                  <li><strong>Mail:</strong> 123 Service Street, New York, NY 10001</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#00B8A9]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Changes to This Policy</h3>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
