import { motion } from "motion/react";
import { Users, UserCog, Calendar, DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";
import { getDashboard } from "@/app/lib/api";

export function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg p-6 h-32 animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 h-80 animate-pulse" />
          <div className="bg-white rounded-xl shadow-lg p-6 h-80 animate-pulse" />
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const pendingApplications = metrics.pendingApplications || 0;

  const metricCards = [
    { id: 1, label: "Total Users", value: metrics.totalUsers?.toLocaleString() || "0", change: "", icon: Users, color: "from-blue-500 to-cyan-600", bgColor: "bg-blue-50" },
    { id: 2, label: "Service Providers", value: metrics.totalProviders?.toLocaleString() || "0", change: "", icon: UserCog, color: "from-cyan-500 to-teal-600", bgColor: "bg-cyan-50" },
    { id: 3, label: "Total Bookings", value: metrics.totalBookings?.toLocaleString() || "0", change: "", icon: Calendar, color: "from-teal-500 to-green-600", bgColor: "bg-teal-50" },
    { id: 4, label: "Total Revenue", value: `₹${(metrics.totalRevenue || 0).toLocaleString()}`, change: "", icon: DollarSign, color: "from-green-500 to-emerald-600", bgColor: "bg-green-50" },
  ];

  const bookingsData = data?.bookingsData || [];
  const revenueData = data?.revenueData || [];
  const topServices = data?.topServices || [];
  const recentActivities = data?.recentActivities || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Pending Verifications Alert */}
      {pendingApplications > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-4 mb-8 shadow-md"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Pending Provider Verifications</h3>
              <p className="text-sm text-gray-600">{pendingApplications} provider{pendingApplications > 1 ? "s" : ""} awaiting verification</p>
            </div>
            <a href="/admin/provider-applications" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Review Now
            </a>
          </div>
        </motion.div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <h2 className="text-xl font-bold text-gray-800">Bookings Over Time</h2>
          </div>
          {bookingsData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">No booking data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="bookings" stroke="#0891b2" strokeWidth={3} dot={{ fill: "#0891b2", r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Revenue Analytics</h2>
          </div>
          {revenueData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">No revenue data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }} formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Services by Demand</h2>
          {topServices.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={topServices} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {topServices.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          {recentActivities.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400">No recent activity</div>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity: any, index: number) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="text-teal-600 bg-teal-50 p-2 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.time).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
