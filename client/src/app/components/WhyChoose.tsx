import { motion } from "motion/react";
import { BadgeCheck, IndianRupee, Clock, CalendarX } from "lucide-react";

const STATS = [
  { value: "4.9★",  label: "Customer rating",         sub: "from 200+ verified reviews"    },
  { value: "200+",  label: "Bookings completed",       sub: "across 6 cities in India"       },
  { value: "98%",   label: "On-time arrival",          sub: "or you get a discount"          },
  { value: "10+",   label: "Verified professionals",   sub: "background-checked & skill-tested" },
];

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description: "All pros go through background checks and skill tests before being listed on our platform.",
    color: "#00B8A9",
    bg: "#f0fdfa",
  },
  {
    icon: IndianRupee,
    title: "Fixed, Transparent Pricing",
    description: "No surprises. The price is shown upfront before you confirm — what you see is what you pay.",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    description: "If your professional arrives late, you automatically get a discount applied to your booking.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: CalendarX,
    title: "Easy Rescheduling",
    description: "Cancel or reschedule up to 4 hours before your appointment at absolutely no charge.",
    color: "#9333ea",
    bg: "#faf5ff",
  },
];

export function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center py-6 px-4 rounded-2xl bg-gray-50 border border-gray-100"
            >
              <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-none mb-1.5">
                {s.value}
              </p>
              <p className="text-sm font-semibold text-gray-700">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why choose header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-10"
        >
          <p className="text-xs font-bold text-[#00B8A9] uppercase tracking-widest mb-2">Why HomeCare360</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Every feature built around trust
          </h2>
          <p className="text-gray-500 text-base">
            Safety and reliability aren't features — they're our baseline.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                style={{ backgroundColor: p.bg }}
              >
                <p.icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
