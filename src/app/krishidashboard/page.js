"use client";

import KrishiKendraSidebar from "./KrishiKendraSidebar";
import KrishiKendraHeader from "./KrishiKendraHeader";
import KrishiKendraCard from "./KrishiKendraCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for animations

export default function KrishiKendraDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      {/* Sidebar - Add animation */}
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <KrishiKendraSidebar />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <KrishiKendraHeader />

        {/* Dashboard Content */}
        <main className="p-6 grid grid-rows-1 md:grid-cols-2 lg:grid-rows-2 gap-6">
          {/* Cards with motion animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <KrishiKendraCard
              title="Manage Bookings"
              description="Review and manage farmers' seed and fertilizer bookings."
              linkText="View Bookings"
              linkHref="/krishidashboard/manage-bookings"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <KrishiKendraCard
              title="Add Products"
              description="Add seeds and fertilizers to your inventory."
              linkText="Add Products"
              linkHref="/krishidashboard/add-products"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <KrishiKendraCard
              title="Post Government Schemes"
              description="Share the latest schemes and subsidies with farmers."
              linkText="Post Schemes"
              linkHref="/krishidashboard/post-schemes"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <KrishiKendraCard
              title="Respond to Farmer Queries"
              description="Help farmers by answering their questions."
              linkText="Answer Queries"
              linkHref="/krishidashboard/queries"
            />
          </motion.div>

          {/* Add an optional Profile Settings card */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <KrishiKendraCard
              title="Profile Settings"
              description="Update your Krishi Kendra's information and settings."
              linkText="Edit Profile"
              linkHref="/krishidashboard/profilesetting"
            />
          </motion.div> */}
        </main>
      </div>
    </div>
  );
}
