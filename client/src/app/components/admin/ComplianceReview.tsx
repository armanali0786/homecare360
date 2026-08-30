import { motion } from "motion/react";
import { FileText, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getComplianceQueue, updateComplianceStatus } from "@/app/lib/api";
import { toast } from "react-toastify";

const FILTERS = ["all", "pending", "verified", "rejected"] as const;
type Filter = (typeof FILTERS)[number];

export function ComplianceReview() {
  const { t } = useTranslation("compliance");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [notes, setNotes] = useState<Record<string, string>>({});

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const data = await getComplianceQueue();
      setApplications(data.applications || []);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQueue(); }, []);

  const handleStatus = async (id: string, complianceStatus: string) => {
    try {
      await updateComplianceStatus(id, complianceStatus, notes[id]);
      toast.success(t("queue.toast.updated"));
      fetchQueue();
    } catch (err: any) {
      toast.error(err.message || t("queue.toast.updateFailed"));
    }
  };

  const pending = applications.filter((a) => a.complianceStatus === "pending");
  const verified = applications.filter((a) => a.complianceStatus === "verified");
  const rejected = applications.filter((a) => a.complianceStatus === "rejected");

  const visible = filter === "all" ? applications : applications.filter((a) => a.complianceStatus === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {t("queue.title")}
        </h1>
        <p className="text-gray-600">{t("queue.subtitle")}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: t("queue.stats.pending"), value: pending.length, color: "from-yellow-500 to-orange-500" },
          { label: t("queue.stats.verified"), value: verified.length, color: "from-green-500 to-emerald-500" },
          { label: t("queue.stats.rejected"), value: rejected.length, color: "from-red-500 to-rose-500" },
        ].map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium mb-3`}>{stat.label}</div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? "bg-cyan-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {t(`queue.filters.${f}`)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-6">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-40 animate-pulse" />)}</div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">{t("queue.empty")}</p></div>
      ) : (
        <div className="space-y-6">
          {visible.map((application, index) => (
            <motion.div
              key={application._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {(application.firstName || application.businessName || "P")[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {application.businessName || `${application.firstName} ${application.lastName}`}
                      </h3>
                      {application.complianceStatus === "verified" && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" /> {t("badge")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{application.serviceCategory}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      application.complianceStatus === "verified" ? "bg-green-100 text-green-700" :
                      application.complianceStatus === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {t(`queue.statusLabel.${application.complianceStatus}`, { defaultValue: application.complianceStatus })}
                    </span>
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-gray-50 rounded-lg p-4 min-w-[220px]">
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center gap-2 ${application.documents?.visaDocument ? "text-green-600" : "text-red-600"}`}>
                      {application.documents?.visaDocument ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {t("queue.documents.visa")}
                    </div>
                    <div className={`flex items-center gap-2 ${application.documents?.sponsorshipDocument ? "text-green-600" : "text-red-600"}`}>
                      {application.documents?.sponsorshipDocument ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {t("queue.documents.sponsorship")}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {application.complianceStatus === "pending" && (
                  <div className="flex flex-col gap-2 min-w-[220px]">
                    <input
                      value={notes[application._id] || ""}
                      onChange={(e) => setNotes((n) => ({ ...n, [application._id]: e.target.value }))}
                      placeholder={t("queue.notesPlaceholder")}
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
                    />
                    <div className="flex gap-2">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleStatus(application._id, "verified")} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4" /> {t("queue.actions.verify")}
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleStatus(application._id, "rejected")} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm">
                        <XCircle className="w-4 h-4" /> {t("queue.actions.reject")}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>

              {application.complianceNotes && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-start gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {application.complianceNotes}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
