"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import KrishiKendraSidebar from "../KrishiKendraSidebar";
import KrishiKendraHeader from "../KrishiKendraHeader";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch profile data when the component mounts
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("/api/krishikendra/profile");
        setProfile(res.data);
        setForm(res.data); // Populate form fields with profile data
      } catch (err) {
        setError("Error fetching profile data.");
      }
    }
    fetchProfile();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.put("/api/krishikendra/profile", form);
      setProfile(res.data); // Update the profile with new data
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <KrishiKendraSidebar />
      <div className="flex-1 ml-64">
        <KrishiKendraHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
            Profile Settings
          </h1>

          {/* Success message */}
          {success && (
            <div className="bg-green-500 text-white p-2 rounded mb-4">
              {success}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}

          {/* Profile Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Name
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
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>

          {/* Profile Details */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
              Profile Details
            </h2>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
