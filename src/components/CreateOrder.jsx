import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/choose-food-bank"); // Navigate to /choose-food-bank
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit} // Attach custom submit handler
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Create Order
        </h2>
        
        {/* Food Description */}
        <div className="mb-4">
          <label htmlFor="foodDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Food Description
          </label>
          <textarea
            id="foodDescription"
            name="foodDescription"
            placeholder="Describe the leftover food"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity (e.g., 5 servings)
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Food Type */}
        <div className="mb-4">
          <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-2">
            Food Type
          </label>
          <select
            id="foodType"
            name="foodType"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
        
        {/* Special Instructions */}
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="Any special instructions for pickup or handling"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
