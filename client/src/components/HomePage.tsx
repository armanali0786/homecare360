import { useState } from 'react';
import { Search, MapPin, Wrench, Zap, Home, Scissors, PaintBucket, Camera, Star, Shield, Clock, Package, Calculator, CheckCircle, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onSearch: (query: string, service: string) => void;
  onBecomeProvider?: () => void;
}

export function HomePage({ onSearch, onBecomeProvider }: HomePageProps) {
  const [location, setLocation] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const services = [
    { name: 'Plumbing', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
    { name: 'Electrical', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Cleaning', icon: Home, color: 'bg-green-100 text-green-600' },
    { name: 'Landscaping', icon: Scissors, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Painting', icon: PaintBucket, color: 'bg-purple-100 text-purple-600' },
    { name: 'Photography', icon: Camera, color: 'bg-pink-100 text-pink-600' },
  ];

  const handleSearch = () => {
    onSearch(location, selectedService);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-4">Find Trusted Local Service Providers</h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with verified professionals for all your home service needs. Book, pay, and review - all in one place.
            </p>
            
            {/* Search Box */}
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Search Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl text-gray-900 mb-8">Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => {
                setSelectedService(service.name);
                onSearch('', service.name);
              }}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                <service.icon className="w-6 h-6" />
              </div>
              <span className="text-gray-900">{service.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-gray-900 mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">1. Search & Compare</h3>
              <p className="text-gray-600">
                Browse verified service providers in your area. Compare ratings, reviews, and prices.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">2. Book & Schedule</h3>
              <p className="text-gray-600">
                Choose your preferred time slot and book instantly. Get automatic reminders.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">3. Pay & Review</h3>
              <p className="text-gray-600">
                Secure payment after service completion. Leave a review to help others.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl text-gray-900 mb-12 text-center">Why Choose ServiceHub</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl text-gray-900 mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All service providers undergo background checks and verification to ensure quality and safety.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl text-gray-900 mb-2">Transparent Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from real customers to make informed decisions.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Escrow payment system ensures your money is safe until the job is completed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Provider CTA Section */}
      {onBecomeProvider && (
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl mb-4">Grow Your Business with ServiceHub</h2>
                <p className="text-xl text-green-100 mb-6">
                  Join our network of professional service providers and connect with customers in your area.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">Get more bookings and grow your revenue</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">Manage your schedule and jobs easily</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">Build your reputation with verified reviews</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">Secure payments with escrow protection</span>
                  </li>
                </ul>
                <button 
                  onClick={onBecomeProvider}
                  className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 text-lg"
                >
                  Start Your Application
                </button>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-8">
                <h3 className="text-2xl mb-6">Benefits for Providers</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-lg mb-1">Competitive Platform Fee</div>
                      <div className="text-green-100">Only 15% per booking - lower than competitors</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-lg mb-1">Verified Badge</div>
                      <div className="text-green-100">Stand out with our verification system</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-lg mb-1">Quick Payouts</div>
                      <div className="text-green-100">Weekly direct deposits to your account</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}