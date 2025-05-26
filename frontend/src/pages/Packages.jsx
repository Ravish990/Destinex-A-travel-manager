import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Packages = () => {
  const { destinationId } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/destination/destinations/${destinationId}/packages`)
      .then(res => {
        setPackages(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch packages');
        setLoading(false);
      });
  }, [destinationId]);

  const handleBookNow = (pkg) => {
    navigate(`/package/${pkg._id}`);
  };

  if (loading) return <div className="text-center py-10">Loading packages...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Available Packages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
          >
            <img src={pkg.image} alt={pkg.name} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{pkg.name}</h2>
            <p className="text-gray-600 mb-2">{pkg.description}</p>
            <p className="text-gray-800 font-bold mb-2">₹{pkg.price}</p>
            <button
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => handleBookNow(pkg)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages; 