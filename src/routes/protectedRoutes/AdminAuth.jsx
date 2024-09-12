import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AdminAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [admin, setAdmin] = useState(false);

    console.log("token cookie", Cookies.get('loginToken'))

    const checkAdmin = async () => {
        try {
            const response = await axiosInstance({
                url: '/admin/check-admin',
                method: 'GET',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get('loginToken')}` ,
                    "Access-Control-Allow-Origin": "*"
                }
            });
            setAdmin(true); // Admin is authenticated
        } catch (error) {
            navigate('/admin-login'); // Redirect to admin login if not authenticated
        }
    };

    useEffect(() => {
        checkAdmin();
    }, [location.pathname]);

    return admin ? children : null; // Render children only if admin is authenticated
};