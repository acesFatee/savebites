import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFoodBanks } from "../api/getFoodBanks";
import { useLocation } from "react-router-dom";
import { createOrder } from "../api/createOrder";
import { startTracking } from "../api/startTracking";

const ChooseFoodBank = ({ onSelect }) => {
  const [selectedFoodBank, setSelectedFoodBank] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [foodBanks, setFoodBanks] = useState([]);

  const handleSelection = (foodBank) => {
    setSelectedFoodBank(foodBank);
    if (onSelect) {
      onSelect(foodBank);
    }
  };

  const fetchFoodBanks = async () => {
    const result = await getFoodBanks();
    setFoodBanks(result);
  };

  useEffect(() => {
    fetchFoodBanks();
  }, []);

  const sendOrderForTracking = async () => {
    // Retrieve query parameters
    const queryParams = new URLSearchParams(location.search);
    const foodDescription = queryParams.get("foodDescription");
    const quantity = queryParams.get("quantity");
    const foodType = queryParams.get("foodType");
    const instructions = queryParams.get("instructions");

    const foodBankId = selectedFoodBank.id;

    const orderData = {
      foodDescription,
      quantity,
      foodType,
      instructions,
      foodBankId,
      createdAt: new Date().toISOString(),
    };

    const order = await createOrder(orderData)
    const url = `/track/${order.id}`
    await startTracking(order.id, order.foodBank.lat, order.foodBank.lon, 45.42279012312327, -75.68364447683525)
    navigate(url)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Choose a Food Bank
        </h2>
        <ul className="space-y-4">
          {foodBanks.map((foodBank) => (
            <li
              key={foodBank.id}
              className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition ${
                selectedFoodBank?.id === foodBank.id
                  ? "bg-blue-100 border-blue-500"
                  : ""
              }`}
              onClick={() => handleSelection(foodBank)}
            >
              <h3 className="text-lg font-semibold">{foodBank.name}</h3>
              <p className="text-gray-600 text-sm">{foodBank.address}</p>
            </li>
          ))}
        </ul>

        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={sendOrderForTracking}
          disabled={!selectedFoodBank}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default ChooseFoodBank;
