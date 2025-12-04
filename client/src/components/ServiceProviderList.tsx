import { useState, useMemo } from 'react';
import { Star, MapPin, DollarSign, Shield, SlidersHorizontal } from 'lucide-react';
import { ServiceProvider } from '../App';
import { mockProviders } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServiceProviderListProps {
  searchQuery: string;
  selectedService: string;
  onViewProfile: (provider: ServiceProvider) => void;
}

export function ServiceProviderList({ searchQuery, selectedService, onViewProfile }: ServiceProviderListProps) {
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');
  const [maxPrice, setMaxPrice] = useState(150);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProviders = useMemo(() => {
    let filtered = mockProviders;

    // Filter by service
    if (selectedService) {
      filtered = filtered.filter(p => 
        p.service.toLowerCase().includes(selectedService.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price
    filtered = filtered.filter(p => p.hourlyRate <= maxPrice);

    // Filter by rating
    filtered = filtered.filter(p => p.rating >= minRating);

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'distance') return a.distance - b.distance;
      return 0;
    });

    return filtered;
  }, [selectedService, searchQuery, sortBy, maxPrice, minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl text-gray-900 mb-2">
          {selectedService ? `${selectedService} Services` : 'All Services'}
        </h1>
        <p className="text-gray-600">
          {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h3 className="text-lg text-gray-900">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-500"
              >
                ×
              </button>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'distance')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="distance">Nearest</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Max Price per Hour: ${maxPrice}
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-gray-500 mt-1">
                <span>$50</span>
                <span>$150</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Minimum Rating</label>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 0].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border ${
                      minRating === rating
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-700">
                      {rating > 0 ? `${rating}+` : 'All Ratings'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setMaxPrice(150);
                setMinRating(0);
                setSortBy('rating');
              }}
              className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Provider List */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg mb-4"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>

          <div className="grid gap-6">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onViewProfile(provider)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                    <ImageWithFallback
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl text-gray-900">{provider.name}</h3>
                          {provider.verified && (
                            <Shield className="w-5 h-5 text-blue-600" title="Verified Provider" />
                          )}
                        </div>
                        <p className="text-gray-600">{provider.service}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-gray-900">${provider.hourlyRate}</div>
                        <div className="text-gray-500">per hour</div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{provider.description}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900">{provider.rating}</span>
                        <span className="text-gray-500">({provider.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{provider.distance} miles away</span>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {provider.specializations.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-green-600">{provider.availability}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProfile(provider);
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">No service providers found</p>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={() => {
                  setMaxPrice(150);
                  setMinRating(0);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
