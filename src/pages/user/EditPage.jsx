import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/hone/footerIcon.png";

export const EditPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: ""
  });
  const [file, setFile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/user/profile",
        method: "GET",
        withCredentials: true,
      });
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      if (file) {
        formData.append("profileImage", file);
      }

      const response = await axiosInstance({
        url: "/user/edit-profile",
        method: "POST",
        data: formData,
        withCredentials: true,
      });

      if (response?.success) {
        toast.success("Profile updated successfully");
        navigate("/user/profile");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden w-full flex flex-col items-center justify-center px-20 py-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-30" />
      </div>

      {/* Edit Profile Form */}
      <motion.div
        className="z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-grey-500">Edit Profile</h2>
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full border-2 border-grey-500 mb-4">
            <img
              src={user.profileImage || "default-image-url"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <label className="text-grey-500 mb-2">Change Image :</label>
          <input type="file" onChange={handleFileChange} className="text-grey-500" />
        </div>
        <div className="mb-4">
          <label className="text-grey-500 mb-2">Name :</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-transparent border-2 border-grey-500 rounded-lg text-grey-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="text-grey-500 mb-2">Email :</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-transparent border-2 border-grey-500 rounded-lg text-grey-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="text-grey-500 mb-2">Phone :</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-transparent border-2 border-grey-500 rounded-lg text-grey-500 focus:outline-none"
            placeholder="Enter your phone number"
          />
        </div>
        <button
          onClick={handleSaveProfile}
          className="w-full py-2 bg-gradient-to-r from-[#FFB3B3] via-[#FF9999] to-[#FF8080] text-white rounded-lg shadow-lg hover:bg-red-300 transition duration-300 ease-in-out"
        >
          Save
        </button>
      </motion.div>
    </div>
  );
};
