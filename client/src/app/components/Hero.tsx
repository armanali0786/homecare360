import { motion } from "motion/react";
import { Search, MapPin, Star, Users, CheckCircle, Award } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import HeroImage from "./assets/hero-image.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: Users, value: "50+", label: "Verified Providers" },
  { icon: CheckCircle, value: "1K+", label: "Jobs Completed" },
  { icon: Star, value: "3.8", label: "Average Rating" },
  { icon: Award, value: "5+", label: "Cities Covered" },
];

export function Hero() {
  const [serviceInput, setServiceInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (serviceInput) params.set("service", serviceInput);
    if (locationInput) params.set("location", locationInput);
    navigate(`/services?${params.toString()}`);
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 -z-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-medium px-4 py-2 rounded-full mb-6"
            >
              <Star className="w-4 h-4 fill-cyan-500 text-cyan-500" />
              Trusted by 1000+ homeowners across India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight tracking-tight"
            >
              Find Trusted Home{" "}
              <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">
                Service Experts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg"
            >
              Book verified professionals for plumbing, electrical, cleaning, and more. Transparent pricing, secure payments, guaranteed quality.
            </motion.p>

            {/* Search bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col sm:flex-row gap-2"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="What service do you need?"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter your city"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Search
              </button>
            </motion.form>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 mt-4"
            >
              <span className="text-sm text-gray-400">Popular:</span>
              {["Plumbing", "Electrical", "Cleaning", "AC Repair"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => navigate(`/services?service=${encodeURIComponent(s)}`)}
                  className="text-sm text-[#00B8A9] hover:text-[#2B5F5F] bg-cyan-50 hover:bg-cyan-100 px-3 py-1 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={HeroImage}
                alt="Professional service provider"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-6 top-1/3 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Background Verified</p>
                  <p className="text-xs text-gray-500">All providers checked</p>
                </div>
              </div>
            </motion.div>

            {/* Floating rating */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -right-4 bottom-16 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">4.8 / 5.0</p>
                  <p className="text-xs text-gray-500">2,400+ reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-[#00B8A9]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
