import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@/app/context/LocaleContext";
import { quoteAssistantChat, type QuoteAssistantMessage } from "@/app/lib/api";

interface AssistantQuote {
  service: string;
  serviceId?: string;
  propertyType: string;
  propertySize: string;
  urgency: string;
  estimatedTotal: number;
  addOnsSuggested: string[];
}

export function QuoteAssistantChat() {
  const { t } = useTranslation("booking");
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<QuoteAssistantMessage[]>([
    { role: "assistant", content: t("quoteEstimator.assistant.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [quote, setQuote] = useState<AssistantQuote | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages: QuoteAssistantMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const res = await quoteAssistantChat(nextMessages);
      setMessages([...nextMessages, { role: "assistant", content: res.reply }]);
      if (res.quote) setQuote(res.quote);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: t("quoteEstimator.assistant.error") }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[560px] bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold">{t("quoteEstimator.assistant.title")}</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-[#0d1f1f] text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </motion.div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          </div>
        )}

        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#00B8A9]/30 bg-cyan-50 p-4 mt-2"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#00B8A9] mb-1">
              {t("quoteEstimator.assistant.quoteReady")}
            </p>
            <p className="text-2xl font-bold text-[#0d1f1f] mb-3">{formatCurrency(quote.estimatedTotal)}</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/services?service=${encodeURIComponent(quote.service)}`)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-xl text-sm font-semibold"
            >
              {t("quoteEstimator.assistant.browseProviders", { service: quote.service })}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={t("quoteEstimator.assistant.inputPlaceholder")}
          className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#00B8A9]"
        />
        <button
          onClick={handleSend}
          disabled={sending || !input.trim()}
          className="grid place-items-center w-10 h-10 rounded-full bg-[#00B8A9] text-white disabled:opacity-40 flex-shrink-0"
          aria-label={t("quoteEstimator.assistant.send")}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
