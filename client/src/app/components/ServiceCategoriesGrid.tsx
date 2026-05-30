import { motion } from "motion/react";
import {
  Sparkles, Wrench, Zap, AirVent, Paintbrush, Bug,
  Hammer, Settings, Truck, Scissors, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { name: "Cleaning",         icon: Sparkles,   price: "₹199", color: "#0891b2", bg: "#f0f9ff" },
  { name: "Plumbing",         icon: Wrench,     price: "₹299", color: "#2563eb", bg: "#eff6ff" },
  { name: "Electrician",      icon: Zap,        price: "₹349", color: "#d97706", bg: "#fffbeb" },
  { name: "AC Service",       icon: AirVent,    price: "₹299", color: "#7c3aed", bg: "#f5f3ff" },
  { name: "Painting",         icon: Paintbrush, price: "₹799", color: "#e11d48", bg: "#fff1f2" },
  { name: "Pest Control",     icon: Bug,        price: "₹499", color: "#16a34a", bg: "#f0fdf4" },
  { name: "Carpentry",        icon: Hammer,     price: "₹399", color: "#b45309", bg: "#fefce8" },
  { name: "Appliances",       icon: Settings,   price: "₹249", color: "#9333ea", bg: "#faf5ff" },
  { name: "Moving",           icon: Truck,      price: "₹999", color: "#ea580c", bg: "#fff7ed" },
  { name: "Beauty & Wellness",icon: Scissors,   price: "₹299", color: "#db2777", bg: "#fdf2f8" },
];

export function ServiceCategoriesGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What do you need?</h2>
            <p className="text-gray-500 mt-1.5 text-sm md:text-base">
              From quick fixes to full home makeovers — we've got you covered
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#00B8A9] hover:text-[#007a73] transition-colors flex-shrink-0"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-5 lg:grid-cols-10 gap-2">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(cat.name)}`)}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200 text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: cat.bg }}
              >
                <cat.icon className="w-7 h-7" style={{ color: cat.color }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-tight">{cat.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">from {cat.price}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile: 3-col grid */}
        <div className="grid grid-cols-3 gap-3 sm:hidden">
          {CATEGORIES.slice(0, 9).map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(cat.name)}`)}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-teal-50 transition-colors duration-200 text-center"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: cat.bg }}
              >
                <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight">{cat.name}</p>
            </motion.button>
          ))}
        </div>

        <div className="sm:hidden mt-5 text-center">
          <button
            onClick={() => navigate("/services")}
            className="text-sm font-medium text-[#00B8A9]"
          >
            View all services →
          </button>
        </div>
      </div>
    </section>
  );
}
