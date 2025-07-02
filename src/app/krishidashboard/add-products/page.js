"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import KrishiKendraSidebar from "../KrishiKendraSidebar";
import KrishiKendraHeader from "../KrishiKendraHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "Seed",
    quantity: "",
    price: "",
    image: "", // To store the Base64 image string
  });

  const { data: session, status } = useSession();
  const router = useRouter();

  // Always run useEffect even when status changes
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Fetch products from the API when the component mounts or when status changes
  useEffect(() => {
    {
      async function fetchProducts() {
        try {
          const res = await axios.get("/api/krishikendra/products");
          console.log(res.data); // Log to inspect the structure
          setProducts(
            Array.isArray(res.data.products) ? res.data.products : []
          );
        } catch (error) {
          console.error("Error fetching products:", error);
          setProducts([]); // Fallback to an empty array in case of error
        }
      }
      fetchProducts();
    }
  }, []); // Run the effect when the status changes (authenticated status)

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the file from input
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result }); // Set the image as Base64 string
    };

    if (file) {
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  // Handle form submission to add a product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: form.name,
      type: form.type,
      quantity: form.quantity,
      price: form.price,
      image: form.image, // Base64 image string
    };

    try {
      const res = await axios.post("/api/krishikendra/products", productData, {
        headers: {
          "Content-Type": "application/json", // Set content-type to JSON
        },
      });
      setProducts([...products, res.data]); // Add new product to the list
      setForm({ name: "", type: "Seed", quantity: "", price: "", image: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      <KrishiKendraSidebar />
      <div className="flex-1 ml-64">
        <KrishiKendraHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Add Products
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Seed">Seed</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Vehicle">Vehicle</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
            </div>
            {form.image && (
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Image Preview
                </label>
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Product
            </button>
          </form>

          {/* Display uploaded products */}
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
                      {product.type}
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
                  </div>
                ))}
              </div>
            ) : (
              <p>No products available</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
