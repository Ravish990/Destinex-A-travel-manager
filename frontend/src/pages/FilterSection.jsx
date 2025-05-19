import React from "react";

const FilterSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky top-4 text-black" >
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium">Price</h3>
        <div className="space-y-1 mt-2">
          <label><input type="checkbox" className="mr-2" /> Below ₹ 100k</label><br />
          <label><input type="checkbox" className="mr-2" /> Below ₹ 150k</label><br />
          <label><input type="checkbox" className="mr-2" /> Below ₹ 200k</label><br />
          <label><input type="checkbox" className="mr-2" /> Above ₹ 200k</label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium">Star Rating</h3>
        <div className="space-y-1 mt-2">
          <label><input type="checkbox" className="mr-2" /> 3 Star</label><br />
          <label><input type="checkbox" className="mr-2" /> 4 Star</label><br />
          <label><input type="checkbox" className="mr-2" /> 5 Star</label>
        </div>
      </div>

      <div>
        <h3 className="font-medium">Villa Type</h3>
        <div className="space-y-1 mt-2">
          <label><input type="checkbox" className="mr-2" /> Water Villa</label><br />
          <label><input type="checkbox" className="mr-2" /> Beach Bungalow</label><br />
          <label><input type="checkbox" className="mr-2" /> Pool Villa</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
