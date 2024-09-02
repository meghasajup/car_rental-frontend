import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkMode } from './ui/DarkMode';

export const Header = () => {
  return (
    <motion.div
      className='flex items-center justify-between w-full h-20 px-20 shadow-xl'
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

      <nav className='flex items-center gap-20 font-semibold'>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About Us</Link>
        <Link to={'/car'}>Car</Link>
        <Link to={'/contact'}>Contact</Link>
      </nav>

      <div className='flex items-center gap-4'>
        <DarkMode />
        <motion.button
          className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full text-lg md:text-l hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </div>
    </motion.div>
  )
};