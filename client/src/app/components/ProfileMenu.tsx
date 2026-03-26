import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";

export function ProfileMenu() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-[#00B8A9] flex items-center justify-center text-white"
      >
        <User size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border"
          >
            <div className="p-4 border-b">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-gray-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}