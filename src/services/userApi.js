import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

export const userLogin = async (data) => {
    try {
        const response = await axiosInstance({
            url: '/user/login',
            method: 'POST',
            data,
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
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
        console.error(error);
        toast.error(error.response?.data?.message);
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
        console.log(error);
    }
};