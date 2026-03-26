import { motion } from "motion/react";

export function TermsOfService() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using HomeCare360's services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and your continued use constitutes acceptance of any changes.",
    },
    {
      title: "Service Description",
      content: "HomeCare360 is a platform that connects homeowners with verified service professionals. We facilitate bookings, payments, and reviews but do not directly provide home services. The actual services are performed by independent professionals who use our platform.",
    },
    {
      title: "User Accounts",
      content: "You must create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information when creating your account and keep this information updated.",
    },
    {
      title: "User Responsibilities",
      content: "Users agree to use our platform only for lawful purposes and in accordance with these terms. You must not misuse our services, attempt to gain unauthorized access, or interfere with the proper functioning of the platform. You are responsible for all content you submit and communications you make through our platform.",
    },
    {
      title: "Service Provider Terms",
      content: "Service providers must undergo our verification process and maintain valid licenses, insurance, and credentials. They must provide services professionally and in accordance with applicable laws and regulations. Service providers are independent contractors and not employees of HomeCare360.",
    },
    {
      title: "Payments and Fees",
      content: "All payments must be made through our secure payment system. We charge a service fee for facilitating connections between customers and service providers. Prices for services are set by individual service providers. Refund policies may vary by service provider and situation.",
    },
    {
      title: "Cancellations and Refunds",
      content: "Cancellation policies vary by service provider. Customers may cancel bookings subject to the provider's cancellation policy. Refunds are processed according to our refund policy and the specific circumstances of each case. Some services may be non-refundable or subject to cancellation fees.",
    },
    {
      title: "Reviews and Ratings",
      content: "Users may submit reviews and ratings for services they've received. Reviews must be honest, accurate, and based on actual experiences. We reserve the right to remove reviews that violate our content policies, including those that are fraudulent, defamatory, or inappropriate.",
    },
    {
      title: "Intellectual Property",
      content: "All content on our platform, including text, graphics, logos, and software, is owned by HomeCare360 or our licensors and protected by intellectual property laws. You may not use, copy, or distribute our content without permission. User-generated content remains the property of the user but grants us a license to use it on our platform.",
    },
    {
      title: "Limitation of Liability",
      content: "HomeCare360 acts as a platform connecting users with service providers. We are not liable for the actions, omissions, or services provided by independent professionals. Our liability is limited to the maximum extent permitted by law. We do not guarantee the quality of services provided by third-party professionals.",
    },
    {
      title: "Indemnification",
      content: "You agree to indemnify and hold HomeCare360 harmless from any claims, damages, or expenses arising from your use of our services, violation of these terms, or infringement of any rights of another party.",
    },
    {
      title: "Dispute Resolution",
      content: "Any disputes arising from these terms or use of our services will be resolved through binding arbitration in accordance with applicable arbitration rules. You waive your right to participate in class action lawsuits. These terms are governed by the laws of the State of New York.",
    },
    {
      title: "Termination",
      content: "We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion. You may also terminate your account at any time by contacting our support team. Certain provisions of these terms survive termination.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Terms of <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">Service</span>
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
            Please read these terms carefully before using our services
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
                transition={{ delay: index * 0.05 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#E0F7F5] to-white p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Email:</strong> legal@homecare360.com</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                <li><strong>Mail:</strong> 123 Service Street, New York, NY 10001</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#00B8A9]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Agreement</h3>
              <p className="text-gray-700">
                By using HomeCare360, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must discontinue use of our services immediately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
