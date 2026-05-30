import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const faqs = [
  {
    q: "How are professionals verified on HomeCare360?",
    a: "Every provider on our platform goes through a multi-step verification — government ID check, address verification, professional skill assessment, and reference checks. Only providers who pass all stages receive our verified badge.",
  },
  {
    q: "What if I'm not satisfied with the service?",
    a: "We offer a 100% satisfaction guarantee. If the work isn't done to your expectations, contact our support team within 24 hours and we'll arrange a free redo or issue a full refund — no questions asked.",
  },
  {
    q: "Can I reschedule or cancel my booking?",
    a: "Yes, you can reschedule or cancel for free up to 4 hours before the scheduled appointment. Cancellations within 4 hours may incur a small convenience fee to compensate the provider for their reserved slot.",
  },
  {
    q: "How does payment work? Is it safe?",
    a: "We use an escrow payment system — your money is held securely and only released to the provider after you confirm the job is completed to your satisfaction. We support UPI, debit/credit cards, net banking, and wallets.",
  },
  {
    q: "What if the professional doesn't show up?",
    a: "If your scheduled provider doesn't show up, our system automatically alerts our support team. We'll arrange a replacement provider at the earliest available slot or issue a full refund — whichever you prefer.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. The price you see when you confirm your booking is exactly what you pay. We show all applicable taxes and charges upfront before you complete the booking. No surprise fees, ever.",
  },
  {
    q: "How do I contact support if there's an issue?",
    a: "Our support team is available 24/7 via live chat in the app, WhatsApp at +91 73199 77276, or email at support@homecare360.in. We typically respond within 5 minutes during business hours.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-[#00B8A9] bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Everything you need to know before booking your first service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 data-[state=open]:border-cyan-100 data-[state=open]:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-gray-900 py-5 hover:no-underline hover:text-[#00B8A9] transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
