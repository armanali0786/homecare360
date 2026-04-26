import { motion } from "motion/react";
import { Search, MapPin, Star, MapPinned, SlidersHorizontal, X, BadgeCheck } from "lucide-react";
import { SEO } from "@/app/components/SEO";
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

const CATEGORIES = [
  "All", "Plumbing", "Electrical", "House Cleaning",
  "AC & Appliance Repair", "Painting", "Carpentry", "Outdoor Services", "Handyman", "HVAC",
];

export function BrowseServices() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("most-rated");
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [searchService, setSearchService] = useState("");
  const [location, setLocation] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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

  useEffect(() => { fetchProviders(); }, []);

  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setSearchInput(serviceFromUrl);
      setSearchService(serviceFromUrl);
      const matched = CATEGORIES.find((c) => c.toLowerCase() === serviceFromUrl.toLowerCase());
      if (matched) setActiveCategory(matched);
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
    setActiveCategory("All");
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setSearchService("");
      setSearchInput("");
    } else {
      setSearchService(cat);
      setSearchInput(cat);
    }
  };

  const getDisplayName = (p: Provider) =>
    p.businessName || `${p.firstName} ${p.lastName}`.trim();

  const getImageSrc = (p: Provider) =>
    p.profileImage ? `https://homecare360.onrender.com/uploads/${p.profileImage}` : "";

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
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Browse Home Care Services"
        url="/services"
        description="Browse and book trusted home care services near you. Find caregivers, elder care specialists, companion care, and health service providers in your area."
        keywords="browse home care services, find caregiver, book elder care, companion care near me, home health aide"
      />
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full mb-3">
              Browse Services
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Find a Trusted Professional
            </h1>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row gap-3 mb-5"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search service or professional..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="City or area (e.g. Mumbai, Pune)"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {(searchInput || locationInput) && (
                <button
                  onClick={handleClearSearch}
                  className="px-3 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-[#00B8A9] text-white rounded-lg text-sm font-medium hover:bg-[#009e91] transition-colors"
              >
                Search
              </button>
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#00B8A9] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`lg:w-60 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00B8A9]" />
                Filters
              </h3>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  <option value="most-rated">Most Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Max Rate: ₹{priceRange[1]}/hr
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-cyan-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹0</span>
                  <span>₹1,000</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Minimum Rating
                </label>
                <div className="space-y-1">
                  {[
                    { id: "all", label: "All Ratings" },
                    { id: "4", label: "4★ & above" },
                    { id: "3", label: "3★ & above" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedRating(opt.id)}
                      className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${
                        selectedRating === opt.id
                          ? "bg-cyan-50 text-[#00B8A9] font-medium border border-cyan-200"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{filteredProviders.length}</span> providers found
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 h-40 animate-pulse" />
                ))}
              </div>
            ) : filteredProviders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">No providers found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={handleClearSearch}
                  className="text-sm text-[#00B8A9] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProviders.map((provider, index) => (
                  <motion.div
                    key={provider._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="bg-white rounded-xl border border-gray-100 hover:border-cyan-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-44 h-44 md:h-auto relative overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={getImageSrc(provider)}
                          alt={getDisplayName(provider)}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 p-5">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <h3 className="text-base font-semibold text-gray-900">
                                {getDisplayName(provider)}
                              </h3>
                              <BadgeCheck className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                            </div>
                            <p className="text-sm text-[#00B8A9] font-medium">
                              {provider.serviceCategory}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <span className="text-xl font-bold text-gray-900">
                              ₹{provider.hourlyRate}
                            </span>
                            <span className="text-sm text-gray-400">/hr</span>
                          </div>
                        </div>

                        {provider.description && (
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                            {provider.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-800">
                              {provider.rating || "New"}
                            </span>
                            <span className="text-gray-400">({provider.reviewCount})</span>
                          </div>
                          {(provider.city || provider.state) && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <MapPinned className="w-3.5 h-3.5" />
                              <span>
                                {[provider.city, provider.state].filter(Boolean).join(", ")}
                              </span>
                            </div>
                          )}
                          {provider.availability && (
                            <span className="text-emerald-600 font-medium text-xs px-2 py-0.5 bg-emerald-50 rounded-full">
                              {provider.availability}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {provider.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => navigate(`/profile/${provider._id}`)}
                            className="px-5 py-2 bg-[#00B8A9] text-white text-sm font-medium rounded-lg hover:bg-[#009e91] transition-colors flex-shrink-0"
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
