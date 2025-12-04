import { useState } from 'react';
import { Star, MapPin, Shield, Clock, CheckCircle, ArrowLeft, Calendar } from 'lucide-react';
import { ServiceProvider } from '../App';
import { mockReviews } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookingModal } from './BookingModal';

interface ServiceProviderProfileProps {
  provider: ServiceProvider;
  onBack: () => void;
}

export function ServiceProviderProfile({ provider, onBack }: ServiceProviderProfileProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const providerReviews = mockReviews.filter(r => r.providerId === provider.id);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Results</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-80 h-64 md:h-auto flex-shrink-0">
              <ImageWithFallback
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl text-gray-900">{provider.name}</h1>
                    {provider.verified && (
                      <Shield className="w-6 h-6 text-blue-600" title="Verified Provider" />
                    )}
                  </div>
                  <p className="text-xl text-gray-600">{provider.service}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl text-gray-900">${provider.hourlyRate}</div>
                  <div className="text-gray-500">per hour</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl text-gray-900">{provider.rating}</span>
                  <span className="text-gray-500">({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-6 h-6" />
                  <span>{provider.location} · {provider.distance} miles away</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-6 h-6" />
                  <span>{provider.completedJobs} jobs completed</span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-green-600">{provider.availability}</span>
              </div>

              {/* Book Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 mb-4">{provider.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500 mb-1">Experience</div>
                  <div className="text-gray-900">{provider.experience} years</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Location</div>
                  <div className="text-gray-900">{provider.location}</div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl text-gray-900 mb-4">Specializations</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {provider.specializations.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-900">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            {provider.portfolio && provider.portfolio.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl text-gray-900 mb-4">Portfolio</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {provider.portfolio.map((item) => (
                    <div key={item.id} className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {provider.certifications && provider.certifications.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl text-gray-900 mb-4">Certifications & Licenses</h2>
                <div className="space-y-3">
                  {provider.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-lg text-gray-900">{cert.name}</div>
                          <div className="text-gray-600">{cert.issuer}</div>
                        </div>
                      </div>
                      <div className="text-gray-600">{cert.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl text-gray-900 mb-6">Reviews</h2>
              
              {/* Rating Summary */}
              <div className="flex items-center gap-8 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-5xl text-gray-900 mb-2">{provider.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(provider.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-500">{provider.reviewCount} reviews</div>
                </div>

                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = providerReviews.filter(r => Math.floor(r.rating) === stars).length;
                    const percentage = (count / providerReviews.length) * 100;
                    return (
                      <div key={stars} className="flex items-center gap-2 mb-2">
                        <span className="text-gray-600 w-12">{stars} star</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-500 w-12 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {providerReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900">{review.userName}</span>
                          {review.verified && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-sm">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
              <h3 className="text-xl text-gray-900 mb-4">Book This Service</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="text-gray-900">${provider.hourlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Booking</span>
                  <span className="text-gray-900">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="text-gray-900">Within 1 hour</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-gray-900">Starting from</span>
                  <span className="text-gray-900">${provider.hourlyRate * 2}</span>
                </div>
                <p className="text-gray-500">For 2 hours minimum</p>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-3"
              >
                Book Now
              </button>
              
              <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Message Provider
              </button>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-green-900 mb-1">Secure Payment</div>
                    <p className="text-green-700">
                      Your payment is held in escrow until the job is completed to your satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          provider={provider}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}