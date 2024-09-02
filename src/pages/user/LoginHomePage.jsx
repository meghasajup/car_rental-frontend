import React from 'react';
import { motion } from 'framer-motion';
import carImage from '../../assets/hone/carLandPage.png';
import backgroundImage from '../../assets/hone/footerIcon.png';
import drivingCarImage from '../../assets/hone/homepic2.jpg';
import image1 from '../../assets/hone/homepic3.jpg';
import image2 from '../../assets/hone/homepic4.png';
import { Location } from '../../components/Location.jsx';
import { HowItWorks } from './HowItworkPage.jsx';
import Testimonials from './TestimonialsPage.jsx';

export const LoginHomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden w-full">
      {/* Hero Section */}
      <section
        className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-8 text-center px-4 md:px-8 lg:px-16 xl:px-24 w-full">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-30" />
        </div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold uppercase leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Drive Your Dream
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Explore our collection of luxury cars and book the perfect one for your next journey.
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

        {/* Location Input Section */}
        <Location />

        {/* How It Works Section */}
        <HowItWorks /> {/* Include the HowItWorks component here */}

        {/* Book Now Button */}
        {/* <motion.button
          className="mt-8 mb-16 px-6 py-3 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-xl xl:text-2xl transition-transform shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Now
        </motion.button> */}
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

      {/* Section with Two Images and Text */}
      <section className="relative z-10 w-full h-screen mt-16 flex items-center justify-center px-8 lg:px-16 space-x-8">
        <div className="flex-1 space-y-4 text-grey">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-6xl font-bold uppercase leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Enjoy your <br></br> holidays
          </motion.h2>
          <motion.h2
            className="text-2xl md:text-3xl lg:text-5xl font-bold uppercase leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Get lowest rental <br></br> car
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl lg:text-1xl leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            Self-driving cars are the natural extension of active safety and obviously something we should do. It’s a never-ending battle of making your cars better and also trying to be better yourself.
          </motion.p>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.img
            src={image1}
            alt="Car driving on road"
            className="w-full h-full object-cover rounded-md"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          />
          <motion.img
            src={image2}
            alt="Hand holding smartphone over road"
            className="w-full h-full object-cover rounded-md"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
          />
        </div>
      </section>

      {/* Testimonials here */}
      <Testimonials/>
    </main>
  );
};
