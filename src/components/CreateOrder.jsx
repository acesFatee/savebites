import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    foodDescription: "",
    quantity: "",
    foodType: "vegetarian",
    instructions: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Convert form data to query parameters
    const queryParams = new URLSearchParams(formData).toString();
    console.log(queryParams)

    // Navigate to /choose-food-bank with query params
    navigate(`/choose-food-bank?${queryParams}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Create Order
        </h2>

        {/* Food Description */}
        <div className="mb-4">
          <label
            htmlFor="foodDescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Food Description
          </label>
          <textarea
            id="foodDescription"
            name="foodDescription"
            value={formData.foodDescription}
            onChange={handleInputChange}
            placeholder="Describe the leftover food"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quantity (e.g., 5 servings)
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Food Type */}
        <div className="mb-4">
          <label
            htmlFor="foodType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Food Type
          </label>
          <select
            id="foodType"
            name="foodType"
            value={formData.foodType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="halal">Halal</option>
            <option value="both">Both</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        {/* Special Instructions */}
        <div className="mb-4">
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Special Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
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
