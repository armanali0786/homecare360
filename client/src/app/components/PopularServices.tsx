import { motion } from "motion/react";
import { Star, ChevronRight, Clock } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    name: "Deep Home Cleaning",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    description: "Full home scrub — kitchen, bathrooms, bedrooms & balcony. 2BHK in 4 hrs.",
    price: "₹1,199",
    rating: 4.9,
    reviews: 128,
    badge: "Most Booked",
    badgeColor: "bg-teal-500",
    duration: "3–4 hrs",
  },
  {
    name: "Plumbing Repair",
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?q=80&w=800&auto=format&fit=crop",
    description: "Leaking taps, drain blockage, pipe bursts, flush repair. Same-day slots.",
    price: "₹299",
    rating: 4.8,
    reviews: 84,
    badge: null,
    badgeColor: "",
    duration: "1–2 hrs",
  },
  {
    name: "Electrical Work",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800&auto=format&fit=crop",
    description: "Switchboard repair, fan/light installation, wiring, MCB and DB work.",
    price: "₹349",
    rating: 4.9,
    reviews: 96,
    badge: "Top Rated",
    badgeColor: "bg-amber-500",
    duration: "1–3 hrs",
  },
  {
    name: "AC Service & Gas Refill",
    category: "AC Service",
    image: "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=800&auto=format&fit=crop",
    description: "Deep coil cleaning, filter wash, gas top-up, cooling check. 1-ton split AC.",
    price: "₹599",
    rating: 4.8,
    reviews: 72,
    badge: "Summer Deal",
    badgeColor: "bg-blue-500",
    duration: "1–2 hrs",
  },
  {
    name: "Interior Painting",
    category: "Painting",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=800&auto=format&fit=crop",
    description: "Wall putty + 2-coat premium emulsion. 1BHK (450 sq ft) in 2 days. Labour included.",
    price: "₹8,999",
    rating: 4.7,
    reviews: 58,
    badge: null,
    badgeColor: "",
    duration: "2–3 days",
  },
  {
    name: "Pest Control",
    category: "Pest Control",
    image: "https://images.unsplash.com/photo-1632923057155-dd35366c9f48?q=80&w=800&auto=format&fit=crop",
    description: "Cockroach, ant, lizard & mosquito treatment. Odourless spray, safe for kids & pets.",
    price: "₹799",
    rating: 4.8,
    reviews: 63,
    badge: null,
    badgeColor: "",
    duration: "1–2 hrs",
  },
];

export function PopularServices() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10"
        >
          <div>
            <p className="text-xs font-bold text-[#00B8A9] uppercase tracking-widest mb-2">Services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending right now</h2>
            <p className="text-gray-500 mt-1.5 text-sm md:text-base">
              Fixed prices, verified pros, same-day slots available
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#00B8A9] hover:text-[#007a73] transition-colors whitespace-nowrap flex-shrink-0"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(svc.name)}`)}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={svc.image}
                  alt={svc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

                {svc.badge && (
                  <span className={`absolute top-3 left-3 text-[11px] font-bold text-white px-2.5 py-1 rounded-full ${svc.badgeColor}`}>
                    {svc.badge}
                  </span>
                )}

                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-full">
                  {svc.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug">{svc.name}</h3>
                  <span className="text-sm font-bold text-[#00B8A9] whitespace-nowrap flex-shrink-0">
                    {svc.price}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">{svc.rating}</span>
                    <span className="text-xs text-gray-400">({svc.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {svc.duration}
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{svc.description}</p>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00B8A9] group-hover:gap-2 transition-all">
                    Book Now <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">Verified Pro</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
