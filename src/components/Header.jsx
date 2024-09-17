import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkMode } from './ui/DarkMode';
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.div
      className="flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl"
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
      <div className="md:hidden" onClick={toggleMenu}>
        {menuOpen ? (
          <HiX className="text-3xl cursor-pointer dark:text-grey" />
        ) : (
          <HiOutlineMenuAlt4 className="text-3xl cursor-pointer dark:text-grey" />
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex flex-row items-center gap-10 font-semibold">
        <Link
          to="/"
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          About Us
        </Link>
        <Link
          to="/login"
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Car
        </Link>
        <Link
          to="/contact"
          className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Contact
        </Link>
      </nav>

      {/* Right Section with Dark Mode and Join Us Button */}
      <div className="hidden md:flex items-center gap-4">
        <DarkMode />
        <Link to="/register">
          <motion.button
            className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-l hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Us
          </motion.button>
        </Link>
      </div>

      {/* Mobile Menu (Visible on small screens) */}
      {menuOpen && (
        <motion.div
          className="absolute top-20 left-0 w-full bg-white shadow-xl z-50 md:hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="flex flex-col items-center gap-6 py-6 font-semibold">
            <Link
              to="/"
              className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              onClick={toggleMenu}
            >
              About Us
            </Link>

            <Link
              to="/login"
              className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              onClick={toggleMenu}
            >
              Car
            </Link>

            <Link
              to="/contact"
              className="text-gray dark:text-gray hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            <div className="flex items-center gap-4">
              <DarkMode />
              <Link to="/register" onClick={toggleMenu}>
                <motion.button
                  className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg hover:scale-105 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Us
                </motion.button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.div>
  );
};
