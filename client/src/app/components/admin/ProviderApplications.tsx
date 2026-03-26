import { motion } from "motion/react";
import { FileText, Eye, CheckCircle2, XCircle, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface Application {
  id: string;
  providerName: string;
  email: string;
  phone: string;
  service: string;
  experience: number;
  image: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  documents: {
    id: string;
    license: boolean;
    insurance: boolean;
    certifications: boolean;
  };
  notes: string;
}

const applications: Application[] = [
  {
    id: "1",
    providerName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    service: "Plumbing",
    experience: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3MzY4NzkyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    submittedDate: "Jan 24, 2026",
    status: "pending",
    documents: {
      id: "doc1",
      license: true,
      insurance: true,
      certifications: true
    },
    notes: ""
  },
  {
    id: "2",
    providerName: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 234-5678",
    service: "Cleaning",
    experience: 3,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTczNjg3OTI3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    submittedDate: "Jan 23, 2026",
    status: "pending",
    documents: {
      id: "doc2",
      license: true,
      insurance: false,
      certifications: true
    },
    notes: "Missing insurance documentation"
  },
  {
    id: "3",
    providerName: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+1 (555) 345-6789",
    service: "Electrical",
    experience: 7,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzY4NzkyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    submittedDate: "Jan 22, 2026",
    status: "pending",
    documents: {
      id: "doc3",
      license: true,
      insurance: true,
      certifications: true
    },
    notes: ""
  }
];

export function ProviderApplications() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

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
          Provider Applications
        </h1>
        <p className="text-gray-600">Review and process new provider applications</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Pending Review", value: applications.filter(a => a.status === "pending").length, color: "from-yellow-500 to-orange-500" },
          { label: "Approved Today", value: 5, color: "from-green-500 to-emerald-500" },
          { label: "Average Review Time", value: "2.5 hrs", color: "from-cyan-500 to-teal-500" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-medium mb-3`}>
              {stat.label}
            </div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {applications.map((application, index) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Provider Info */}
              <div className="flex items-start gap-4 flex-1">
                <ImageWithFallback
                  src={application.image}
                  alt={application.providerName}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{application.providerName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{application.service} • {application.experience} years experience</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📧 {application.email}</p>
                    <p>📱 {application.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    Submitted {application.submittedDate}
                  </div>
                </div>
              </div>

              {/* Documents Status */}
              <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Documents</h4>
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center gap-2 ${application.documents.license ? 'text-green-600' : 'text-red-600'}`}>
                    {application.documents.license ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    License
                  </div>
                  <div className={`flex items-center gap-2 ${application.documents.insurance ? 'text-green-600' : 'text-red-600'}`}>
                    {application.documents.insurance ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    Insurance
                  </div>
                  <div className={`flex items-center gap-2 ${application.documents.certifications ? 'text-green-600' : 'text-red-600'}`}>
                    {application.documents.certifications ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    Certifications
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 min-w-[150px]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedApplication(application)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Review
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </motion.button>
              </div>
            </div>

            {/* Notes */}
            {application.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span className="text-gray-600">{application.notes}</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedApplication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedApplication(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Review</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={selectedApplication.image}
                  alt={selectedApplication.providerName}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedApplication.providerName}</h3>
                  <p className="text-gray-600">{selectedApplication.service}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Document Preview</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">License.pdf</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Insurance.pdf</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Cert.pdf</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                <textarea
                  rows={4}
                  placeholder="Add internal notes about this application..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedApplication(null)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reject Application
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Approve Application
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
