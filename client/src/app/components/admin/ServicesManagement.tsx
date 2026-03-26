import { motion } from "motion/react";
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, DollarSign } from "lucide-react";
import { useState } from "react";

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  isEnabled: boolean;
  totalProviders: number;
  totalBookings: number;
}

const initialServices: Service[] = [
  {
    id: "1",
    name: "Plumbing",
    icon: "🔧",
    description: "Professional plumbing services for repairs, installations, and maintenance",
    basePrice: 150,
    isEnabled: true,
    totalProviders: 87,
    totalBookings: 1245
  },
  {
    id: "2",
    name: "Electrical",
    icon: "⚡",
    description: "Licensed electricians for wiring, repairs, and electrical installations",
    basePrice: 180,
    isEnabled: true,
    totalProviders: 62,
    totalBookings: 892
  },
  {
    id: "3",
    name: "Cleaning",
    icon: "✨",
    description: "Professional cleaning services for homes and offices",
    basePrice: 120,
    isEnabled: true,
    totalProviders: 143,
    totalBookings: 1567
  },
  {
    id: "4",
    name: "Landscaping",
    icon: "🌿",
    description: "Garden maintenance, lawn care, and landscape design",
    basePrice: 200,
    isEnabled: true,
    totalProviders: 54,
    totalBookings: 789
  },
  {
    id: "5",
    name: "Painting",
    icon: "🎨",
    description: "Interior and exterior painting services by professional painters",
    basePrice: 300,
    isEnabled: true,
    totalProviders: 45,
    totalBookings: 654
  },
  {
    id: "6",
    name: "Photography",
    icon: "📸",
    description: "Professional photography for events, portraits, and commercial needs",
    basePrice: 250,
    isEnabled: false,
    totalProviders: 67,
    totalBookings: 423
  },
];

export function ServicesManagement() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isEnabled: !service.isEnabled } : service
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Services Management
          </h1>
          <p className="text-gray-600">Manage service categories and settings</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </motion.button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${
              service.isEnabled ? 'border-cyan-200' : 'border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{service.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${service.basePrice}+
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{service.totalProviders} providers</span>
                    <span className="text-gray-400">•</span>
                    <span>{service.totalBookings} bookings</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            <p className="text-gray-600 text-sm mb-6">{service.description}</p>

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                service.isEnabled 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {service.isEnabled ? (
                  <>
                    <Eye className="w-4 h-4" />
                    Active
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Disabled
                  </>
                )}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleService(service.id)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  service.isEnabled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {service.isEnabled ? 'Disable' : 'Enable'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors"
              >
                <Edit className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Service</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                <input
                  type="text"
                  placeholder="e.g., HVAC Services"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  placeholder="🛠️"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the service..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price ($)</label>
                <input
                  type="number"
                  placeholder="150"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Add Service
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
