import { motion } from "motion/react";
import { Search, Ban, CheckCircle2, Eye, Calendar, DollarSign } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  joinedDate: string;
  totalBookings: number;
  totalSpent: number;
  status: "active" | "blocked";
  lastActive: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNjg3OTI3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    joinedDate: "Dec 2023",
    totalBookings: 12,
    totalSpent: 1850,
    status: "active",
    lastActive: "2 hours ago"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzY4NzkyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    joinedDate: "Jan 2024",
    totalBookings: 8,
    totalSpent: 1200,
    status: "active",
    lastActive: "1 day ago"
  },
  {
    id: "3",
    name: "Sophie Brown",
    email: "sophie.brown@email.com",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNjg3OTI3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    joinedDate: "Nov 2023",
    totalBookings: 15,
    totalSpent: 2340,
    status: "active",
    lastActive: "5 mins ago"
  },
  {
    id: "4",
    name: "James Miller",
    email: "james.miller@email.com",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzY4NzkyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    joinedDate: "Oct 2023",
    totalBookings: 3,
    totalSpent: 450,
    status: "blocked",
    lastActive: "2 weeks ago"
  },
];

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "blocked">("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || user.status === filter;
    return matchesSearch && matchesFilter;
  });

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
          User Management
        </h1>
        <p className="text-gray-600">Manage registered users and their activity</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Users", value: users.length, color: "from-blue-500 to-cyan-600" },
          { label: "Active Users", value: users.filter(u => u.status === "active").length, color: "from-green-500 to-emerald-600" },
          { label: "Blocked Users", value: users.filter(u => u.status === "blocked").length, color: "from-red-500 to-orange-600" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium mb-2`}>
              {stat.label}
            </div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm"
          />
        </div>

        <div className="flex gap-3">
          {["all", "active", "blocked"].map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <ImageWithFallback
                src={user.image}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {user.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    <span>{user.totalBookings} bookings</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span>${user.totalSpent} spent</span>
                  </div>
                  <div className="text-gray-500">
                    Last active {user.lastActive}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    user.status === "active"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {user.status === "active" ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
