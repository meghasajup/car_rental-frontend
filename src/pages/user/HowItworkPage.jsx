import React from 'react';
import { MapPin, Calendar, Car } from 'lucide-react'; 
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const iconColor = "#3B1AAB"; 

  return (
    <section className="w-full px-4 py-12 md:px-8 lg:px-16 xl:px-24">
      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-12">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-4 text-center">
        <motion.div
          className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <MapPin size={64} color={iconColor} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Choose location</h3>
          <p className="text-gray-600">
            Choose your location and find your best car
          </p>
        </motion.div>
        <motion.div
          className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Calendar size={64} color={iconColor} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Pick-up date</h3>
          <p className="text-gray-600">
            Select your pick-up date and time to book your car
          </p>
        </motion.div>
        <motion.div
          className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <Car size={64} color={iconColor} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Book your car</h3>
          <p className="text-gray-600">
            Book your car and we will deliver it directly to you
          </p>
        </motion.div>
      </div>
    </section>
  );
};
