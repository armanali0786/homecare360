import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    service: "House Cleaning",
    rating: 5,
    text: "Booked a deep cleaning and it was absolutely seamless. The professional arrived on time and my apartment looked brand new. Will definitely book again!",
    initials: "PS",
    avatarBg: "#0891b2",
  },
  {
    name: "Rahul Mehta",
    location: "Bengaluru",
    service: "Electrical Repair",
    rating: 5,
    text: "Found a certified electrician within an hour for a faulty wiring issue. Work done safely and pricing was completely transparent — no surprises at all.",
    initials: "RM",
    avatarBg: "#16a34a",
  },
  {
    name: "Anjali Verma",
    location: "Delhi",
    service: "Plumbing",
    rating: 4,
    text: "The plumber fixed a leaking pipe that two others couldn't. The escrow payment system gave me real confidence the job would be done right.",
    initials: "AV",
    avatarBg: "#7c3aed",
  },
  {
    name: "Suresh Nair",
    location: "Chennai",
    service: "AC Service",
    rating: 5,
    text: "AC stopped working in peak summer. Booked a technician the same afternoon — diagnosed and fixed within 2 hours. Competitive pricing and truly professional.",
    initials: "SN",
    avatarBg: "#d97706",
  },
  {
    name: "Kavita Joshi",
    location: "Pune",
    service: "Painting",
    rating: 5,
    text: "Had my entire 3BHK painted in 3 days. The team was punctual, clean, and the finish quality genuinely exceeded my expectations.",
    initials: "KJ",
    avatarBg: "#e11d48",
  },
  {
    name: "Arjun Kapoor",
    location: "Hyderabad",
    service: "Carpentry",
    rating: 4,
    text: "Needed custom wardrobes installed. The carpenter understood the brief perfectly and communication was smooth. Booking took under 5 minutes.",
    initials: "AK",
    avatarBg: "#2563eb",
  },
];

export function Testimonials() {
  const avgRating = "4.9";
  const totalReviews = "200+";

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with aggregate rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs font-bold text-[#00B8A9] uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Customers love us
            </h2>
            <p className="text-gray-500 mt-1.5 text-sm md:text-base">
              Over {totalReviews} verified reviews from homeowners across India
            </p>
          </div>

          {/* Aggregate badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-gray-900 leading-none">{avgRating}</p>
              <div className="flex gap-px mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              </div>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div>
              <p className="text-sm font-semibold text-gray-700">{totalReviews} reviews</p>
              <p className="text-xs text-gray-400">Verified customers</p>
            </div>
          </div>
        </motion.div>

        {/* Review grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Top: quote icon + stars */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${j < r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gray-100 fill-gray-100" />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                "{r.text}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: r.avatarBg }}
                >
                  {r.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{r.name}</p>
                  <p className="text-xs text-gray-400 truncate">{r.service} · {r.location}</p>
                </div>
                <span className="ml-auto flex-shrink-0 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
