import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* First SVG - Checkmark */}
        <motion.div
          className="mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7M5 13l-2 2L2 15l3-3 2-2L5 13z"
            />
          </svg>
        </motion.div>

        

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
        
        
        
        <Link to="/user/home" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
};