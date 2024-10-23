import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';

export const AdminBookingManagement = () => {
  const { register, handleSubmit, reset } = useForm();
  const [bookings, setBookings] = useState([]);

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

  // Handle delete booking
  const deleteBooking = async (id) => {
    try {
      await axiosInstance.delete(`/admin/deleteBooking/${id}`);
      toast.success('Booking deleted successfully!');
      fetchBookings(); // Refresh the bookings list after deletion
    } catch (error) {
      toast.error('Failed to delete booking.');
    }
  };

  // Send booking confirmation email
  const sendConfirmationEmail = async (booking) => {
    const { user, car, pickupLocation, dropoffLocation, pickupDateTime } = booking;
    try {
      const response = await axiosInstance.post('/nodemailer/create-message', {
        to: user.email,
        subject: 'Booking Confirmation',
        text: `Your booking for the car with ID ${car._id} has been confirmed.`,
        html: `...` // your existing email template
      });
      console.log(response);
      toast.success('Booking confirmation email sent successfully');
    } catch (error) {
      toast.error('Failed to send booking confirmation email');
      console.error('Email sending error:', error);
    }
  };

  // Confirm booking
  const confirmBooking = async (id) => {
    try {
      console.log(id);
      const response = await axiosInstance.put(`/admin/confirm/${id}`); 
      console.log(response);
      
      fetchBookings(); 
      toast.success('Booking confirmed successfully!');
    } catch (error) {
      console.log(error);
      
      toast.error('Failed to confirm booking.');
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      await axiosInstance.put(`/admin/cancel/${id}`); 
      fetchBookings(); 
      toast.success('Booking cancelled successfully!');
    } catch (error) {
      toast.error('Failed to cancel booking.');
    }
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
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...bookings].reverse().map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{booking.user ? booking.user.name : 'N/A'}</td>
                <td className="px-4 py-2 border">{booking.car ? booking.car.brand : 'N/A'}</td>
                <td className="px-4 py-2 border">{new Date(booking.pickupDateTime).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(booking.pickupDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-4 py-2 border">{new Date(booking.dropoffDateTime).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(booking.dropoffDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-4 py-2 border">{booking.pickupLocation}</td>
                <td className="px-4 py-2 border">{booking.dropoffLocation}</td>
                <td
                  className={`px-4 py-2 border ${booking.bookingStatus === 'confirmed' ? 'text-green-600' :
                      booking.bookingStatus === 'cancelled' ? 'text-red-600' :
                        'text-orange-300'
                    }`}
                >
                  {booking.bookingStatus}
                </td>
                <td className="px-4 py-2 border">
                  <button onClick={() => confirmBooking(booking._id)} className="text-green-600 hover:underline ml-2">
                    <FaCheck />
                  </button>
                  <button onClick={() => cancelBooking(booking._id)} className="text-red-600 hover:underline ml-2">
                    <FaTimes />
                  </button>
                  <button onClick={() => deleteBooking(booking._id)} className="text-red-600 hover:underline ml-2">
                    <FaTrashAlt />
                  </button>
                  <button onClick={() => sendConfirmationEmail(booking)} className="text-blue-600 hover:underline ml-2">
                    <FaEnvelope />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
