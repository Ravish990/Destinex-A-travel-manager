import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const Booking = () => {
  const { packageId } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/package/${packageId}`)
      .then(res => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch package details');
        setLoading(false);
      });
  }, [packageId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/booking', {
        packageId,
        ...form
      });
      navigate(`/payment/${packageId}`);
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading booking details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-yellow-100 to-pink-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Book Package: {pkg?.name}</h1>
      <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={submitting}>
          {submitting ? 'Booking...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
};

export default Booking; 