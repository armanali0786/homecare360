import { motion } from "motion/react";
import {
  Search, MapPin, Star,
  ShieldCheck, IndianRupee, Clock,
  CheckCircle, Sparkles, Wrench, Zap, AirVent,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUICK_SERVICES = ["Cleaning", "Plumbing", "Electrician", "AC Repair", "Painting", "Carpentry"];

const TRUST_PILLARS = [
  { icon: ShieldCheck, label: "Verified pros"     },
  { icon: IndianRupee, label: "Fixed pricing"     },
  { icon: Clock,       label: "On-time guarantee" },
];

const STATS = [
  { value: "200+",    label: "Bookings done"         },
  { value: "4.8 / 5", label: "Average rating"        },
  { value: "10+",     label: "Verified professionals" },
];

const MOSAIC = [
  {
    src: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    alt: "Home Cleaning",
    icon: Sparkles,
    label: "Home Cleaning",
    price: "from ₹199",
  },
  {
    src: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Plumbing",
    icon: Wrench,
    label: "Plumbing",
    price: "from ₹299",
  },
  {
    src: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Electrical",
    icon: Zap,
    label: "Electrical",
    price: "from ₹349",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=600&auto=format&fit=crop",
    alt: "AC Service",
    icon: AirVent,
    label: "AC Service",
    price: "from ₹599",
  },
];

function ImageTile({
  item,
  className,
  delay = 0,
}: {
  item: (typeof MOSAIC)[number];
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-2xl overflow-hidden shadow-sm group ${className}`}
    >
      <ImageWithFallback
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
          <item.icon className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-white text-xs font-semibold leading-none">{item.label}</p>
          <p className="text-white/70 text-xs mt-0.5">{item.price}</p>
        </div>
      </div>
    </motion.div>
  );
}

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
    <section className="bg-gray-50 pt-20 pb-16 lg:pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: content ─────────────────────────── */}
          <div className="py-8 lg:py-16">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="flex gap-px">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                4.8 · Trusted by 200+ homeowners across India
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.07] tracking-tight mb-5"
            >
              Professional
              <br />
              home services,
              <br />
              <span className="text-[#00B8A9]">done right.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="text-base text-gray-500 mb-8 max-w-md leading-relaxed"
            >
              Verified professionals for cleaning, plumbing, electrical, AC repair,
              painting, and more — all in one place.
            </motion.p>

            {/* Search */}
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-2 flex flex-col sm:flex-row gap-2 mb-4"
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
              transition={{ duration: 0.4, delay: 0.27 }}
              className="flex flex-wrap gap-2 mb-9"
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

            {/* Trust + stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.33 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-5">
                {TRUST_PILLARS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-500">
                    <Icon className="w-4 h-4 text-[#00B8A9]" />
                    {label}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 max-w-xs divide-x divide-gray-200 border border-gray-200 rounded-2xl bg-white overflow-hidden">
                {STATS.map((stat) => (
                  <div key={stat.label} className="py-4 px-3 text-center">
                    <p className="text-lg font-bold text-gray-900 leading-none mb-1">{stat.value}</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Service photo mosaic ───────────── */}
          <div className="hidden lg:block relative self-stretch">
            <div className="relative h-[600px]">

              <div className="flex gap-3 h-full">
                {/* Left col: tall + shorter */}
                <div className="flex flex-col gap-3 w-[56%]">
                  <ImageTile item={MOSAIC[0]} className="flex-[2]" delay={0.35} />
                  <ImageTile item={MOSAIC[1]} className="flex-1" delay={0.45} />
                </div>
                {/* Right col: two equal */}
                <div className="flex flex-col gap-3 flex-1">
                  <ImageTile item={MOSAIC[2]} className="flex-1" delay={0.4} />
                  <ImageTile item={MOSAIC[3]} className="flex-1" delay={0.5} />
                </div>
              </div>

              {/* Floating: bookings count */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -left-6 top-[42%] bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#00B8A9]/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#00B8A9]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">200+</p>
                    <p className="text-xs text-gray-400">Jobs completed</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating: review */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.05 }}
                className="absolute -right-4 bottom-[14%] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-10 max-w-[200px]"
              >
                <div className="flex gap-px mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 font-medium leading-snug">
                  "Excellent service, on time and very professional!"
                </p>
                <p className="text-xs text-gray-400 mt-2">— Priya S., Bangalore</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
