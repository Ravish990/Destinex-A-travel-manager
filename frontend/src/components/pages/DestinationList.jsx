import React from "react";

const DestinationList = ({ visibleCount, destination }) => {
  const dummyCards = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {dummyCards.slice(0, visibleCount).map((num) => (
        <div
          key={num}
          className="bg-white rounded-lg shadow-md p-4 flex gap-4"
        >
          <div className="w-1/3 bg-gray-200 h-40 rounded flex items-center justify-center">
            <span className="text-gray-600 text-lg">Image {num}</span>
          </div>
          <div className="w-2/3">
            <div className="text-xl font-semibold">
              {destination} Resort {num}
            </div>
            <div className="text-sm text-gray-500">Tags and Icons</div>
            <div className="mt-2 text-green-600">Features</div>
            <div className="mt-2 text-gray-700">Includes: Description</div>
            <div className="mt-2 font-bold text-lg">₹ Amount / couple</div>
            <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationList;
