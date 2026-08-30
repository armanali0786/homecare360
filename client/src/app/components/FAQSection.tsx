import { useState } from "react";
import { Plus, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const faqIds = ["booking", "verified", "cancellation", "payments", "weekendSlots", "guarantee"];

export function FAQSection() {
  const { t } = useTranslation("home");
  const [open, setOpen] = useState(0);

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Hi HomeCare360 Support, I have a question about booking home services in UAE/GCC.");
    window.open(`https://wa.me/917319977276?text=${text}`, "_blank");
  };

  return (
    <section className="bg-gradient-to-b from-white via-teal-50/20 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00B8A9]">{t("faq.tag")}</span>
          <h2 className="mt-3 text-3xl font-black text-[#0D1F1F] md:text-5xl">
            {t("faq.title")}
          </h2>
          <p className="mt-4 max-w-sm text-gray-500 text-sm md:text-base leading-relaxed">
            {t("faq.subtitle")}
          </p>
          <button
            onClick={handleWhatsAppChat}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-7 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" />
            {t("faq.contactSupport")}
          </button>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {faqIds.map((id, i) => {
            const isOpen = open === i;
            return (
              <div
                key={id}
                className={`overflow-hidden rounded-3xl border bg-white transition-all duration-200 ${isOpen ? "border-[#00B8A9] shadow-xl" : "border-gray-100 shadow-sm hover:border-gray-200"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left rtl:text-right"
                >
                  <span className="text-base font-bold text-[#0D1F1F]">{t(`faq.items.${id}.q`)}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-[#00B8A9] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-6 text-sm leading-relaxed text-gray-600 border-t border-gray-50 pt-3">{t(`faq.items.${id}.a`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
