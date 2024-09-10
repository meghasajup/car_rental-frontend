import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/hone/footerIcon.png';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

export const BookingPage = () => {
  const [carDetails, setCarDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm();
  const [totalCost, setTotalCost] = useState(0);
  const [pickupDetails, setPickupDetails] = useState({});
  const [dropoffDetails, setDropoffDetails] = useState({});


  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`/car/getCar/${id}`, { withCredentials: true });
        setCarDetails(response?.data?.data);
        console.log(response);
        
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [id]);

  // Calculate total cost
  const calculateTotalCost = (pickupDateTime, dropoffDateTime) => {
    const start = new Date(pickupDateTime);
    const end = new Date(dropoffDateTime);
    const days = Math.max((end - start) / (1000 * 60 * 60 * 24), 1); // Ensure at least 1 day
    return carDetails.pricePerDay * days;
  };

  // Handle cost calculation
  const handleCalculateCost = (data) => {
    const total = calculateTotalCost(data.pickupDateTime, data.dropoffDateTime);
    setTotalCost(total);

    setPickupDetails({
      location: data.pickupLocation,
      dateTime: data.pickupDateTime,
    });

    setDropoffDetails({
      location: data.dropoffLocation,
      dateTime: data.dropoffDateTime,
    });
  };

  // Handle payment
//   const handlePayment = async () => {
//     try {
//         const total = calculateTotalCost(watch('pickupDateTime'), watch('dropoffDateTime'));

//         const stripe = await stripePromise;
//         const sessionResponse = await axiosInstance.post('/payment/create-payment', {
//             carId: id,
//             amount: total,
//         });

//         const sessionId = sessionResponse?.data?.sessionId;

//         const result = await stripe.redirectToCheckout({ sessionId });
//         if (result.error) {
//             toast.error(result.error.message);
//         }
//     } catch (error) {
//         console.error('Error initiating payment:', error);
//         toast.error('An error occurred. Please try again.');
//     }
// };


const makePayment = async () => {
  try {
    const stripe = await loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_API_KEY);
    const total = calculateTotalCost(watch('pickupDateTime'), watch('dropoffDateTime'));

    const sessionResponse = await axiosInstance({
      url: "/payment/create-payment",
      method: "POST",
      data: {  carDetails,
        amount: total, },
    });
    console.log(sessionResponse, "session=======>");

    const sessionId = sessionResponse?.data?.sessionId;

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

  } catch (error) {
    console.error("Payment processing error:", error);
    toast.error("An error occurred during payment processing. Please try again.");
  }
};


  // Validate dates
  useEffect(() => {
    if (watch('pickupDateTime') && watch('dropoffDateTime')) {
      const start = new Date(watch('pickupDateTime'));
      const end = new Date(watch('dropoffDateTime'));
      if (end < start) {
        setError('dropoffDateTime', { message: 'Dropoff date cannot be earlier than pickup date' });
      } else {
        clearErrors('dropoffDateTime');
      }
    }
  }, [watch('pickupDateTime'), watch('dropoffDateTime'), setError, clearErrors]);

  return (
    <div
      className="flex flex-col items-center p-6 text-grey"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <motion.div
        className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold mb-4">Book Your Car</h1>

        {/* Booking Form */}
        <form onSubmit={handleSubmit(handleCalculateCost)} className="space-y-4">
          {/* Pickup Location */}
          <div>
            <label className="block mb-2">Pickup Location</label>
            <input
              {...register('pickupLocation', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Pickup Location"
            />
            {errors.pickupLocation && <p className="text-red-500">Pickup location is required</p>}
          </div>

          {/* Dropoff Location */}
          <div>
            <label className="block mb-2">Dropoff Location</label>
            <input
              {...register('dropoffLocation', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Dropoff Location"
            />
            {errors.dropoffLocation && <p className="text-red-500">Dropoff location is required</p>}
          </div>

          {/* Pickup and Dropoff Date/Time */}
          <div>
            <label className="block mb-2">Pickup and Dropoff Date & Time</label>
            <div className="flex gap-4">
              {/* Pickup Date/Time */}
              <input
                {...register('pickupDateTime', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
                type="datetime-local"
              />
              {/* Dropoff Date/Time */}
              <input
                {...register('dropoffDateTime', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
                type="datetime-local"
              />
            </div>
            {errors.pickupDateTime && <p className="text-red-500">Pickup date and time are required</p>}
            {errors.dropoffDateTime && <p className="text-red-500">Dropoff date and time are required</p>}
          </div>

          {/* Licence Number */}
          <div>
            <label className="block mb-2">Licence Number</label>
            <input
              {...register('licenceNumber', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Licence Number"
            />
            {errors.licenceNumber && <p className="text-red-500">Licence number is required</p>}
          </div>

          {/* Calculate Total Cost Button */}
          <motion.button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Calculate Total Cost
          </motion.button>
        </form>

        {/* Display total cost */}
        {totalCost > 0 && (
          <div className="mt-4">
            <p className="text-lg font-bold">Total Cost: ₹{totalCost}</p>
          </div>
        )}

        {/* Display Pickup and Dropoff Details */}
        {pickupDetails.location && (
          <div className="mt-4">
            <p className="text-lg font-semibold">Pickup Details</p>
            <p>Location: {pickupDetails.location}</p>
            <p>Date/Time: {pickupDetails.dateTime}</p>
          </div>
        )}
        {dropoffDetails.location && (
          <div className="mt-4">
            <p className="text-lg font-semibold">Dropoff Details</p>
            <p>Location: {dropoffDetails.location}</p>
            <p>Date/Time: {dropoffDetails.dateTime}</p>
          </div>
        )}

        {/* Pay Now Button */}
        {totalCost > 0 && (
          <motion.button
            onClick={handleSubmit(makePayment)}
            className="mt-6 w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Pay Now
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};
