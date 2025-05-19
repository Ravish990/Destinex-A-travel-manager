import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Packages = () => {
  const { destinationId } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  // Get unique categories for filter
  const categories = ['All', ...new Set(packages.map(pkg => pkg.category).filter(Boolean))];

  // Filter packages by selected category
  const filteredPackages = selectedCategory === 'All' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-300 border-l-blue-500 border-r-blue-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading amazing travel packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-center text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-blue-900/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              Discover Our Packages
            </h1>
            <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto font-medium">
              Find the perfect travel experience tailored just for you
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Package Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {pkg.category && (
                  <span className="absolute top-4 right-4 bg-white/90 text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                    {pkg.category}
                  </span>
                )}
              </div>

              {/* Package Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {pkg.name}
                </h3>
                <div className="w-10 h-1 bg-blue-500 rounded mb-4"></div>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm">
                  {pkg.description}
                </p>

                {/* Price and Button */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-gray-900 font-bold text-2xl">
                    ₹{pkg.price}
                  </div>
                  <button
                    onClick={() => handleBookNow(pkg)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    View Package
                  </button>
                </div>

                {/* Features */}
                {pkg.features && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-blue-50 inline-block p-4 rounded-full mb-4">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any packages matching your criteria. Please try another category or check back later.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-800 py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Finding the Perfect Package?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our travel experts are ready to help you plan your dream vacation with personalized recommendations.
          </p>
          <button className="bg-white text-blue-800 hover:bg-blue-50 font-medium px-8 py-3 rounded-lg shadow-md transition-colors duration-200">
            Contact Our Travel Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Packages;