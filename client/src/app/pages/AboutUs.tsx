import { motion } from "motion/react";
import { Users, Target, Award, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/app/components/SEO";

export function AboutUs() {
  const { t } = useTranslation("pages");
  const values = [
    {
      icon: <Target size={32} />,
      title: t("aboutUs.values.mission.title"),
      description: t("aboutUs.values.mission.description"),
    },
    {
      icon: <Heart size={32} />,
      title: t("aboutUs.values.values.title"),
      description: t("aboutUs.values.values.description"),
    },
    {
      icon: <Users size={32} />,
      title: t("aboutUs.values.team.title"),
      description: t("aboutUs.values.team.description"),
    },
    {
      icon: <Award size={32} />,
      title: t("aboutUs.values.promise.title"),
      description: t("aboutUs.values.promise.description"),
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title={t("aboutUs.seo.title")}
        url="/about-us"
        description={t("aboutUs.seo.description")}
        keywords={t("aboutUs.seo.keywords")}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("aboutUs.heroPrefix")} <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">HomeCare360</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t("aboutUs.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("aboutUs.storyHeading")}</h2>
            <p className="text-gray-600 mb-4">
              {t("aboutUs.storyPara1")}
            </p>
            <p className="text-gray-600 mb-4">
              {t("aboutUs.storyPara2")}
            </p>
            <p className="text-gray-600">
              {t("aboutUs.storyPara3")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            {t("aboutUs.whatDrivesUs")}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] text-white rounded-2xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: t("aboutUs.stats.customers") },
              { number: "10K+", label: t("aboutUs.stats.professionals") },
              { number: "100K+", label: t("aboutUs.stats.services") },
              { number: "4.9★", label: t("aboutUs.stats.rating") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
