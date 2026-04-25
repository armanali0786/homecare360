import { motion } from "motion/react";
import { Plus, Edit, Trash2, Eye, EyeOff, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "@/app/lib/api";
import { toast } from "react-toastify";

export function ServicesManagement() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", icon: "🔧", description: "", basePrice: 100 });
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data.services || []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleToggle = async (service: any) => {
    try {
      await updateService(service._id, { isEnabled: !service.isEnabled });
      toast.success(`Service ${service.isEnabled ? "disabled" : "enabled"}`);
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted");
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const openEdit = (service: any) => {
    setEditingService(service);
    setForm({ name: service.name, icon: service.icon, description: service.description, basePrice: service.basePrice });
    setShowAddModal(true);
  };

  const openAdd = () => {
    setEditingService(null);
    setForm({ name: "", icon: "🔧", description: "", basePrice: 100 });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Service name is required"); return; }
    setSaving(true);
    try {
      if (editingService) {
        await updateService(editingService._id, form);
        toast.success("Service updated");
      } else {
        await createService(form);
        toast.success("Service created");
      }
      setShowAddModal(false);
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
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
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </motion.button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-48 animate-pulse" />)}
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow">
          <p className="text-gray-500 mb-4">No services yet. Add your first service category.</p>
          <button onClick={openAdd} className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 py-2 rounded-lg">Add Service</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${service.isEnabled ? "border-cyan-200" : "border-gray-200 opacity-75"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{service.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ₹{service.basePrice}+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">{service.description}</p>
              <div className="mb-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${service.isEnabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                  {service.isEnabled ? <><Eye className="w-4 h-4" /> Active</> : <><EyeOff className="w-4 h-4" /> Disabled</>}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleToggle(service)} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${service.isEnabled ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                  {service.isEnabled ? "Disable" : "Enable"}
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openEdit(service)} className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors">
                  <Edit className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(service._id)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showAddModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingService ? "Edit Service" : "Add New Service"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                <input type="text" placeholder="e.g., HVAC Services" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
                <input type="text" placeholder="🛠️" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea rows={3} placeholder="Describe the service..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (₹)</label>
                <input type="number" placeholder="150" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-60">
                {saving ? "Saving..." : editingService ? "Update Service" : "Add Service"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
