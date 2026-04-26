import { motion } from "motion/react";
import { Search, CalendarCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Search & Compare",
    description: "Browse verified providers in your area. Filter by service type, ratings, price, and availability to find your perfect match.",
    icon: Search,
    color: "from-[#00B8A9] to-cyan-500",
    bg: "bg-cyan-50",
    iconColor: "text-[#00B8A9]",
  },
  {
    number: "02",
    title: "Book & Schedule",
    description: "Choose a convenient time slot and confirm your booking instantly. Get a confirmation and reminders before the appointment.",
    icon: CalendarCheck,
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    number: "03",
    title: "Service & Pay Securely",
    description: "Your payment is held in escrow until the job is done to your satisfaction. Review the provider to help the community.",
    icon: ShieldCheck,
    color: "from-purple-500 to-indigo-500",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Get quality home services in three easy steps — no hassle, no hidden fees
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-5xl font-black text-gray-100 select-none leading-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 ${step.bg} rounded-xl flex items-center justify-center mb-5`}>
                <step.icon className={`w-7 h-7 ${step.iconColor}`} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>

              {/* Connector arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
