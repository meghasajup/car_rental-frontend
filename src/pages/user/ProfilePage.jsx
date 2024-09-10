import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/userApi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/hone/footerIcon.png";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleLogOut = async () => {
    const response = await userLogout();
    // if (response?.success) {
    //   navigate("/");
    // }
    navigate("/");
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/user/profile",
        method: "GET",
        withCredentials: true,
      });
      setUser(response?.data?.data);
      console.log(response, "====response");
    } catch (error) {
      console.log(error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/user/edit-profile"); 
  };

  return (
    <div className="relative min-h-screen overflow-hidden w-full flex flex-col items-center justify-center px-20 py-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-30" />
      </div>

      {/* Welcome Message */}
      <motion.h1
        className="text-4xl font-bold z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome, {user?.name}
      </motion.h1>

      {/* Profile Image */}
      <motion.div
        className="avatar z-10 mt-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <div className="w-60 rounded-xl">
          <img src={user?.profileImage} alt="Profile" />
        </div>
      </motion.div>

      {/* User Information */}
      <motion.div
        className="text-center z-10 mt-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >
        <p className="text-lg"> {user?.name}</p>
        <p className="text-lg"> {user?.email}</p>
        <p className="text-lg"> {user?.phone}</p>
        <p className="text-base leading-relaxed mt-4">
          Here’s your profile summary. Make sure your details are up to date for a seamless experience.
        </p>
      </motion.div>

      {/* Log-out Button */}
      <motion.button
        onClick={handleLogOut}
        className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-black rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300 ease-in-out mt-6 z-10 flex items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
      >
        <span className="mr-2">Log-out</span>
        <LogOut />
      </motion.button>
    </div>
  );
};
