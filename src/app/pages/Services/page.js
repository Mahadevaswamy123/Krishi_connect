"use client";

import { motion } from "framer-motion";
import Footer from "@/components/footer";
import Image from "next/image";

const Services = () => {
  return (
    <div className="text-gray-600 dark:text-gray-300 body-font">
      {/* Hero Section with Animation */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative h-screen"
      >
        <Image
          src="https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Agriculture Service"
          fill
          priority
          className="absolute inset-0 object-cover"
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 text-center px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Explore the range of services that help you with farming solutions.
          </motion.p>
        </div>
      </motion.main>

      {/* Service Section with Animated Service Items */}
      <div className="py-16 px-4 md:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-8 m-6 sm:m-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          What We Offer
        </motion.h2>

        {/* Service List with Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
              Vehicle Subsidy Information
            </h3>
            <p>
              Stay updated on the latest government subsidies for farming
              vehicles.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
              Seed & Fertilizer Booking
            </h3>
            <p>
              Easily book high-quality seeds and fertilizers from trusted Krishi
              Kendras.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
              Government Schemes
            </h3>
            <p>
              Get real-time updates on new and ongoing agricultural schemes.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
              Weather & Market Updates
            </h3>
            <p>
              Receive live weather forecasts and market price updates for your
              crops.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
