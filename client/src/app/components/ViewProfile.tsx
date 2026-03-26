import { motion } from "motion/react";
import { ArrowLeft, Star, MapPin, CheckCircle2, Calendar, DollarSign, Clock } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate, useParams } from "react-router-dom";

interface ViewProfileProps {
  providerId: string;
  onBack: () => void;
  onBookNow: () => void;
}

const providerData = {
  name: "Sarah Williams",
  service: "Electrical",
  image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  rating: 5.0,
  reviews: 89,
  distance: "2.5 miles away",
  jobsCompleted: 266,
  availability: "Available Tomorrow",
  hourlyRate: 95,
  minimumBooking: "2 hours",
  responseTime: "Within 1 hour",
  startingFrom: 190,
  about: "Certified electrician offering residential and commercial electrical services. Expert in smart home installations.",
  experience: "12 years",
  location: "Midtown",
  specializations: [
    { name: "Wiring & Rewiring", icon: "⚡" },
    { name: "Panel Upgrades", icon: "🔌" },
    { name: "Smart Home Installation", icon: "🏠" },
    { name: "LED Lighting", icon: "💡" },
  ],
  portfolio: [
    {
      title: "Smart Home Lighting System",
      description: "Complete smart lighting installation with app control",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    },
    {
      title: "Panel Upgrade Project",
      description: "200A electrical panel upgrade for modern home",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
    },
  ],
  certifications: [
    { name: "Licensed Electrician", organization: "State Electrical Board", year: "2012" },
    { name: "Smart Home Professional", organization: "CEDIA", year: "2021" },
  ],
  reviewsData: {
    average: 5.0,
    total: 89,
    breakdown: [
      { stars: 5, count: 82 },
      { stars: 4, count: 5 },
      { stars: 3, count: 2 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  },
  recentReviews: [
    {
      name: "Mark Thompson",
      date: "11/20/2024",
      rating: 5,
      comment: "Sarah installed our entire smart home lighting system. Incredibly knowledgeable and delicate with all our questions!",
      verified: true,
    },
    {
      name: "Amanda Rodriguez",
      date: "11/12/2024",
      rating: 5,
      comment: "Great service, we are very pleased with. Tread our panel repairs and upgraded our wiring. Will definitely use again.",
      verified: true,
    },
  ],
};

export function ViewProfile() {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookNow = () => {
    navigate("/bookings");
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-12 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Results</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={providerData.image}
                    alt={providerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                          {providerData.name}
                        </h1>
                        <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-cyan-600 font-medium text-lg mb-3">{providerData.service}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{providerData.rating}</span>
                      <span className="text-gray-600">({providerData.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{providerData.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{providerData.jobsCompleted} jobs completed</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{providerData.availability}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{providerData.about}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="font-semibold text-gray-900">{providerData.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">{providerData.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Specializations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specializations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providerData.specializations.map((spec, index) => (
                  <motion.div
                    key={spec.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                      {spec.icon}
                    </div>
                    <span className="font-medium text-gray-900">{spec.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {providerData.portfolio.map((item, index) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="rounded-xl overflow-hidden mb-3 shadow-lg">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Certifications & Licenses</h2>
              <div className="space-y-4">
                {providerData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl"
                  >
                    <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.organization}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{cert.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>

              {/* Rating Summary */}
              <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {providerData.reviewsData.average}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{providerData.reviewsData.total} reviews</p>
                </div>

                <div className="flex-1">
                  {providerData.reviewsData.breakdown.map((item) => (
                    <div key={item.stars} className="flex items-center gap-4 mb-2">
                      <span className="text-sm text-gray-600 w-12">{item.stars} star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                          style={{
                            width: `${(item.count / providerData.reviewsData.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="space-y-6">
                {providerData.recentReviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="pb-6 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          {review.verified && (
                            <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book This Service</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="font-bold text-gray-900">${providerData.hourlyRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Minimum Booking</span>
                  <span className="font-medium text-gray-900">{providerData?.minimumBooking}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium text-gray-900">{providerData.responseTime}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Starting from</span>
                  <span className="text-2xl font-bold text-gray-900">${providerData.startingFrom}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-cyan-600 to-emerald-500 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
              >
                Book Now
              </motion.button>

              <button className="w-full border-2 border-cyan-600 text-cyan-600 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors">
                Send Message
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
