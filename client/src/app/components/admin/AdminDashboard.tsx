import { motion } from "motion/react";
import { Users, UserCog, Calendar, DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const metrics = [
  { 
    id: 1, 
    label: "Total Users", 
    value: "2,847", 
    change: "+12.5%", 
    icon: Users, 
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50"
  },
  { 
    id: 2, 
    label: "Service Providers", 
    value: "458", 
    change: "+8.2%", 
    icon: UserCog, 
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50"
  },
  { 
    id: 3, 
    label: "Total Bookings", 
    value: "5,932", 
    change: "+23.1%", 
    icon: Calendar, 
    color: "from-teal-500 to-green-600",
    bgColor: "bg-teal-50"
  },
  { 
    id: 4, 
    label: "Total Revenue", 
    value: "$127.5K", 
    change: "+18.7%", 
    icon: DollarSign, 
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50"
  },
];

const pendingVerifications = 23;

const bookingsData = [
  { month: "Jan", bookings: 320 },
  { month: "Feb", bookings: 450 },
  { month: "Mar", bookings: 389 },
  { month: "Apr", bookings: 520 },
  { month: "May", bookings: 615 },
  { month: "Jun", bookings: 710 },
];

const revenueData = [
  { month: "Jan", revenue: 15200 },
  { month: "Feb", revenue: 21500 },
  { month: "Mar", revenue: 18900 },
  { month: "Apr", revenue: 24300 },
  { month: "May", revenue: 29100 },
  { month: "Jun", revenue: 33400 },
];

const topServices = [
  { name: "Plumbing", value: 1245, color: "#0891b2" },
  { name: "Electrical", value: 892, color: "#06b6d4" },
  { name: "Cleaning", value: 1567, color: "#10b981" },
  { name: "Painting", value: 654, color: "#14b8a6" },
  { name: "Landscaping", value: 789, color: "#059669" },
];

const recentActivities = [
  { 
    id: 1, 
    type: "application", 
    title: "New provider application", 
    description: "John Smith applied for Plumbing services",
    time: "5 mins ago",
    icon: Clock,
    color: "text-blue-600 bg-blue-50"
  },
  { 
    id: 2, 
    type: "booking", 
    title: "New booking created", 
    description: "Sarah booked Electrical service for Jan 28",
    time: "12 mins ago",
    icon: Calendar,
    color: "text-teal-600 bg-teal-50"
  },
  { 
    id: 3, 
    type: "review", 
    title: "New 5-star review", 
    description: "Mike Johnson received an excellent review",
    time: "23 mins ago",
    icon: CheckCircle2,
    color: "text-green-600 bg-green-50"
  },
  { 
    id: 4, 
    type: "alert", 
    title: "Provider verification required", 
    description: "3 providers awaiting document verification",
    time: "1 hour ago",
    icon: AlertCircle,
    color: "text-orange-600 bg-orange-50"
  },
  { 
    id: 5, 
    type: "booking", 
    title: "Booking completed", 
    description: "Cleaning service completed successfully",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-600 bg-green-50"
  },
];

export function AdminDashboard() {
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
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
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
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Pending Verifications Alert */}
      {pendingVerifications > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-4 mb-8 shadow-md"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Pending Provider Verifications</h3>
              <p className="text-sm text-gray-600">
                {pendingVerifications} provider{pendingVerifications > 1 ? 's' : ''} awaiting verification
              </p>
            </div>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Review Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Bookings Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <h2 className="text-xl font-bold text-gray-800">Bookings Over Time</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#0891b2" 
                strokeWidth={3}
                dot={{ fill: '#0891b2', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Revenue Analytics</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Services by Demand</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={topServices}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {topServices.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className={`${activity.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
