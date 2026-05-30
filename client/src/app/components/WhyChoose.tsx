import { motion } from "motion/react";
import { BadgeCheck, IndianRupee, Clock, CalendarX } from "lucide-react";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description: "All pros go through background checks and skill tests before they're listed on our platform.",
    iconClass: "text-[#00B8A9]",
    bgClass: "bg-cyan-50",
  },
  {
    icon: IndianRupee,
    title: "Fixed, Transparent Pricing",
    description: "No surprises. The price is shown upfront before you confirm — what you see is what you pay.",
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    description: "If your professional arrives late, you automatically get a discount applied to your booking.",
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
  },
  {
    icon: CalendarX,
    title: "Easy Rescheduling",
    description: "Cancel or reschedule up to 4 hours before your appointment at no charge.",
    iconClass: "text-purple-600",
    bgClass: "bg-purple-50",
  },
];

export function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Why HomeCare360?
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base max-w-xl">
            Every feature we've built is around trust, safety, and reliability — so you never have to worry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
            >
              <div className={`w-12 h-12 ${pillar.bgClass} rounded-xl flex items-center justify-center mb-5 flex-shrink-0`}>
                <pillar.icon className={`w-5.5 h-5.5 ${pillar.iconClass}`} style={{ width: "1.375rem", height: "1.375rem" }} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
