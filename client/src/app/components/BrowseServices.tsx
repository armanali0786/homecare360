import { motion } from "motion/react";
import { Search, MapPin, Star, MapPinned, ChevronDown, Sliders, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Provider {
  id: string;
  name: string;
  service: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  price: number;
  description: string;
  availability: string;
  tags: string[];
  verified: boolean;
  location: string;
}

const providers: Provider[] = [
  {
    id: "1",
    name: "Sarah Williams",
    service: "Electrical",
    image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
    reviews: 89,
    distance: "2.5 miles away",
    price: 95,
    description: "Certified electrician offering residential and commercial electrical services. Expert in smart home installations.",
    availability: "Available Tomorrow",
    tags: ["Wiring & Rewiring", "Panel Upgrades", "Smart Home Installation"],
    verified: true,
    location: "New York, NY",
  },
  {
    id: "2",
    name: "Mike Johnson",
    service: "Plumbing",
    image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsJTIwd29ya3xlbnwxfHx8fDE3NjkxNTA5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 127,
    distance: "1.2 miles away",
    price: 85,
    description: "Licensed plumber with 15 years of experience. Specializing in emergency repairs, installation, and maintenance.",
    availability: "Available Today",
    tags: ["Emergency Repairs", "Pipe Installation", "Water Heater Repair"],
    verified: true,
    location: "Brooklyn, NY",
  },
  {
    id: "3",
    name: "David Martinez",
    service: "Painting",
    image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkwODAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 93,
    distance: "1.8 miles away",
    price: 70,
    description: "Professional painter with expertise in interior and exterior painting. Attention to detail guaranteed.",
    availability: "Available Today",
    tags: ["Interior Painting", "Exterior Painting", "Cabinet Refinishing"],
    verified: true,
    location: "Queens, NY",
  },
  {
    id: "4",
    name: "Clean Pro Services",
    service: "Cleaning",
    image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkxODY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 203,
    distance: "3.1 miles away",
    price: 65,
    description: "Professional cleaning team providing residential and commercial cleaning services with eco-friendly products.",
    availability: "Available This Week",
    tags: ["Deep Cleaning", "Move-in/Move-out", "Office Cleaning"],
    verified: true,
    location: "Staten Island, NY",
  },
  {
    id: "5",
    name: "Green Thumb Landscaping",
    service: "Landscaping",
    image: "https://images.unsplash.com/photo-1626075218494-89e92b375502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGluZyUyMGdhcmRlbnxlbnwxfHx8fDE3NjkxODc5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 145,
    distance: "4.8 miles away",
    price: 75,
    description: "Full-service landscaping company specializing in garden design, lawn care, and outdoor maintenance.",
    availability: "Available Next Week",
    tags: ["Lawn Maintenance", "Garden Design", "Tree Trimming"],
    verified: true,
    location: "Bronx, NY",
  },
  {
    id: "6",
    name: "Fix-it-All Handyman",
    service: "Handyman",
    image: "https://plus.unsplash.com/premium_photo-1770631383605-c14d188b1baa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    reviews: 176,
    distance: "3.5 miles away",
    price: 60,
    description: "Skilled handyman for all sorts of home repairs and installations. No job too small!",
    availability: "Available This Week",
    tags: ["Furniture Assembly", "Door/Window Repair", "Drywall Repair"],
    verified: true,
    location: "New York, NY",
  },
];


export function BrowseServices() {
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("most-rated");
  const [showFilters, setShowFilters] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [searchService, setSearchService] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleViewProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };

  const handleSearch = () => {
    setSearchService(searchInput);
    setLocation(locationInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setLocationInput("");
    setSearchService("");
    setLocation("");
  };

  const filteredProviders = providers
    .filter((provider) => {
      const matchesSearch =
        searchService === "" ||
        provider.name.toLowerCase().includes(searchService.toLowerCase()) ||
        provider.service.toLowerCase().includes(searchService.toLowerCase()) ||
        provider.tags.some((tag) =>
          tag.toLowerCase().includes(searchService.toLowerCase())
        );
      const matchesPrice = provider.price <= priceRange[1];

      const matchesRating =
        selectedRating === "all"
          ? true
          : provider.rating >= parseInt(selectedRating);

      const matchesLocation =
        location === "" ||
        provider.location.toLowerCase().includes(location.toLowerCase());

      return matchesSearch && matchesPrice && matchesRating && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return b.reviews - a.reviews;
      }
    });

  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setSearchInput(serviceFromUrl);
      setSearchService(serviceFromUrl);
    }
  }, [searchParams]);

  const fetchServices = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/v1/provider/services", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    console.log("Fetched services:", data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 pt-12 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              {(searchInput || locationInput) && (
                <button
                  onClick={handleClearSearch}
                  className="bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button className="bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:w-72 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Sliders className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
                >
                  <option value="most-rated">Most Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="distance">Nearest First</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  Max Price per Hour: ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-cyan-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$150</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-3">Minimum Rating</label>
                <div className="space-y-2">
                  {["all", "5+", "4+", "3+"].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`w-full px-4 py-2 rounded-lg text-left transition-all ${selectedRating === rating
                        ? "bg-gradient-to-r from-cyan-600 to-emerald-500 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {rating === "all" ? "All Ratings" : `${rating.replace("+", "")} Stars & Up`}
                      {rating !== "all" && (
                        <span className="ml-2">
                          {Array.from({ length: parseInt(rating) }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 inline fill-current" />
                          ))}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Service Providers List */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  All Services
                  <span className="text-lg text-gray-500 ml-3">{filteredProviders.length} providers found</span>
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden bg-white p-3 rounded-lg shadow-lg"
                >
                  <Sliders className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </motion.div>

            {filteredProviders.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center shadow">
                <p className="text-gray-500">No providers found.</p>
              </div>
            )}

            <div className="space-y-6">
              {filteredProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={provider.image}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold text-gray-900">{provider.name}</h3>
                            {provider.verified && (
                              <div className="w-5 h-5 bg-cyan-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-cyan-600 font-medium mb-2">{provider.service}</p>
                          <p className="text-gray-600 text-sm mb-3">{provider.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">${provider.price}</div>
                          <div className="text-sm text-gray-500">per hour</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-gray-500">({provider.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPinned className="w-4 h-4" />
                          <span>{provider.distance} | {provider.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-emerald-600 font-medium text-sm">
                          {provider.availability}
                        </span>
                        <button
                          onClick={() => handleViewProfile(provider.id)}
                          className="bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
