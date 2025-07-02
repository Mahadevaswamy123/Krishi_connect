"use client";

import { useState, useEffect } from "react";
// import KrishiKendraSidebar from "../../krishidashboard/KrishiKendraSidebar";
// import KrishiKendraHeader from "../../krishidashboard/KrishiKendraHeader";
import DashboardSidebar from "../DashboardSidebar";
import DashboardHeader from "../DashboardHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PostQueries() {
  const [queries, setQueries] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add the error state here
  const { data: session, status } = useSession();
  const router = useRouter();

  // Fetching problem queries when the component mounts
  useEffect(() => {
    async function fetchQueries() {
      try {
        const res = await axios.get("/api/krishikendra/queries");
        setQueries(res.data);
      } catch (err) {
        console.error("Error fetching queries", err);
      }
    }
    fetchQueries();
  }, []);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset any previous errors

    // Basic validation for required fields
    if (!form.title || !form.description) {
      setError("Title and description are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/krishikendra/queries", form);

      // Check for successful response
      if (res.status === 201) {
        setQueries([...queries, res.data]);
        setForm({ title: "", description: "", image: "" }); // Reset form
      } else {
        setError("Failed to post query");
      }
    } catch (err) {
      console.error("Error posting problem query:", err);
      setError("Error posting problem query.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Post New Problem Query
          </h1>

          {/* Error message */}
          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Problem Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Upload Image (Optional)
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
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Query"}
            </button>
          </form>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
            Posted Problem Queries
          </h2>

          {/* Display Queries */}
          {queries.length === 0 ? (
            <p>No problem queries posted yet.</p>
          ) : (
            queries.map((query) => (
              <div
                key={query.id}
                className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{query.title}</h3>
                <p>{query.description}</p>
                {query.image && (
                  <img
                    src={query.image}
                    alt={query.title}
                    className="w-48 h-auto object-cover rounded mt-2"
                  />
                )}
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
