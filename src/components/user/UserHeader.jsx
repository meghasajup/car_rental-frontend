import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkMode } from '../ui/DarkMode';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import { CircleUserRound, Heart } from 'lucide-react';

export const UserHeader = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          Carista
        </motion.h1>
      </div>

      <div className='md:hidden flex items-center'>
        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />} {/* Hamburger icon */}
        </button>
      </div>

      <nav
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row items-center gap-6 md:gap-20 font-semibold absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-6 md:p-0`}
      >
        <Link to={'/user/home'} onClick={toggleMenu}>Home</Link>
        <Link to={'/user/about'} onClick={toggleMenu}>About Us</Link>
        <Link to={'/user/car'} onClick={toggleMenu}>Car</Link>
        <Link to={'/user/my-cars'} onClick={toggleMenu}>My Cars</Link> 
        <Link to={'/user/contact'} onClick={toggleMenu}>Contact</Link>
      </nav>

      <div className='hidden md:flex items-center gap-4'>
        <DarkMode />
        <Heart />
        <CircleUserRound />
      </div>
    </motion.div>
  );
};
