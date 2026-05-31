import { motion } from "motion/react";
import { Clock, Star, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  {
    badge: "Smart Home", badgeTone: "bg-[#00B8A9] text-white",
    cat: "Featured", title: "Smart Home Installation",
    price: "₹2,499", rating: 4.9, reviews: 64, duration: "3–5 hrs",
    desc: "Complete smart home ecosystem setup — lights, locks, cameras, and voice control.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    avatar: "AV",
  },
  {
    badge: "Top rated", badgeTone: "bg-amber-400 text-[#0d1f1f]",
    cat: "Gardening", title: "Expert Garden Architecture",
    price: "₹1,899", rating: 4.8, reviews: 43, duration: "Half day",
    desc: "Design and transform your outdoor space with seasonal plants and landscape design.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
    avatar: "RK",
  },
];

export function TrendingServices() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#0d1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">Trending this season</span>
          <h2 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            Curated for your home
          </h2>
          <p className="mt-3 max-w-lg text-white/50">
            The most sought-after services this season, handpicked for quality and value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onClick={() => navigate("/services")}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-xl cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <ImageWithFallback
                  src={it.img}
                  alt={it.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f1f]/80 via-[#0d1f1f]/20 to-transparent" />
                <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold ${it.badgeTone}`}>
                  {it.badge}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#0d1f1f] backdrop-blur">
                  {it.cat}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-white">{it.title}</h3>
                  <span className="whitespace-nowrap text-xl font-extrabold text-[#00B8A9]">{it.price}</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-white">{it.rating}</span> ({it.reviews})
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {it.duration}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{it.desc}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#00B8A9] text-[10px] font-bold text-[#0d1f1f]">
                      {it.avatar}
                    </span>
                    <span className="text-xs text-white/50">Verified pro</span>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-[#00B8A9] px-4 py-2 text-xs font-semibold text-[#0d1f1f] transition group-hover:bg-white">
                    Book now <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
