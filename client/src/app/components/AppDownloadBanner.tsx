import { motion } from "motion/react";
import { Star } from "lucide-react";

export function AppDownloadBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
        >
          {/* Text */}
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Mobile App — Coming Soon
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Book services on the go
            </h2>
            <p className="text-gray-400 text-sm mb-7 max-w-sm leading-relaxed">
              Instant confirmations, live provider tracking, and 24/7 support — all from your phone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* App Store */}
              <a
                href="#"
                aria-label="Download on App Store"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-500 leading-none">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.35.18.75.2 1.13.04L14.84 12 4.31.2C3.93.04 3.53.06 3.18.24 2.5.6 2.5 1.78 2.5 1.78v20.44s0 1.18.68 1.54zM16.34 13.5l2.72 2.72-9.74 5.53zm-6.97-3.03L5.84 6.94l9.87 5.6-6.34 3.59V10.47zm7.37-2.09L14.38 12l2.27 2.27 3.15-1.79a1.5 1.5 0 000-2.64z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-500 leading-none">Get it on</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Rating card */}
          <div className="flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="flex justify-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-4xl font-bold text-white leading-none mb-1">4.8</p>
              <p className="text-sm text-gray-400 mt-2">App Rating</p>
              <p className="text-xs text-gray-500">12,000+ ratings</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
