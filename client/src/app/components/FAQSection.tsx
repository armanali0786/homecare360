import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const faqIds = ["booking", "verified", "notHappy", "cancellation", "payments", "support"];

export function FAQSection() {
  const { t } = useTranslation("home");
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">{t("faq.tag")}</span>
          <h2 className="mt-3 text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
            {t("faq.title")}
          </h2>
          <p className="mt-4 max-w-sm text-gray-500">
            {t("faq.subtitle")}
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-[#0d1f1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d1f1f]/90"
          >
            {t("faq.contactSupport")}
          </a>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          {faqIds.map((id, i) => {
            const isOpen = open === i;
            return (
              <div
                key={id}
                className={`overflow-hidden rounded-2xl border bg-white transition-all ${isOpen ? "shadow-md" : ""}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-[#0d1f1f]">{t(`faq.items.${id}.q`)}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-[#00B8A9] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-gray-500">{t(`faq.items.${id}.a`)}</p>
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
