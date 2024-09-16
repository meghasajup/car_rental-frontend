import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
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
            Authorization: `Bearer ${Cookies.get('loginToken')}` ,
          }
    })
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
      console.log('Data being sent:', data);
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
                  <button
                    onClick={() => startEdit(booking)}
                    className="text-green-500 hover:text-green-700 mr-6"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

      {/* Form for booking update */}
      {editingBookingId && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8 p-6 rounded-lg shadow-xl border border-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>User</label>
              <input
                {...register('user', { required: true })}
                className="border p-2 w-full rounded"
                placeholder="User "
              />
            </div>
            <div>
              <label>Car</label>
              <input
                {...register('car', { required: true })}
                className="border p-2 w-full rounded"
                placeholder="Car "
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Start Date</label>
              <input
                {...register('startDate', { required: true })}
                className="border p-2 w-full rounded"
                type="date"
              />
            </div>
            <div>
              <label>Start Time</label>
              <input
                {...register('startTime', { required: true })}
                className="border p-2 w-full rounded"
                type="time"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Return Date</label>
              <input
                {...register('returnDate', { required: true })}
                className="border p-2 w-full rounded"
                type="date"
              />
            </div>
            <div>
              <label>Return Time</label>
              <input
                {...register('returnTime', { required: true })}
                className="border p-2 w-full rounded"
                type="time"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Pickup Location</label>
              <input
                {...register('pickupLocation', { required: true })}
                className="border p-2 w-full rounded"
                placeholder="Pickup Location"
              />
            </div>
            <div>
              <label>Dropoff Location</label>
              <input
                {...register('dropoffLocation', { required: true })}
                className="border p-2 w-full rounded"
                placeholder="Dropoff Location"
              />
            </div>
          </div>

          <button type="submit" className="bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] py-2 px-3 rounded-lg text-white">
            Update Booking
          </button>
        </form>
      )}
    </div>
  );
};
