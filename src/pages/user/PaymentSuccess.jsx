import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen   ">
      <motion.div
        className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Success SVG */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          className="w-16 h-16 mx-auto mb-6"
        >
          <motion.circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeDasharray="157"
            strokeDashoffset="157"
            initial={{ strokeDashoffset: 157 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.path
            fill="none"
            stroke="#4CAF50"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="35"
            strokeDashoffset="35"
            d="M14 27l8 8 16-16"
            initial={{ strokeDashoffset: 35 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.svg>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
        
        <Link to="/user/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
          Go to Bookings
        </Link>
      </motion.div>
    </div>
  );
};
