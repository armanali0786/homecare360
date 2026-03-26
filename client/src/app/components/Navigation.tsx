import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "browse", label: "Browse Services" },
    { id: "become-provider", label: "Become a Provider" },
    // { id: "bookings", label: "My Bookings" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent">
              HomeCare360
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-gray-700 hover:text-cyan-600 transition-colors relative ${
                  currentPage === item.id ? "text-cyan-600" : ""
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-600 to-emerald-500"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:block text-gray-700 hover:text-cyan-600 transition-colors">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
              Get Started
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors ${
                  currentPage === item.id ? "bg-cyan-50 text-cyan-600" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
