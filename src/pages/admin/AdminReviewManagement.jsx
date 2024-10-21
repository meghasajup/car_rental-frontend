import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import Cookies from 'js-cookie';

export const AdminReviewManagement = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);  // State to hold user data
  const [cars, setCars] = useState([]);    // State to hold car data
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchReviews();
    fetchUsers();
    fetchCars();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance({
        url: '/admin/reviews',
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${Cookies.get('loginToken')}`,
        }
      });
      setReviews(response.data.data);
    } catch (error) {
      toast.error('Failed to load reviews');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/users');  // Assuming an endpoint exists
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get('/admin/cars');  // Assuming an endpoint exists
      setCars(response.data.data);
    } catch (error) {
      toast.error('Failed to load cars');
    }
  };

  const updateReview = async (data) => {
    try {
      const response = await axiosInstance.put(`/admin/updateReview/${editingReviewId}`, { ...data, rating });
      if (response.data.success) {
        toast.success('Review updated successfully!');
        fetchReviews();
        reset();
        setEditingReviewId(null);
        setRating(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to update review');
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await axiosInstance.delete(`/admin/deleteReview/${reviewId}`);
      if (response.data.success) {
        toast.success('Review deleted successfully!');
        fetchReviews();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const startEditReview = (review) => {
    setValue('userId', review.user);
    setValue('carId', review.car);
    setValue('reviewText', review.reviewText);
    setRating(review.rating);
    setEditingReviewId(review._id);
  };

  const onSubmit = (data) => {
    if (editingReviewId) {
      updateReview(data);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const renderStars = (currentRating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          size={24}
          className={`cursor-pointer ${i < currentRating ? 'text-yellow-400' : 'text-gray-400'}`}
          onClick={() => handleStarClick(i + 1)}
        />
      ));
  };

  const getUserNameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.name : 'Invalid user'; // Change 'name' based on your user model
  };

  const getCarNameById = (carId) => {
    const car = cars.find((car) => car._id === carId);
    return car ? car.model : 'Invalid Car'; // Change 'name' based on your car model
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto"> {/* Increased padding and max width */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editingReviewId ? 'Update Review' : 'Reviews'}
      </h2>

      {editingReviewId && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 shadow-xl border border-gray-700 p-6 rounded-lg">
          {/* User ID, Car ID, Rating, Review Text form fields here... */}
          <div>
            <label className="block mb-1">User:</label>
            <select {...register('userId', { required: true })} className="w-full border rounded p-2">
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
            {errors.userId && <span className="text-red-500">User is required</span>}
          </div>
          <div>
            <label className="block mb-1">Car:</label>
            <select {...register('carId', { required: true })} className="w-full border rounded p-2">
              <option value="">Select Car</option>
              {cars.map(car => (
                <option key={car._id} value={car._id}>{car.model}</option>
              ))}
            </select>
            {errors.carId && <span className="text-red-500">Car is required</span>}
          </div>
          <div>
            <label className="block mb-1">Rating:</label>
            <div className="flex mb-2">
              {renderStars(rating)}
            </div>
          </div>
          <div>
            <label className="block mb-1">Review Text:</label>
            <textarea {...register('reviewText', { required: true })} className="w-full border rounded p-2" rows="4"></textarea>
            {errors.reviewText && <span className="text-red-500">Review text is required</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] hover:bg-blue-600 text-white py-2 rounded-lg shadow transition duration-300"
          >
            Update Review
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 divide-y divide-gray-200 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Car Name</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Review Text</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.slice().reverse().map((review) => (
              <React.Fragment key={review._id}>
                <tr>
                  <td className="px-4 py-2">{getUserNameById(review.user)}</td>
                  <td className="px-4 py-2">{getCarNameById(review.car)}</td>
                  <td className="px-4 py-2 flex">
                    {renderStars(review.rating)}
                  </td>
                  <td className="px-4 py-2">{review.reviewText}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button onClick={() => startEditReview(review)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit size={20} />
                    </button>
                    <button onClick={() => deleteReview(review._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <hr className="my-2 border-gray-300" />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
