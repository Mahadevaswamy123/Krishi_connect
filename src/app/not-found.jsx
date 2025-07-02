"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaRegSadCry } from "react-icons/fa"; // Adding some fun iconography
import { Link } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    // Animation to fade in elements one by one
    const fadeInAnimation = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      },
    };

    const elements = document.querySelectorAll(".animated-element");
    elements.forEach((el, index) => {
      motion(el, fadeInAnimation).apply;
    });
  }, []);

  return (
    <div className="notfound-container min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-800 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 text-center px-6 md:px-12">
        {/* Animated Heading */}
        <motion.h1
          className="text-6xl font-extrabold leading-tight mb-6 animated-element"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          404 - Page Not Found
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          className="text-lg mb-8 animated-element"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        >
          Sorry, we couldn't find the page you're looking for. Let's get you
          back on track!
        </motion.p>

        {/* Animated Icon with Framer Motion */}
        <motion.div
          className="notfound-icon mb-8"
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        >
          <FaRegSadCry size={100} className="text-yellow-300 animate-bounce" />
        </motion.div>

        {/* Animated Tractor (SVG) with Road */}
        <motion.div
          className="notfound-tractor mb-8"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        >
          {/* Animated SVG Tractor */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-40 h-40 fill-current text-green-500 animate-tractor-move"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          >
            {/* Tractor Body */}
            <rect x="10" y="40" width="60" height="20" rx="5" fill="green" />
            {/* Tractor Wheels */}
            <circle cx="20" cy="60" r="8" fill="black" />
            <circle cx="50" cy="60" r="8" fill="black" />
            {/* Tractor Cabin */}
            <rect
              x="30"
              y="30"
              width="15"
              height="15"
              rx="3"
              fill="lightblue"
            />
            {/* Tractor Exhaust (Gas Effect) */}
            <motion.circle
              cx="65"
              cy="30"
              r="3"
              fill="gray"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.4,
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.path
              d="M65 30 Q70 25, 75 20"
              fill="transparent"
              stroke="gray"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.5,
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.svg>
        </motion.div>

        {/* Road */}
        <motion.div
          className="road bg-gray-800 w-full h-20 rounded-t-full mt-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
        >
          <div className="road-marking w-full h-2 bg-yellow-500 absolute top-1/2 transform -translate-y-1/2" />
        </motion.div>

        {/* Explore More Option */}
        <motion.div
          className="explore-more-btn animated-element mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          <Button
            variant="solid"
            size="lg"
            color="teal"
            className="w-full max-w-md flex items-center justify-center gap-3 px-16 py-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <FaArrowLeft size={22} />
            <span>Return to Homepage</span>
          </Button>
        </motion.div>

        {/* Return to homepage button */}
        <motion.div
          className="explore-more-btn animated-element mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
        >
          <Button
            variant="outline"
            size="lg"
            className="text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white transition-all hover:scale-110"
          >
            Explore Other Pages
          </Button>
        </motion.div>
      </div>

      {/* Floating icon */}
      <motion.div
        className="floating-icon absolute bottom-8 right-8 text-6xl animate-bounce"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
      >
        <FaArrowLeft className="text-teal-400" />
      </motion.div>
    </div>
  );
}
