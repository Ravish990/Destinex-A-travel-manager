// DestinationList.jsx
import React from 'react';

const DestinationList = ({ destinations }) => {
  if (!Array.isArray(destinations)) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        No destinations available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {destinations.map((dest) => (
        <div
          key={dest._id}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
        >
          <div className="relative overflow-hidden">
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
              {dest.category}
            </span>
          </div>

          <div className="p-5 space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{dest.name}</h2>
            <p className="text-gray-500 text-sm">{dest.location}</p>
            <p className="text-gray-700 text-sm line-clamp-3">{dest.description}</p>

            <div className="flex justify-between items-center pt-2 text-sm text-gray-700">
              <span>
                <strong>Rating:</strong> {dest.rating} ⭐
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationList;
