import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { motion } from 'framer-motion';
import Rating from 'react-rating-stars-component';
import { toast } from 'react-toastify';

export const CarDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState({});
    const [reviewData, setReviewData] = useState({});
    const [showAllReviews, setShowAllReviews] = useState({}); // State to track visibility of reviews

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosInstance.get('/booking/dashboard');
                setBookings(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred');
                setLoading(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get('/review/getReview'); // Fetch all reviews
                const reviewMap = response.data.data.reduce((acc, review) => {
                    acc[review.car] = acc[review.car] || [];
                    acc[review.car].push(review); // Store reviews as an array
                    return acc;
                }, {});
                setReviews(reviewMap);
            } catch (err) {
                console.error('Failed to fetch reviews', err);
            }
        };

        fetchBookings();
        fetchReviews();
    }, []);

    const handleReviewSubmit = async (carId) => {
    try {
        if (reviews[carId] && reviews[carId].some(review => review.user === "currentUserId")) {
            toast.error("You've already submitted a review for this car.");
            return;
        }

        const { reviewText, rating } = reviewData[carId] || {};
        if (!reviewText || !rating) {
            toast.error("Please provide both rating and review text");
            return;
        }

        // Submit the new review
        await axiosInstance.post('/review/createReviews', {
            carId,
            rating,
            reviewText,
        });

        // Update the reviews state to include the new review
        const newReview = { car: carId, rating, reviewText, createdAt: new Date().toISOString(), user: "currentUserId" };
        setReviews((prev) => ({
            ...prev,
            [carId]: [newReview, ...(prev[carId] || [])], // Add new review at the top
        }));

        toast.success("Review submitted successfully!");
        setReviewData((prev) => ({ ...prev, [carId]: { reviewText: '', rating: 0 } }));
        setShowAllReviews((prev) => ({ ...prev, [carId]: false })); // Reset to show only the latest review
    } catch (error) {
        toast.error('Error submitting review');
    }
};


    const handleRatingChange = (newRating, carId) => {
        setReviewData((prev) => ({
            ...prev,
            [carId]: { ...prev[carId], rating: newRating },
        }));
    };

    const handleReviewTextChange = (e, carId) => {
        setReviewData((prev) => ({
            ...prev,
            [carId]: { ...prev[carId], reviewText: e.target.value },
        }));
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await axiosInstance.put(`/booking/${bookingId}/cancel`);
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === bookingId ? { ...booking, bookingStatus: 'cancelled' } : booking
                )
            );
            toast.success('Booking cancelled successfully.');
        } catch (err) {
            toast.error('Failed to cancel booking.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="alert alert-error shadow-lg max-w-md">
                    <div>
                        <span>{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto shadow-lg rounded-lg">
            <h2 className="text-4xl font-extrabold text-gray text-center mb-8">My Bookings</h2>
            {bookings.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg text-gray">No bookings available at the moment.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {bookings
                        .slice()
                        .reverse() // Reverse to show the latest booking first
                        .map((booking, index) => {
                            const sortedReviews = [...(reviews[booking.car._id] || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                            const latestReview = sortedReviews[0]; // Get the latest review

                            return (
                                <motion.div
                                    key={booking._id}
                                    className="p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center mb-4">
                                        {booking.car && booking.car.image ? (
                                            <img
                                                src={booking.car.image}
                                                alt={`${booking.car.brand} ${booking.car.model}`}
                                                className="w-32 h-32 object-cover rounded-lg mr-4"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 bg-gray-300 rounded-lg mr-4"></div>
                                        )}
                                        <div>
                                            <h3 className="text-xl font-semibold">{booking.car.brand} {booking.car.model}</h3>
                                            <p className="text-gray-600">Category: {booking.car.category}</p>
                                            <p className="text-gray-600">Price/Day: ₹{booking.car.pricePerDay}</p>
                                            <p className="text-gray-600">
                                                <strong>Pickup:</strong> {new Date(booking.pickupDateTime).toLocaleString()}
                                            </p>
                                            <p className="text-gray-600">
                                                <strong>Return:</strong> {new Date(booking.dropoffDateTime).toLocaleString()}
                                            </p>
                                            <p className="text-gray-600 font-bold mt-2">
                                                <strong>Status: </strong>
                                                <span
                                                    className={
                                                        booking.bookingStatus === 'cancelled'
                                                            ? 'text-red-500'
                                                            : booking.bookingStatus === 'pending'
                                                                ? 'text-orange-300'
                                                                : booking.bookingStatus === 'confirmed'
                                                                    ? 'text-green-500'
                                                                    : 'text-gray-600'
                                                    }
                                                >
                                                    {booking.bookingStatus ? booking.bookingStatus : 'Unknown'}
                                                </span>
                                            </p>

                                            {(booking.bookingStatus === 'pending' || booking.bookingStatus === 'confirmed') && (
                                                <button
                                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Review Section */}
                                    <div className="mt-4">
                                        <h4 className="text-lg font-bold">Leave a Review</h4>
                                        <Rating
                                            count={5}
                                            size={24}
                                            value={reviewData[booking.car._id]?.rating || 0}
                                            onChange={(newRating) => handleRatingChange(newRating, booking.car._id)}
                                        />
                                        <textarea
                                            className="w-full p-2 mt-2 border rounded"
                                            rows={3}
                                            placeholder="Write your review here..."
                                            value={reviewData[booking.car._id]?.reviewText || ''}
                                            onChange={(e) => handleReviewTextChange(e, booking.car._id)}
                                        ></textarea>
                                        <button
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                            onClick={() => handleReviewSubmit(booking.car._id)}
                                        >
                                            Submit Review
                                        </button>
                                    </div>

                                    {latestReview && (
                                        <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                                            <p className="font-bold">Latest Review:</p>
                                            <p className="italic">{latestReview.reviewText}</p>
                                            <Rating
                                                count={5}
                                                size={24}
                                                value={latestReview.rating}
                                                edit={false}
                                            />
                                            <p className="text-sm text-gray-600">
                                                Reviewed on {new Date(latestReview.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}

                                    {sortedReviews.length > 1 && (
                                        <div className="mt-2">
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() =>
                                                    setShowAllReviews((prev) => ({
                                                        ...prev,
                                                        [booking.car._id]: !prev[booking.car._id],
                                                    }))
                                                }
                                            >
                                                {showAllReviews[booking.car._id] ? 'Hide Reviews' : 'Show All Reviews'}
                                            </button>

                                            {showAllReviews[booking.car._id] && (
                                                <div className="mt-2 space-y-2">
                                                    {sortedReviews.slice(1).map((review, i) => (
                                                        <div key={i} className="bg-gray-100 p-3 rounded-lg">
                                                            <p className="italic">{review.reviewText}</p>
                                                            <Rating
                                                                count={5}
                                                                size={24}
                                                                value={review.rating}
                                                                edit={false}
                                                            />
                                                            <p className="text-sm text-gray-600">
                                                                Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};