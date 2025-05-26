import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Booking = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    adults: 1,
    children: 0,
    travelDate: '',
    specialRequirements: ''
  });

  useEffect(() => {
    // Fetch package details
    axios.get(`/destination/destinations/${packageId}/packages`)
      .then(res => {
        setPackageDetails(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching package:', err);
        setError('Failed to load package details');
        setLoading(false);
      });
  }, [packageId]);

  const calculateTotalCost = () => {
    if (!packageDetails) return 0;
    const adultCost = packageDetails.price * formData.adults;
    const childCost = (packageDetails.price * 0.5) * formData.children; // 50% discount for children
    return adultCost + childCost;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Create booking first
      const bookingData = {
        userId: user._id,
        packageId: packageId,
        adults: formData.adults,
        children: formData.children,
        travelDate: formData.travelDate,
        specialRequirements: formData.specialRequirements,
        totalAmount: calculateTotalCost(),
        status: 'pending'
      };

      const response = await axios.post('/booking/bookings', bookingData);
      
      if (response.data) {
        // Navigate to payment with booking details
        navigate(`/payment/${packageId}`, {
          state: {
            bookingDetails: {
              ...formData,
              totalCost: calculateTotalCost(),
              packageDetails,
              bookingId: response.data._id
            }
          }
        });
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div className="text-center py-10 text-red-600">Please log in to proceed with booking.</div>;
  }

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!packageDetails) return <div className="text-center py-10">Package not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
            Package Details
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{packageDetails.name}</h2>
          <p className="text-gray-600 mb-6">{packageDetails.description}</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Adults</label>
                <input
                  type="number"
                  name="adults"
                  min="1"
                  value={formData.adults}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Children</label>
                <input
                  type="number"
                  name="children"
                  min="0"
                  value={formData.children}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Travel Date</label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Cost Breakdown</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">
                  Adults ({formData.adults}): ₹{packageDetails.price * formData.adults}
                </p>
                {formData.children > 0 && (
                  <p className="text-gray-600">
                    Children ({formData.children}): ₹{(packageDetails.price * 0.5) * formData.children}
                  </p>
                )}
                <p className="text-lg font-bold text-gray-900">
                  Total: ₹{calculateTotalCost()}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {submitting ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
