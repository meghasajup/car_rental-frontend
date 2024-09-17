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
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors }, setValue } = useForm();
  const [totalCost, setTotalCost] = useState(0);
  const [pickupDetails, setPickupDetails] = useState({});
  const [dropoffDetails, setDropoffDetails] = useState({});
  const [selfDrive, setSelfDrive] = useState(true);

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`/car/getCar/${id}`, { withCredentials: true });
        setCarDetails(response?.data?.data);
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
    const days = Math.max((end - start) / (1000 * 60 * 60 * 24), 1);
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

  // Handle booking creation and payment
  const bookingSubmit = async (data) => {
    try {
      // Create the booking
      const bookingResponse = await axiosInstance.post('/booking/createBooking', {
        ...data,
        car: id,
        user: '66e071ec53f36dfb8b78e40c',
        totalCost,
      }, {
        withCredentials: true,
      });

      // Proceed with payment
      const sessionResponse = await axiosInstance.post('/payment/create-payment', {
        carDetails,
        amount: totalCost,
      });

      const stripe = await loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_API_KEY);
      const sessionId = sessionResponse?.data?.sessionId;

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        toast.error(result.error.message);
      }

    } catch (error) {
      console.error('Error creating booking or processing payment:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  // Handle self-drive toggle change
  const handleToggleChange = (event) => {
    const isChecked = event.target.checked;
    setSelfDrive(isChecked);

    if (!isChecked) {
      // Clear the license number field if not self-drive
      setValue('licenceNumber', '');
      clearErrors('licenceNumber');
    }
  };

  // Get today's date in the format required by datetime-local
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const today = getTodayDate();

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
            <select
              {...register('pickupLocation', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Pickup Location</option>
              <option value="Kasarkode">Kasarkode</option>
              <option value="Kannur">Kannur</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Idukki">Idukki</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Pathanamthittta">Pathanamthitta</option>
              <option value="Kollam">Kollam</option>
              <option value="Thiruvanathapuram">Thiruvanathapuram</option>
            </select>
            {errors.pickupLocation && <p className="text-red-500">Pickup location is required</p>}
          </div>

          {/* Dropoff Location */}
          <div>
            <label className="block mb-2">Dropoff Location</label>
            <select
              {...register('dropoffLocation', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Dropoff Location</option>
              <option value="Kasarkode">Kasarkode</option>
              <option value="Kannur">Kannur</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Idukki">Idukki</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Pathanamthittta">Pathanamthitta</option>
              <option value="Kollam">Kollam</option>
              <option value="Thiruvanathapuram">Thiruvanathapuram</option>
            </select>
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
                min={today} // Set the minimum date to today's date
              />
              {/* Dropoff Date/Time */}
              <input
                {...register('dropoffDateTime', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
                type="datetime-local"
                min={today} // Set the minimum date to today's date
              />
            </div>
            {errors.pickupDateTime && <p className="text-red-500">Pickup date and time are required</p>}
            {errors.dropoffDateTime && <p className="text-red-500">Dropoff date and time are required</p>}
          </div>

          {/* Toggle for Self Drive */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="selfDriveToggle"
              checked={selfDrive}
              onChange={handleToggleChange}
              className="mr-2"
            />
            <label htmlFor="selfDriveToggle">Self Drive</label>
          </div>

          {/* Licence Number */}
          {selfDrive && (
            <div>
              <label className="block mb-2">Licence Number</label>
              <input
                {...register('licenceNumber', { required: selfDrive })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Licence Number"
              />
              {errors.licenceNumber && <p className="text-red-500">Licence number is required</p>}
            </div>
          )}

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

        {/* Display Total Cost */}
        {totalCost > 0 && (
          <motion.div
            className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-lg font-semibold">Total Cost: ₹{totalCost}</h2>

            {/* Pay Now Button */}
            <motion.button
              onClick={handleSubmit(bookingSubmit)}
              className="w-full mt-4 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Pay Now
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
