import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import Cookies from 'js-cookie';

export const AdminReviewManagement = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance({
        url: '/admin/reviews',
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${Cookies.get('loginToken')}` ,
          }
    });
      console.log(response.data.data);
      setReviews(response.data.data);
    } catch (error) {
      toast.error('Failed to load reviews');
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
        setRating(0);  // Reset stars after update
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
    setRating(review.rating); // Set rating when editing
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

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editingReviewId ? 'Update Review' : 'Reviews'}
      </h2>

      {editingReviewId && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 shadow-xl border border-gray-700 p-6 rounded-lg">
          <div className="space-y-1">
            <label className="block text-lg font-medium">User ID</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('userId', { required: true })}
            />
            {errors.userId && <p className="text-red-500">User ID is required</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-lg font-medium">Car ID</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('carId', { required: true })}
            />
            {errors.carId && <p className="text-red-500">Car ID is required</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-lg font-medium">Rating</label>
            <div className="flex space-x-1">
              {renderStars(rating)}
            </div>
            {errors.rating && <p className="text-red-500">Rating is required</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-lg font-medium">Review Text</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('reviewText', { required: true, minLength: 15, maxLength: 200 })}
            />
            {errors.reviewText && <p className="text-red-500">Review must be between 15 and 200 characters</p>}
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
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Car ID</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Review Text</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="px-4 py-2">{review.user}</td>
                <td className="px-4 py-2">{review.car}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
