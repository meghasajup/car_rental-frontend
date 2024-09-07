import { toast } from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

export const adminLogin = async (data) => {
  try {
      const response = await axiosInstance({
          url: '/admin/login',
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
  

export const adminLogout = async () => {
  try {
      const response = await axiosInstance({
          url: "/admin/logout",
          method: "POST",
          withCredentials: true
      });
      return response?.data;
  } catch (error) {
      toast.error('Logout Failed');
      console.log(error);
  }
};