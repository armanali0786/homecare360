import { useState } from 'react';
import { Package, Users, Calendar, Star, Check, TrendingDown } from 'lucide-react';

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  regularPrice: number;
  discountedPrice: number;
  savings: number;
  type: 'bundle' | 'subscription' | 'group' | 'emergency';
  frequency?: string;
  popular?: boolean;
}

const packages: ServicePackage[] = [
  {
    id: 'pkg1',
    name: 'Complete Home Clean',
    description: 'Deep cleaning service with window washing included',
    services: ['Deep House Cleaning', 'Window Washing', 'Carpet Cleaning'],
    regularPrice: 450,
    discountedPrice: 349,
    savings: 101,
    type: 'bundle',
    popular: true
  },
  {
    id: 'pkg2',
    name: 'Plumbing Care Package',
    description: 'Comprehensive plumbing inspection and drain cleaning',
    services: ['Full Plumbing Inspection', 'Drain Cleaning', 'Water Heater Check'],
    regularPrice: 380,
    discountedPrice: 299,
    savings: 81,
    type: 'bundle'
  },
  {
    id: 'pkg3',
    name: 'Monthly Cleaning Subscription',
    description: 'Regular monthly cleaning service at a discounted rate',
    services: ['Standard House Cleaning', 'Kitchen Deep Clean', 'Bathroom Sanitization'],
    regularPrice: 260,
    discountedPrice: 199,
    savings: 61,
    type: 'subscription',
    frequency: 'Monthly',
    popular: true
  },
  {
    id: 'pkg4',
    name: 'Quarterly Lawn Care',
    description: 'Seasonal lawn maintenance subscription',
    services: ['Lawn Mowing', 'Fertilization', 'Weed Control', 'Edge Trimming'],
    regularPrice: 320,
    discountedPrice: 249,
    savings: 71,
    type: 'subscription',
    frequency: 'Quarterly'
  },
  {
    id: 'pkg5',
    name: 'Neighborhood Group Clean',
    description: 'Get 3+ neighbors together and save 25%',
    services: ['Exterior Cleaning', 'Gutter Cleaning', 'Pressure Washing'],
    regularPrice: 400,
    discountedPrice: 299,
    savings: 101,
    type: 'group'
  },
  {
    id: 'pkg6',
    name: 'Emergency Home Repair',
    description: '24/7 emergency service bundle for urgent repairs',
    services: ['Emergency Plumbing', 'Emergency Electrical', 'Priority Scheduling'],
    regularPrice: 550,
    discountedPrice: 449,
    savings: 101,
    type: 'emergency'
  },
  {
    id: 'pkg7',
    name: 'Property Manager Special',
    description: 'Complete vacancy preparation for rental properties',
    services: ['Vacancy Cleaning', 'Property Inspection', 'Minor Repairs', 'Painting Touch-ups'],
    regularPrice: 680,
    discountedPrice: 529,
    savings: 151,
    type: 'bundle'
  },
  {
    id: 'pkg8',
    name: 'Smart Home Setup',
    description: 'Complete smart home installation package',
    services: ['Smart Lighting Installation', 'Thermostat Setup', 'Security System', 'Configuration'],
    regularPrice: 890,
    discountedPrice: 699,
    savings: 191,
    type: 'bundle',
    popular: true
  }
];

export function ServicePackages() {
  const [selectedType, setSelectedType] = useState<'all' | 'bundle' | 'subscription' | 'group' | 'emergency'>('all');

  const filteredPackages = selectedType === 'all' 
    ? packages 
    : packages.filter(p => p.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl text-gray-900 mb-2">Service Packages & Deals</h1>
        <p className="text-xl text-gray-600">Save money with our bundled services and subscription plans</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-6 py-3 rounded-lg whitespace-nowrap ${
            selectedType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All Packages
        </button>
        <button
          onClick={() => setSelectedType('bundle')}
          className={`px-6 py-3 rounded-lg whitespace-nowrap flex items-center gap-2 ${
            selectedType === 'bundle'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Package className="w-5 h-5" />
          Bundles
        </button>
        <button
          onClick={() => setSelectedType('subscription')}
          className={`px-6 py-3 rounded-lg whitespace-nowrap flex items-center gap-2 ${
            selectedType === 'subscription'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Subscriptions
        </button>
        <button
          onClick={() => setSelectedType('group')}
          className={`px-6 py-3 rounded-lg whitespace-nowrap flex items-center gap-2 ${
            selectedType === 'group'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Users className="w-5 h-5" />
          Group Deals
        </button>
        <button
          onClick={() => setSelectedType('emergency')}
          className={`px-6 py-3 rounded-lg whitespace-nowrap ${
            selectedType === 'emergency'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Emergency
        </button>
      </div>

      {/* Info Banner */}
      {selectedType === 'group' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg text-blue-900 mb-2">How Group Discounts Work</h3>
              <p className="text-blue-800 mb-3">
                Get your neighbors or friends together to save more! When 3 or more people in the same area book the same service, everyone gets a discount.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Start a Group Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-xl transition-all ${
              pkg.popular ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            {pkg.popular && (
              <div className="bg-blue-600 text-white px-4 py-2 text-center flex items-center justify-center gap-2">
                <Star className="w-4 h-4 fill-white" />
                <span>Most Popular</span>
              </div>
            )}

            <div className="p-6">
              {/* Package Type Badge */}
              <div className="flex items-center gap-2 mb-3">
                {pkg.type === 'bundle' && <Package className="w-5 h-5 text-purple-600" />}
                {pkg.type === 'subscription' && <Calendar className="w-5 h-5 text-green-600" />}
                {pkg.type === 'group' && <Users className="w-5 h-5 text-orange-600" />}
                {pkg.type === 'emergency' && <span className="text-red-600">🚨</span>}
                <span className={`text-sm px-2 py-1 rounded ${
                  pkg.type === 'bundle' ? 'bg-purple-100 text-purple-700' :
                  pkg.type === 'subscription' ? 'bg-green-100 text-green-700' :
                  pkg.type === 'group' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {pkg.type === 'subscription' ? pkg.frequency : pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                </span>
              </div>

              <h3 className="text-2xl text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>

              {/* Services Included */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Includes:</div>
                <div className="space-y-2">
                  {pkg.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl text-gray-900">${pkg.discountedPrice}</span>
                  <span className="text-lg text-gray-400 line-through">${pkg.regularPrice}</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingDown className="w-4 h-4" />
                  <span>Save ${pkg.savings} ({Math.round((pkg.savings / pkg.regularPrice) * 100)}% off)</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {pkg.type === 'subscription' ? 'Subscribe Now' : 'Book Package'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl mb-3">Can't Find What You Need?</h2>
        <p className="text-xl text-blue-100 mb-6">
          Contact us to create a custom package tailored to your specific needs
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100">
          Request Custom Package
        </button>
      </div>
    </div>
  );
}
