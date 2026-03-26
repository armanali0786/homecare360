import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset link sent to your email");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#E0F7F5] via-white to-[#E0F7F5]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >

        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">H</span>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-600">
              Enter your email to receive a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8A9] focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            {/* Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Send Reset Link
            </motion.button>
          </form>

          {/* Back to Login */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6 text-gray-600"
          >
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#00B8A9] hover:text-[#2B5F5F] font-medium"
            >
              Back to Login
            </Link>
          </motion.p>

        </motion.div>
      </motion.div>
    </div>
  );
}