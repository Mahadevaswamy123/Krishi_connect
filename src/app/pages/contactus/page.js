"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function ContactUs() {
  return (
    <section className="text-gray-600 dark:text-gray-300 body-font relative">
      <Navbar />

      {/* Hero Section with Animation */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative h-screen"
      >
        <Image
          src="https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Elegant catering setup"
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
            Contact Us
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-center px-4 sm:text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            We'd love to hear from you! Let us help make your event special.
          </motion.p>
        </div>
      </motion.main>

      {/* Contact Form Section with Fade-in Animation */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Get in Touch
          </motion.h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-400">
            Fill out the form below or reach us through the provided contact
            details.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow">
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    required
                    rows={4}
                    className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="text-white bg-teal-600 dark:bg-teal-400 py-2 px-4 rounded-md"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow">
              <motion.h3
                className="text-xl font-semibold mb-4 text-gray-900 dark:text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Contact Information
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Email: info@krishiconnect.com
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Phone: +123-456-7890
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
