import { motion } from "motion/react";

const CITIES = [
  { name: "Bangalore",   active: true  },
  { name: "Hyderabad",   active: true  },
  { name: "Chennai",     active: true  },
  { name: "Pune",        active: true  },
  { name: "Mumbai",      active: true  },
  { name: "Delhi NCR",   active: true  },
  { name: "Kolkata",     active: false },
  { name: "Ahmedabad",   active: false },
  { name: "Jaipur",      active: false },
  { name: "Kochi",       active: false },
  { name: "Chandigarh",  active: false },
  { name: "Surat",       active: false },
];

export function CityAvailability() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Now available in
          </h2>
          <p className="text-gray-500 mt-1.5 text-sm">
            Live across 6 cities — more launching soon
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2.5"
        >
          {CITIES.map((city, index) => (
            <motion.span
              key={city.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
                city.active
                  ? "bg-white border-gray-200 text-gray-700"
                  : "bg-gray-100 border-transparent text-gray-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  city.active ? "bg-[#00B8A9]" : "bg-gray-300"
                }`}
              />
              {city.name}
              {!city.active && (
                <span className="text-xs text-gray-400 font-normal">Soon</span>
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
