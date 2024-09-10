import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { CarCard } from '../../components/ui/Cards';
import { motion } from 'framer-motion';

export const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);  // To store car categories
  const [selectedCategory, setSelectedCategory] = useState('All');  // Default category

  const fetchCars = async (category = 'All') => {
    try {
      const response = await axiosInstance({
        url: '/car/carList',
        method: 'GET',
        withCredentials: true,
      });

      const allCars = response?.data?.data || [];
      setCars(
        category === 'All'
          ? allCars
          : allCars.filter(car => car.category === category)
      );

      // Set categories dynamically based on car data
      const carCategories = ['All', ...new Set(allCars.map(car => car.category))];
      setCategories(carCategories);
    } catch (error) {
      console.log(error);
      toast.error('Failed fetching cars');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchCars(category);
  };

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

      {/* Category Filter Buttons */}
      <div className='flex justify-center space-x-4 mb-6'>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Car List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10'>
        {cars.map((car, index) => (
          <CarCard key={car.id || `car-${index}`} car={car} />
        ))}
      </div>
    </div>
  );
};
