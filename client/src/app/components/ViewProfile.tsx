import { motion } from "motion/react";
import { ArrowLeft, Star, MapPin, CheckCircle2, Calendar } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProviderById, createBooking } from "@/app/lib/api";
import { toast } from "react-toastify";

export function ViewProfile() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingLocation, setBookingLocation] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!providerId) return;
    setLoading(true);
    getProviderById(providerId)
      .then((data) => setProvider(data.provider))
      .catch(() => setProvider(null))
      .finally(() => setLoading(false));
  }, [providerId]);

  const handleBookNow = async () => {
    if (!bookingDate) { toast.error("Please select a date"); return; }
    if (!bookingLocation) { toast.error("Please enter your location"); return; }
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please login to book a service"); navigate("/login"); return; }
    setBooking(true);
    try {
      await createBooking({
        providerId: provider._id,
        serviceCategory: provider.serviceCategory,
        date: bookingDate,
        time: bookingTime,
        location: bookingLocation,
        totalAmount: provider.hourlyRate * 2,
      });
      toast.success("Booking created successfully!");
      navigate("/bookings");
    } catch (err: any) {
      toast.error(err.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-12 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-12 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-4">Provider not found</p>
          <button onClick={() => navigate(-1)} className="text-cyan-600 hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const displayName = provider.businessName || `${provider.firstName} ${provider.lastName}`.trim();
  const imageSrc = provider.profileImage ? `https://homecare360.onrender.com/uploads/${provider.profileImage}` : "";
  const locationStr = [provider.city, provider.state].filter(Boolean).join(", ");
  const reviews: any[] = provider.reviews || [];
  const breakdown: any[] = provider.reviewsBreakdown || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-12 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate(-1)}
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
                  <ImageWithFallback src={imageSrc} alt={displayName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{displayName}</h1>
                        <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-cyan-600 font-medium text-lg mb-3">{provider.serviceCategory}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{provider.rating || "New"}</span>
                      <span className="text-gray-600">({provider.reviewCount} reviews)</span>
                    </div>
                    {locationStr && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{locationStr}</span>
                      </div>
                    )}
                    {provider.yearsExperience && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{provider.yearsExperience} years experience</span>
                      </div>
                    )}
                  </div>

                  {provider.availability && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{provider.availability}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* About */}
            {provider.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{provider.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {provider.yearsExperience && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Experience</p>
                      <p className="font-semibold text-gray-900">{provider.yearsExperience} years</p>
                    </div>
                  )}
                  {locationStr && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <p className="font-semibold text-gray-900">{locationStr}</p>
                    </div>
                  )}
                  {provider.serviceRadius && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Service Radius</p>
                      <p className="font-semibold text-gray-900">{provider.serviceRadius} km</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tags / Specializations */}
            {provider.tags && provider.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specializations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.tags.map((tag: string, index: number) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                      </div>
                      <span className="font-medium text-gray-900">{tag}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>

              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet.</p>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-200">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{provider.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{provider.reviewCount} reviews</p>
                    </div>
                    <div className="flex-1">
                      {breakdown.map((item: any) => (
                        <div key={item.stars} className="flex items-center gap-4 mb-2">
                          <span className="text-sm text-gray-600 w-12">{item.stars} star</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                              style={{ width: provider.reviewCount ? `${(item.count / provider.reviewCount) * 100}%` : "0%" }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review: any, index: number) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="pb-6 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">
                                {review.user?.fullName || "User"}
                              </h4>
                              <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                                Verified
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
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
                  <span className="font-bold text-gray-900">₹{provider.hourlyRate}</span>
                </div>
                {provider.availability && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-medium text-gray-900">{provider.availability}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Date *</label>
                  <input
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Time (optional)</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Your Address *</label>
                  <input
                    type="text"
                    placeholder="Enter your full address"
                    value={bookingLocation}
                    onChange={(e) => setBookingLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Starting from</span>
                  <span className="text-2xl font-bold text-gray-900">₹{provider.hourlyRate * 2}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">(2 hour minimum)</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookNow}
                disabled={booking}
                className="w-full bg-gradient-to-r from-cyan-600 to-emerald-500 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mb-4 disabled:opacity-60"
              >
                {booking ? "Booking..." : "Book Now"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
