import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const services = [
    { name: "Plumbing", path: "/services?category=plumbing" },
    { name: "Electrical", path: "/services?category=electrical" },
    { name: "Cleaning", path: "/services?category=cleaning" },
    { name: "Landscaping", path: "/services?category=landscaping" },
    { name: "Painting", path: "/services?category=painting" },
  ];

  const company = [
    { name: "About Us", path: "/about-us" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const support = [
    { name: "Help Center", path: "/help-center" },
    { name: "Safety", path: "/safety" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold">HomeCare360</span>
            </Link>

            <p className="text-gray-400 leading-relaxed">
              Your trusted marketplace for professional home services. Connect, book, and get things done.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
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
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
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
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-400 text-sm">
              © 2026 HomeCare360. All rights reserved.
            </p>

            <div className="flex gap-4">

              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://x.com/Arman_Ali_01"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/itz_arman_official__"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/arman-ali-8383081ab"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>

            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}