import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const live = [
  {
    name: "Bangalore",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80",
    services: 5, pros: 8,
  },
  {
    name: "Mumbai",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",
    services: 8, pros: 10,
  },
  {
    name: "Delhi NCR",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
    services: 9, pros: 14,
  },
  {
    name: "Hyderabad",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    services: 5, pros: 4,
  },
  {
    name: "Ahmedabad",
    img: "https://images.unsplash.com/photo-1597056978991-01b7a0c80b54?w=600&q=80",
    services: 3, pros: 2,
  },
  {
    name: "Pune",
    img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&q=80",
    services: 8, pros: 9,
  },
];

const soon = ["Kolkata", "Jaipur", "Chandigarh", "Surat"];

export function CityAvailability() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">Now available in</span>
            <h2 className="mt-3 text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
              Live across India.
            </h2>
            <p className="mt-3 text-gray-500">6 cities live, more launching soon.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {live.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <ImageWithFallback
                src={c.img}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1f] via-[#0d1f1f]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#00B8A9]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00B8A9] animate-pulse" /> Live
                </div>
                <h3 className="mt-1 text-xl font-bold">{c.name}</h3>
                <p className="text-xs text-white/60">{c.services} services · {c.pros} pros</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-400">Launching soon:</span>
          {soon.map(s => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed bg-white px-3.5 py-1.5 text-xs text-gray-400"
            >
              <MapPin className="h-3 w-3" /> {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
