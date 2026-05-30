import { motion } from "motion/react";
import { Search, CalendarCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Choose a Service",
    description: "Search or browse categories. Filter by rating, price, and availability to find your match.",
    iconClass: "text-[#00B8A9]",
    bgClass: "bg-cyan-50",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Pick a Time",
    description: "Select a date and time slot that works for you. Get a confirmed booking instantly.",
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Get It Done",
    description: "A verified professional arrives on time. Pay only after you're satisfied with the work.",
    iconClass: "text-purple-600",
    bgClass: "bg-purple-50",
  },
];

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How it works
          </h2>
          <p className="text-gray-500 text-base">
            Book a verified professional in three steps — no calls, no guesswork, no hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
            >
              {/* Step number — large background */}
              <span className="absolute top-5 right-6 text-6xl font-black text-gray-100 select-none leading-none pointer-events-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className={`w-12 h-12 ${step.bgClass} rounded-xl flex items-center justify-center mb-5`}>
                <step.icon className={`w-6 h-6 ${step.iconClass}`} />
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>

              {/* Connector arrow (desktop) */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10"
        >
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 bg-[#00B8A9] text-white text-sm font-semibold px-7 py-3 rounded-xl hover:bg-[#009e96] transition-colors"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
