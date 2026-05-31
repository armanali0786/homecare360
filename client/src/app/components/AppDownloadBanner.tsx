import { motion } from "motion/react";
import { ArrowRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppDownloadBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-[#0d1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#00B8A9]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5 text-[#00B8A9]" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                Get 10% off your first booking.
              </p>
              <p className="text-white/50 text-sm mt-0.5">
                Valid for new users only. Use code{" "}
                <span className="text-[#00B8A9] font-semibold">WELCOME10</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 bg-[#00B8A9] hover:bg-[#009e96] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0"
          >
            Book now <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
