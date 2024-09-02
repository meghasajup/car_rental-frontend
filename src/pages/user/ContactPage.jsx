import React from 'react';
import { motion } from 'framer-motion';
import contactBackground from '../../assets/hone/footerIcon.png';

export const ContactPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center w-full px-4 md:px-8 lg:px-16 xl:px-24 space-y-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={contactBackground} alt="Contact Background" className="w-full h-full object-cover opacity-20" />
      </div>

      <motion.h1
        className="relative z-10 text-4xl md:text-5xl lg:text-7xl font-bold uppercase text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Get in Touch
      </motion.h1>

      <motion.p
        className="relative z-10 text-lg md:text-xl lg:text-2xl max-w-xl text-center leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >
        We're here to assist you. Reach out to us through any of the following methods.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        className="relative z-10 w-full max-w-2xl space-y-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      >
        <div className="flex flex-col space-y-4">
          <label className="text-lg md:text-xl">Name</label>
          <input
            type="text"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <label className="text-lg md:text-xl">Email</label>
          <input
            type="email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <label className="text-lg md:text-xl">Message</label>
          <textarea
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Your message"
            rows="5"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 mt-8 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-xl text-white font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Contact Information */}
      <motion.div
        className="relative z-10 text-center space-y-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
      >
        <p className="text-lg md:text-xl">Email: carista@example.com</p>
        <p className="text-lg md:text-xl">Phone: +91 9876543210</p>
        <p className="text-lg md:text-xl">Address:  Carista, Near Calicut Beach, Beach Rd,<br></br> opp. Lions Park, Vellayil,<br></br> Kozhikode, Kerala <br></br> 673032</p>
      </motion.div>
    </main>
  );
};
