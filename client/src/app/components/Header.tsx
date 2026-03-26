import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useUser } from "../context/UserContext";
import { ProfileMenu } from "./ProfileMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();


  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/become-provider", label: "Become Provider" },
    { path: "/quote-estimator", label: "Quote Estimator" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-[#00B8A9] rounded-lg flex items-center justify-center"
            >
              <span className="text-white text-xl font-bold">H</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">
              HomeCare360
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors ${isActive(link.path) ? "text-[#00B8A9]" : "text-gray-600 hover:text-[#00B8A9]"
                  }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00B8A9]"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <ProfileMenu />
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-[#00B8A9] hover:text-[#2B5F5F]"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-[#00B8A9] text-white rounded-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-[#00B8A9] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${isActive(link.path)
                        ? "bg-[#E0F7F5] text-[#00B8A9]"
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-center text-[#00B8A9] border border-[#00B8A9] rounded-lg hover:bg-[#E0F7F5] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-center bg-[#00B8A9] text-white rounded-lg hover:bg-[#2B5F5F] transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
