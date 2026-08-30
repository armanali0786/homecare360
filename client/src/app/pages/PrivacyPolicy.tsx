import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { SEO } from "@/app/components/SEO";

interface PolicySection {
  title: string;
  content: string[];
}

export function PrivacyPolicy() {
  const { t } = useTranslation("pages");
  const { regionConfig } = useLocale();
  const sections = t("privacyPolicy.sections", { returnObjects: true }) as PolicySection[];

  return (
    <div className="w-full">
      <SEO
        title={t("privacyPolicy.seo.title")}
        url="/privacy-policy"
        description={t("privacyPolicy.seo.description")}
        keywords={t("privacyPolicy.seo.keywords")}
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
            {t("privacyPolicy.heroPrefix")} <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">{t("privacyPolicy.heroHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-4"
          >
            {t("privacyPolicy.lastUpdated")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            {t("privacyPolicy.heroIntro")}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("privacyPolicy.contactHeading")}</h2>
              <div className="bg-gradient-to-br from-[#E0F7F5] to-white p-8 rounded-2xl">
                <p className="text-gray-700 mb-4">
                  {t("privacyPolicy.contactIntro")}
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>{t("privacyPolicy.emailLabel")}:</strong> privacy@homecare360.com</li>
                  <li><strong>{t("privacyPolicy.phoneLabel")}:</strong> {regionConfig.phoneCode} 4 123 4567</li>
                  <li><strong>{t("privacyPolicy.mailLabel")}:</strong> {t("privacyPolicy.addressLine")}, {regionConfig.cities[0] ?? regionConfig.label}, {regionConfig.label}</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#00B8A9]"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("privacyPolicy.changesHeading")}</h3>
              <p className="text-gray-700">
                {t("privacyPolicy.changesBody")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
