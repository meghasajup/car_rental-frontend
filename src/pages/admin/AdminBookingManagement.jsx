import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 

export const AdminBookingManagement = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const { data } = await axiosInstance.get('/admin/bookings');
      setBookings(data.data);
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
      const { id, ...bookingData } = data;
      if (editingBookingId) {
        await axiosInstance.put(`/admin/bookingUpdate/${editingBookingId}`, bookingData);
        toast.success('Booking updated successfully!');
      }
      fetchBookings();
      reset();
      setEditingBookingId(null);
    } catch (error) {
      toast.error('Failed to update booking.');
    }
  };

  // Handle delete booking
  const deleteBooking = async (id) => {
    try {
      await axiosInstance.delete(`/admin/deletBooking/${id}`);
      toast.success('Booking deleted successfully!');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking.');
    }
  };

  // Set form data when editing
  const startEdit = (booking) => {
    setEditingBookingId(booking._id);
    setValue('user', booking.user?._id || 'N/A');
    setValue('car', booking.car?._id || 'N/A');
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

      {/* Form for booking update */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8 p-6 rounded-lg shadow-xl border border-gray-900">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>User ID</label>
            <input
              {...register('user', { required: true })}
              className="border p-2 w-full rounded"
              placeholder="User ID"
            />
          </div>
          <div>
            <label>Car ID</label>
            <input
              {...register('car', { required: true })}
              className="border p-2 w-full rounded"
              placeholder="Car ID"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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

        <div className="grid grid-cols-2 gap-4">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Total Price</label>
            <input
              {...register('totalPrice', { required: true })}
              className="border p-2 w-full rounded"
              type="number"
              placeholder="Total Price"
            />
          </div>
          <div>
            <label>Pickup Location</label>
            <input
              {...register('pickupLocation', { required: true })}
              className="border p-2 w-full rounded"
              placeholder="Pickup Location"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
          {editingBookingId ? 'Update Booking' : 'Submit'}
        </button>
      </form>

      {/* Booking List */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full shadow-lg rounded-lg">
          <thead>
            <tr className=" text-left">
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Car</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">Return Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray">
                <td className="px-4 py-2 border">{booking.user ? booking.user.email : 'N/A'}</td>
                <td className="px-4 py-2 border">{booking.car ? booking.car.model : 'N/A'}</td>
                <td className="px-4 py-2 border">{new Date(booking.startDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(booking.returnDate).toLocaleDateString()}</td>
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
    </div>
  );
};
