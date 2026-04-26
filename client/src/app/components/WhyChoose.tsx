import { motion } from "motion/react";
import { ShieldCheck, Star, IndianRupee, Clock, HeadphonesIcon, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description: "Every provider is background-checked, skill-verified, and onboarded only after a thorough review process.",
    color: "text-[#00B8A9]",
    bg: "bg-cyan-50",
  },
  {
    icon: Star,
    title: "Transparent Reviews",
    description: "Authentic ratings from real customers on every completed job. No fake reviews — only honest feedback.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "Escrow-Protected Payments",
    description: "Your payment is only released after you confirm the job is done right. Full protection, zero risk.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: IndianRupee,
    title: "Upfront Pricing",
    description: "No hidden charges or surprise fees. See the exact price before you confirm your booking.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    description: "Providers are accountable for punctuality. Late arrival triggers automatic notifications and support.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description: "Our support team is available around the clock to resolve any issue before, during, or after your booking.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full mb-4">
            Why HomeCare360
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Built for Your Peace of Mind
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We've built every feature around trust, safety, and quality — so you can focus on what matters
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-cyan-100 hover:shadow-sm transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
