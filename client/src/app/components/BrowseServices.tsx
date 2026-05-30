import { motion, AnimatePresence } from "motion/react";
import {
  Search, MapPin, Star, SlidersHorizontal, X, BadgeCheck,
  LayoutGrid, List, ChevronDown, Clock,
} from "lucide-react";
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
  "All services",
  "Plumbing",
  "Electrical",
  "House Cleaning",
  "AC & Appliance Repair",
  "Painting",
  "Carpentry",
  "Outdoor Services",
  "Pest Control",
];

const AVATAR_GRADIENTS = [
  "from-cyan-500 to-teal-600",
  "from-emerald-500 to-green-600",
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-violet-600",
  "from-orange-500 to-amber-600",
  "from-rose-500 to-pink-600",
  "from-sky-500 to-blue-600",
  "from-lime-500 to-green-600",
];

function getAvatarGradient(name: string) {
  return AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getBadge(provider: Provider): { label: string; classes: string } | null {
  if (provider.rating >= 4.8 && provider.reviewCount >= 20)
    return { label: "Premier", classes: "bg-[#00B8A9]/10 text-[#00B8A9] border border-[#00B8A9]/20" };
  if (provider.rating >= 4.5)
    return { label: "Top Rated", classes: "bg-amber-50 text-amber-700 border border-amber-200" };
  return null;
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function ProviderAvatar({
  provider,
  size = "md",
}: {
  provider: Provider;
  size?: "md" | "lg";
}) {
  const name = provider.businessName || `${provider.firstName} ${provider.lastName}`.trim();
  const src = provider.profileImage
    ? `https://homecare360.onrender.com/uploads/${provider.profileImage}`
    : "";
  const sizeClass = size === "lg" ? "w-16 h-16 text-lg rounded-2xl" : "w-12 h-12 text-sm rounded-xl";
  const gradient = getAvatarGradient(name);

  if (src) {
    return (
      <ImageWithFallback
        src={src}
        alt={name}
        className={`${sizeClass} object-cover flex-shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${sizeClass} bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

// ── Star Row ──────────────────────────────────────────────────────────────────
function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── List Card ─────────────────────────────────────────────────────────────────
function ProviderListCard({
  provider,
  index,
  onNavigate,
}: {
  provider: Provider;
  index: number;
  onNavigate: () => void;
}) {
  const name =
    provider.businessName || `${provider.firstName} ${provider.lastName}`.trim();
  const badge = getBadge(provider);
  const location = [provider.city, provider.state].filter(Boolean).join(", ");
  const hasReviews = provider.reviewCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      className="bg-white rounded-2xl border border-gray-100 hover:border-[#00B8A9]/30 hover:shadow-md transition-all duration-300"
    >
      <div className="p-5 flex gap-4">
        {/* Avatar */}
        <ProviderAvatar provider={provider} size="lg" />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            {/* Left: name + meta */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h3 className="text-[0.95rem] font-semibold text-gray-900 leading-tight">
                  {name}
                </h3>
                <BadgeCheck className="w-4 h-4 text-[#00B8A9] flex-shrink-0" />
                {badge && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.classes}`}>
                    {badge.label}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#00B8A9] font-medium mb-2">
                {provider.serviceCategory}
              </p>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-3 mb-2.5 text-xs">
                {hasReviews ? (
                  <div className="flex items-center gap-1.5">
                    <StarRow rating={provider.rating} />
                    <span className="font-semibold text-gray-800">
                      {provider.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-400">({provider.reviewCount} reviews)</span>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No reviews yet</span>
                )}

                {provider.availability && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <Clock className="w-3 h-3" />
                    {provider.availability}
                  </span>
                )}
              </div>

              {/* Tags + location row */}
              <div className="flex flex-wrap items-center gap-1.5">
                {location && (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    {location}
                  </span>
                )}
                {provider.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: price + actions */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-3 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-400 leading-none mb-0.5">from</p>
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  ₹{provider.hourlyRate}
                </p>
                <p className="text-xs text-gray-400">/visit</p>
              </div>

              <div className="flex sm:flex-col gap-2">
                <button
                  onClick={onNavigate}
                  className="px-4 py-2 text-xs font-semibold text-[#00B8A9] border border-[#00B8A9] rounded-xl hover:bg-cyan-50 transition-colors whitespace-nowrap"
                >
                  View profile
                </button>
                <button
                  onClick={onNavigate}
                  className="px-4 py-2 text-xs font-semibold bg-[#00B8A9] text-white rounded-xl hover:bg-[#009e96] transition-colors whitespace-nowrap"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description strip */}
      {provider.description && (
        <div className="px-5 pb-4 pt-0">
          <p className="text-xs text-gray-400 line-clamp-1 border-t border-gray-50 pt-3">
            {provider.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ── Grid Card ─────────────────────────────────────────────────────────────────
function ProviderGridCard({
  provider,
  index,
  onNavigate,
}: {
  provider: Provider;
  index: number;
  onNavigate: () => void;
}) {
  const name =
    provider.businessName || `${provider.firstName} ${provider.lastName}`.trim();
  const badge = getBadge(provider);
  const location = [provider.city, provider.state].filter(Boolean).join(", ");
  const hasReviews = provider.reviewCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      className="bg-white rounded-2xl border border-gray-100 hover:border-[#00B8A9]/30 hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="p-5 flex-1">
        <div className="flex items-start gap-3 mb-3">
          <ProviderAvatar provider={provider} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
              <h3 className="text-sm font-semibold text-gray-900 leading-tight truncate">
                {name}
              </h3>
              <BadgeCheck className="w-3.5 h-3.5 text-[#00B8A9] flex-shrink-0" />
            </div>
            {badge && (
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${badge.classes}`}>
                {badge.label}
              </span>
            )}
            <p className="text-xs text-[#00B8A9] font-medium mt-1">
              {provider.serviceCategory}
            </p>
          </div>
        </div>

        {hasReviews ? (
          <div className="flex items-center gap-1.5 mb-2 text-xs">
            <StarRow rating={provider.rating} />
            <span className="font-semibold text-gray-800">{provider.rating.toFixed(1)}</span>
            <span className="text-gray-400">({provider.reviewCount})</span>
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic mb-2">No reviews yet</p>
        )}

        {location && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {provider.availability && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 mb-2">
            <Clock className="w-3 h-3" />
            {provider.availability}
          </span>
        )}

        <div className="flex flex-wrap gap-1 mt-2">
          {provider.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5 pt-0 border-t border-gray-50 mt-1 pt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400">from</p>
          <p className="text-base font-bold text-gray-900">₹{provider.hourlyRate}<span className="text-xs text-gray-400 font-normal">/visit</span></p>
        </div>
        <button
          onClick={onNavigate}
          className="px-4 py-2 text-xs font-semibold bg-[#00B8A9] text-white rounded-xl hover:bg-[#009e96] transition-colors"
        >
          Book now
        </button>
      </div>
    </motion.div>
  );
}

// ── Sidebar Filter ────────────────────────────────────────────────────────────
function FilterPanel({
  sortBy, setSortBy,
  availability, toggleAvailability,
  priceFilter, setPriceFilter,
  selectedRating, setSelectedRating,
  verifiedOnly, setVerifiedOnly,
  onClearAll,
}: {
  sortBy: string; setSortBy: (v: string) => void;
  availability: string[]; toggleAvailability: (v: string) => void;
  priceFilter: string; setPriceFilter: (v: string) => void;
  selectedRating: string; setSelectedRating: (v: string) => void;
  verifiedOnly: boolean; setVerifiedOnly: (v: boolean) => void;
  onClearAll: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-1.5 mb-5">
        <SlidersHorizontal className="w-4 h-4 text-[#00B8A9]" />
        Filters
      </h3>

      {/* Sort By */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Sort By</p>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/20 focus:border-[#00B8A9] cursor-pointer appearance-none pr-8 transition-colors"
          >
            <option value="most-popular">Most Popular</option>
            <option value="top-rated">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Availability</p>
        <div className="space-y-2.5">
          {["Today", "This week", "Weekends only"].map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={availability.includes(opt)}
                onChange={() => toggleAvailability(opt)}
                className="w-4 h-4 rounded border-gray-300 accent-[#00B8A9] cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors select-none">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Price Range</p>
        <div className="flex gap-1.5 flex-wrap">
          {[
            { id: "any", label: "Any" },
            { id: "under500", label: "Under ₹500" },
            { id: "over500", label: "₹500+" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPriceFilter(opt.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                priceFilter === opt.id
                  ? "bg-[#00B8A9] text-white border-[#00B8A9]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#00B8A9] hover:text-[#00B8A9]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Minimum Rating</p>
        <div className="flex gap-1.5">
          {[
            { id: "all", label: "All" },
            { id: "4", label: "4+" },
            { id: "4.5", label: "4.5+" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedRating(opt.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedRating === opt.id
                  ? "bg-[#00B8A9] text-white border-[#00B8A9]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#00B8A9] hover:text-[#00B8A9]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Only */}
      <div className="mb-6">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 accent-[#00B8A9] cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors select-none">
            Show verified pros only
          </span>
        </label>
      </div>

      <button
        onClick={onClearAll}
        className="text-sm font-medium text-[#00B8A9] hover:text-[#2B5F5F] transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function BrowseServices() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState("any");
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("most-popular");
  const [availability, setAvailability] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [searchService, setSearchService] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("All services");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const load = async () => {
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
    load();
  }, []);

  useEffect(() => {
    const svc = searchParams.get("service");
    const loc = searchParams.get("location");
    if (svc) {
      setSearchInput(svc);
      setSearchService(svc);
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase() === svc.toLowerCase() || c.toLowerCase().includes(svc.toLowerCase())
      );
      if (matched) setActiveCategory(matched);
    }
    if (loc) {
      setLocationInput(loc);
      setLocationFilter(loc);
    }
  }, [searchParams]);

  const handleSearch = () => {
    setSearchService(searchInput);
    setLocationFilter(locationInput);
  };

  const handleClearAll = () => {
    setSearchInput("");
    setLocationInput("");
    setSearchService("");
    setLocationFilter("");
    setActiveCategory("All services");
    setPriceFilter("any");
    setSelectedRating("all");
    setSortBy("most-popular");
    setAvailability([]);
    setVerifiedOnly(false);
  };

  const toggleAvailability = (val: string) =>
    setAvailability((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All services") {
      setSearchService("");
      setSearchInput("");
    } else {
      setSearchService(cat);
      setSearchInput(cat);
    }
  };

  const getDisplayName = (p: Provider) =>
    p.businessName || `${p.firstName} ${p.lastName}`.trim();

  const filtered = providers
    .filter((p) => {
      const name = getDisplayName(p);
      const matchSearch =
        searchService === "" ||
        name.toLowerCase().includes(searchService.toLowerCase()) ||
        p.serviceCategory.toLowerCase().includes(searchService.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchService.toLowerCase()));
      const matchPrice =
        priceFilter === "any" ? true :
        priceFilter === "under500" ? p.hourlyRate < 500 :
        p.hourlyRate >= 500;
      const matchRating =
        selectedRating === "all" ? true :
        selectedRating === "4.5" ? p.rating >= 4.5 :
        p.rating >= parseInt(selectedRating);
      const locStr = `${p.city || ""} ${p.state || ""}`.toLowerCase();
      const matchLocation = locationFilter === "" || locStr.includes(locationFilter.toLowerCase());
      const matchAvailability =
        availability.length === 0 ||
        (p.availability != null &&
          availability.some((a) => p.availability!.toLowerCase().includes(a.toLowerCase())));
      return matchSearch && matchPrice && matchRating && matchLocation && matchAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.hourlyRate - b.hourlyRate;
        case "price-high": return b.hourlyRate - a.hourlyRate;
        case "top-rated": return b.rating - a.rating;
        default: return b.reviewCount - a.reviewCount;
      }
    });

  const locationLabel = locationInput || locationFilter || "your area";

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Browse Home Services"
        url="/services"
        description="Browse and book verified home service professionals near you. Plumbing, electrical, cleaning, AC repair, painting and more — transparent pricing, secure payments."
        keywords="browse home services, find plumber electrician cleaner, book home services India"
      />

      {/* ── Page Header ───────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 pt-20 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <h1 className="text-2xl font-bold text-gray-900">
              Find trusted home service professionals
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Verified pros &middot; Fixed pricing &middot; Available today in {locationLabel}
            </p>
          </motion.div>

          {/* Search row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.07 }}
            className="flex flex-col sm:flex-row gap-2 mb-4"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search service, professional..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/20 focus:border-[#00B8A9] transition-colors"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Bangalore, Karnataka"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8A9]/20 focus:border-[#00B8A9] transition-colors"
              />
            </div>
            {(searchInput || locationInput) && (
              <button
                onClick={handleClearAll}
                className="px-3 py-2.5 border border-gray-200 text-gray-400 hover:text-gray-600 rounded-xl transition-colors flex-shrink-0"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="px-7 py-2.5 bg-[#00B8A9] text-white text-sm font-semibold rounded-xl hover:bg-[#009e96] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Search
            </button>
          </motion.div>

          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="flex gap-2 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#00B8A9] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex gap-6">

          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden lg:block w-56 flex-shrink-0"
          >
            <div className="sticky top-24">
              <FilterPanel
                sortBy={sortBy} setSortBy={setSortBy}
                availability={availability} toggleAvailability={toggleAvailability}
                priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                selectedRating={selectedRating} setSelectedRating={setSelectedRating}
                verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly}
                onClearAll={handleClearAll}
              />
            </div>
          </motion.aside>

          {/* Results column */}
          <div className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{loading ? "…" : filtered.length}</span>{" "}
                professionals found
                {(searchService || locationFilter) && !loading && (
                  <span className="text-gray-400">
                    {searchService ? ` for "${searchService}"` : ""}
                    {locationFilter ? ` in ${locationFilter}` : ""}
                  </span>
                )}
              </p>

              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-xl hover:border-[#00B8A9] hover:text-[#00B8A9] transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                </button>

                {/* View toggle */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("list")}
                    title="List view"
                    className={`p-2 transition-colors ${
                      viewMode === "list" ? "bg-[#00B8A9] text-white" : "bg-white text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                    className={`p-2 transition-colors ${
                      viewMode === "grid" ? "bg-[#00B8A9] text-white" : "bg-white text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filter panel */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="lg:hidden mb-4 overflow-hidden"
                >
                  <FilterPanel
                    sortBy={sortBy} setSortBy={setSortBy}
                    availability={availability} toggleAvailability={toggleAvailability}
                    priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                    selectedRating={selectedRating} setSelectedRating={setSelectedRating}
                    verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly}
                    onClearAll={handleClearAll}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards */}
            {loading ? (
              <div className={viewMode === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 h-36 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">No professionals found</h3>
                <p className="text-sm text-gray-400 mb-5">
                  Try adjusting your search or removing some filters
                </p>
                <button
                  onClick={handleClearAll}
                  className="text-sm font-medium text-[#00B8A9] hover:text-[#2B5F5F] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === "list" ? (
              <div className="space-y-3">
                {filtered.map((provider, index) => (
                  <ProviderListCard
                    key={provider._id}
                    provider={provider}
                    index={index}
                    onNavigate={() => navigate(`/profile/${provider._id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((provider, index) => (
                  <ProviderGridCard
                    key={provider._id}
                    provider={provider}
                    index={index}
                    onNavigate={() => navigate(`/profile/${provider._id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
