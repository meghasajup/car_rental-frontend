import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaMapMarkerAlt, FaCar, FaRegSmileBeam } from 'react-icons/fa';
import backgroundImage from '../../assets/hone/footerIcon.png'; // Use the background image from the homepage
import { WhyChooseUs } from './WhyChooseUsPage';

export const AboutPage = () => {
  return (
    <div className="about-container relative overflow-hidden">
      
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-30" />
      </motion.div>

      {/* About Section */}
      <motion.section
        className="relative py-12 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-semibold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          At Morent, we take pride in being a Kerala-based car rental service that offers a wide range of vehicles for every occasion. 
          Whether you’re a tourist exploring Kerala’s natural beauty or a local on a business trip, we have the perfect car for you.
        </motion.p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="relative py-12 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h3
          className="text-2xl font-semibold mb-6 flex items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Our Mission <FaMapMarkerAlt className="ml-2 text-[#8A3FFC]" />
        </motion.h3>
        <motion.p
          className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Our mission is to make travel within Kerala hassle-free with our well-maintained vehicles and seamless service. As we look to the future, we aim to expand our presence across India, offering the same level of service nationwide.
        </motion.p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="relative py-12 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h3
          className="text-2xl font-semibold mb-6 flex items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          What We Offer <FaCar className="ml-2 text-[#8A3FFC]" />
        </motion.h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            'Wide range of vehicles (SUVs, Sedans, Hatchbacks)',
            'Flexible rental plans (daily, weekly, monthly)',
            '24/7 customer support',
            'Easy online booking and cancellation',
            'Pickup and drop-off services'
          ].map((text, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-left flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <FaCheckCircle className="text-[#8A3FFC] text-2xl" />
              <p className="text-lg text-gray-700">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* Why Choose Us Section */}
      <WhyChooseUs /> 

      {/* Vision Section */}
      <motion.section
        className="relative py-12 px-6 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h3
          className="text-2xl font-semibold mb-6 flex items-center justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Our Dream <FaRegSmileBeam className="ml-2" />
        </motion.h3>
        <motion.p
          className="text-lg leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          We envision becoming a nationally recognized car rental brand, starting from Kerala and expanding across India. Our goal is to offer affordable, quality car rentals with a customer-first approach, wherever you travel.
        </motion.p>
      </motion.section>
    </div>
  );
};
