import { motion } from "motion/react";
import { FileText, Eye, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAdminApplications, updateApplicationStatus } from "@/app/lib/api";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { toast } from "react-toastify";

export function ProviderApplications() {
  const { t } = useTranslation("admin");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await getAdminApplications();
      setApplications(data.applications || []);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleStatus = async (id: string, status: string) => {
    try {
      await updateApplicationStatus(id, status);
      toast.success(t("applications.toast.statusUpdated", { status: t(`applications.statusLabel.${status}`, { defaultValue: status }) }));
      setSelectedApplication(null);
      fetchApplications();
    } catch (err: any) {
      toast.error(err.message || t("applications.toast.updateFailed"));
    }
  };

  const pending = applications.filter((a) => a.status === "pending");
  const approved = applications.filter((a) => a.status === "approved");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {t("applications.title")}
        </h1>
        <p className="text-gray-600">{t("applications.subtitle")}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: t("applications.stats.pendingReview"), value: pending.length, color: "from-yellow-500 to-orange-500" },
          { label: t("applications.stats.approved"), value: approved.length, color: "from-green-500 to-emerald-500" },
          { label: t("applications.stats.total"), value: applications.length, color: "from-cyan-500 to-teal-500" },
        ].map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium mb-3`}>{stat.label}</div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="space-y-6">{[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-xl shadow-lg h-40 animate-pulse" />)}</div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow"><p className="text-gray-500">{t("applications.empty")}</p></div>
      ) : (
        <div className="space-y-6">
          {applications.map((application, index) => (
            <motion.div
              key={application._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 4 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {(application.firstName || application.businessName || "P")[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {application.businessName || `${application.firstName} ${application.lastName}`}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {application.serviceCategory} • {application.yearsExperience} years experience
                    </p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📧 {application.email}</p>
                      <p>📱 {application.phone}</p>
                      {application.city && <p>📍 {[application.city, application.state].filter(Boolean).join(", ")}</p>}
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {t("applications.submittedOn", { date: new Date(application.createdAt).toLocaleDateString() })}
                    </div>
                  </div>
                </div>

                {/* Documents Status */}
                <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">{t("applications.documents.title")}</h4>
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center gap-2 ${application.documents?.idDocument ? "text-green-600" : "text-red-600"}`}>
                      {application.documents?.idDocument ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {t("applications.documents.id")}
                    </div>
                    <div className={`flex items-center gap-2 ${application.documents?.licenseDocument ? "text-green-600" : "text-red-600"}`}>
                      {application.documents?.licenseDocument ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {t("applications.documents.license")}
                    </div>
                    <div className={`flex items-center gap-2 ${application.documents?.insuranceDocument ? "text-green-600" : "text-red-600"}`}>
                      {application.documents?.insuranceDocument ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {t("applications.documents.insurance")}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      application.status === "approved" ? "bg-green-100 text-green-700" :
                      application.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {t(`applications.statusLabel.${application.status}`, { defaultValue: application.status })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {application.status === "pending" && (
                  <div className="flex flex-col gap-2 min-w-[150px]">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedApplication(application)} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                      <Eye className="w-4 h-4" /> {t("applications.actions.review")}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleStatus(application._id, "approved")} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium">
                      <CheckCircle2 className="w-4 h-4" /> {t("applications.actions.approve")}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleStatus(application._id, "rejected")} className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
                      <XCircle className="w-4 h-4" /> {t("applications.actions.reject")}
                    </motion.button>
                  </div>
                )}
              </div>

              {application.description && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">{application.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedApplication && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedApplication(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("applications.modal.title")}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedApplication.businessName || `${selectedApplication.firstName} ${selectedApplication.lastName}`}</h3>
                <p className="text-gray-600">{selectedApplication.serviceCategory} • {selectedApplication.yearsExperience} years</p>
                <p className="text-sm text-gray-500 mt-1">{selectedApplication.email} | {selectedApplication.phone}</p>
              </div>
              {selectedApplication.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{t("applications.modal.description")}</h4>
                  <p className="text-sm text-gray-600">{selectedApplication.description}</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">{t("applications.modal.uploadedDocuments")}</h4>
                <div className="grid grid-cols-3 gap-4">
                  {["idDocument", "licenseDocument", "insuranceDocument"].map((doc) => (
                    <div key={doc} className="bg-white rounded-lg p-4 text-center">
                      <FileText className={`w-8 h-8 mx-auto mb-2 ${selectedApplication.documents?.[doc] ? "text-cyan-600" : "text-gray-300"}`} />
                      <p className="text-xs font-medium text-gray-600">
                        {doc === "idDocument" ? t("applications.modal.docShortId") : doc === "licenseDocument" ? t("applications.modal.docShortLicense") : t("applications.modal.docShortInsurance")}
                      </p>
                      <p className="text-xs text-gray-400">{selectedApplication.documents?.[doc] ? t("applications.documents.uploaded") : t("applications.documents.missing")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedApplication(null)} className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">{t("applications.actions.close")}</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStatus(selectedApplication._id, "rejected")} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">{t("applications.actions.reject")}</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleStatus(selectedApplication._id, "approved")} className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">{t("applications.actions.approve")}</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
