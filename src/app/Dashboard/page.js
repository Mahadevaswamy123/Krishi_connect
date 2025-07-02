"use client";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardCard from "./DashboardCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

export default function FarmerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Sidebar */}
      <motion.div
        className="w-64 fixed top-0 left-0 bottom-0 bg-white dark:bg-gray-800"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
      >
        <DashboardSidebar />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 ml-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <DashboardHeader />

        {/* Dashboard Content */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wrapping the card section with motion.div for smooth fade-in */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DashboardCard
              title="Bookings"
              description="Easily book quality seeds and fertilizers from Krishi Kendras."
              linkText="Start Booking"
              linkHref="/Dashboard/bookings"
            />
            <DashboardCard
              title="Explore Government Schemes"
              description="Stay updated with the latest schemes and grants."
              linkText="See Schemes"
              linkHref="/Dashboard/schema"
            />
            <DashboardCard
              title="Community Forum"
              description="Post your farming problems and get help from the community."
              linkText="Join the Forum"
              linkHref="/Dashboard/queries"
            />
          </motion.div>
        </main>
      </motion.div>
    </motion.div>
  );
}
