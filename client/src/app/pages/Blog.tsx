import { motion } from "motion/react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { SEO } from "@/app/components/SEO";

export function Blog() {
  const posts = [
    {
      title: "10 Essential Home Maintenance Tips for Spring",
      excerpt: "Get your home ready for the warmer months with these essential maintenance tasks that every homeowner should know.",
      author: "Sarah Johnson",
      date: "March 8, 2026",
      category: "Home Maintenance",
      readTime: "5 min read",
    },
    {
      title: "How to Choose the Right Service Professional",
      excerpt: "Learn the key factors to consider when selecting a service professional for your home projects.",
      author: "Mike Chen",
      date: "March 5, 2026",
      category: "Tips & Guides",
      readTime: "7 min read",
    },
    {
      title: "The Ultimate Guide to Home Energy Efficiency",
      excerpt: "Discover practical ways to reduce your energy bills and make your home more environmentally friendly.",
      author: "Emily Davis",
      date: "March 1, 2026",
      category: "Energy Efficiency",
      readTime: "10 min read",
    },
    {
      title: "5 Signs You Need Professional Plumbing Help",
      excerpt: "Don't ignore these warning signs that indicate it's time to call a professional plumber.",
      author: "David Martinez",
      date: "February 28, 2026",
      category: "Plumbing",
      readTime: "4 min read",
    },
    {
      title: "Creating a Beautiful Low-Maintenance Garden",
      excerpt: "Transform your outdoor space with these landscaping ideas that look great without requiring constant upkeep.",
      author: "Lisa Thompson",
      date: "February 25, 2026",
      category: "Landscaping",
      readTime: "8 min read",
    },
    {
      title: "Smart Home Technology Trends for 2026",
      excerpt: "Explore the latest smart home innovations that can make your life easier and your home more efficient.",
      author: "Tom Wilson",
      date: "February 22, 2026",
      category: "Technology",
      readTime: "6 min read",
    },
  ];

  const categories = ["All", "Home Maintenance", "Tips & Guides", "Energy Efficiency", "Plumbing", "Landscaping", "Technology"];

  return (
    <div className="w-full">
      <SEO
        title="Blog"
        url="/blog"
        description="Explore home care tips, guides, and expert advice on elder care, home maintenance, and caregiver best practices from the Homecare360 team."
        keywords="home care blog, caregiving tips, elder care guide, home maintenance tips, caregiver advice"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Tips, guides, and insights to help you maintain and improve your home
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                  index === 0
                    ? "bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#00B8A9] to-[#2B5F5F] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                    Blog Image
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#00B8A9]">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00B8A9] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  {/* Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-1 text-[#00B8A9] font-medium hover:text-[#2B5F5F] transition-colors"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
