import { motion } from "motion/react";
import { Wrench, Zap, Sparkles, Paintbrush, AirVent, Bug, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    name: "Deep Home Cleaning",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkxODY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Full home scrub — kitchen, bathrooms, bedrooms & balcony. 2BHK in 4 hrs.",
    price: "₹1,199",
    badge: "Most Booked",
  },
  {
    name: "Plumbing Repair",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsJTIwd29ya3xlbnwxfHx8fDE3NjkxNTA5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Leaking taps, drain blockage, pipe bursts, flush repair. Same-day slots available.",
    price: "₹299",
    badge: null,
  },
  {
    name: "Electrical Work",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Switchboard repair, fan/light installation, wiring, MCB and DB work.",
    price: "₹349",
    badge: "Top Rated",
  },
  {
    name: "AC Service & Gas Refill",
    icon: AirVent,
    image: "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Deep coil cleaning, filter wash, gas top-up, cooling check. 1-ton split AC.",
    price: "₹599",
    badge: "Summer Deal",
  },
  {
    name: "Interior Painting",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkwODAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Wall putty + 2-coat premium emulsion. 1BHK (450 sq ft) in 2 days. Labour included.",
    price: "₹8,999",
    badge: null,
  },
  {
    name: "Pest Control",
    icon: Bug,
    image: "https://images.unsplash.com/photo-1632923057155-dd35366c9f48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Cockroach, ant, lizard & mosquito treatment. Odourless spray, safe for kids & pets.",
    price: "₹799",
    badge: null,
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular service packages
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Fixed prices, verified pros, slots available today
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#00B8A9] hover:text-[#2B5F5F] transition-colors whitespace-nowrap flex-shrink-0"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(service.name)}`)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {service.badge && (
                  <span className="absolute top-3 left-3 text-xs font-semibold bg-white text-gray-800 px-2.5 py-1 rounded-full shadow-sm">
                    {service.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                  <service.icon className="w-4 h-4 text-[#00B8A9]" />
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug">{service.name}</h3>
                  <span className="text-xs font-semibold text-[#00B8A9] whitespace-nowrap flex-shrink-0">
                    from {service.price}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#00B8A9] group-hover:gap-2 transition-all">
                  Book Now <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
