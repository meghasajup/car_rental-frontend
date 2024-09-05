import toast from "react-hot-toast"
import { axiosInstance } from "../config/axiosInstance";

export const adminLogin = async (data) => {
    try {
        const response = await axiosInstance({
            url: "admin/login",
            method: "POST",
            data,
        })
    } catch (error) {
        toast.error("Admin Login Fail");
        console.log(error);
        
    }
}