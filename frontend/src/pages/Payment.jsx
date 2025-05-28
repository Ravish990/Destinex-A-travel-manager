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
    if (!isAuthenticated || !user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!bookingDetails) {
      navigate(`/package/${packageId}`);
      return;
    }

    const loadRazorpay = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
          setRazorpayLoaded(true);
          setLoading(false);
        };

        script.onerror = () => {
          setError('Failed to load payment gateway. Please try again.');
          setLoading(false);
        };

        document.body.appendChild(script);
      } catch (error) {
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
    if (!isAuthenticated || !user) {
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
      const orderData = await axios.post('/payment/create-order', {
        amount: bookingDetails.totalCost * 100,
        packageId: packageId,
        bookingDetails: {
          ...bookingDetails,
          userId: user._id || user.userId,
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone
        }
      });

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
          try {
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
                userPhone: user.phone
              }
            });

            if (verification.data.success) {
              alert('Payment successful!');
              navigate('/bookings');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
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
          color: "#22c55e"
        },
        modal: {
          ondismiss: function () {
            setProcessingPayment(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function () {
        setError('Payment failed. Please try again.');
        setProcessingPayment(false);
      });

      paymentObject.open();
    } catch (error) {
      setError(error.response?.data?.message || 'Payment failed. Please try again.');
      setProcessingPayment(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-lg">Loading payment gateway...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-medium">{error}</div>;
  if (!bookingDetails) return <div className="text-center py-10">Invalid booking details</div>;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?travel,city')" }}>
      <div className="bg-black/80 rounded-3xl shadow-2xl p-12 w-full max-w-2xl text-white h-[800px] flex flex-col justify-between">
        <div>
          <h1 className="text-5xl font-bold mb-6 text-center">Payment Details</h1>
          <h2 className="text-3xl font-semibold mb-4 text-center">{bookingDetails.packageDetails.name}</h2>
          <p className="text-gray-300 text-center mb-8">{bookingDetails.packageDetails.description}</p>

          <div className="bg-gray-800 p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-semibold mb-6">Booking Summary</h3>
            <div className="space-y-4">
              <p className="flex justify-between text-lg"><span className="font-medium">Adults:</span> {bookingDetails.adults || 1}</p>
              <p className="flex justify-between text-lg"><span className="font-medium">Travel Date:</span> {bookingDetails.travelDate || 'Not specified'}</p>
            </div>
            <div className="mt-6 text-2xl font-bold text-green-400 flex justify-between">
              <span>Total:</span> ₹{bookingDetails.totalCost}
            </div>
            <div className="mt-4 flex items-center text-base text-gray-400">
              <span className="mr-2">✔</span> 100% Secure Checkout
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={processingPayment || !razorpayLoaded}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed text-lg"
        >
          {processingPayment ? 'Processing...' : 'Complete Secure Payment'}
        </button>
      </div>
    </div>
  );
};

export default Payment;