import React from 'react';
import { motion } from 'framer-motion';

export const Location = () => {
  return (
    <motion.div 
      className="relative z-20 mt-8 flex flex-col items-center w-full max-w-4xl mx-auto bg-white rounded-full shadow-md p-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:p-6 lg:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Location Input */}
      <motion.div 
        className="flex items-center w-full md:w-auto space-x-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.134 2 5 5.134 5 9c0 7.333 7 13 7 13s7-5.667 7-13c0-3.866-3.134-7-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <input
          type="text"
          placeholder="Search your location"
          className="w-full p-2 bg-transparent outline-none text-gray-600 placeholder-gray-400"
        />
      </motion.div>

      {/* Pickup Date-Time Input */}
      <motion.div 
        className="flex items-center space-x-2 w-full md:w-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H16M7 12H17M9 17H15" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 0a8 8 0 110 16A8 8 0 0112 8z" />
        </svg>
        <input
          type="datetime-local"
          className="w-full p-2 bg-transparent outline-none text-gray-600 placeholder-gray-400"
          placeholder="Pickup Date & Time"
        />
      </motion.div>

      {/* Return Date-Time Input */}
      <motion.div 
        className="flex items-center space-x-2 w-full md:w-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H16M7 12H17M9 17H15" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 0a8 8 0 110 16A8 8 0 0112 8z" />
        </svg>
        <input
          type="datetime-local"
          className="w-full p-2 bg-transparent outline-none text-gray-600 placeholder-gray-400"
          placeholder="Return Date & Time"
        />
      </motion.div>

      {/* Search Button */}
      <motion.button
        className="px-6 py-3 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-grey rounded-full text-lg transition-transform shadow-lg w-full md:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
      >
        Search
      </motion.button>
    </motion.div>
  );
};
