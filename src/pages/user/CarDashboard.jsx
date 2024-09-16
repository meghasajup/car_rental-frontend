import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { motion } from 'framer-motion';

export const CarDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

        fetchBookings();
    }, []);

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
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={booking._id}
                            className="p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }} // Animates each card with slight delay
                            whileHover={{ scale: 1.05 }} // Scale up slightly on hover
                        >
                            <div className="flex items-center mb-4">
                                {booking.car && booking.car.image ? (
                                    <img 
                                        src={booking.car.image} 
                                        alt={`${booking.car.brand} ${booking.car.model}`} 
                                        className="w-24 h-24 object-cover rounded-full border-2 border-blue-500"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center">
                                        <span>No Image</span>
                                    </div>
                                )}
                                <div className="ml-4">
                                    <h1 className="text-2xl font-semibold">
                                        {booking.car?.brand} {booking.car?.model}
                                    </h1>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
                                <p><strong>Dropoff Location:</strong> {booking.dropoffLocation}</p>
                                <p><strong>Pickup Date:</strong> {new Date(booking.pickupDateTime).toLocaleString()}</p>
                                <p><strong>Dropoff Date:</strong> {new Date(booking.dropoffDateTime).toLocaleString()}</p>
                                <p><strong>Total Cost:</strong> ₹{booking.totalCost}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
