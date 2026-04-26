import { Share2 } from "lucide-react";
import { toast } from "react-toastify";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  label?: string;
}

export function ShareButton({
  title = "Homecare360 - Professional Home Care Services",
  text = "Find trusted home care providers near you with Homecare360.",
  url = "https://homecare360.netlify.app",
  className = "",
  label = "Share",
}: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
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
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Could not copy link."));
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
      aria-label="Share this page"
    >
      <Share2 size={16} />
      {label}
    </button>
  );
}
