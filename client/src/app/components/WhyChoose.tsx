import { motion } from "motion/react";
import { Shield, Star, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All service providers undergo background checks and verification to ensure quality and safety.",
    color: "from-cyan-600 to-blue-600",
  },
  {
    icon: Star,
    title: "Transparent Reviews",
    description: "Read authentic reviews from real customers to make informed decisions.",
    color: "from-emerald-600 to-green-600",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Escrow payment system ensures your money is safe until the job is completed.",
    color: "from-purple-600 to-pink-600",
  },
];

export function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose HomeCare360
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for all home service needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
