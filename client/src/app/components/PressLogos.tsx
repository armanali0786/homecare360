import { motion } from "motion/react";

const LOGOS = [
  { name: "App Store" },
  { name: "Google Play" },
  { name: "YourStory" },
  { name: "Inc42" },
  { name: "Forbes India" },
  { name: "TechCrunch" },
];

export function PressLogos() {
  return (
    <section className="py-10 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-7"
        >
          As seen in &amp; trusted by
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {LOGOS.map((logo, index) => (
            <motion.span
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="text-gray-300 hover:text-gray-400 transition-colors font-bold text-base tracking-tight select-none cursor-default"
            >
              {logo.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
