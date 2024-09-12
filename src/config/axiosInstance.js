import axios from "axios";
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${Cookies.get('loginToken')}` ,
      }
});