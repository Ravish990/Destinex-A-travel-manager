import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { packageId } = useParams();
  const [paid, setPaid] = useState(false);

  const handlePayment = () => {
    setTimeout(() => setPaid(true), 1000); // Mock payment delay
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment for Package</h1>
      {!paid ? (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <p className="mb-4">Click below to complete your payment.</p>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Payment Successful!</h2>
          <p className="text-gray-700">Your booking is confirmed. Thank you for choosing us!</p>
        </div>
      )}
    </div>
  );
};

export default Payment; 