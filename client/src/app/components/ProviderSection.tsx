import { motion } from "motion/react";
import { TrendingUp, Calendar, Star, Shield, IndianRupee, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    icon: IndianRupee,
    title: "Low 15% Platform Fee",
    description: "Keep more of what you earn — lower than any competitor",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: Shield,
    title: "Verified Badge",
    description: "Stand out with our trust verification system",
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    icon: Clock,
    title: "Fast Weekly Payouts",
    description: "Direct bank transfer every week, no delays",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

const features = [
  { icon: TrendingUp, text: "Grow your bookings and monthly revenue" },
  { icon: Calendar, text: "Full control over your schedule and availability" },
  { icon: Star, text: "Build a verified reputation with customer reviews" },
  { icon: Shield, text: "Payments protected by escrow — always get paid" },
];

export function ProviderSection() {
  const navigate = useNavigate();

  return (
    <section id="providers" className="py-20 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-semibold text-white/70 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
              For Service Providers
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Grow Your Business with HomeCare360
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Join our network of professional service providers. Get verified, reach more customers, and get paid faster.
            </p>

            <div className="space-y-3 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => navigate("/become-provider")}
              className="inline-flex items-center gap-2 bg-white text-[#00B8A9] px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300"
            >
              Start Your Application <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right content — Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Provider Benefits</h3>

            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 ${benefit.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-0.5">{benefit.title}</h4>
                    <p className="text-sm text-white/70">{benefit.description}</p>
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
