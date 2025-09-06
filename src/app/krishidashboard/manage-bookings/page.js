"use client";

import { useEffect, useState } from "react";
import KrishiKendraSidebar from "../KrishiKendraSidebar";
import KrishiKendraHeader from "../KrishiKendraHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  // Fetch bookings data from the API when the component mounts
  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const res = await axios.get("/api/krishikendra/bookings");
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Error fetching bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  // Function to update the status of a booking
  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      const res = await axios.patch("/api/krishikendra/bookings", {
        id,
        status,
      });
      
      if (res.status === 200) {
        // Update the state with the new status after it has been updated in the backend
        const updatedBookings = bookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        );
        setBookings(updatedBookings);
        alert(`Booking ${status.toLowerCase()} successfully!`);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      const errorMessage = error.response?.data?.message || "Error updating booking status";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // If the session status is "loading", show loading state
  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusCounts = () => {
    const counts = {
      Pending: 0,
      Approved: 0,
      Rejected: 0
    };
    bookings.forEach(booking => {
      counts[booking.status] = (counts[booking.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      <KrishiKendraSidebar />
      <div className="flex-1 ml-64">
        <KrishiKendraHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">
            Manage Bookings
          </h1>

          {/* Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{statusCounts.Pending}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Approved</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{statusCounts.Approved}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Rejected</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{statusCounts.Rejected}</p>
            </div>
          </div>

          {loading && bookings.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading bookings...</p>
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        {booking.product.name}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          <p><strong>Farmer:</strong> {booking.user.name}</p>
                          <p><strong>Email:</strong> {booking.user.email}</p>
                          <p><strong>Product Type:</strong> {booking.product.type}</p>
                        </div>
                        <div>
                          <p><strong>Price:</strong> ₹{booking.product.price}</p>
                          <p><strong>Available Quantity:</strong> {booking.product.quantity}</p>
                          <p><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {booking.product.image && (
                    <div className="mb-4">
                      <img
                        src={booking.product.image}
                        alt={booking.product.name}
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  )}

                  {booking.status === "Pending" && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => updateStatus(booking.id, "Approved")}
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Processing..." : "Approve"}
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        disabled={loading}
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Processing..." : "Reject"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No bookings found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
