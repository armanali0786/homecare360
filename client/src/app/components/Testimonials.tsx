import { motion } from "motion/react";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    service: "House Cleaning",
    rating: 5,
    text: "Booked a deep cleaning service and it was absolutely seamless. The provider arrived on time, was professional, and my apartment looked brand new. Will definitely book again.",
    initials: "PS",
    color: "bg-cyan-600",
  },
  {
    name: "Rahul Mehta",
    location: "Bengaluru",
    service: "Electrical Repair",
    rating: 5,
    text: "Had a faulty wiring issue that needed urgent attention. Found a certified electrician within the hour. Work was done safely and the pricing was completely transparent.",
    initials: "RM",
    color: "bg-emerald-600",
  },
  {
    name: "Anjali Verma",
    location: "Delhi",
    service: "Plumbing",
    rating: 4,
    text: "Great experience overall. The plumber fixed a leaking pipe that two others couldn't. The escrow payment system gave me confidence the job would be done right.",
    initials: "AV",
    color: "bg-indigo-600",
  },
  {
    name: "Suresh Nair",
    location: "Chennai",
    service: "AC Service",
    rating: 5,
    text: "AC stopped working in peak summer. Booked a technician same afternoon — diagnosed and fixed within 2 hours. Competitive pricing and a real professional.",
    initials: "SN",
    color: "bg-amber-600",
  },
  {
    name: "Kavita Joshi",
    location: "Pune",
    service: "Painting",
    rating: 5,
    text: "Had my entire 3BHK painted in 3 days. The team was punctual, clean, and the finish quality exceeded my expectations.",
    initials: "KJ",
    color: "bg-rose-600",
  },
  {
    name: "Arjun Kapoor",
    location: "Hyderabad",
    service: "Carpentry",
    rating: 4,
    text: "Needed custom wardrobes installed. The carpenter understood the brief perfectly. Communication was smooth and the booking took under 5 minutes.",
    initials: "AK",
    color: "bg-blue-600",
  },
];

const STATS = [
  { value: "4.8★", label: "from 200+ reviews" },
  { value: "98%",  label: "on-time arrival rate"  },
  { value: "500+", label: "happy customers"   },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            What our customers say
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Over 200 verified reviews from homeowners across India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-9 h-9 ${review.color} rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.service} · {review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border border-gray-200 rounded-2xl bg-white overflow-hidden"
        >
          {STATS.map((stat) => (
            <div key={stat.value} className="py-7 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
