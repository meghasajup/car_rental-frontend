import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { FaGasPump, FaPalette, FaCogs, FaCar, FaTachometerAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component'; // Import the star rating component

export const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0); // State for star rating

  // Fetch car details
  const fetchCarDetails = async () => {
    try {
      const response = await axiosInstance.get(`/car/getCar/${id}`);
      setCarDetails(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch car reviews
  const fetchCarReviews = async () => {
    try {
      const response = await axiosInstance.get(`/review/getReviewsByCarId/${id}`);
      setReviews(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit review
  const onSubmitReview = async (data) => {
    try {
      const response = await axiosInstance.post('/review/createReviews', {
        carId: id,
        rating, // Add the star rating
        ...data,
      });
      toast.success('Review submitted successfully!');
      reset();
      fetchCarReviews(); // Reload reviews after submission
    } catch (error) {
      console.log(error);
      toast.error('Failed to submit review');
    }
  };

  useEffect(() => {
    fetchCarDetails();
    fetchCarReviews();
  }, []);

  // Configuration for ReactStars
  const starConfig = {
    size: 30,
    count: 5,
    isHalf: false,
    value: rating,
    onChange: (newRating) => setRating(newRating),
    activeColor: "#ffd700",
  };

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

          <div className="flex items-center mb-4">
            <p className="text-lg">Price/day: ₹{carDetails.pricePerDay || 'Price Per Day'}</p>
          </div>

          <p className="text-lg mb-4">Registration Number: {carDetails.registrationNumber || 'Register Number'}</p>
          <p className="text-lg mb-4">Year: {carDetails.year || 'Year'}</p>

          {/* Book Now Button */}
          <div className="flex justify-center mt-8">
            <Link to={`/user/booking/${carDetails._id}`}>
              <motion.button
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300 ease-in-out"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
              >
                Book Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Review Section */}
      <div className="w-full mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {/* Review Form */}
        <form onSubmit={handleSubmit(onSubmitReview)} className="mb-8">
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Rating</label>
            <ReactStars {...starConfig} />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Review</label>
            <textarea
              className="border p-2 rounded"
              rows="4"
              {...register('reviewText', { required: true })}
              placeholder="Write your review"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div className="flex flex-col space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="p-4 border rounded-lg shadow-md">
                <p className="font-semibold">{review.user.name}</p>

                {/* Display Star Rating */}
                <ReactStars
                  count={5}
                  size={24}
                  value={review.rating} // Display the rating from the review
                  edit={false} // Make the stars non-editable
                  activeColor="#ffd700"
                />

                <p className="mt-2">{review.reviewText}</p>
                <p className="text-gray-500 text-sm">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
