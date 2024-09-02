import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/hone/footerIcon.png';
import carImage from '../../assets/hone/carLandPage.png';

export const ErrorPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-grey">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-20" />
      </div>

      {/* Error Content */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <motion.h1
          className="text-6xl md:text-8xl font-bold uppercase"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        {/* Car Image */}
        <motion.div
          className="mt-12 w-full max-w-sm mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        >
          <img src={carImage} alt="Lost Car" className="w-full object-cover opacity-50" />
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
        >
          <Link to={'/'}>
            <button className="px-6 py-3 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-xl transition-transform">
              Go Back Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};