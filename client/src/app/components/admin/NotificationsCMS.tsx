import { motion } from "motion/react";
import { Bell, Mail, Edit, Save, Eye } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface EmailTemplate {
  id: string;
  nameKey: string;
  subjectKey: string;
  descriptionKey: string;
  lastUpdated: string;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "1",
    nameKey: "notifications.emailTemplates.items.bookingConfirmation.name",
    subjectKey: "notifications.emailTemplates.items.bookingConfirmation.subject",
    descriptionKey: "notifications.emailTemplates.items.bookingConfirmation.description",
    lastUpdated: "Jan 20, 2026"
  },
  {
    id: "2",
    nameKey: "notifications.emailTemplates.items.providerApproval.name",
    subjectKey: "notifications.emailTemplates.items.providerApproval.subject",
    descriptionKey: "notifications.emailTemplates.items.providerApproval.description",
    lastUpdated: "Jan 18, 2026"
  },
  {
    id: "3",
    nameKey: "notifications.emailTemplates.items.paymentConfirmation.name",
    subjectKey: "notifications.emailTemplates.items.paymentConfirmation.subject",
    descriptionKey: "notifications.emailTemplates.items.paymentConfirmation.description",
    lastUpdated: "Jan 15, 2026"
  },
  {
    id: "4",
    nameKey: "notifications.emailTemplates.items.bookingReminder.name",
    subjectKey: "notifications.emailTemplates.items.bookingReminder.subject",
    descriptionKey: "notifications.emailTemplates.items.bookingReminder.description",
    lastUpdated: "Jan 12, 2026"
  },
];

export function NotificationsCMS() {
  const { t } = useTranslation("admin");
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
          {t("notifications.title")}
        </h1>
        <p className="text-gray-600">{t("notifications.subtitle")}</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {[
          { id: "notifications", label: t("notifications.tabs.notifications"), icon: Bell },
          { id: "emails", label: t("notifications.tabs.emails"), icon: Mail },
          { id: "content", label: t("notifications.tabs.content"), icon: Edit }
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
            <h2 className="text-xl font-bold text-gray-800 mb-6">{t("notifications.form.title")}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.form.recipientGroup")}</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                  <option>{t("notifications.form.recipients.allUsers")}</option>
                  <option>{t("notifications.form.recipients.allProviders")}</option>
                  <option>{t("notifications.form.recipients.newUsers")}</option>
                  <option>{t("notifications.form.recipients.activeProviders")}</option>
                  <option>{t("notifications.form.recipients.custom")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.form.titleLabel")}</label>
                <input
                  type="text"
                  placeholder={t("notifications.form.titlePlaceholder")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.form.messageLabel")}</label>
                <textarea
                  rows={4}
                  placeholder={t("notifications.form.messagePlaceholder")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{t("notifications.form.pushCheckbox")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{t("notifications.form.emailCheckbox")}</span>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
              >
                {t("notifications.form.send")}
              </motion.button>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t("notifications.recent.title")}</h2>
            <div className="space-y-3">
              {[
                { title: t("notifications.recent.samples.item1.title"), message: t("notifications.recent.samples.item1.message"), date: "Jan 23, 2026", recipients: t("notifications.form.recipients.allUsers") },
                { title: t("notifications.recent.samples.item2.title"), message: t("notifications.recent.samples.item2.message"), date: "Jan 20, 2026", recipients: t("notifications.form.recipients.allUsers") },
                { title: t("notifications.recent.samples.item3.title"), message: t("notifications.recent.samples.item3.message"), date: "Jan 15, 2026", recipients: t("notifications.form.recipients.allProviders") },
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
                        <span>{t("notifications.recent.toLabel", { recipients: notif.recipients })}</span>
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
                <h3 className="text-lg font-bold text-gray-800 mb-2">{t(template.nameKey)}</h3>
                <p className="text-sm text-gray-600 mb-3">{t(template.descriptionKey)}</p>
                <p className="text-sm font-medium text-cyan-600">{t("notifications.emailTemplates.subjectPrefix", { subject: t(template.subjectKey) })}</p>
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
                  <h2 className="text-2xl font-bold text-gray-800">{t(selectedTemplate.nameKey)}</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.modal.subjectLabel")}</label>
                    <input
                      type="text"
                      defaultValue={t(selectedTemplate.subjectKey)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.modal.bodyLabel")}</label>
                    <textarea
                      rows={12}
                      disabled={!isEditing}
                      defaultValue={t("notifications.modal.sampleBody").replace(/\[\[/g, "{{").replace(/\]\]/g, "}}")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm disabled:bg-gray-50"
                    />
                  </div>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2 font-medium">{t("notifications.modal.availableVariables")}</p>
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
                    {t("notifications.modal.close")}
                  </motion.button>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      {t("notifications.modal.saveChanges")}
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
            <h2 className="text-xl font-bold text-gray-800 mb-6">{t("notifications.content.homepageTitle")}</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.content.heroTitleLabel")}</label>
                <input
                  type="text"
                  defaultValue={t("notifications.content.heroTitleValue")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.content.heroSubtitleLabel")}</label>
                <textarea
                  rows={2}
                  defaultValue={t("notifications.content.heroSubtitleValue")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.content.howItWorksLabel")}</label>
                <div className="space-y-3">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step}
                      </div>
                      <input
                        type="text"
                        defaultValue={step === 1 ? t("notifications.content.steps.step1") : step === 2 ? t("notifications.content.steps.step2") : t("notifications.content.steps.step3")}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("notifications.content.benefitsLabel")}</label>
                <textarea
                  rows={4}
                  defaultValue={t("notifications.content.benefitsValue")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
              >
                {t("notifications.content.saveButton")}
              </motion.button>
            </div>
          </div>

          {/* Additional Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">{t("notifications.content.cards.terms.title")}</h3>
              <p className="text-sm text-gray-600 mb-4">{t("notifications.content.lastUpdatedSample")}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                {t("notifications.content.editContentButton")}
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">{t("notifications.content.cards.privacy.title")}</h3>
              <p className="text-sm text-gray-600 mb-4">{t("notifications.content.lastUpdatedSample")}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                {t("notifications.content.editContentButton")}
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">{t("notifications.content.cards.faq.title")}</h3>
              <p className="text-sm text-gray-600 mb-4">{t("notifications.content.cards.faq.subtitle")}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                {t("notifications.content.cards.faq.button")}
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="font-bold text-gray-800 mb-2">{t("notifications.content.cards.about.title")}</h3>
              <p className="text-sm text-gray-600 mb-4">{t("notifications.content.cards.about.subtitle")}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium"
              >
                {t("notifications.content.editContentButton")}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
