"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  // Use effect to check token query when it's available
  useEffect(() => {
    if (router.query && router.query.token) {
      const { token } = router.query; // Check if token exists
      setToken(token);
    }
  }, [router.query]); // Dependency on router.query

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });

      if (res.status === 200) {
        router.push("/login"); // Redirect to login page after reset
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div>Loading...</div>; // Display loading while waiting for token
  }

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
