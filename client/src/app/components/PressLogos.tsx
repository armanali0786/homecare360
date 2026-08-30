import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const LOGO_IDS = ["appStore", "googlePlay", "gulfBusiness", "arabianBusiness", "khaleejTimes", "techCrunch"];

export function PressLogos() {
  const { t } = useTranslation("home");

  return (
    <section className="py-10 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-7"
        >
          {t("press.asSeenIn")}
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {LOGO_IDS.map((id, index) => (
            <motion.span
              key={id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="text-gray-300 hover:text-gray-400 transition-colors font-bold text-base tracking-tight select-none cursor-default"
            >
              {t(`press.logos.${id}`)}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
