import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, MapPin, Star, Shield, Clock,
  CheckCircle, ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

const QUICK = [
  { label: "Home Cleaning", emoji: "🧹" },
  { label: "Plumbing",      emoji: "🔧" },
  { label: "Electrician",   emoji: "⚡" },
  { label: "AC Repair",     emoji: "❄️" },
  { label: "Painting",      emoji: "🖌️" },
  { label: "Pest Control",  emoji: "🐜" },
];

const CITIES = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune"];

export function Hero() {
  const [city, setCity]             = useState("Bangalore");
  const [showCities, setShowCities] = useState(false);
  const [query, setQuery]           = useState("");
  const navigate                    = useNavigate();
  const dropdownRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCities(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (query) p.set("service", query);
    p.set("location", city);
    navigate(`/services?${p.toString()}`);
  };

  return (
    <section className="bg-white pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[58%_42%] items-end min-h-[600px] max-h-[700px]">

          {/* ── Left ── */}
          <div className="py-12 lg:py-16 space-y-6 self-center pr-0 lg:pr-8">

            {/* City selector */}
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowCities(v => !v)}
                className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-100 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {city}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCities ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showCities && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-1.5 left-0 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-20 min-w-[160px]"
                  >
                    {CITIES.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setCity(c); setShowCities(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${c === city ? "font-semibold text-teal-600" : "text-gray-700"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-[3.25rem] lg:text-[3.6rem] font-bold text-gray-900 leading-[1.07] tracking-tight">
                Expert home services,<br />
                <span className="text-[#00B8A9]">on your schedule</span>
              </h1>
              <p className="mt-4 text-lg text-gray-500 max-w-[460px] leading-relaxed">
                Background-verified professionals for cleaning, plumbing, electrical, AC repair, and more — all at your doorstep.
              </p>
            </motion.div>

            {/* Search */}
            <motion.form
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSearch}
              className="flex bg-white rounded-2xl shadow-[0_4px_28px_rgba(0,0,0,0.10)] border border-gray-100 p-1.5 gap-1 max-w-[520px]"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search for a service..."
                  className="w-full text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#00B8A9] hover:bg-[#009e96] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </motion.form>

            {/* Quick chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              <span className="text-xs font-medium text-gray-400 self-center">Popular:</span>
              {QUICK.map(s => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => navigate(`/services?service=${encodeURIComponent(s.label)}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-colors"
                >
                  <span>{s.emoji}</span>{s.label}
                </button>
              ))}
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center gap-5 pt-1"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex gap-px">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-sm font-semibold text-gray-800">4.9</span>
                <span className="text-sm text-gray-400">(200+ reviews)</span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-[#00B8A9]" />
                Verified Pros
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#00B8A9]" />
                  Same-day booking
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: professional image ── */}
          <div className="hidden lg:flex items-end h-[600px] relative">
            <div className="w-full h-full rounded-t-[2rem] overflow-hidden relative bg-teal-50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
                alt="Professional home service"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/25 via-transparent to-transparent" />
            </div>

            {/* Floating: booking confirmed */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="absolute -left-5 top-[38%] bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3.5 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#00B8A9]" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Booking confirmed</p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">Today at 3:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Floating: review */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="absolute right-2 bottom-14 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-10 max-w-[186px]"
            >
              <div className="flex gap-0.5 mb-1.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-snug">"Arrived on time, great work!"</p>
              <p className="text-[11px] text-gray-400 mt-1.5">— Priya S., Bangalore</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
