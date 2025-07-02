"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../DashboardSidebar";
import DashboardHeader from "../DashboardHeader";
import { useSession } from "next-auth/react";

export default function ProductBooking() {
  const [products, setProducts] = useState([]);
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

  const handleBooking = async (productId) => {
    try {
      const response = await axios.post("/api/farmer/bookproduct", {
        productId,
      });
      if (response.status === 201) {
        alert("Product booked successfully!");
      } else {
        alert("Booked Sucessfully");
      }
    } catch (error) {
      console.error("Error booking product:", error);
      alert("Booked Sucessfully.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Product Booking
          </h1>

          {/* Displaying Products */}
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
                      Price: {product.price}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Quantity: {product.quantity}
                    </p>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded mt-2"
                      />
                    )}

                    {/* Booking Button */}
                    <button
                      onClick={() => handleBooking(product.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products available for booking</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
