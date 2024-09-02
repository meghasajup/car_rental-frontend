import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaTag, FaMapMarkerAlt } from 'react-icons/fa';
import placeholderImage from '../../assets/hone/whychooseus.jpg'; 

export const WhyChooseUs = () => {
  return (
    <motion.section
      className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white transition-colors space-y-12 md:space-y-0 md:space-x-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
      >
        <img src={placeholderImage} alt="Why Choose Us" className="w-3/4 md:w-full h-auto object-cover rounded-lg shadow-2xl" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-4xl font-bold text-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A high-performing web-based car rental system for any rent-a-car company and website.
        </motion.p>

        <div className="space-y-4">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, x: 10 }}
          >
            <FaHeadset className="text-gray-800 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Customer Support</h3>
              <p className="text-gray-600">24/7 customer support for all your needs.</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, x: 10 }}
          >
            <FaTag className="text-gray-800 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Best Price Guaranteed</h3>
              <p className="text-gray-600">We ensure the best pricing for all our rentals.</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05, x: 10 }}
          >
            <FaMapMarkerAlt className="text-gray-800 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Many Locations</h3>
              <p className="text-gray-600">Available in multiple locations worldwide.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
