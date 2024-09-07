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
          we believe in making your travel experience seamless and enjoyable. As a trusted car rental service, we offer a wide selection of
          well-maintained vehicles to suit every journey, whether you're traveling for business or anything in between. Our goal is to
          provide affordable, flexible, and reliable rentals with excellent customer service, ensuring you have a smooth ride every time. Let us
          be your go-to for convenient and hassle-free car rentals.
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
          className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto"
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
            'Wide range of vehicles (Polo, Range Rover, Honda Civc and more)',
            'Flexible rental plans',
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
          Our Dream
        </motion.h3>
        <motion.p
          className="text-lg leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Our dream is to revolutionize the way people travel. We aim to create a world where renting a car is as easy and enjoyable as the
          journey itself. By providing top-tier service, a diverse range of vehicles, and seamless online booking, we aspire to give every
          customer the freedom to explore with confidence. Our vision is to be a driving force in sustainable, accessible transportation,
          offering innovative solutions that keep you moving forward.
        </motion.p>
      </motion.section>
    </div>
  );
};