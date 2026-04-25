import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, LayoutDashboard, CalendarDays, ChevronDown, Briefcase } from "lucide-react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router";

export function ProfileMenu() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const isProvider = user?.role === "provider";
  const isSuperAdmin = user?.role === "superadmin";

  const roleBadgeColor = isAdmin
    ? "bg-purple-100 text-purple-700"
    : isProvider
    ? "bg-cyan-100 text-cyan-700"
    : "bg-gray-100 text-gray-600";

  const roleLabel = isSuperAdmin ? "Super Admin" : isAdmin ? "Admin" : isProvider ? "Provider" : "User";

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white hover:shadow-md transition-all"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
          {initials}
        </span>
        <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
          {user?.fullName || user?.email}
        </span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {/* User info */}
            <div className="p-4 bg-gradient-to-r from-[#E0F7F5] to-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] flex items-center justify-center text-white font-bold text-sm">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{user?.fullName || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${roleBadgeColor}`}>
                {roleLabel}
              </span>
            </div>

            {/* Role-specific links */}
            <div className="py-1">
              {/* Admin / Superadmin: Admin Dashboard + My Bookings (they can use the site too) */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#E0F7F5] hover:text-[#00B8A9] transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    <span className="text-sm font-medium">Admin Dashboard</span>
                  </Link>
                  <Link
                    to="/bookings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#E0F7F5] hover:text-[#00B8A9] transition-colors"
                  >
                    <CalendarDays size={16} />
                    <span className="text-sm font-medium">My Bookings</span>
                  </Link>
                </>
              )}

              {/* Provider: Provider Dashboard + My Bookings */}
              {isProvider && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#E0F7F5] hover:text-[#00B8A9] transition-colors"
                  >
                    <Briefcase size={16} />
                    <span className="text-sm font-medium">Provider Dashboard</span>
                  </Link>
                  <Link
                    to="/bookings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#E0F7F5] hover:text-[#00B8A9] transition-colors"
                  >
                    <CalendarDays size={16} />
                    <span className="text-sm font-medium">My Bookings</span>
                  </Link>
                </>
              )}

              {/* Regular user: My Bookings only */}
              {!isAdmin && !isProvider && (
                <Link
                  to="/bookings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#E0F7F5] hover:text-[#00B8A9] transition-colors"
                >
                  <CalendarDays size={16} />
                  <span className="text-sm font-medium">My Bookings</span>
                </Link>
              )}
            </div>

            <div className="border-t border-gray-100 py-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
