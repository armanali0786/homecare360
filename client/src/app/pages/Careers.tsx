import { motion } from "motion/react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { SEO } from "@/app/components/SEO";

export function Careers() {
  const { t } = useTranslation("pages");
  const { regionConfig } = useLocale();
  const cities = regionConfig.cities;
  const openings = [
    {
      title: t("careers.openings.0.title"),
      location: cities[0] ?? regionConfig.label,
      type: t("careers.fullTime"),
      department: t("careers.openings.0.department"),
    },
    {
      title: t("careers.openings.1.title"),
      location: t("careers.remote"),
      type: t("careers.fullTime"),
      department: t("careers.openings.1.department"),
    },
    {
      title: t("careers.openings.2.title"),
      location: cities[1] ?? cities[0] ?? regionConfig.label,
      type: t("careers.fullTime"),
      department: t("careers.openings.2.department"),
    },
    {
      title: t("careers.openings.3.title"),
      location: cities[2] ?? cities[0] ?? regionConfig.label,
      type: t("careers.fullTime"),
      department: t("careers.openings.3.department"),
    },
    {
      title: t("careers.openings.4.title"),
      location: t("careers.remote"),
      type: t("careers.fullTime"),
      department: t("careers.openings.4.department"),
    },
    {
      title: t("careers.openings.5.title"),
      location: cities[3] ?? cities[0] ?? regionConfig.label,
      type: t("careers.fullTime"),
      department: t("careers.openings.5.department"),
    },
  ];

  const benefits = [
    t("careers.benefits.0"),
    t("careers.benefits.1"),
    t("careers.benefits.2"),
    t("careers.benefits.3"),
    t("careers.benefits.4"),
    t("careers.benefits.5"),
    t("careers.benefits.6"),
    t("careers.benefits.7"),
  ];

  return (
    <div className="w-full">
      <SEO
        title={t("careers.seo.title")}
        url="/careers"
        description={t("careers.seo.description")}
        keywords={t("careers.seo.keywords")}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("careers.heroPrefix")} <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">{t("careers.heroHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t("careers.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            {t("careers.whyWorkWithUs")}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-[#E0F7F5] to-white p-6 rounded-xl shadow-md"
              >
                <p className="text-gray-900 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            {t("careers.openPositions")}
          </motion.h2>
          <div className="space-y-4">
            {openings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    {t("careers.applyNow")}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {t("careers.noFitHeading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 text-white/90"
          >
            {t("careers.noFitSubtitle")}
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
            {t("careers.sendResume")}
          </motion.button>
        </div>
      </section>
    </div>
  );
}
