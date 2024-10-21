import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance'; 
import { CarCard } from '../../components/ui/Cards';
import 'tailwindcss/tailwind.css';

export const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the wishlist items when the component mounts
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axiosInstance.get('/wishlist/get');
                setWishlist(response.data.wishlist);
                setLoading(false);
            } catch (error) {
                setError('Error fetching wishlist');
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    // Function to remove the car from the wishlist and update state
    const handleRemoveFromWishlist = (carId) => {
        setWishlist((prev) => prev.filter((item) => item._id !== carId));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="text-lg text-gray-500">Your wishlist is empty</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <CarCard 
                            key={item._id} 
                            car={item.car} 
                            userId={item.userId} 
                            onRemove={() => handleRemoveFromWishlist(item._id)} // Passing onRemove
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
