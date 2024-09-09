import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LocationSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      >
        <FaMapMarkerAlt className="text-red-500 text-6xl mb-4" />
      </motion.div>
      
      
      <motion.p
        className="text-lg text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        We are excited to offer our car rental services across all locations in Kerala. Whether you're in a city or a small town, you'll find our cars available to meet your transportation needs.
      </motion.p>
    </div>
  );
};

export default LocationSection;
