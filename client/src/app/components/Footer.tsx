import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const services = [
    { name: "Plumbing", path: "/services?service=Plumbing" },
    { name: "Electrical", path: "/services?service=Electrical" },
    { name: "House Cleaning", path: "/services?service=House+Cleaning" },
    { name: "AC & Appliance Repair", path: "/services?service=AC+%26+Appliance+Repair" },
    { name: "Painting", path: "/services?service=Painting" },
    { name: "Outdoor Services", path: "/services?service=Outdoor+Services" },
  ];

  const company = [
    { name: "About Us", path: "/about-us" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  const support = [
    { name: "Help Center", path: "/help-center" },
    { name: "Safety", path: "/safety" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand — takes 2 cols on large */}
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
              India's trusted marketplace for professional home services. Verified providers, secure payments, guaranteed quality.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                <span>+91 7319977276</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                <span>armanali.shaikh77@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                <span>Bengaluru, karnataka, India</span>
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
            <h4 className="font-semibold text-white mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sm text-gray-400 hover:text-[#00B8A9] transition-colors"
                  >
                    {service.name}
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
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-[#00B8A9] transition-colors"
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
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-5">Support</h4>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-[#00B8A9] transition-colors"
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
              © 2026 HomeCare360. All rights reserved. Made in India 🇮🇳
            </p>

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
                aria-label="Twitter"
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
    </footer>
  );
}
