"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Hero Section with Parallax Effect */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative h-screen"
      >
        <motion.div
          className="absolute inset-0"
          style={{ backgroundPosition: "center", backgroundSize: "cover" }}
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Agriculture Service"
            fill
            priority
            className="object-cover w-full h-full"
            sizes="100vw"
            quality={100}
          />
        </motion.div>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 px-6 text-center"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            Welcome to Krishi Connect
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl max-w-4xl mx-auto px-6 text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Empowering Farmers and Krishi Kendras with technology, resources,
            and community.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <Link
              href="/signup"
              className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition duration-300"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </motion.main>

      {/* About Section with Scroll Trigger */}
      <motion.div
        className="py-16 px-4 md:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-semibold text-teal-600 dark:text-teal-400 mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            About Krishi Connect
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Krishi Connect brings together farmers, Krishi Kendras, and experts
            to foster a community of growth, support, and innovation.
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Whether you're a farmer looking for resources or a Krishi Kendra
            seeking to expand your reach, we provide the tools and connections
            you need.
          </motion.p>
        </div>
      </motion.div>

      {/* Services Section with Animations */}
      <motion.div
        className="py-16 px-4 md:px-8 bg-teal-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-semibold text-yellow-500 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Item 1 */}
            <motion.div
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Consultation</h3>
              <p>
                Expert advice and consultations to improve agricultural
                practices.
              </p>
            </motion.div>

            {/* Service Item 2 */}
            <motion.div
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Training</h3>
              <p>
                Training programs designed to enhance farmers' skills and
                knowledge.
              </p>
            </motion.div>

            {/* Service Item 3 */}
            <motion.div
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Resource Sharing</h3>
              <p>
                Connecting farmers with resources such as tools, seeds, and
                more.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section with Hover Animations */}
      <motion.div
        className="bg-teal-600 text-white text-center py-16"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Ready to make a difference in farming?
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Join the community today and start connecting with the resources that
          will help you thrive.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <Link
            href="/signup"
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition duration-300"
          >
            Join Now
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer Section with Smooth Fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
