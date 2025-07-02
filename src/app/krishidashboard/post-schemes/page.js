"use client";

import { useState, useEffect } from "react";
import KrishiKendraSidebar from "../KrishiKendraSidebar";
import KrishiKendraHeader from "../KrishiKendraHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PostSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const { data: session, status } = useSession();
  const router = useRouter();

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

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while submitting
    setError(null); // Reset any previous error
    try {
      const res = await axios.post("/api/krishikendra/schemes", form);
      setSchemes([...schemes, res.data]); // Add the new scheme to the list of schemes
      setForm({ title: "", description: "" }); // Reset the form after successful submit
    } catch (err) {
      setError("Error posting scheme.");
    } finally {
      setLoading(false); // Set loading state back to false
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
      <KrishiKendraSidebar />
      <div className="flex-1 ml-64">
        <KrishiKendraHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Post New Schemes
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
                Scheme Title
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
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading} // Disable the button if loading
            >
              {loading ? "Posting..." : "Post Scheme"}
            </button>
          </form>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
            Posted Schemes
          </h2>

          {/* Display Schemes */}
          {schemes.length === 0 ? (
            <p>No schemes posted yet.</p>
          ) : (
            schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{scheme.title}</h3>
                <p>{scheme.description}</p>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
