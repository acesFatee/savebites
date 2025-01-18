import React, { useState } from "react";

const foodBanks = [
  { id: 1, name: "Ottawa Food Bank", address: "1317 Michael St, Ottawa, ON K1B 3M9" },
  { id: 2, name: "Parkdale Food Centre", address: "30 Rosemount Ave, Ottawa, ON K1Y 1P4" },
  { id: 3, name: "Debra Dynes Family House", address: "955 Debra Ave, Ottawa, ON K2C 0J5" },
  { id: 4, name: "Heron Emergency Food Centre", address: "1480 Heron Rd, Ottawa, ON K1V 6A5" },
  { id: 5, name: "St. Joe's Supper Table", address: "151 Laurier Ave E, Ottawa, ON K1N 6N8" },
];

const ChooseFoodBank = ({ onSelect }) => {
  const [selectedFoodBank, setSelectedFoodBank] = useState(null);

  const handleSelection = (foodBank) => {
    setSelectedFoodBank(foodBank);
    if (onSelect) {
      onSelect(foodBank);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Choose a Food Bank</h2>
        <ul className="space-y-4">
          {foodBanks.map((foodBank) => (
            <li
              key={foodBank.id}
              className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition ${
                selectedFoodBank?.id === foodBank.id ? "bg-blue-100 border-blue-500" : ""
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
          onClick={() => alert(`You selected: ${selectedFoodBank?.name}`)}
          disabled={!selectedFoodBank}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default ChooseFoodBank;
