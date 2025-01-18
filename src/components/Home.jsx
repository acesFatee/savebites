import React from "react";
import { Link } from "react-router-dom";

export default function Home({ onLogout }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <Link
        to="/create-order"
        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Create Order
      </Link>
      <button
        onClick={onLogout}
        className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Logout
      </button>
    </div>
  );
}
