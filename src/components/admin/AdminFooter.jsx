import React from 'react';
import { motion } from 'framer-motion';

export const AdminFooter = () => {
  return (
    <motion.footer 
      className="bg-gray-800 text-white py-6 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Copyright */}
        <motion.div 
          className="text-sm mb-4 md:mb-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          &copy; {new Date().getFullYear()} Car Rental Admin Dashboard. All rights reserved.
        </motion.div>

        {/* Right Section: Links */}
        <motion.div 
          className="flex space-x-4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.a 
            href="/terms" 
            className="hover:text-gray-400"
            whileHover={{ scale: 1.1, color: "#ccc" }}
          >
            Terms of Service
          </motion.a>
          <motion.a 
            href="/privacy" 
            className="hover:text-gray-400"
            whileHover={{ scale: 1.1, color: "#ccc" }}
          >
            Privacy Policy
          </motion.a>
          <motion.a 
            href="/contact" 
            className="hover:text-gray-400"
            whileHover={{ scale: 1.1, color: "#ccc" }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
};