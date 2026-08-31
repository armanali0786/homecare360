import { motion } from "motion/react";
import { Search, CheckCircle2, XCircle, Shield, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAdminAllProviders, updateApplicationStatus } from "@/app/lib/api";
import { useLocale } from "@/app/context/LocaleContext";
import { toast } from "react-toastify";

export function ProviderManagement() {
  const { t } = useTranslation("admin");
  const { formatCurrency } = useLocale();
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const data = await getAdminAllProviders();
      setProviders(data.providers || []);
    } catch {
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProviders(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateApplicationStatus(id, status);
      toast.success(t("providers.toast.statusUpdated", { status: t(`providers.statusLabel.${status}`, { defaultValue: status }) }));
      fetchProviders();
    } catch (err: any) {
      toast.error(err.message || t("providers.toast.updateFailed"));
    }
  };

  const getDisplayName = (p: any) =>
    p.businessName || `${p.firstName || ""} ${p.lastName || ""}`.trim();

  const filteredProviders = providers.filter((p) => {
    const name = getDisplayName(p);
    const matchSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.serviceCategory?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {t("providers.title")}
        </h1>
        <p className="text-gray-600">{t("providers.subtitle")}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: t("providers.stats.total"), value: providers.length, color: "from-blue-500 to-cyan-600" },
          { label: t("providers.stats.approved"), value: providers.filter((p) => p.status === "approved").length, color: "from-green-500 to-emerald-600" },
          { label: t("providers.stats.pending"), value: providers.filter((p) => p.status === "pending").length, color: "from-yellow-500 to-orange-500" },
          { label: t("providers.stats.rejected"), value: providers.filter((p) => p.status === "rejected").length, color: "from-red-500 to-orange-600" },
        ].map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium mb-2`}>{stat.label}</div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder={t("providers.searchPlaceholder")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 shadow-sm" />
        </div>
        <div className="flex gap-3 flex-wrap">
          {["all", "approved", "pending", "rejected"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}>
              {t(`providers.filters.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Providers List */}
      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-28 animate-pulse" />)}</div>
      ) : filteredProviders.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">{t("providers.empty")}</p></div>
      ) : (
        <div className="space-y-4">
          {filteredProviders.map((provider, index) => (
            <motion.div key={provider._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.01, x: 4 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {getDisplayName(provider)[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800">{getDisplayName(provider)}</h3>
                        {provider.status === "approved" && <Shield className="w-4 h-4 text-cyan-600" />}
                      </div>
                      <p className="text-sm text-gray-600">
                        {t("providers.yearsExp", { category: provider.serviceCategory, years: provider.yearsExperience })}
                        {provider.gender && ` • ${t(`applications.gender.${provider.gender}`)}`}
                      </p>
                      <p className="text-sm text-gray-500">{provider.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      provider.status === "approved" ? "bg-green-100 text-green-700" :
                      provider.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {t(`providers.statusLabel.${provider.status}`, { defaultValue: provider.status })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{t("providers.perHour", { amount: formatCurrency(provider.hourlyRate) })}</span>
                    </div>
                    {provider.city && <span>📍 {[provider.city, provider.state].filter(Boolean).join(", ")}</span>}
                    <span>{t("providers.joinedOn", { date: new Date(provider.createdAt).toLocaleDateString() })}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {provider.status === "pending" && (
                    <>
                      <button onClick={() => handleStatusChange(provider._id, "approved")} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> {t("providers.actions.approve")}
                      </button>
                      <button onClick={() => handleStatusChange(provider._id, "rejected")} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> {t("providers.actions.reject")}
                      </button>
                    </>
                  )}
                  {provider.status === "approved" && (
                    <button onClick={() => handleStatusChange(provider._id, "rejected")} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                      {t("providers.actions.suspend")}
                    </button>
                  )}
                  {provider.status === "rejected" && (
                    <button onClick={() => handleStatusChange(provider._id, "approved")} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                      {t("providers.actions.reinstate")}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
