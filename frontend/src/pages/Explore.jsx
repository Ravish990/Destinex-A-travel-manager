import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSection from '../pages/FilterSection';

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const selectedDestination = location.state?.destination;

  useEffect(() => {
    axios.get('http://localhost:8000/destination/places')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        if (selectedDestination) {
          const filtered = data.filter(dest =>
            dest.name.toLowerCase().includes(selectedDestination.toLowerCase())
          );
          setDestinations(filtered);
        } else {
          setDestinations(data);
        }
      })
      .catch(err => console.error("Error fetching destinations:", err));
  }, [selectedDestination]);

  // Function to determine correct image source
  const getImageSrc = (imageString) => {
    if (!imageString) return 'https://via.placeholder.com/400x300?text=No+Image';
    if (imageString.startsWith('data:image/')) return imageString;
    if (imageString.startsWith('http')) return imageString;
    return `data:image/jpeg;base64,${imageString}`;
  };

  const handleDestinationClick = (destinationId) => {
    navigate(`/packages/${destinationId}`);
  };

  return (
    <div className="flex min-h-screen p-6 bg-gradient-to-r from-slate-100 via-gray-50 to-slate-200">
      {/* Left Filter Section */}
      <div className="w-1/4 pr-6">
        <FilterSection setDestinations={setDestinations} />
      </div>

      {/* Right Destination Grid */}
      <div className="w-3/4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-2">Explore Destinations</h1>
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination._id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                onClick={() => handleDestinationClick(destination._id)}
              >
                <img
                  src={getImageSrc(destination.image)}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                  }}
                />
                <div className="p-5 space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-800">{destination.name}</h2>
                  <p className="text-sm text-gray-500">{destination.location}</p>
                  <p className="text-sm text-gray-600 line-clamp-3">{destination.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-medium text-yellow-600">⭐ {destination.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 mt-10">No destinations found.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
