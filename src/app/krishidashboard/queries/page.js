"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import KrishiKendraSidebar from "../KrishiKendraSidebar";
import KrishiKendraHeader from "../KrishiKendraHeader";

export default function PostSchemes() {
  const [queries, setSchemes] = useState([]);
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
        const res = await axios.get("/api/krishikendra/queries");
        setSchemes(res.data);
      } catch (err) {
        setError("Error fetching schemes.");
      }
    }
    fetchSchemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex mt-20">
      <KrishiKendraSidebar />
      <div className="flex-1 ml-64">
        <KrishiKendraHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Posted queries
          </h1>

          {/* Error message */}
          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}

          {/* Display Schemes */}
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
