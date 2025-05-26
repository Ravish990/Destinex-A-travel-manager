import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Bookings = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCancelBooking = async (bookingId) => {
    console.log(`Attempting to cancel booking with ID: ${bookingId}`);
    try {
      // Make API call to cancel the booking
      const response = await axios.put(`/booking/bookings/${bookingId}`, { status: 'cancelled' });

      if (response.data.success) {
        alert('Booking cancelled successfully!');
        // Refetch bookings to update the list
        // We need to call fetchBookings again.
        // Since fetchBookings is defined inside useEffect, we'll move it outside
        // or create a separate function to handle fetching.
        // For simplicity, let's refetch by calling the useEffect dependency update.
        // A better approach is to have a separate fetch function.

        // A simple way to trigger refetch is to manually call the fetch logic again.
        // Let's move the fetch logic into a separate function.
        fetchBookings(); // Call the fetch function again

      } else {
        alert(`Failed to cancel booking: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('An error occurred while cancelling the booking.');
    }
  };

  // Move fetchBookings outside of useEffect to make it reusable
  const fetchBookings = async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userId = user._id || user.userId;
      if (!userId) {
        setError('User ID not available.');
        setLoading(false);
        return;
      }

      console.log(`Fetching bookings for userId: ${userId}`); // Debug log
      const response = await axios.get(`/booking/bookings/${userId}`);
      console.log('Fetched bookings data:', response.data); // Debug log
      setBookings(response.data.booking);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch bookings. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(); // Initial fetch when component mounts or deps change
  }, [isAuthenticated, user]); // Re-run effect if authentication state or user changes

  if (loading) {
    return <div className="container mx-auto p-4">Loading bookings...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!isAuthenticated || !user) {
    return <div className="container mx-auto p-4">Please log in to view your bookings.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline hover:text-blue-800 transition duration-300 ease-in-out">
          <Home className="mr-2 w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">No Bookings Found</p>
          <p>It looks like you haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="border border-gray-200 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between bg-white">
              <div className="flex-grow mb-4 md:mb-0 md:mr-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-700">Booking ID: {booking._id}</h2>
                <p className="text-gray-600">Package: {booking.packageId ? booking.packageId.name : 'N/A'}</p>
                <p className="text-gray-600">Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Total Amount: <span className="font-semibold text-green-700">₹{booking.totalPrice}</span></p>
                <p className="text-gray-600">Status: <span className={`font-semibold ${booking.status === 'cancelled' ? 'text-red-600' : 'text-green-600'}`}>{booking.status}</span></p>
              </div>
              
              {booking.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex-shrink-0 text-sm"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings; 