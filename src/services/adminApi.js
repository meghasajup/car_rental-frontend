import { toast } from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";
import Cookies from 'js-cookie';

export const adminLogin = async (data) => {
  try {
      const response = await axiosInstance({
          url: '/admin/login',
          method: 'POST',
          data,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('admintoken')}` 
        }
      });
      return response?.data;
  } catch (error) {
      console.log(error);
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
      console.log(error);
  }
};