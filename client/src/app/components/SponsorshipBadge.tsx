import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SponsorshipBadgeProps {
  className?: string;
}

/** Shown on a provider's card/profile once their sponsorship & visa documents are verified (see ComplianceReview in the admin panel). */
export function SponsorshipBadge({ className = "" }: SponsorshipBadgeProps) {
  const { t } = useTranslation("compliance");

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full ${className}`}
    >
      <ShieldCheck className="w-3 h-3" />
      {t("badge")}
    </span>
  );
}
