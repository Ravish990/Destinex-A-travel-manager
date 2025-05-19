import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PackageDetail = () => {
  const { id } = useParams(); 
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/packages/${id}`)
      .then(res => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load package details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading package details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!pkg) return <div className="text-center py-10">Package not found</div>;

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">{pkg.name}</h1>
      <img src={pkg.image} alt={pkg.name} className="w-full max-w-2xl rounded-xl shadow mb-6" />
      <p className="text-lg text-gray-700 mb-2"><strong>Description:</strong> {pkg.description}</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Price:</strong> ₹{pkg.price}</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Duration:</strong> {pkg.duration}</p>
      {/* Add more fields as needed */}
      <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
        Proceed to Payment
      </button>
    </div>
  );
};

export default PackageDetail;
