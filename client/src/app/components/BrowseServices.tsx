import { motion } from "motion/react";
import { Search, MapPin, Star, MapPinned, Sliders, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProviders } from "@/app/lib/api";

interface Provider {
  _id: string;
  firstName: string;
  lastName: string;
  businessName?: string;
  serviceCategory: string;
  profileImage?: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  description?: string;
  availability?: string;
  tags: string[];
  city?: string;
  state?: string;
}

export function BrowseServices() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("most-rated");
  const [showFilters, setShowFilters] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [searchService, setSearchService] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const data = await getProviders();
      setProviders(data.providers || []);
    } catch {
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setSearchInput(serviceFromUrl);
      setSearchService(serviceFromUrl);
    }
  }, [searchParams]);

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

  const getDisplayName = (p: Provider) =>
    p.businessName || `${p.firstName} ${p.lastName}`.trim();

  const getImageSrc = (p: Provider) =>
    p.profileImage ? `http://localhost:5000/uploads/${p.profileImage}` : "";

  const filteredProviders = providers
    .filter((provider) => {
      const name = getDisplayName(provider);
      const matchesSearch =
        searchService === "" ||
        name.toLowerCase().includes(searchService.toLowerCase()) ||
        provider.serviceCategory.toLowerCase().includes(searchService.toLowerCase()) ||
        provider.tags.some((tag) => tag.toLowerCase().includes(searchService.toLowerCase()));
      const matchesPrice = provider.hourlyRate <= priceRange[1];
      const matchesRating =
        selectedRating === "all" ? true : provider.rating >= parseInt(selectedRating);
      const locationStr = `${provider.city || ""} ${provider.state || ""}`.toLowerCase();
      const matchesLocation =
        location === "" || locationStr.includes(location.toLowerCase());
      return matchesSearch && matchesPrice && matchesRating && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.hourlyRate - b.hourlyRate;
        case "price-high": return b.hourlyRate - a.hourlyRate;
        default: return b.rating - a.rating;
      }
    });

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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-cyan-600 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
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
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Sliders className="w-5 h-5 text-gray-600" />
                </button>
              </div>

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
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  Max Price per Hour: ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-cyan-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹1000</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-3">Minimum Rating</label>
                <div className="space-y-2">
                  {["all", "5+", "4+", "3+"].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                        selectedRating === rating
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

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg h-48 animate-pulse" />
                ))}
              </div>
            ) : filteredProviders.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center shadow">
                <p className="text-gray-500">No providers found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProviders.map((provider, index) => (
                  <motion.div
                    key={provider._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={getImageSrc(provider)}
                          alt={getDisplayName(provider)}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold text-gray-900">{getDisplayName(provider)}</h3>
                              <div className="w-5 h-5 bg-cyan-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            </div>
                            <p className="text-cyan-600 font-medium mb-2">{provider.serviceCategory}</p>
                            <p className="text-gray-600 text-sm mb-3">{provider.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">₹{provider.hourlyRate}</div>
                            <div className="text-sm text-gray-500">per hour</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{provider.rating || "New"}</span>
                            <span className="text-gray-500">({provider.reviewCount} reviews)</span>
                          </div>
                          {(provider.city || provider.state) && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPinned className="w-4 h-4" />
                              <span>{[provider.city, provider.state].filter(Boolean).join(", ")}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600 font-medium text-sm">
                            {provider.availability || "Contact for availability"}
                          </span>
                          <button
                            onClick={() => navigate(`/profile/${provider._id}`)}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
