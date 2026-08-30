import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { SEO } from "@/app/components/SEO";

interface TermsSection {
  title: string;
  content: string;
}

export function TermsOfService() {
  const { t } = useTranslation("pages");
  const { regionConfig } = useLocale();
  const sections = t("termsOfService.sections", { returnObjects: true }) as TermsSection[];

  return (
    <div className="w-full">
      <SEO
        title={t("termsOfService.seo.title")}
        url="/terms-of-service"
        description={t("termsOfService.seo.description")}
        keywords={t("termsOfService.seo.keywords")}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("termsOfService.heroPrefix")} <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">{t("termsOfService.heroHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-4"
          >
            {t("termsOfService.lastUpdated")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            {t("termsOfService.heroSubtitle")}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("termsOfService.contactHeading")}</h2>
              <p className="text-gray-700 mb-4">
                {t("termsOfService.contactIntro")}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>{t("termsOfService.emailLabel")}:</strong> legal@homecare360.com</li>
                <li><strong>{t("termsOfService.phoneLabel")}:</strong> {regionConfig.phoneCode} 4 123 4567</li>
                <li><strong>{t("termsOfService.mailLabel")}:</strong> {t("termsOfService.addressLine")}, {regionConfig.cities[0] ?? regionConfig.label}, {regionConfig.label}</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#00B8A9]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("termsOfService.agreementHeading")}</h3>
              <p className="text-gray-700">
                {t("termsOfService.agreementBody")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
