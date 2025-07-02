import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Function to get initials from the user's name
const getInitials = (name) => {
  if (!name) return "U"; // Fallback if no name
  const nameArr = name.split(" ");
  const initials =
    nameArr.length > 1 ? nameArr[0][0] + nameArr[1][0] : nameArr[0][0];
  return initials.toUpperCase();
};

// Avatar component that shows initials
const UserAvatar = ({ name, size = 50 }) => {
  const initials = getInitials(name);
  return (
    <div
      className="flex items-center justify-center bg-green-500 text-white rounded-full"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
};

export default function KrishiKendraSidebar() {
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter(); // Correct placement of useRouter

  // Check if session data is loading
  if (status === "loading") {
    return <div>Loading...</div>; // Optional: Show a loading state
  }

  // Navigation items
  const navItems = [
    { name: "Dashboard", path: "/krishidashboard" },
    {
      name: "Manage Bookings",
      path: "/krishidashboard/manage-bookings",
    },
    { name: "Add Products", path: "/krishidashboard/add-products" },
    { name: "Post Schemes", path: "/krishidashboard/post-schemes" },
    { name: "Farmer Queries", path: "/krishidashboard/queries" },
    // { name: "Profile", path: "/krishidashboard/profilesetting" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-green-700 dark:bg-gray-900 text-white fixed top-0 left-0 shadow-lg sm:w-16 sm:overflow-hidden sm:flex-col sm:items-center sm:justify-between sm:gap-4 lg:w-64">
        <div className="p-4 mt-20 border-b border-green-500 dark:border-gray-700 text-center">
          {/* User's Profile Picture */}
          <div className="mb-2 pl-20">
            <UserAvatar name={session?.user?.name || "User"} size={64} />
          </div>

          {/* User's Name */}
          <div className="text-lg font-semibold hidden sm:block">
            {session?.user?.name || "User Name"}
          </div>

          {/* User's Email */}
          <div className="text-sm text-gray-300 hidden sm:block">
            {session?.user?.email || "user@example.com"}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 sm:mt-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block py-3 px-6 hover:bg-green-600 dark:hover:bg-gray-800 ${
                router.pathname === item.path
                  ? "bg-green-600 dark:bg-gray-800"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 sm:ml-16 w-full">
        {/* Your main content goes here */}
      </div>
    </div>
  );
}
