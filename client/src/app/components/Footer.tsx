import { motion } from "motion/react";
import { Phone, Mail, MapPin, ShieldCheck, BadgeCheck, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Footer() {
  const { t } = useTranslation("footer");
  const { regionConfig } = useLocale();

  const services = [
    { name: "Deep Cleaning (Female Staff)", path: "/services?service=House+Cleaning" },
    { name: "AC Chemical Cleaning", path: "/services?service=AC+%26+Appliance+Repair" },
    { name: "Electrical & DEWA Fixes", path: "/services?service=Electrical" },
    { name: "Plumbing & Drainage", path: "/services?service=Plumbing" },
    { name: "Jotun Wall Painting", path: "/services?service=Painting" },
    { name: "Odourless Pest Control", path: "/services?service=Pest+Control" },
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

  const handleWhatsApp = () => {
    window.open("https://wa.me/917319977276?text=Hi%20HomeCare360", "_blank");
  };

  return (
    <footer className="bg-[#0D1F1F] text-white border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00B8A9] to-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg font-black text-white text-xl">
                H
              </div>
              <span className="text-2xl font-black tracking-tight text-white">HomeCare360</span>
            </Link>

            <p className="text-white/70 leading-relaxed mb-6 max-w-xs text-sm">
              {t("tagline")}
            </p>

            {/* Contact */}
            <div className="space-y-3 text-sm text-white/80 mb-6">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{regionConfig.phoneCode} 4 800 360</span>
              </div>
              <div className="flex items-center gap-2.5 cursor-pointer hover:text-[#00B8A9]" onClick={handleWhatsApp}>
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp Booking & Support</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>support@homecare360.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{regionConfig.cities[0]}, {regionConfig.label}</span>
              </div>
            </div>

            {/* License & Trust Badges */}
            <div className="flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00B8A9]" />
                <span className="text-xs text-white/80">{t("sslSecure")}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-xs text-white/80">{t("vatRegistered", { vatLabel: regionConfig.vatLabel })}</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-white/50">
              UAE Commercial License No. 894321 / DED Approved
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-[#D4AF37] mb-5 text-xs uppercase tracking-widest">{t("servicesHeading")}</h4>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/70 hover:text-[#00B8A9] transition-colors"
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
            <h4 className="font-bold text-[#D4AF37] mb-5 text-xs uppercase tracking-widest">{t("companyHeading")}</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/70 hover:text-[#00B8A9] transition-colors"
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
            <h4 className="font-bold text-[#D4AF37] mb-5 text-xs uppercase tracking-widest">{t("citiesHeading")}</h4>
            <ul className="space-y-2.5">
              {cities.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/70 hover:text-[#00B8A9] transition-colors"
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
            <h4 className="font-bold text-[#D4AF37] mb-5 text-xs uppercase tracking-widest">{t("supportHeading")}</h4>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-xs text-white/70 hover:text-[#00B8A9] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/60">
              {t("copyright")}
            </p>

            <div className="flex items-center gap-4">
              <LocaleSwitcher variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
