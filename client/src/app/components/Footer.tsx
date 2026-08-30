import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, ShieldCheck, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Footer() {
  const { t } = useTranslation("footer");
  const { regionConfig } = useLocale();

  const services = [
    { name: "Plumbing", path: "/services?service=Plumbing" },
    { name: "Electrical", path: "/services?service=Electrical" },
    { name: "House Cleaning", path: "/services?service=House+Cleaning" },
    { name: "AC & Appliance Repair", path: "/services?service=AC+%26+Appliance+Repair" },
    { name: "Painting", path: "/services?service=Painting" },
    { name: "Pest Control", path: "/services?service=Pest+Control" },
    { name: "Carpentry", path: "/services?service=Carpentry" },
  ];

  const company = [
    { name: t("aboutUs"), path: "/about-us" },
    { name: t("blog"), path: "/blog" },
    { name: t("careers"), path: "/careers" },
    { name: t("press"), path: "/about-us" },
    { name: t("contactUs"), path: "/contact" },
  ];

  const cities = regionConfig.cities.map((name) => ({
    name,
    path: `/services?location=${encodeURIComponent(name)}`,
  }));

  const support = [
    { name: t("helpCenter"), path: "/help-center" },
    { name: t("safety"), path: "/safety" },
    { name: t("cancellationPolicy"), path: "/terms-of-service" },
    { name: t("privacyPolicy"), path: "/privacy-policy" },
    { name: t("termsOfService"), path: "/terms-of-service" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 py-16">
          {/* Brand — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold tracking-tight">HomeCare360</span>
            </Link>

            <p className="text-gray-400 leading-relaxed mb-6 max-w-xs text-sm">
              {t("tagline")}
            </p>

            {/* Contact */}
            <div className="space-y-2.5 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                <span>{regionConfig.phoneCode} 4 000 0000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                <span>support@homecare360.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                <span>{regionConfig.cities[0]}, {regionConfig.label}</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex gap-3">
              <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00B8A9]" />
                <span className="text-xs text-gray-400">{t("sslSecure")}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-lg">
                <BadgeCheck className="w-3.5 h-3.5 text-[#00B8A9]" />
                <span className="text-xs text-gray-400">{t("vatRegistered", { vatLabel: regionConfig.vatLabel })}</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">{t("servicesHeading")}</h4>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-[#00B8A9] transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">{t("companyHeading")}</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-[#00B8A9] transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Cities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">{t("citiesHeading")}</h4>
            <ul className="space-y-2.5">
              {cities.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-[#00B8A9] transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wide">{t("supportHeading")}</h4>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-[#00B8A9] transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              {t("copyright")}
            </p>

            <div className="flex items-center gap-4">
              <LocaleSwitcher variant="dark" />
              <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 bg-gray-800 hover:bg-[#00B8A9] rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Arman_Ali_01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 bg-gray-800 hover:bg-[#00B8A9] rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/a4armanali"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-gray-800 hover:bg-[#00B8A9] rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/arman-ali-8383081ab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-gray-800 hover:bg-[#00B8A9] rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
