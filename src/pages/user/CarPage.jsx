import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { CarCard } from '../../components/ui/Cards';
import { motion } from 'framer-motion';

export const CarPage = () => {
  const [car, setCar] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axiosInstance({
        url: '/car/carList',
        method: "GET",
        withCredentials: true
      });
      setCar(response?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed fetching products");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className='px-4 md:px-10 lg:px-20 py-6 md:py-8 lg:py-10'>
      <motion.h1
        className='font-bold text-2xl md:text-3xl lg:text-4xl my-4 md:my-5 lg:my-6 text-center'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        List of Cars
      </motion.h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10'>
        {car.map((value, index) => (
          <CarCard key={value.id || `car-${index}`} car={value} />
        ))}
      </div>
    </div>  
  );
};
