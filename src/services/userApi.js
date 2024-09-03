import axios from "axios";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

export const userLogin = async (data) => {
    try {
        const response = await axios({
            url: 'http://localhost:4300/api/v1/user/login',
            method: 'POST',
            data,
            withCredentials: true
        });
        return response?.data;
    } catch (error) {
        console.log(error);

    }
};

export const userLogout = async () => {
    try {
        const response = await axiosInstance({
            url: "/user/logout",
            method: "POST",
        });
        return response?.data;
    } catch (error) {
        toast.error('Logout Failed')
        console.log(error);
    }
};