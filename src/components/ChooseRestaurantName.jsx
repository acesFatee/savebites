import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseRestaurantName = ({ user, onSubmit }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurantName.trim()) {
      setError("Restaurant name is required.");
      return;
    }

    setError(null);

    if (onSubmit) {
      await onSubmit(user.id, restaurantName.trim());
    }
  };

  useEffect(() => {
    console.log({user})
    if (user.restaurantName) {
      navigate("/create-order");
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Enter Restaurant Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="restaurant-name"
              className="block text-sm font-medium text-gray-700"
            >
              Restaurant Name
            </label>
            <input
              id="restaurant-name"
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter restaurant name"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChooseRestaurantName;
