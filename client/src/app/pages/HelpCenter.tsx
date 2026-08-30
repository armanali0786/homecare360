import { motion } from "motion/react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/app/components/SEO";

export function HelpCenter() {
  const { t } = useTranslation("pages");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    { question: t("helpCenter.faqs.0.question"), answer: t("helpCenter.faqs.0.answer") },
    { question: t("helpCenter.faqs.1.question"), answer: t("helpCenter.faqs.1.answer") },
    { question: t("helpCenter.faqs.2.question"), answer: t("helpCenter.faqs.2.answer") },
    { question: t("helpCenter.faqs.3.question"), answer: t("helpCenter.faqs.3.answer") },
    { question: t("helpCenter.faqs.4.question"), answer: t("helpCenter.faqs.4.answer") },
    { question: t("helpCenter.faqs.5.question"), answer: t("helpCenter.faqs.5.answer") },
    { question: t("helpCenter.faqs.6.question"), answer: t("helpCenter.faqs.6.answer") },
    { question: t("helpCenter.faqs.7.question"), answer: t("helpCenter.faqs.7.answer") },
  ];

  const categories = [
    { title: t("helpCenter.categories.gettingStarted"), count: 12 },
    { title: t("helpCenter.categories.bookingPayments"), count: 18 },
    { title: t("helpCenter.categories.accountManagement"), count: 15 },
    { title: t("helpCenter.categories.serviceProviders"), count: 10 },
    { title: t("helpCenter.categories.safetyTrust"), count: 8 },
    { title: t("helpCenter.categories.troubleshooting"), count: 14 },
  ];

  return (
    <div className="w-full">
      <SEO
        title={t("helpCenter.seo.title")}
        url="/help-center"
        description={t("helpCenter.seo.description")}
        keywords={t("helpCenter.seo.keywords")}
      />
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("helpCenter.heroPrefix")} <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">{t("helpCenter.heroHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            {t("helpCenter.heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t("helpCenter.searchPlaceholder")}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent transition-all shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            {t("helpCenter.browseByCategory")}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#00B8A9]"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600">{t("helpCenter.articlesCount", { count: category.count })}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            {t("helpCenter.faqHeading")}
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {expandedIndex === index ? (
                    <ChevronUp className="text-[#00B8A9] flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? "auto" : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {t("helpCenter.stillNeedHelp")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 text-white/90"
          >
            {t("helpCenter.stillNeedHelpSubtitle")}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-[#00B8A9] rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            {t("helpCenter.contactSupport")}
          </motion.button>
        </div>
      </section>
    </div>
  );
}
