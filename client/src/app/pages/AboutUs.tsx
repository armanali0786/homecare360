import { motion } from "motion/react";
import { Users, Target, Award, Heart } from "lucide-react";
import { SEO } from "@/app/components/SEO";

export function AboutUs() {
  const values = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      description: "To connect homeowners with trusted service professionals, making home maintenance simple and stress-free.",
    },
    {
      icon: <Heart size={32} />,
      title: "Our Values",
      description: "Trust, quality, and customer satisfaction are at the core of everything we do.",
    },
    {
      icon: <Users size={32} />,
      title: "Our Team",
      description: "A dedicated group of professionals committed to delivering exceptional service experiences.",
    },
    {
      icon: <Award size={32} />,
      title: "Our Promise",
      description: "100% satisfaction guaranteed on every service, every time.",
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title="About Us"
        url="/about-us"
        description="Learn about Homecare360's mission to connect families with trusted, verified home care professionals. Compassionate care delivered to your doorstep."
        keywords="about homecare360, our mission, home care team, trusted caregivers, home care values"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            About <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">HomeCare360</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Your trusted partner in connecting homeowners with professional service providers since 2020
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              HomeCare360 was founded with a simple mission: to make finding and booking home services as easy as possible. We recognized the challenges homeowners face when searching for reliable, trustworthy service professionals, and we set out to solve this problem.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we're proud to serve thousands of customers across the country, connecting them with verified professionals for everything from plumbing and electrical work to cleaning and landscaping. Our platform combines cutting-edge technology with a human touch to ensure every service experience exceeds expectations.
            </p>
            <p className="text-gray-600">
              We believe that maintaining your home should be simple, transparent, and stress-free. That's why we've built a platform that prioritizes trust, quality, and customer satisfaction above all else.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            What Drives Us
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] text-white rounded-2xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "10K+", label: "Verified Professionals" },
              { number: "100K+", label: "Services Completed" },
              { number: "4.9★", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
