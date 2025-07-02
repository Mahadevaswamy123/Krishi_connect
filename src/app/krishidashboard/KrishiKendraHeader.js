"use client";

import { useSession, signOut } from "next-auth/react";

export default function KrishiKendraHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow-md p-4">
      <h1 className="text-xl font-bold text-green-700 dark:text-green-400">
        Welcome, {session?.user?.name || "Krishi Kendra"}!
      </h1>
      {/* Sign out button */}
      {/* <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button> */}
    </header>
  );
}
