import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkMode } from './ui/DarkMode';
import { FaBars, FaTimes } from 'react-icons/fa'; 

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <motion.div
      className='flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <div>
        <motion.h1
          className="text-3xl font-bold font-sans cursor-pointer dark:text-grey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Carista
        </motion.h1>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className='md:hidden flex items-center'>
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="p-2 rounded"
        >
          {isOpen ? <FaTimes size={24} className="text-black dark:text-grey" /> : <FaBars size={24} className="text-black dark:text-grey" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`${isOpen ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row items-center gap-6 md:gap-20 font-semibold absolute md:static top-20 left-0 w-full md:w-auto shadow-md md:shadow-none p-6 md:p-0 z-10`}
      >
        <Link
          to={'/'}
          onClick={closeMenu}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Home
        </Link>
        <Link
          to={'/about'}
          onClick={closeMenu}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          About Us
        </Link>
        <Link
          to={'/register'}
          onClick={closeMenu}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Car
        </Link>
        <Link
          to={'/contact'}
          onClick={closeMenu}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Contact
        </Link>

        {/* Dark Mode and Join Us Button in Mobile View */}
        <div className="flex flex-col md:hidden gap-4 mt-4">
          <DarkMode />
          <Link to={"/register"}>
            <motion.button
              className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-l hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Us
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Right Section with Dark Mode and Join Us Button for Larger Screens */}
      <div className='hidden md:flex items-center gap-4'>
        <DarkMode />
        <Link to={"/register"}>
          <motion.button
            className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-l hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Us
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};