import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

export const userLogin = async (data) => {
    try {
        const response = await axiosInstance({
            url: '/user/login',
            method: 'POST',
            data,
            withCredentials: true
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        toast.error('Login failed');
    }
};

export const userRegister = async (formData) => {
    try {
        const response = await axiosInstance({
            url: '/user/create',
            method: 'POST',
            data: formData, 
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response?.data;
    } catch (error) {
        toast.error('Registration failed');
        console.error(error);
    }
};

export const userLogout = async () => {
    try {
        const response = await axiosInstance({
            url: "/user/logout",
            method: "POST",
            withCredentials: true
        });
        return response?.data;
    } catch (error) {
        toast.error('Logout Failed');
        console.log(error);
    }
};