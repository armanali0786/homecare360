import { motion } from "motion/react";
import { Wrench, Zap, Sparkles, Trees, Paintbrush, AirVent, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "Plumbing",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsJTIwd29ya3xlbnwxfHx8fDE3NjkxNTA5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Leaks, pipe repairs, drain cleaning & more",
    startingFrom: "₹299",
    badge: "Most Booked",
    badgeColor: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "Electrical",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Wiring, switchboards, fitting installation",
    startingFrom: "₹349",
    badge: "Top Rated",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "House Cleaning",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkxODY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Deep clean, regular housekeeping & sofa cleaning",
    startingFrom: "₹199",
    badge: "Best Value",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Outdoor Services",
    icon: Trees,
    image: "https://media.istockphoto.com/id/2197662613/photo/construction-worker-repairing-a-house-siding.jpg?s=1024x1024&w=is&k=20&c=FVus-jYKho667zG62I9OIPnej9OrL6tgOpwDgrCPScM=",
    description: "Landscaping, painting, waterproofing & more",
    startingFrom: "₹499",
    badge: null,
    badgeColor: "",
  },
  {
    name: "Painting",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkwODAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Interior, exterior & texture painting",
    startingFrom: "₹799",
    badge: null,
    badgeColor: "",
  },
  {
    name: "AC & Appliance Repair",
    icon: AirVent,
    image: "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "AC service, washing machine, refrigerator repair",
    startingFrom: "₹249",
    badge: "Quick Fix",
    badgeColor: "bg-purple-100 text-purple-700",
  },
];

export function PopularServices() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full mb-3">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Popular Services
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl">
              Browse our most requested categories and connect with top-rated professionals in your city
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-1.5 text-[#00B8A9] font-medium hover:text-[#2B5F5F] transition-colors whitespace-nowrap"
          >
            View all services <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(service.name)}`)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {service.badge && (
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3">
                  <div className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow">
                    <service.icon className="w-4 h-4 text-[#00B8A9]" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-semibold text-gray-900">{service.name}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap">from {service.startingFrom}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-[#00B8A9] group-hover:gap-2.5 transition-all">
                  Book Now <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
