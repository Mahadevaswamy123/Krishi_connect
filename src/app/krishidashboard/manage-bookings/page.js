"use client";

import { useEffect, useState } from "react";
import KrishiKendraSidebar from "../KrishiKendraSidebar";
import KrishiKendraHeader from "../KrishiKendraHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const { status } = useSession();
  const router = useRouter();

  // Fetch bookings data from the API when the component mounts
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("/api/krishikendra/bookings");
        setBookings(res.data); // Make sure bookings are set after fetching
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []); // Empty array means this effect runs only on mount

  // Function to update the status of a booking
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch("/api/krishikendra/bookings", {
        id,
        status,
      });
      // Update the state with the new status after it has been updated in the backend
      const updatedBookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Redirect to login if unauthenticated (this should always be called before any rendering)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // If the session status is "loading", show loading state
  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      <KrishiKendraSidebar />
      <div className="flex-1 ml-64">
        <KrishiKendraHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Manage Bookings
          </h1>

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold">{booking.product.name}</h2>
              <p>Farmer: {booking.farmer.name}</p>
              <p>Status: {booking.status}</p>

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => updateStatus(booking.id, "Approved")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(booking.id, "Rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
