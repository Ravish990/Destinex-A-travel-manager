import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const Booking = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); 
  const [pkg, setPkg] = useState(null);
  const [form, setForm] = useState({
    numberOfPeople: 1,
    date: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch package details
  useEffect(() => {
    axios.get(`/package/${packageId}`)
      .then(res => {
        const packageData = res.data.data || res.data; // adjust depending on backend structure
        setPkg(packageData);
        setTotalPrice(packageData.price); // initial price
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch package details');
        setLoading(false);
      });
  }, [packageId]);

  // Update total price when number of people changes
  useEffect(() => {
    if (pkg) {
      setTotalPrice(pkg.price * form.numberOfPeople);
    }
  }, [form.numberOfPeople, pkg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'numberOfPeople' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!userId) {
      setError('You must be logged in to book.');
      setSubmitting(false);
      return;
    }

    try {
      await axios.post('/bookings', {
        userId,
        destinationId: pkg.destination,
        bookingDate: form.date,
        numberOfPeople: form.numberOfPeople,
        totalPrice,
        packageId
      });

      navigate(`/payment/${packageId}`);
    } catch (err) {
      console.error(err);
      setError('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!userId) {
    return <div className="text-center py-10 text-red-600">Please log in to proceed with booking.</div>;
  }

  if (loading) return <div className="text-center py-10">Loading package details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Package: {pkg.name}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Travel Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Number of People</label>
          <input
            type="number"
            name="numberOfPeople"
            value={form.numberOfPeople}
            min="1"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-lg text-gray-800"><strong>Total Price:</strong> ₹{totalPrice}</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default Booking;
