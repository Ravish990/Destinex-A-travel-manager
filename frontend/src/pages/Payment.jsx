import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const bookingDetails = location.state?.bookingDetails;

  useEffect(() => {
    console.log('Payment Component - Auth State:', { isAuthenticated, user }); // Debug log
    console.log('Payment Component - Booking Details:', bookingDetails); // Debug log

    if (!isAuthenticated || !user) {
      console.log('User not authenticated, redirecting to login'); // Debug log
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!bookingDetails) {
      console.log('No booking details, redirecting to package'); // Debug log
      navigate(`/package/${packageId}`);
      return;
    }

    // Load Razorpay script
    const loadRazorpay = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          setRazorpayLoaded(true);
          setLoading(false);
        };
        
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          setError('Failed to load payment gateway. Please try again.');
          setLoading(false);
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading Razorpay:', error);
        setError('Failed to initialize payment gateway. Please try again.');
        setLoading(false);
      }
    };

    loadRazorpay();

    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [packageId, navigate, isAuthenticated, user, bookingDetails, location]);

  const handlePayment = async () => {
    console.log('Starting payment process...'); // Debug log
    console.log('Current user:', user); // Debug log

    if (!isAuthenticated || !user) {
      console.log('User not authenticated during payment'); // Debug log
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!razorpayLoaded) {
      setError('Payment gateway is not ready. Please try again.');
      return;
    }

    setProcessingPayment(true);
    setError(null);

    try {
      // Create order on your backend
      const orderData = await axios.post('/payment/create-order', {
        amount: bookingDetails.totalCost * 100, // amount in paise
        packageId: packageId,
        bookingDetails: {
          ...bookingDetails,
          userId: user._id || user.userId, // Handle both formats
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone
        }
      });

      console.log('Order created:', orderData.data); // Debug log

      if (!orderData.data) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.data.amount,
        currency: "INR",
        name: "Destinex Travel",
        description: `Payment for ${bookingDetails.packageDetails.name}`,
        order_id: orderData.data.data.id,
        handler: async function (response) {
          console.log('Payment response:', response); // Debug log
          try {
            // Verify payment on your backend
            const verification = await axios.post('/payment/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              packageId: packageId,
              bookingDetails: {
                ...bookingDetails,
                userId: user._id || user.userId,
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone,
                duration: bookingDetails.duration,
                groupType: bookingDetails.groupType
              }
            });

            console.log('Payment verification:', verification.data); // Debug log

            if (verification.data.success) {
              alert('Payment successful!');
              navigate('/bookings');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setError('Payment verification failed. Please contact support.');
            setProcessingPayment(false);
          }
        },
        prefill: {
          name: user.name || "User",
          email: user.email || "",
          contact: user.phone || ""
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            setProcessingPayment(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setError('Payment failed. Please try again.');
        setProcessingPayment(false);
      });
      
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.response?.data?.message || 'Payment failed. Please try again.');
      setProcessingPayment(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading payment gateway...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!bookingDetails) return <div className="text-center py-10">Invalid booking details</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Payment Details</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{bookingDetails.packageDetails.name}</h2>
          <p className="text-gray-600 mb-6">{bookingDetails.packageDetails.description}</p>
          
          <div className="bg-gray-50 p-5 rounded-lg mb-6">
            <h3 className="font-semibold mb-4 text-gray-800">Booking Summary</h3>
            <div className="space-y-3">
              <p className="text-gray-600">Adults: {bookingDetails.adults || 1}</p>
              <p className="text-gray-600">Children: {bookingDetails.children || 0}</p>
              <p className="text-gray-600">Travel Date: {bookingDetails.travelDate || 'Not specified'}</p>
            </div>
          </div>

          <div className="text-2xl font-bold text-green-600 mb-8">
            Total: ₹{bookingDetails.totalCost}
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={processingPayment || !razorpayLoaded}
          className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-green-400"
        >
          {processingPayment ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default Payment; 