import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { FaGasPump, FaPalette, FaCogs, FaCar, FaTachometerAlt, FaMapMarkerAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
  const [selectedDates, setSelectedDates] = useState([null, null]); // [startDate, endDate]
  const { id } = useParams();

  const fetchCarDetails = async () => {
    try {
      const response = await axiosInstance({
        url: `/car/getCar/${id}`,
        method: 'GET',
        withCredentials: true,
      });
      setCarDetails(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const calculateDays = () => {
    const [startDate, endDate] = selectedDates;
    if (startDate && endDate) {
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays > 0 ? differenceInDays : 0;
    }
    return 0;
  };

  const formatSelectedDates = () => {
    const [startDate, endDate] = selectedDates;
    if (startDate && endDate) {
      return `Selected dates: ${format(startDate, 'dd/MM/yyyy')} to ${format(endDate, 'dd/MM/yyyy')}`;
    }
    return 'No dates selected';
  };

  const pricePerDay = carDetails.pricePerDay || 100; // Default price if not available
  const totalDays = calculateDays();
  const totalPrice = totalDays * pricePerDay;

  return (
    <div className="flex flex-col items-center">
      {/* Full-width image with rounded edges and animation */}
      <motion.div
        className="relative w-full h-96 px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={carDetails.image || 'default-image-url.jpg'}
          alt={carDetails.model || 'Car Image'}
          className="w-full h-full object-contain rounded-lg py-8"
        />
      </motion.div>

      {/* Car Details with animation */}
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-2xl font-bold">{carDetails.model || 'Model'}</h1>

        <motion.div
          className="my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-xl">Brand: {carDetails.brand || 'Brand'}</h2>
          <h2 className="text-xl">Category: {carDetails.category || 'Category'}</h2>
          <h2 className="text-xl">Year: {carDetails.year || 'Year'}</h2>
          <h2 className="text-xl">Register Number: {carDetails.registerNumber || 'Register Number'}</h2>
        </motion.div>

        {/* Icons and Car Details in a single row with text below */}
        <motion.div
          className="grid grid-cols-6 gap-4 my-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Fuel Type */}
          <div className="flex flex-col items-center">
            <FaGasPump className="text-3xl mb-2" />
            <span>{carDetails.fuelType || 'Petrol'}</span>
          </div>

          {/* Color */}
          <div className="flex flex-col items-center">
            <FaPalette className="text-3xl mb-2" />
            <span>{carDetails.color || 'Color'}</span>
          </div>

          {/* Transmission */}
          <div className="flex flex-col items-center">
            <FaCogs className="text-3xl mb-2" />
            <span>{carDetails.transmission || 'Transmission'}</span>
          </div>

          {/* Seats */}
          <div className="flex flex-col items-center">
            <FaCar className="text-3xl mb-2" />
            <span>{carDetails.capacity || 'Seats'}</span>
          </div>

          {/* Mileage */}
          <div className="flex flex-col items-center">
            <FaTachometerAlt className="text-3xl mb-2" />
            <span>{carDetails.mileage || 'Mileage'}</span>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl mb-2" />
            <span>{carDetails.location || 'Kasarkode to Kannur'}</span>
          </div>
        </motion.div>

        {/* Description with animation */}
        <motion.div
          className="my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2 className="text-xl">Description:</h2>
          <p>{carDetails.description || 'Description text goes here.'}</p>
        </motion.div>

        {/* Date Selection and Pricing */}
        <div className="my-4 gap-8">
          <h2 className="text-xl font-semibold mb-2">Select Rental Dates:</h2>
          <DatePicker
            selected={selectedDates[0]}
            onChange={(dates) => setSelectedDates(dates)} // [startDate, endDate]
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            selectsRange
            className="border p-2 rounded-md w-full"
            placeholderText="Select rental date range"
          />
          <p className="mt-2 text-lg">{formatSelectedDates()}</p>
        </div>

        {/* Pricing Information */}
        <div className="my-4">
          <h2 className="text-xl font-semibold">Price Per Day: ${pricePerDay}</h2>
          <h2 className="text-xl font-semibold">Total Days: {totalDays}</h2>
          <h2 className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>

        {/* Book Your Car Button */}
        <div className="flex justify-center my-8">
          <motion.button
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-black rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Book Your Car
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
