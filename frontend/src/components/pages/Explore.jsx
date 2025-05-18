import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSection from './FilterSection';
import DestinationList from './DestinationList';

function Explore() {
  const location = useLocation();
  const destination = location.state?.destination || "All";

  // Control how many items to show in DestinationList (optional)
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <div className="flex gap-6 p-6">
      <div className="w-1/4">
        <FilterSection />
      </div>

      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-4">
          {destination === "All" ? "Explore All Destinations" : `Explore: ${destination}`}
        </h1>

        <DestinationList visibleCount={visibleCount} destination={destination} />

        {visibleCount < 12 && (
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Explore;
