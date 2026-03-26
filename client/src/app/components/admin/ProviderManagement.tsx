import { motion } from "motion/react";
import { Search, Filter, CheckCircle2, XCircle, Ban, Shield, DollarSign, Star, Calendar } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface Provider {
  id: string;
  name: string;
  image: string;
  service: string;
  experience: number;
  rating: number;
  totalBookings: number;
  totalEarnings: number;
  status: "approved" | "pending" | "rejected" | "suspended";
  verified: boolean;
  joinedDate: string;
}

const providers: Provider[] = [
  {
    id: "1",
    name: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsJTIwd29ya3xlbnwxfHx8fDE3NjkxNTA5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Plumbing",
    experience: 8,
    rating: 4.9,
    totalBookings: 287,
    totalEarnings: 45600,
    status: "approved",
    verified: true,
    joinedDate: "Jan 2024"
  },
  {
    id: "2",
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Electrical",
    experience: 10,
    rating: 5.0,
    totalBookings: 342,
    totalEarnings: 61560,
    status: "approved",
    verified: true,
    joinedDate: "Dec 2023"
  },
  {
    id: "3",
    name: "John Smith",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3MzY4NzkyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Plumbing",
    experience: 5,
    rating: 0,
    totalBookings: 0,
    totalEarnings: 0,
    status: "pending",
    verified: false,
    joinedDate: "Jan 2026"
  },
  {
    id: "4",
    name: "Clean Pro Services",
    image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkxODY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Cleaning",
    experience: 6,
    rating: 4.8,
    totalBookings: 523,
    totalEarnings: 78450,
    status: "approved",
    verified: true,
    joinedDate: "Nov 2023"
  },
  {
    id: "5",
    name: "David Martinez",
    image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkwODAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Painting",
    experience: 12,
    rating: 4.7,
    totalBookings: 198,
    totalEarnings: 89100,
    status: "approved",
    verified: true,
    joinedDate: "Oct 2023"
  },
  {
    id: "6",
    name: "Emily Brown",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNjg3OTI3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    service: "Electrical",
    experience: 4,
    rating: 4.5,
    totalBookings: 45,
    totalEarnings: 8100,
    status: "suspended",
    verified: false,
    joinedDate: "Aug 2024"
  },
];

export function ProviderManagement() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    suspended: "bg-orange-100 text-orange-700"
  };

  const filteredProviders = providers.filter(provider => {
    const matchesFilter = selectedFilter === "all" || provider.status === selectedFilter;
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterButtons = [
    { id: "all", label: "All Providers", count: providers.length },
    { id: "pending", label: "Pending", count: providers.filter(p => p.status === "pending").length },
    { id: "approved", label: "Approved", count: providers.filter(p => p.status === "approved").length },
    { id: "rejected", label: "Rejected", count: providers.filter(p => p.status === "rejected").length },
    { id: "suspended", label: "Suspended", count: providers.filter(p => p.status === "suspended").length },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Service Provider Management
        </h1>
        <p className="text-gray-600">View, verify, and manage service providers</p>
      </motion.div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search providers by name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 overflow-x-auto pb-2"
        >
          <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
          {filterButtons.map((button, index) => (
            <motion.button
              key={button.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(button.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedFilter === button.id
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {button.label} ({button.count})
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProviders.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <ImageWithFallback
                  src={provider.image}
                  alt={provider.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {provider.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 bg-cyan-600 rounded-full p-1"
                  >
                    <Shield className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.service} • {provider.experience} years exp.</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[provider.status]}`}>
                    {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-700">{provider.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm font-semibold text-gray-700">{provider.totalBookings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">${(provider.totalEarnings / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
              Joined {provider.joinedDate}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {provider.status === "pending" && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </motion.button>
                </>
              )}

              {provider.status === "approved" && (
                <>
                  {!provider.verified && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
                    >
                      <Shield className="w-4 h-4" />
                      Grant Badge
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium"
                  >
                    <Ban className="w-4 h-4" />
                    Suspend
                  </motion.button>
                </>
              )}

              {provider.status === "suspended" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Activate
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No providers found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </motion.div>
      )}
    </motion.div>
  );
}
