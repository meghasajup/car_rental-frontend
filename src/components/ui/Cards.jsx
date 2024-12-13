import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import { motion } from 'framer-motion';

export const CarCard = ({ car, userId, onRemove }) => {
  const [isLiked, setIsLiked] = useState(() => {
    const storedValue = localStorage.getItem(`heart-${car._id}`);
    return storedValue === 'true' || car.isLiked;
  });

  // Add car to the wishlist
  const addToWishlist = async (carId, userId) => {
    try {
      const response = await axiosInstance.post('/wishlist/add', { carId, userId });
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return { success: false, message: error.response?.data?.message || "Error adding to wishlist" };
    }
  };

  // Remove car from the wishlist
  const removeFromWishlist = async (carId) => {
    try {
      const response = await axiosInstance.delete(`/wishlist/remove/${carId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return { success: false, message: error.response?.data?.message || "Error removing from wishlist" };
    }
  };

  // Toggle wishlist state on heart icon click
  const toggleWishlist = async () => {
    try {
      if (isLiked) {
        const response = await removeFromWishlist(car._id);
        if (response.success) {
          setIsLiked(false); // Remove red color from heart
          localStorage.setItem(`heart-${car._id}`, 'false'); 
        }
      } else {
        const response = await addToWishlist(car._id, userId);
        if (response.success) {
          setIsLiked(true); // Add red color to heart
          localStorage.setItem(`heart-${car._id}`, 'true'); 
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  // Handle wishlist removal via button click
  const handleRemoveFromWishlist = async () => {
    const response = await removeFromWishlist(car._id);
    if (response.success) {
      onRemove(); // Update parent state through prop
      setIsLiked(false); // Ensure the local state is also updated
      localStorage.setItem(`heart-${car._id}`, 'false'); 
    }
  };

  return (
    <Card className="w-full max-w-[26rem] shadow-2xl p-4 bg-transparent transform transition-all duration-300 hover:shadow-3xl hover:scale-105">
      <CardHeader floated={false} color="blue-gray" className="relative">
        <img src={car.image} alt="car" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />

        {/* Wishlist Icon */}
        <div className="absolute top-3 right-3 cursor-pointer" onClick={toggleWishlist}>
          {isLiked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 text-gray-300 hover:text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          )}
        </div>
      </CardHeader>

      <CardBody>
        <Typography variant="h5" color="blue-gray" className="font-medium text-gray-500">
          {car.model || 'Model'}
        </Typography>
        <Typography color="gray" className="text-gray-500">
          Price Per Day: ₹{car.pricePerDay}
        </Typography>
        <Typography color="gray" className="text-gray-500">
          {car.location || 'Not available'}
        </Typography>
        <Typography color={car.availability ? "green" : "red"} className="text-lg font-semibold mt-3">
          {car.availability ? "Available" : "Not Available"}
        </Typography>

        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          {/* Feature Tooltips */}
          <Tooltip content="Air Conditioning" className="bg-indigo-500 text-white">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6 12a6 6 0 0112 0H6z" />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="Bluetooth" className="bg-indigo-500 text-white">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M11.97 2.03L10 4l1.5 1.5 1.47-1.46 1.5 1.5-2.97 2.97 3 3.01-1.5 1.5L12 10.5l-1.5 1.5 1.5 1.5-1.97 1.97 3.97 3.97L15.5 18l-2.03-2.03 1.97-1.97-2.97-2.97 2.97-2.97L12 4l1.5-1.5L13 2.03 11.97 2.03z" />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="GPS" className="bg-indigo-500 text-white">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a2 2 0 110 4 2 2 0 010-4zm0 12a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8z" />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="Parking Sensors" className="bg-indigo-500 text-white">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zm0 16a6 6 0 01-6-6 6 6 0 016-6 6 6 0 016 6 6 6 0 01-6 6zm0-9a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="USB Port" className="bg-indigo-500 text-white">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a2 2 0 00-2 2v5a2 2 0 002 2 2 2 0 002-2V4a2 2 0 00-2-2zm0 7a1 1 0 01-1-1V4a1 1 0 012 0v4a1 1 0 01-1 1zm-6 9h4v-2H6a2 2 0 00-2 2v1a1 1 0 001 1h4v-2H6v-2zm8 0h4v-2h-4v2zm-6-6h12v2H8v-2z" />
              </svg>
            </span>
          </Tooltip>
        </div>
      </CardBody>

      <CardFooter className="flex items-center gap-4">
        <Link to={`/user/car-details/${car._id}`} className="w-full">
          <motion.button
            className="w-full px-4 py-3 font-semibold bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            More Details
          </motion.button>
        </Link>

        <motion.button
          className="w-full px-4 py-3 font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-lg hover:bg-red-800 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleRemoveFromWishlist}
        >
          Remove Wishlist
        </motion.button>
      </CardFooter>
    </Card>
  );
};