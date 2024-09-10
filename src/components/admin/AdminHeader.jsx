import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkMode } from '../ui/DarkMode';
import { FaBars, FaTimes } from 'react-icons/fa';
import { axiosInstance } from '../../config/axiosInstance'; 

export const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate(); // For navigation after logout

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/admin/logout');
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.div
      className='flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <motion.h1
          className="text-3xl font-bold font-sans cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Admin Panel
        </motion.h1>
      </div>

      <div className='md:hidden flex items-center'>
        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />} {/* Hamburger icon */}
        </button>
      </div>

      <nav
        className={`${isOpen ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row items-center gap-6 md:gap-20 font-semibold absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-6 md:p-0`}
      >
        <Link to={'/admin/admin-dashboard'} onClick={toggleMenu}>Dashboard</Link>
        <Link to={'/admin/user-management'} onClick={toggleMenu}>Users</Link>
        <Link to={'/admin/car-management'} onClick={toggleMenu}>Cars</Link>
        <Link to={'/admin/booking-management'} onClick={toggleMenu}>Bookings</Link>
        <Link to={'/admin/review-management'} onClick={toggleMenu}>Reviews</Link>
      </nav>

      <div className='hidden md:flex items-center gap-4'>
        <DarkMode />
        <motion.button
          onClick={handleLogout}
          className="mt-2 px-3 py-2 text-white bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-l hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};
