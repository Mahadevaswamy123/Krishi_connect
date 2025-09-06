"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../DashboardSidebar";
import DashboardHeader from "../DashboardHeader";
import { useSession } from "next-auth/react";

export default function ProductBooking() {
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Fetch products on page load
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/api/krishikendra/products");
        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Fetch farmer's bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("/api/farmer/bookings");
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  const handleBooking = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/farmer/bookproduct", {
        productId,
      });
      if (response.status === 201) {
        alert("Product booked successfully!");
        // Refresh bookings after successful booking
        const res = await axios.get("/api/farmer/bookings");
        setBookings(Array.isArray(res.data) ? res.data : []);
        // Switch to bookings tab
        setActiveTab("bookings");
      }
    } catch (error) {
      console.error("Error booking product:", error);
      const errorMessage = error.response?.data?.message || "Error booking product";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">
            Product Booking & My Bookings
          </h1>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "products"
                      ? "border-green-500 text-green-600 dark:text-green-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  Available Products
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "bookings"
                      ? "border-green-500 text-green-600 dark:text-green-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  My Bookings ({bookings.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              {Array.isArray(products) && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Type: {product.type}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Price: ₹{product.price}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Available: {product.quantity}
                      </p>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded mt-2"
                        />
                      )}

                      {/* Booking Button */}
                      <button
                        onClick={() => handleBooking(product.id)}
                        disabled={loading || product.quantity <= 0}
                        className={`w-full mt-4 px-4 py-2 rounded font-medium ${
                          product.quantity <= 0
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : loading
                            ? "bg-blue-400 text-white cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {loading ? "Booking..." : product.quantity <= 0 ? "Out of Stock" : "Book Now"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No products available for booking</p>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 dark:text-gray-100">
                            {booking.product.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Type: {booking.product.type}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Price: ₹{booking.product.price}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      {booking.product.image && (
                        <img
                          src={booking.product.image}
                          alt={booking.product.name}
                          className="w-20 h-20 object-cover rounded mt-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No bookings found</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
