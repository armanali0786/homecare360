import { motion } from "motion/react";
import { Wrench, Zap, Sparkles, Trees, Paintbrush, Camera, AirVent } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "Plumbing",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsJTIwd29ya3xlbnwxfHx8fDE3NjkxNTA5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Electrical",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Cleaning",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkxODY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Outdoor Services",
    icon: Trees,
    image: "https://media.istockphoto.com/id/2197662613/photo/construction-worker-repairing-a-house-siding.jpg?s=1024x1024&w=is&k=20&c=FVus-jYKho667zG62I9OIPnej9OrL6tgOpwDgrCPScM=",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Painting",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkwODAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-red-500 to-pink-500",
  },
  {
    name: "AC & Appliance Repair",
    icon: AirVent,
    image: "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "from-indigo-500 to-purple-500",
  },
];

export function PopularServices() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName: string) => {
    // Navigate to services page + set ?service=Plumbing (or whatever name)
    navigate(`/services?service=${encodeURIComponent(serviceName)}`);
    // Alternative with createSearchParams (more flexible if you add more params later):
    // navigate({
    //   pathname: "/services",
    //   search: createSearchParams({ service: serviceName }).toString(),
    // });
  };
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Popular Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our most requested services and connect with top-rated professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleServiceClick(service.name)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div
                  className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">
                  Professional {service.name.toLowerCase()} services for your home
                </p>
                <button className="text-cyan-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Book Now
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
