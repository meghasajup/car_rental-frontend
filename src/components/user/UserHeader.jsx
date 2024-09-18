import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkMode } from '../ui/DarkMode';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Heart } from 'lucide-react'; // Import Heart icon

export const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <Link to={'/user/home'}>
          <motion.h1
            className="text-3xl font-bold font-sans cursor-pointer dark:text-grey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Carista
          </motion.h1>
        </Link>
      </div>

      {/* Hamburger Icon for Small Screens */}
      <div className='md:hidden'>
        <button onClick={handleMenuToggle} className="text-3xl focus:outline-none">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`${isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center gap-6 md:gap-20 font-semibold absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-50 md:z-auto`}
      >
        <Link
          to={'/user/home'}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors px-4 py-2 md:px-0"
        >
          Home
        </Link>
        <Link
          to={'/user/about'}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors px-4 py-2 md:px-0"
        >
          About Us
        </Link>
        <Link
          to={'/user/car'}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors px-4 py-2 md:px-0"
        >
          Car
        </Link>
        <Link
          to={'/user/contact'}
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors px-4 py-2 md:px-0"
        >
          Contact
        </Link>
      </nav>

      {/* Right Section with Dark Mode, Profile Button, and Heart Icon */}
      <div className='flex items-center gap-4'>
        <DarkMode />
        <Link to={"/user/wishlist"}>
          <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
        </Link>
        <Link to={'/user/profile'}>
          <button className="bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white px-3 py-2 rounded-full">
            Profile
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
