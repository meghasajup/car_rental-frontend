import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { FaGasPump, FaPalette, FaCogs, FaCar, FaTachometerAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
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

  return (
    <div className="flex flex-col items-center p-6 text-grey">
      
      <div className="flex flex-row w-full gap-8">
        {/* Left column with car image */}
        <motion.div
          className="w-1/2 h-auto mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}  
          transition={{ duration: 0.8 }}
        >
          <img
            src={carDetails.image || 'default-image-url.jpg'}
            alt={carDetails.model || 'Car Image'}
            className="w-full h-full object-contain rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right column with car information */}
        <motion.div
          className="w-1/2 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2">{carDetails.model || 'Model'}</h1>

          {/* Information with icons */}
          <p className="text-lg mb-4">Category: {carDetails.category || 'Category'}</p>
          <p className="text-lg mb-4">Brand: {carDetails.brand || 'Brand'}</p>

          <div className="flex items-center mb-4">
            <FaGasPump className="mr-2 text-xl" />
            <p className="text-lg">{carDetails.fuelType || 'Petrol'}</p>
          </div>

          <div className="flex items-center mb-4">
            <FaPalette className="mr-2 text-xl" />
            <p className="text-lg">{carDetails.color || 'Color'}</p>
          </div>

          <div className="flex items-center mb-4">
            <FaCogs className="mr-2 text-xl" />
            <p className="text-lg">{carDetails.transmission || 'Manual'}</p>
          </div>

          <div className="flex items-center mb-4">
            <FaCar className="mr-2 text-xl" />
            <p className="text-lg">{carDetails.capacity || '4 Seats'}</p>
          </div>

          <div className="flex items-center mb-4">
            <FaTachometerAlt className="mr-2 text-xl" />
            <p className="text-lg">{carDetails.mileage || 'Mileage'}</p>
          </div>

          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-xl" />
            <p className="text-lg">{carDetails.location || 'Location'}</p>
          </div>

          {/* Add Price Per Day */}
          <div className="flex items-center mb-4">
            <p className="text-lg">Price/day: {carDetails.pricePerDay ? `₹${carDetails.pricePerDay}` : 'Price Per Day'}</p>
          </div>

          <p className="text-lg mb-4">Registration Number: {carDetails.registrationNumber || 'Register Number'}</p>
          <p className="text-lg mb-4">Year: {carDetails.year || 'Year'}</p>

          {/* Book Now Button */}
          <div className="flex justify-center mt-8">
            <Link
              to={{
                pathname: `/user/booking/${carDetails._id}`,
                state: {
                  carDetails
                }
              }}
            >
              <motion.button
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300 ease-in-out"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Book Now
              </motion.button>
            </Link>

          </div>
        </motion.div>
      </div>
    </div>
  );
};
