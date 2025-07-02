"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./dark-mode";
import { signOut, useSession } from "next-auth/react"; // Import signOut and useSession
import { gsap } from "gsap"; // Import GSAP for animations

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Track if sheet is open
  const { data: session } = useSession(); // Get session data

  // Dynamically decide the dashboard link based on user role
  const getDashboardLink = () => {
    if (session?.user?.role === "FARMER") {
      return { label: "Dashboard", href: "/Dashboard" };
    } else if (session?.user?.role === "KRISHI_KENDRA") {
      return { label: "Dashboard", href: "/krishidashboard" };
    }
    return null; // If no role or unauthenticated user
  };

  // Add dashboard link to navigation items if available
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/pages/About" },
    { label: "Services", href: "/pages/Services" },
    { label: "Contact", href: "/pages/contactus" },
    getDashboardLink(), // Dynamically add the dashboard link
  ].filter(Boolean); // Remove null or undefined items

  // Close the sheet when a menu item is clicked
  const handleLinkClick = () => {
    setIsSheetOpen(false); // Close the menu after a link is clicked
  };

  // GSAP animation for mobile sheet menu transition
  const handleSheetOpen = () => {
    gsap.fromTo(
      ".sheet-content",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  return (
    <nav className="bg-teal-950 border-b border-border fixed w-full top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-foreground">
              <span className="text-3xl font-serif text-amber-600">Krishi</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:bg-amber-500 hover:text-white text-white px-3 py-2 rounded-md text-md font-bold transition-all"
                >
                  {item.label}
                </Link>
              ))}

              {/* Conditionally render SignUp or SignOut button */}
              {!session ? (
                <Button variant="default" asChild>
                  <Link href="/signup" className="hover:bg-amber-500">
                    Sign Up
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={() => signOut()}
                  className="hover:bg-amber-500"
                >
                  Sign Out
                </Button>
              )}

              {/* Dark Mode Toggle */}
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <ModeToggle />
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  onClick={handleSheetOpen}
                >
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent className="sheet-content bg-teal-950 p-6">
                <SheetHeader>
                  <SheetTitle className="text-white text-xl font-bold">
                    Navigation Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick} // Close the menu when clicked
                      className="text-muted-foreground hover:text-amber-500 px-3 py-2 rounded-md text-lg font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {/* Conditionally render SignUp or SignOut button on mobile */}
                  {!session ? (
                    <Button variant="default" className="w-full" asChild>
                      <Link href="/signup" className="w-full text-center py-2">
                        Sign Up
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full text-center py-2"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
