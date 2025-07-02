"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "FARMER",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setToastMessage("Signed up successfully! Redirecting...");
      setTimeout(() => setToastMessage(""), 3000); // Hide message after 3 seconds
      setTimeout(() => router.push("/signin"), 3000); // Redirect to SignIn after success
    } else {
      const data = await response.json();
      setError(data.error || "Something went wrong!");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="signup-container flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Form Container with Framer Motion Animation */}
      <motion.div
        className="signup-form w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-800 dark:text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Sign Up
        </motion.h1>

        {error && (
          <motion.p
            className="text-red-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="input-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-transparent text-gray-800 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </motion.div>

          <motion.div
            className="input-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-transparent text-gray-800 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </motion.div>

          <motion.div
            className="input-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-transparent text-gray-800 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </motion.div>

          <motion.div
            className="input-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-transparent text-gray-800 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              <option value="FARMER">Farmer</option>
              <option value="KRISHI_KENDRA">Krishi Kendra</option>
            </select>
          </motion.div>

          <motion.div
            className="input-group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 transition-all"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </motion.div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="text-green-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Toast Message with Fade-in/Out */}
      {toastMessage && (
        <motion.div
          className="toast fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {toastMessage}
        </motion.div>
      )}
    </div>
  );
}
