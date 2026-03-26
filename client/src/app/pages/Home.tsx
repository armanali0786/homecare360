import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Search, MapPin, CheckCircle, Star, ArrowRight, Calendar, CreditCard,
  Wrench, Zap, Sparkles, Trees, Paintbrush, Camera, AirVent, Shield, Lock,
  TrendingUp, DollarSign, Clock
} from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import HeroImage from "../components/assets/hero-image.png";

export function Home() {
  const features = [
    {
      title: "Verified Professionals",
      description: "All service providers are thoroughly vetted and verified for your safety",
    },
    {
      title: "Easy Booking",
      description: "Book services in minutes with our simple and intuitive platform",
    },
    {
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all services provided",
    },
  ];

  const services = [
    {
      name: "Plumbing",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsJTIwd29ya3xlbnwxfHx8fDE3NjkxNTA5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Electrical",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjkxODc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Cleaning",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1620563671147-979557991e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkxODY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Outdoor Services",
      icon: Trees,
      image: "https://media.istockphoto.com/id/2197662613/photo/construction-worker-repairing-a-house-siding.jpg?s=1024x1024&w=is&k=20&c=FVus-jYKho667zG62I9OIPnej9OrL6tgOpwDgrCPScM=",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Painting",
      icon: Paintbrush,
      image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhaW50aW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NjkwODAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "from-red-500 to-pink-500",
    },
    {
      name: "AC & Appliance Repair",
      icon: AirVent,
      image: "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Search & Compare",
      description: "Browse verified service providers in your area. Compare ratings, reviews, and prices.",
      icon: Search,
      color: "from-cyan-600 to-blue-600",
    },
    {
      number: "2",
      title: "Book & Schedule",
      description: "Choose your preferred time slot and book instantly. Get automatic reminders.",
      icon: Calendar,
      color: "from-emerald-600 to-green-600",
    },
    {
      number: "3",
      title: "Pay & Review",
      description: "Secure payment after service completion. Leave a review to help others.",
      icon: CreditCard,
      color: "from-purple-600 to-pink-600",
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Platform Fee",
      description: "Only 15% per booking - lower than competitors",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: Shield,
      title: "Verified Badge",
      description: "Stand out with our verification system",
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      icon: Clock,
      title: "Quick Payouts",
      description: "Weekly direct deposits to your account",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const featured = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers undergo background checks and verification to ensure quality and safety.",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: Star,
      title: "Transparent Reviews",
      description: "Read authentic reviews from real customers to make informed decisions.",
      color: "from-emerald-600 to-green-600",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Escrow payment system ensures your money is safe until the job is completed.",
      color: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-emerald-50 to-blue-50 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Find Trusted Local{" "}
                  <span className="bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent">
                    Service Providers
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Connect with verified professionals for all your home service needs. Book, pay, and review - all in one place.
                </p>
              </motion.div>

              {/* Search bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 space-y-4"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your location"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-cyan-600 to-emerald-500 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  Search Services
                </button>
              </motion.div>
            </div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={HeroImage}
                  alt="Professional service provider"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl p-4 max-w-[200px]"
              >
                {/* <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-emerald-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Verified</p>
                  <p className="text-sm text-gray-500">Professional</p>
                </div>
              </div> */}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our most requested services and connect with top-rated professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div
                    className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">
                    Professional {service.name.toLowerCase()} services for your home
                  </p>
                  <button className="text-cyan-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Book Now
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How its works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connector line - hidden on mobile */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-200 via-emerald-200 to-purple-200 -z-10" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Number badge */}
                  <div className="absolute top-0 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-cyan-500 z-20">
                    <span className="text-cyan-600 font-bold">{step.number}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose HomeCare360?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#E0F7F5] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <CheckCircle className="text-[#00B8A9] mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose HomeCare360
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for all home service needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <section id="providers" className="py-20 bg-gradient-to-br from-cyan-600 to-emerald-600 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Grow Your Business with HomeCare360
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Join our network of professional service providers and connect with customers in your area.
              </p>

              <div className="space-y-4 mb-10">
                {featured.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 text-white"
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Your Application
              </motion.button>
            </motion.div>

            {/* Right content - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Benefits for Providers
              </h3>

              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-white/80">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#00B8A9] to-[#2B5F5F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 text-white/90"
          >
            Join thousands of satisfied customers who trust HomeCare360 for their home services
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-[#00B8A9] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section> */}

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-xl font-bold">HomeCare360</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted marketplace for professional home services. Connect, book, and get things done.
              </p>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Plumbing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Electrical</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Cleaning</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Landscaping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Painting</a></li>
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2026 HomeCare360. All rights reserved.
              </p>

              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://x.com/Arman_Ali_01"
                  target="_blank"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/itz_arman_official__?igsh=bmFmbmJwNWVxYWQ1"
                  target="_blank"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/arman-ali-8383081ab"
                  target="_blank"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
