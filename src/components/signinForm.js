"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("FARMER"); // default role
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
    });

    if (res?.error) {
      setError(res.error || "Invalid email, password, or role.");
    } else {
      const response = await fetch("/api/auth/session");
      const session = await response.json();

      const userRole = session?.user?.role;

      if (userRole === "FARMER") {
        router.push("/Dashboard");
      } else if (userRole === "KRISHI_KENDRA") {
        router.push("/krishidashboard");
      } else {
        router.push("/not-found");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Sign In
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Select Role
            </label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="FARMER"
                  checked={role === "FARMER"}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-radio text-green-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Farmer
                </span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="KRISHI_KENDRA"
                  checked={role === "KRISHI_KENDRA"}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-radio text-green-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Krishi Kendra
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-green-700 dark:hover:bg-green-600"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center p-2 text-base font-serif">
          <Link href="/reset-request">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
}
