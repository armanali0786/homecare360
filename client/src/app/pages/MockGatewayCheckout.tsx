import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { ShieldCheck, Loader2, CreditCard, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { confirmGatewayPayment } from "../lib/api";

const GATEWAY_LABELS: Record<string, string> = {
  mada: "Mada",
  tabby: "Tabby",
  tamara: "Tamara",
};

export function MockGatewayCheckout() {
  const { t } = useTranslation("gateway");
  const { formatCurrency } = useLocale();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");

  const gateway = searchParams.get("gateway") || "";
  const sessionId = searchParams.get("session") || "";
  const bookingId = searchParams.get("bookingId") || "";
  const provider = searchParams.get("provider") || "";
  const amount = Number(searchParams.get("amount") || 0);
  const gatewayLabel = GATEWAY_LABELS[gateway] || gateway;

  const handleApprove = async () => {
    setStatus("processing");
    try {
      await confirmGatewayPayment(gateway, sessionId);
      setStatus("done");
      setTimeout(() => navigate(`/booking-success?bookingId=${bookingId}&paid=1`), 900);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#0d1f1f] text-white font-bold">
            {gatewayLabel.slice(0, 1)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#0d1f1f]">{t("title")}</h1>
            <p className="text-sm text-gray-500">{t("subtitle", { gateway: gatewayLabel })}</p>
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-gray-50 border border-gray-100 p-4 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{t("provider")}</span>
            <span className="font-medium text-[#0d1f1f]">{provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("amount")}</span>
            <span className="font-semibold text-[#0d1f1f]">{formatCurrency(amount)}</span>
          </div>
        </div>

        <p className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-3 mb-6">
          <ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5" />
          {t("sandboxNotice", { gateway: gatewayLabel })}
        </p>

        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-600 mb-4">
            <XCircle className="h-4 w-4" /> {t("error")}
          </p>
        )}

        {status === "done" ? (
          <p className="text-center text-sm font-medium text-[#00B8A9]">{t("success")}</p>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={handleApprove}
              disabled={status === "processing"}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0d1f1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d1f1f]/90 disabled:opacity-60"
            >
              {status === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> {t("processing")}
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" /> {t("approve")}
                </>
              )}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50"
            >
              {t("cancel")}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
