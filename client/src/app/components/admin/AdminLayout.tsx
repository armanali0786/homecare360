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
} from "lucide-react";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "services", label: "Services Management", icon: Wrench },
  { id: "providers", label: "Service Providers", icon: UserCog },
  { id: "applications", label: "Provider Applications", icon: FileText },
  { id: "users", label: "User Management", icon: Users },
  { id: "bookings", label: "Booking Management", icon: Calendar },
  { id: "payments", label: "Payments & Escrow", icon: DollarSign },
  { id: "reviews", label: "Reviews & Ratings", icon: Star },
  { id: "notifications", label: "Notifications & CMS", icon: Bell },
];

export function AdminLayout({
  children,
  currentSection,
  onSectionChange,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                <p className="text-cyan-100 text-xs">Admin Panel</p>
              </div>
            </div>
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
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/20">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
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