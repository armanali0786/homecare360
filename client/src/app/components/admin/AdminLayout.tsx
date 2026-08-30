import { motion } from "motion/react";
import {
  LayoutDashboard,
  Wrench,
  Users,
  FileText,
  UserCog,
  Calendar,
  DollarSign,
  Star,
  Bell,
  Menu,
  X,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const allMenuItems = [
  { id: "dashboard", labelKey: "layout.menu.dashboard", icon: LayoutDashboard, roles: ["admin", "superadmin", "provider"] },
  { id: "services", labelKey: "layout.menu.services", icon: Wrench, roles: ["admin", "superadmin"] },
  { id: "providers", labelKey: "layout.menu.providers", icon: UserCog, roles: ["admin", "superadmin"] },
  { id: "applications", labelKey: "layout.menu.applications", icon: FileText, roles: ["admin", "superadmin"] },
  { id: "compliance", labelKey: "layout.menu.compliance", icon: ShieldCheck, roles: ["admin", "superadmin"] },
  { id: "users", labelKey: "layout.menu.users", icon: Users, roles: ["admin", "superadmin"] },
  { id: "bookings", labelKey: "layout.menu.bookings", icon: Calendar, roles: ["admin", "superadmin", "provider"] },
  { id: "payments", labelKey: "layout.menu.payments", icon: DollarSign, roles: ["admin", "superadmin"] },
  { id: "reviews", labelKey: "layout.menu.reviews", icon: Star, roles: ["admin", "superadmin", "provider"] },
  { id: "notifications", labelKey: "layout.menu.notifications", icon: Bell, roles: ["admin", "superadmin"] },
];

export function AdminLayout({
  children,
  currentSection,
  onSectionChange,
}: AdminLayoutProps) {
  const { t } = useTranslation("admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const isProvider = user?.role === "provider";
  const panelLabel = isProvider ? t("layout.panelProvider") : t("layout.panelAdmin");

  const menuItems = allMenuItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
      initial={false}
      className={`fixed lg:static top-0 left-0 z-40 w-64 h-screen
      bg-gradient-to-b from-cyan-600 to-teal-700 shadow-2xl
      transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">

          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-cyan-600 font-bold text-xl">H</span>
              </div>
              <div>
                <h2 className="text-white font-semibold">HomeCare360</h2>
                <p className="text-cyan-100 text-xs">{panelLabel}</p>
              </div>
            </div>

            {/* Logged-in user info */}
            {user && (
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                  {user.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-medium truncate">{user.fullName}</p>
                  <p className="text-cyan-200 text-xs truncate">{user.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                      ? "bg-white text-cyan-700 shadow-lg"
                      : "text-white hover:bg-white/10"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{t(item.labelKey)}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">{t("layout.logout")}</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>

    </div>
  );
}
