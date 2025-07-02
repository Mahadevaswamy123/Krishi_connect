"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="bg-gray-800 text-white py-8 mt-8"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-xl font-bold"
        >
          Krishi Connect © {new Date().getFullYear()}
        </motion.div>
        <motion.div
          className="flex justify-center space-x-6 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-lg text-teal-500 hover:text-teal-300"
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="text-lg text-teal-500 hover:text-teal-300"
          >
            Terms & Conditions
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
}
