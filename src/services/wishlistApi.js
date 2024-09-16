import { axiosInstance } from "../config/axiosInstance";

// Add car to the wishlist
export const addToWishlist = async (carId) => {
    try {
        const response = await axiosInstance.post("/wishlist/add", { carId });
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return { success: false, message: error.response?.data?.message || "Error adding to wishlist" };
    }
};

// Remove car from the wishlist
export const removeFromWishlist = async (carId) => {
    try {
        const response = await axiosInstance.delete(`/wishlist/remove/${carId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        return { success: false, message: error.response?.data?.message || "Error removing from wishlist" };
    }
};
