"use client";

import { useEffect } from "react";
import SignupForm from "@/components/signupForm";
import { gsap } from "gsap"; // Import GSAP

export default function SignupPage() {
  useEffect(() => {
    // GSAP animation for the page fade-in and scale effect
    gsap.fromTo(
      ".signup-page",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="signup-page">
      <SignupForm />
    </div>
  );
}
