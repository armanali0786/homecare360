import { motion } from "motion/react";
import { Search, MapPin } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import HeroImage from "./assets/hero-image.png";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-emerald-50 to-blue-50 -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Trusted Local{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent">
                  Service Providers
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with verified professionals for all your home service needs. Book, pay, and review - all in one place.
              </p>
            </motion.div>

            {/* Search bar */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 space-y-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-600 to-emerald-500 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                Search Services
              </button>
            </motion.div> */}
          </div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={HeroImage}
                alt="Professional service provider"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl p-4 max-w-[200px]"
            >
              {/* <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-emerald-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Verified</p>
                  <p className="text-sm text-gray-500">Professional</p>
                </div>
              </div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
