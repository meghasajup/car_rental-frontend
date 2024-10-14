import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt, FaEnvelope } from 'react-icons/fa';
import Cookies from 'js-cookie';

export const AdminBookingManagement = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const { data } = await axiosInstance({
        url: '/admin/bookings',
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${Cookies.get('loginToken')}`,
        }
      });
      setBookings(data.data);
      console.log(data.data);
    } catch (error) {
      toast.error('Failed to fetch bookings.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle update booking
  const onSubmit = async (data) => {
    try {
      const { id, userId, carId, ...bookingData } = data;
      if (editingBookingId) {
        await axiosInstance.put(`/admin/bookingUpdate/${editingBookingId}`, bookingData);
        toast.success('Booking updated successfully!');
      }
      fetchBookings();
      reset();
      setEditingBookingId(null);
    } catch (error) {
      console.error('Update error:', error.response);
      toast.error('Failed to update booking.');
    }
  };

  // Handle delete booking
  const deleteBooking = async (id) => {
    try {
      await axiosInstance.delete(`/admin/deleteBooking/${id}`);
      toast.success('Booking deleted successfully!');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking.');
    }
  };

  // Send booking confirmation email
  const sendConfirmationEmail = async (booking) => {
    const { user, car, pickupLocation, dropoffLocation, pickupDateTime } = booking;
    try {
      const response = await axiosInstance.post('/nodemailer/create-message', {
        to: user.email, // Send to the user's email                               
        subject: 'Booking Confirmation',
        text: `Your booking for the car with ID ${car._id} has been confirmed.`,
        html: `
          <h1>Dear ${user.name},</h1>
          <h3 style="font-size: 1.25rem; font-weight: bold; color: blue;">🧳 Get set ready for your journey with CarIsta</h3>
          <h5 style="font-size: 1rem; font-weight: 600; color: gray;">🚍 Your Car has been Scheduled. Below are the vehicle details:</h5>
          <p style="font-size: 1rem; color: gray;">
            <strong>Journey Details for travel on:</strong> ${new Date(pickupDateTime).toLocaleDateString()} 🎫<br>
            <strong>Car Id:</strong> ${car._id}<br>
            <strong>Trip:</strong> ${pickupLocation} to ${dropoffLocation}<br>
          </p>
          <h1 style="font-size: 1.25rem; font-weight: bold; color: green;"> Details 🗺</h1>
          <p>
            <strong>Pickup Location:</strong> ${pickupLocation}<br>
            <strong>Pickup Date:</strong> ${new Date(pickupDateTime).toLocaleDateString()}<br>
            <strong>Pickup Time:</strong> ${new Date(pickupDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br><br>
            <strong>Your Car Details 🚌</strong><br>
            <strong>Car Number:</strong> ${car.registrationNumber}<br>
            <strong>Car Brand:</strong> ${car.model}<br>
            <strong>Car Year:</strong> ${car.year}<br>
            <strong>Car Fuel:</strong> ${car.fuelType}<br>
            <strong>Price Per Day: ₹</strong> ${car.pricePerDay}<br><br>
            <strong>User Details:</strong><br>
            <strong>User Id:</strong> ${user._id}<br>
            <strong>Name:</strong> ${user.name}<br>
            <strong>Phone Number:</strong> ${user.phone}<br>
            <strong>Email:</strong> ${user.email}
          </p>
          <p>Please reach your pickup point 15 minutes before pickup time for a hassle-free experience.</p>
          <p>Regards,<br>CarIsta</p>
        `,
      });
      console.log(response);
      toast.success('Booking confirmation email sent successfully');
    } catch (error) {
      toast.error('Failed to send booking confirmation email');
      console.error('Email sending error:', error);
    }
  };

  // Set form data when editing
  const startEdit = (booking) => {
    setEditingBookingId(booking._id);
    setValue('user', booking.user?.name || 'N/A');
    setValue('car', booking.car?.brand || 'N/A');
    setValue('startDate', booking.startDate);
    setValue('startTime', booking.startTime);
    setValue('returnDate', booking.returnDate);
    setValue('returnTime', booking.returnTime);
    setValue('totalPrice', booking.totalPrice);
    setValue('pickupLocation', booking.pickupLocation);
    setValue('dropoffLocation', booking.dropoffLocation);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl text-center font-bold mt-8 mb-4">Booking Management</h2>

      {/* Booking List */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full shadow-lg rounded-lg">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Car</th>
              <th className="px-4 py-2 border">Pickup Date</th>
              <th className="px-4 py-2 border">Pickup Time</th>
              <th className="px-4 py-2 border">Dropoff Date</th>
              <th className="px-4 py-2 border">Dropoff Time</th>
              <th className="px-4 py-2 border">Pickup Location</th>
              <th className="px-4 py-2 border">Dropoff Location</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{booking.user ? booking.user.name : 'N/A'}</td>
                <td className="px-4 py-2 border">{booking.car ? booking.car.brand : 'N/A'}</td>
                <td className="px-4 py-2 border">{new Date(booking.pickupDateTime).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(booking.pickupDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-4 py-2 border">{new Date(booking.dropoffDateTime).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(booking.dropoffDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-4 py-2 border">{booking.pickupLocation}</td>
                <td className="px-4 py-2 border">{booking.dropoffLocation}</td>
                <td className="px-4 py-2 border">
                  {/* <button
                    onClick={() => startEdit(booking)}
                    className="text-green-500 hover:text-green-700 mr-6"
                  >
                    <FaEdit size={20} />
                  </button> */}
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                  <button
                    onClick={() => sendConfirmationEmail(booking)}
                    className="text-blue-500 hover:text-blue-700 ml-6"
                  >
                    <FaEnvelope size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form for booking update */}
      {editingBookingId && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block">User Name</label>
              <input
                {...register('user')}
                className="w-full border p-2 rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block">Car</label>
              <input
                {...register('car')}
                className="w-full border p-2 rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block">Pickup Location</label>
              <input
                {...register('pickupLocation')}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block">Dropoff Location</label>
              <input
                {...register('dropoffLocation')}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Booking
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
