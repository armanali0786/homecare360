import { motion } from "motion/react";
import { TrendingUp, Calendar, Star, Shield, IndianRupee, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: TrendingUp, text: "Grow your bookings and monthly revenue" },
  { icon: Calendar,   text: "Full control over your schedule and availability" },
  { icon: Star,       text: "Build a verified reputation with customer reviews" },
  { icon: Shield,     text: "Payments protected by escrow — always get paid" },
];

const BENEFITS = [
  {
    icon: IndianRupee,
    title: "Low 15% Platform Fee",
    description: "Keep more of what you earn — lower than any competitor",
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-100",
  },
  {
    icon: Shield,
    title: "Verified Pro Badge",
    description: "Stand out with our trust verification system",
    iconClass: "text-cyan-100",
    bgClass: "bg-white/20",
  },
  {
    icon: Clock,
    title: "Fast Weekly Payouts",
    description: "Direct bank transfer every week, no delays",
    iconClass: "text-purple-200",
    bgClass: "bg-white/20",
  },
];

export function ProviderSection() {
  const navigate = useNavigate();

  return (
    <section id="providers" className="py-20 bg-[#00B8A9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 text-sm font-medium uppercase tracking-wide mb-4">
              For Service Providers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Grow your business with HomeCare360
            </h2>
            <p className="text-white/80 text-base mb-8 max-w-md leading-relaxed">
              Join our network of verified professionals. Get discovered, get booked, and get paid faster — with tools built for independent pros.
            </p>

            <ul className="space-y-3 mb-10">
              {FEATURES.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/become-provider")}
              className="inline-flex items-center gap-2 bg-white text-[#00B8A9] px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Join as a Pro <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right — benefit cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-5">
              Provider Benefits
            </p>

            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/10 border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${benefit.bgClass} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <benefit.icon className={`w-5 h-5 ${benefit.iconClass}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-0.5">{benefit.title}</h4>
                    <p className="text-xs text-white/65">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
