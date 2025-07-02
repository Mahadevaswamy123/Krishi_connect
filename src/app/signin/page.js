"use client";

import { useEffect } from "react";
import SigninForm from "@/components/signinForm";
import { gsap } from "gsap"; // Import GSAP

export default function SigninPage() {
  useEffect(() => {
    // GSAP animation for the page fade-in and scale effect
    gsap.fromTo(
      ".signin-page",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="signin-page">
      <SigninForm />
    </div>
  );
}
