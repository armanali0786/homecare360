import { motion } from "motion/react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/app/components/SEO";

export function Blog() {
  const { t } = useTranslation("pages");
  const posts = [
    {
      title: t("blog.posts.0.title"),
      excerpt: t("blog.posts.0.excerpt"),
      author: t("blog.posts.0.author"),
      date: t("blog.posts.0.date"),
      category: t("blog.posts.0.category"),
      readTime: t("blog.posts.0.readTime"),
    },
    {
      title: t("blog.posts.1.title"),
      excerpt: t("blog.posts.1.excerpt"),
      author: t("blog.posts.1.author"),
      date: t("blog.posts.1.date"),
      category: t("blog.posts.1.category"),
      readTime: t("blog.posts.1.readTime"),
    },
    {
      title: t("blog.posts.2.title"),
      excerpt: t("blog.posts.2.excerpt"),
      author: t("blog.posts.2.author"),
      date: t("blog.posts.2.date"),
      category: t("blog.posts.2.category"),
      readTime: t("blog.posts.2.readTime"),
    },
    {
      title: t("blog.posts.3.title"),
      excerpt: t("blog.posts.3.excerpt"),
      author: t("blog.posts.3.author"),
      date: t("blog.posts.3.date"),
      category: t("blog.posts.3.category"),
      readTime: t("blog.posts.3.readTime"),
    },
    {
      title: t("blog.posts.4.title"),
      excerpt: t("blog.posts.4.excerpt"),
      author: t("blog.posts.4.author"),
      date: t("blog.posts.4.date"),
      category: t("blog.posts.4.category"),
      readTime: t("blog.posts.4.readTime"),
    },
    {
      title: t("blog.posts.5.title"),
      excerpt: t("blog.posts.5.excerpt"),
      author: t("blog.posts.5.author"),
      date: t("blog.posts.5.date"),
      category: t("blog.posts.5.category"),
      readTime: t("blog.posts.5.readTime"),
    },
  ];

  const categories = [
    t("blog.categories.all"),
    t("blog.categories.homeMaintenance"),
    t("blog.categories.tipsGuides"),
    t("blog.categories.energyEfficiency"),
    t("blog.categories.plumbing"),
    t("blog.categories.landscaping"),
    t("blog.categories.technology"),
  ];

  return (
    <div className="w-full">
      <SEO
        title={t("blog.seo.title")}
        url="/blog"
        description={t("blog.seo.description")}
        keywords={t("blog.seo.keywords")}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7F5] to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("blog.heroPrefix")} <span className="bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] bg-clip-text text-transparent">{t("blog.heroHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t("blog.heroSubtitle")}
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
                    {t("blog.imagePlaceholder")}
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
                      {t("blog.readMore")}
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
              {t("blog.loadMore")}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
