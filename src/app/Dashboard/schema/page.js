"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../DashboardSidebar";
import DashboardHeader from "../DashboardHeader";
import { motion } from "framer-motion"; // Import Framer Motion

export default function PostSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null); // For error handling
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Fetching schemes data when the component mounts
  useEffect(() => {
    async function fetchSchemes() {
      try {
        const res = await axios.get("/api/krishikendra/schemes");
        setSchemes(res.data);
      } catch (err) {
        setError("Error fetching schemes.");
      }
    }
    fetchSchemes();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Posted Schemes
          </h1>

          {/* Error message */}
          {error && (
            <motion.div
              className="bg-red-500 text-white p-2 rounded mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.div>
          )}

          {/* Display Schemes */}
          {schemes.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-700 dark:text-gray-400"
            >
              No schemes posted yet.
            </motion.p>
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {schemes.map((scheme) => (
                <motion.div
                  key={scheme.id}
                  className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h3 className="text-lg font-semibold">{scheme.title}</h3>
                  <p>{scheme.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </motion.div>
  );
}
