import { Share2 } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  label?: string;
}

export function ShareButton({
  title,
  text,
  url = "https://homecare360.netlify.app",
  className = "",
  label,
}: ShareButtonProps) {
  const { t } = useTranslation("auth");
  const resolvedTitle = title ?? t("shareButton.defaultTitle");
  const resolvedText = text ?? t("shareButton.defaultText");
  const resolvedLabel = label ?? t("shareButton.share");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: resolvedTitle, text: resolvedText, url });
      } catch (err) {
        // User cancelled — not an error worth surfacing
        if (err instanceof Error && err.name !== "AbortError") {
          fallbackCopy(url);
        }
      }
    } else {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success(t("shareButton.linkCopied")))
      .catch(() => toast.error(t("shareButton.couldNotCopy")));
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
      aria-label={t("shareButton.ariaLabel")}
    >
      <Share2 size={16} />
      {resolvedLabel}
    </button>
  );
}
