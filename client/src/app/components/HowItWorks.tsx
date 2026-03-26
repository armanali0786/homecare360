import { motion } from "motion/react";
import { Search, Calendar, CreditCard } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Search & Compare",
    description: "Browse verified service providers in your area. Compare ratings, reviews, and prices.",
    icon: Search,
    color: "from-cyan-600 to-blue-600",
  },
  {
    number: "2",
    title: "Book & Schedule",
    description: "Choose your preferred time slot and book instantly. Get automatic reminders.",
    icon: Calendar,
    color: "from-emerald-600 to-green-600",
  },
  {
    number: "3",
    title: "Pay & Review",
    description: "Secure payment after service completion. Leave a review to help others.",
    icon: CreditCard,
    color: "from-purple-600 to-pink-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connector line - hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-200 via-emerald-200 to-purple-200 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Number badge */}
                <div className="absolute top-0 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-cyan-500 z-20">
                  <span className="text-cyan-600 font-bold">{step.number}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
