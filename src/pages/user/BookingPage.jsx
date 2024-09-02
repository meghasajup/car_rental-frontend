import React from 'react';
import { motion } from 'framer-motion';
import carImage from '../../assets/hone/carLandPage.png';
import backgroundImage from '../../assets/hone/footerIcon.png';
import drivingCarImage from '../../assets/hone/homepic2.jpg';

export const BookingPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-30" />
      </div>

      {/* Booking Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-8 text-center px-4 md:px-8 lg:px-16 xl:px-24 w-full">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold uppercase leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Book Your Ride
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Select your car, set your dates, and drive away with ease.
        </motion.p>

        {/* Car Image */}
        <motion.div
          className="relative z-10 mt-12 w-full max-w-3xl mx-auto px-4 md:px-0"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        >
          <img src={carImage} alt="Luxury Car" className="w-full object-contain" />
        </motion.div>

        {/* Booking Form */}
        <form className="relative z-10 mt-12 w-full max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Pickup Location"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Dropoff Location"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="date"
              placeholder="Start Date"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="time"
              placeholder="Start Time"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="date"
              placeholder="Return Date"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="time"
              placeholder="Return Time"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <input
            type="text"
            placeholder="License Number"
            className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />

          <motion.button
            className="w-full py-4 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-xl xl:text-2xl text-white shadow-lg transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Confirm Booking
          </motion.button>
        </form>
      </section>

      {/* Car Driving Image Section */}
      <section className="relative z-10 w-full h-screen mt-16">
        <motion.img
          src={drivingCarImage}
          alt="Car driving on road"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        />

        {/* Animated Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center space-y-4 text-white px-8 lg:px-16">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
              * BEST PRICE GUARANTEE
            </h3>
            <p className="text-sm md:text-base lg:text-lg">
              If you find a lower price, we'll refund the difference.
            </p>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
              * NO CANCELLATION FEES
            </h3>
            <p className="text-sm md:text-base lg:text-lg">
              Up to 2 days before collecting your vehicle.
            </p>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
              * NO HIDDEN EXTRAS TO PAY
            </h3>
            <p className="text-sm md:text-base lg:text-lg">
              Theft and damage cover included.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
