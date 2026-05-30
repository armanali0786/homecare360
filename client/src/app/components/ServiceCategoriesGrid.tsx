import { motion } from "motion/react";
import {
  Sparkles, Wrench, Zap, AirVent, Paintbrush, Bug,
  Hammer, Settings, Truck, Scissors, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { name: "Home Cleaning",    icon: Sparkles,   price: "₹199", iconClass: "text-[#00B8A9]",  bgClass: "bg-cyan-50"   },
  { name: "Plumbing",         icon: Wrench,     price: "₹299", iconClass: "text-blue-600",   bgClass: "bg-blue-50"   },
  { name: "Electrician",      icon: Zap,        price: "₹349", iconClass: "text-yellow-600", bgClass: "bg-yellow-50" },
  { name: "AC Service",       icon: AirVent,    price: "₹299", iconClass: "text-indigo-600", bgClass: "bg-indigo-50" },
  { name: "Painting",         icon: Paintbrush, price: "₹799", iconClass: "text-rose-500",   bgClass: "bg-rose-50"   },
  { name: "Pest Control",     icon: Bug,        price: "₹499", iconClass: "text-green-600",  bgClass: "bg-green-50"  },
  { name: "Carpentry",        icon: Hammer,     price: "₹399", iconClass: "text-amber-600",  bgClass: "bg-amber-50"  },
  { name: "Appliance Repair", icon: Settings,   price: "₹249", iconClass: "text-purple-600", bgClass: "bg-purple-50" },
  { name: "Shifting & Moving",icon: Truck,      price: "₹999", iconClass: "text-orange-600", bgClass: "bg-orange-50" },
  { name: "Beauty & Wellness",icon: Scissors,   price: "₹299", iconClass: "text-pink-600",   bgClass: "bg-pink-50"   },
];

export function ServiceCategoriesGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              What do you need help with?
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Browse all categories — quick fixes to complete makeovers
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#00B8A9] hover:text-[#2B5F5F] transition-colors whitespace-nowrap flex-shrink-0"
          >
            View all services <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, index) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -2 }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(cat.name)}`)}
              className="group bg-white rounded-2xl p-5 flex flex-col items-center gap-3 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className={`w-13 h-13 rounded-xl ${cat.bgClass} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
                style={{ width: "3.25rem", height: "3.25rem" }}>
                <cat.icon className={`w-6 h-6 ${cat.iconClass}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">{cat.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">from {cat.price}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
