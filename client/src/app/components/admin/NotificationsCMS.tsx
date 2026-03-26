import { motion } from "motion/react";
import { Bell, Mail, Edit, Save, Eye } from "lucide-react";
import { useState } from "react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  lastUpdated: string;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Booking Confirmation",
    subject: "Your booking has been confirmed!",
    description: "Sent to users when they successfully book a service",
    lastUpdated: "Jan 20, 2026"
  },
  {
    id: "2",
    name: "Provider Approval",
    subject: "Welcome to HomeCare360 - You're approved!",
    description: "Sent to providers when their application is approved",
    lastUpdated: "Jan 18, 2026"
  },
  {
    id: "3",
    name: "Payment Confirmation",
    subject: "Payment received - Thank you!",
    description: "Sent to users after successful payment",
    lastUpdated: "Jan 15, 2026"
  },
  {
    id: "4",
    name: "Booking Reminder",
    subject: "Reminder: Your service is tomorrow",
    description: "Sent 24 hours before scheduled service",
    lastUpdated: "Jan 12, 2026"
  },
];

export function NotificationsCMS() {
  const [activeTab, setActiveTab] = useState<"notifications" | "emails" | "content">("notifications");
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
          Notifications & Content Management
        </h1>
        <p className="text-gray-600">Manage platform notifications, emails, and content</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {[
          { id: "notifications", label: "Platform Notifications", icon: Bell },
          { id: "emails", label: "Email Templates", icon: Mail },
          { id: "content", label: "Content Management", icon: Edit }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-cyan-600 text-cyan-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send Platform Notification</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Group</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                  <option>All Users</option>
                  <option>All Providers</option>
                  <option>New Users (Last 30 days)</option>
                  <option>Active Providers</option>
                  <option>Custom Selection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
                <input
                  type="text"
                  placeholder="Enter notification title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter notification message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Send as push notification</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Send as email</span>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
              >
                Send Notification
              </motion.button>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Notifications</h2>
            <div className="space-y-3">
              {[
                { title: "New Feature Launch", message: "Check out our new instant booking feature!", date: "Jan 23, 2026", recipients: "All Users" },
                { title: "Maintenance Notice", message: "Scheduled maintenance on Jan 30", date: "Jan 20, 2026", recipients: "All Users" },
                { title: "New Provider Benefits", message: "Earn 20% more this month!", date: "Jan 15, 2026", recipients: "All Providers" },
              ].map((notif, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{notif.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{notif.date}</span>
                        <span>•</span>
                        <span>To: {notif.recipients}</span>
                      </div>
                    </div>
                    <Bell className="w-5 h-5 text-cyan-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Email Templates Tab */}
      {activeTab === "emails" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {emailTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedTemplate(template);
                  setIsEditing(false);
                }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-cyan-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-cyan-600" />
                  </div>
                  <span className="text-xs text-gray-500">{template.lastUpdated}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <p className="text-sm font-medium text-cyan-600">Subject: {template.subject}</p>
              </motion.div>
            ))}
          </div>

          {/* Template Editor Modal */}
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTemplate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedTemplate.name}</h2>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                    <input
                      type="text"
                      defaultValue={selectedTemplate.subject}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
                    <textarea
                      rows={12}
                      disabled={!isEditing}
                      defaultValue="Hi {{user_name}},\n\nYour booking has been confirmed!\n\nBooking Details:\n- Service: {{service_name}}\n- Provider: {{provider_name}}\n- Date: {{booking_date}}\n- Time: {{booking_time}}\n\nThank you for choosing HomeCare360!\n\nBest regards,\nThe HomeCare360 Team"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm disabled:bg-gray-50"
                    />
                  </div>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2 font-medium">Available Variables:</p>
                    <div className="flex flex-wrap gap-2">
                      {["{{user_name}}", "{{service_name}}", "{{provider_name}}", "{{booking_date}}", "{{booking_time}}", "{{price}}"].map((variable) => (
                        <code key={variable} className="px-2 py-1 bg-white border border-cyan-300 rounded text-xs text-cyan-700">
                          {variable}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </motion.button>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Content Management Tab */}
      {activeTab === "content" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Homepage Content</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Section Title</label>
                <input
                  type="text"
                  defaultValue="Find Trusted Local Service Providers"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Section Subtitle</label>
                <textarea
                  rows={2}
                  defaultValue="Connect with verified professionals for all your home service needs. Book, pay, and review - all in one place."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">"How It Works" Content</label>
                <div className="space-y-3">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step}
                      </div>
                      <input
                        type="text"
                        defaultValue={step === 1 ? "Search & Compare" : step === 2 ? "Book & Pay Securely" : "Review & Repeat"}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits Section</label>
                <textarea
                  rows={4}
                  defaultValue="• Verified professionals with real reviews\n• Secure payment with escrow protection\n• 24/7 customer support\n• Money-back guarantee"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
              >
                Save Content Changes
              </motion.button>
            </div>
          </div>

          {/* Additional Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-600 mb-4">Last updated: Jan 15, 2026</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                Edit Content
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600 mb-4">Last updated: Jan 15, 2026</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                Edit Content
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">FAQ Section</h3>
              <p className="text-sm text-gray-600 mb-4">23 questions</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                Manage FAQs
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">About Us</h3>
              <p className="text-sm text-gray-600 mb-4">Company information</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                Edit Content
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
