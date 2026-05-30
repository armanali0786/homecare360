import { motion } from "motion/react";
import { Search, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUICK_SERVICES = ["Cleaning", "Plumbing", "Electrician", "AC Repair", "Painting", "Carpentry"];

const STATS = [
  { value: "1,00,000+", label: "Bookings done" },
  { value: "4.8★", label: "Average rating" },
  { value: "500+", label: "Verified pros" },
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
    <section className="bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-7"
        >
          <div className="flex gap-px">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            4.8 · Trusted by 1,00,000+ homeowners across India
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4"
        >
          Home services,{" "}
          <span className="text-[#00B8A9]">done right.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg text-gray-500 mb-9 max-w-xl mx-auto leading-relaxed"
        >
          Verified professionals for cleaning, plumbing, electrical, AC repair, and more.
          Transparent pricing. Guaranteed quality.
        </motion.p>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-2 flex flex-col sm:flex-row gap-2 mb-5"
        >
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              placeholder="What service do you need?"
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Your city or area"
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-[#00B8A9] text-white text-sm font-semibold rounded-xl hover:bg-[#009e96] transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </motion.form>

        {/* Quick chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <span className="text-xs text-gray-400 self-center font-medium">Popular:</span>
          {QUICK_SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => navigate(`/services?service=${encodeURIComponent(s)}`)}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#00B8A9] hover:text-[#00B8A9] transition-colors"
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          className="grid grid-cols-3 max-w-sm mx-auto divide-x divide-gray-200 border border-gray-200 rounded-2xl bg-white overflow-hidden"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="py-5 px-3 text-center">
              <p className="text-xl font-bold text-gray-900 leading-none mb-1.5">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
