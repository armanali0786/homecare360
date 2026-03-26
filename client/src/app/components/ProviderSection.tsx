import { motion } from "motion/react";
import { TrendingUp, Calendar, Star, Shield, DollarSign, Clock } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Platform Fee",
    description: "Only 15% per booking - lower than competitors",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    icon: Shield,
    title: "Verified Badge",
    description: "Stand out with our verification system",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    icon: Clock,
    title: "Quick Payouts",
    description: "Weekly direct deposits to your account",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const features = [
  { icon: TrendingUp, text: "Get more bookings and grow your revenue" },
  { icon: Calendar, text: "Manage your schedule and jobs easily" },
  { icon: Star, text: "Build your reputation with verified reviews" },
  { icon: Shield, text: "Secure payments with escrow protection" },
];

export function ProviderSection() {
  return (
    <section id="providers" className="py-20 bg-gradient-to-br from-cyan-600 to-emerald-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Grow Your Business with HomeCare360
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Join our network of professional service providers and connect with customers in your area.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-4 text-white"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Your Application
            </motion.button>
          </motion.div>

          {/* Right content - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Benefits for Providers
            </h3>

            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-white/80">
                      {benefit.description}
                    </p>
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
