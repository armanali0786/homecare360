import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    service: "House Cleaning",
    rating: 5,
    text: "Booked a deep cleaning service through HomeCare360 and it was absolutely seamless. The provider arrived on time, was professional, and my apartment looked brand new. Will definitely book again.",
    avatar: "PS",
    color: "from-cyan-500 to-teal-500",
  },
  {
    name: "Rahul Mehta",
    location: "Bengaluru",
    service: "Electrical Repair",
    rating: 5,
    text: "Had a faulty wiring issue that needed urgent attention. Found a certified electrician within the hour. Work was done safely and the pricing was completely transparent — no surprises.",
    avatar: "RM",
    color: "from-emerald-500 to-green-500",
  },
  {
    name: "Anjali Verma",
    location: "Delhi",
    service: "Plumbing",
    rating: 4,
    text: "Great experience overall. The plumber was knowledgeable and fixed a leaking pipe that two other plumbers couldn't. The escrow payment system gave me confidence the job would be done right.",
    avatar: "AV",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Suresh Nair",
    location: "Chennai",
    service: "AC Service",
    rating: 5,
    text: "AC stopped working in peak summer — booked a technician same afternoon through HomeCare360. Diagnosed and fixed within 2 hours. Competitive pricing and a real professional.",
    avatar: "SN",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Kavita Joshi",
    location: "Pune",
    service: "Painting",
    rating: 5,
    text: "Had my entire 3BHK painted in 3 days. The team was punctual, clean, and the finish quality exceeded my expectations. The review system makes it easy to trust providers.",
    avatar: "KJ",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Arjun Kapoor",
    location: "Hyderabad",
    service: "Carpentry",
    rating: 4,
    text: "Needed custom wardrobes installed. The carpenter understood the brief perfectly. Communication through the platform was smooth and the booking process took under 5 minutes.",
    avatar: "AK",
    color: "from-blue-500 to-cyan-500",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Over 2,400 verified reviews from homeowners across India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-cyan-200" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.service} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
