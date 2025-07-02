"use client";

import Footer from "@/components/footer";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

const About = () => {
  return (
    <motion.div
      className="text-gray-600 dark:text-gray-300 body-font"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Hero Section */}
      <motion.main
        className="relative h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1594771804886-a933bb2d609b?q=80&w=2364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Agriculture Service"
          layout="fill"
          priority
          className="absolute inset-0 object-cover"
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            About FarmConnect
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            Empowering farmers with easy access to resources and a supportive
            community.
          </motion.p>
        </div>
      </motion.main>

      {/* About Section */}
      <motion.div
        className="py-16 px-4 md:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Who We Are
        </motion.h2>

        {/* Text Section */}
        <motion.div
          className="text-gray-700 dark:text-gray-300 space-y-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          >
            FarmConnect is designed to empower farmers by providing easy access
            to vehicle subsidies, booking seeds and fertilizers from Krishi
            Kendras, and keeping them updated on government schemes. Our
            platform allows farmers to share their experiences, post challenges,
            and learn from each other.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          >
            By bridging the gap between farmers and resources, we aim to create
            a thriving community where knowledge and support are just a click
            away.
          </motion.p>
        </motion.div>

        {/* Optional Image Section */}
        {/* Uncomment if you'd like to include an image */}
        <motion.div
          className="relative sm:h-80 md:h-96 overflow-hidden rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Agriculture Service"
            layout="fill"
            priority
            className="absolute inset-0 object-cover"
            sizes="100vw"
            quality={100}
          />
        </motion.div>
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default About;
