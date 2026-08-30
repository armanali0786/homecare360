import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, LayoutDashboard, CalendarDays, Briefcase } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";
import { ProfileMenu } from "./ProfileMenu";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const { t } = useTranslation("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const isActive = (path: string) => location.pathname === path;
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const isProvider = user?.role === "provider";

  const baseNavLinks = [
    { path: "/", label: t("home") },
    { path: "/services", label: t("services") },
    { path: "/become-provider", label: t("becomeProvider") },
    { path: "/quote-estimator", label: t("quoteEstimator") },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              src="/logo.png"
              alt="HomeCare360 Logo"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">
              HomeCare360
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Base links — everyone sees these */}
            {baseNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors flex items-center gap-1.5 ${
                  isActive(link.path) ? "text-[#00B8A9]" : "text-gray-600 hover:text-[#00B8A9]"
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

            {/* Admin / Superadmin: Admin Dashboard */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`relative transition-colors flex items-center gap-1.5 ${
                  location.pathname.startsWith("/admin") ? "text-[#00B8A9]" : "text-gray-600 hover:text-[#00B8A9]"
                }`}
              >
                <LayoutDashboard size={15} />
                {t("adminDashboard")}
                {location.pathname.startsWith("/admin") && (
                  <motion.div
                    layoutId="underline-admin"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00B8A9]"
                  />
                )}
              </Link>
            )}

            {/* Provider: Provider Dashboard + My Bookings */}
            {isProvider && (
              <>
                <Link
                  to="/admin"
                  className={`relative transition-colors flex items-center gap-1.5 ${
                    location.pathname.startsWith("/admin") ? "text-[#00B8A9]" : "text-gray-600 hover:text-[#00B8A9]"
                  }`}
                >
                  <Briefcase size={15} />
                  {t("providerDashboard")}
                  {location.pathname.startsWith("/admin") && (
                    <motion.div
                      layoutId="underline-provider"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00B8A9]"
                    />
                  )}
                </Link>
                <Link
                  to="/bookings"
                  className={`relative transition-colors flex items-center gap-1.5 ${
                    isActive("/bookings") ? "text-[#00B8A9]" : "text-gray-600 hover:text-[#00B8A9]"
                  }`}
                >
                  <CalendarDays size={15} />
                  {t("myBookings")}
                  {isActive("/bookings") && (
                    <motion.div
                      layoutId="underline-bookings"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00B8A9]"
                    />
                  )}
                </Link>
              </>
            )}

            {/* Regular user: My Bookings */}
            {user && !isAdmin && !isProvider && (
              <Link
                to="/bookings"
                className={`relative transition-colors flex items-center gap-1.5 ${
                  isActive("/bookings") ? "text-[#00B8A9]" : "text-gray-600 hover:text-[#00B8A9]"
                }`}
              >
                <CalendarDays size={15} />
                {t("myBookings")}
                {isActive("/bookings") && (
                  <motion.div
                    layoutId="underline-bookings"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00B8A9]"
                  />
                )}
              </Link>
            )}
          </nav>

          {/* Right side: auth */}
          <div className="hidden md:flex items-center gap-4">
            <LocaleSwitcher />
            {user ? (
              <ProfileMenu />
            ) : (
              <>
                <Link
                  to="/become-provider"
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-[#00B8A9] hover:text-[#00B8A9] transition-colors"
                >
                  {t("becomeAPro")}
                </Link>
                <Link to="/login" className="px-4 py-2 text-sm text-[#00B8A9] hover:text-[#2B5F5F] transition-colors">
                  {t("signIn")}
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 text-sm bg-[#00B8A9] text-white rounded-lg hover:bg-[#009e96] transition-colors"
                >
                  {t("getStarted")}
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
            <nav className="flex flex-col px-4 py-4 space-y-1">
              {/* Base nav links */}
              {baseNavLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.path) ? "bg-[#E0F7F5] text-[#00B8A9]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Role-specific mobile links */}
              {user && (
                <>
                  <div className="border-t border-gray-100 my-2" />

                  {/* Admin / Superadmin */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        location.pathname.startsWith("/admin")
                          ? "bg-[#E0F7F5] text-[#00B8A9]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <LayoutDashboard size={16} />
                      {t("adminDashboard")}
                    </Link>
                  )}

                  {/* Provider */}
                  {isProvider && (
                    <>
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                          location.pathname.startsWith("/admin")
                            ? "bg-[#E0F7F5] text-[#00B8A9]"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Briefcase size={16} />
                        {t("providerDashboard")}
                      </Link>
                      <Link
                        to="/bookings"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                          isActive("/bookings") ? "bg-[#E0F7F5] text-[#00B8A9]" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <CalendarDays size={16} />
                        {t("myBookings")}
                      </Link>
                    </>
                  )}

                  {/* Regular user */}
                  {!isAdmin && !isProvider && (
                    <Link
                      to="/bookings"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        isActive("/bookings") ? "bg-[#E0F7F5] text-[#00B8A9]" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <CalendarDays size={16} />
                      {t("myBookings")}
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-left"
                  >
                    {t("logout")}
                  </button>
                </>
              )}

              {/* Guest mobile links */}
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-center text-[#00B8A9] border border-[#00B8A9] rounded-lg hover:bg-[#E0F7F5] transition-colors"
                  >
                    {t("signIn")}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-center bg-[#00B8A9] text-white rounded-lg hover:bg-[#2B5F5F] transition-colors"
                  >
                    {t("getStarted")}
                  </Link>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <LocaleSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
