import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gradient-to-br from-[#E0F7F5] via-white to-[#E0F7F5]">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-600 mb-8 max-w-md mx-auto"
        >
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#00B8A9] border-2 border-[#00B8A9] rounded-lg font-medium hover:bg-[#E0F7F5] transition-all"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
