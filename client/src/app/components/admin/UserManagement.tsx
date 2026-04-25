import { motion } from "motion/react";
import { Search, Ban, CheckCircle2, Eye, Calendar, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminUsers, toggleUserStatus } from "@/app/lib/api";
import { toast } from "react-toastify";

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "blocked">("all");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAdminUsers();
      setUsers(data.users || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggle = async (id: string) => {
    try {
      await toggleUserStatus(id);
      toast.success("User status updated");
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && user.isActive) ||
      (filter === "blocked" && !user.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          User Management
        </h1>
        <p className="text-gray-600">Manage registered users and their activity</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Users", value: users.length, color: "from-blue-500 to-cyan-600" },
          { label: "Active Users", value: users.filter((u) => u.isActive).length, color: "from-green-500 to-emerald-600" },
          { label: "Blocked Users", value: users.filter((u) => !u.isActive).length, color: "from-red-500 to-orange-600" },
        ].map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6">
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
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 shadow-sm"
          />
        </div>
        <div className="flex gap-3">
          {["all", "active", "blocked"].map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Users List */}
      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-24 animate-pulse" />)}</div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">No users found.</p></div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, x: 4 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {user.fullName?.[0] || "U"}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{user.fullName}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {user.isActive ? "active" : "blocked"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-cyan-600" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggle(user._id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${user.isActive ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                  >
                    {user.isActive ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
