import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/hone/footerIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { userLogin } from '../../services/userApi';


export const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await userLogin(data)
      toast.success('Login Success');
      navigate('/user/home');
    } catch (error) {
      // toast.error('Login Failed');
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img src={backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 bg-white bg-opacity-20 p-12 rounded-xl shadow-xl max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-grey mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Welcome Back
          </motion.h1>
          <motion.p
            className="text-lg text-gray mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Sign in to continue your journey with us and access exclusive features.
          </motion.p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Email Address</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="input input-bordered rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Password</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="input input-bordered rounded-lg text-grey focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
              required
            />
          </div>
          <div className="form-control">
            <motion.button
              type='submit'
              className="btn text-lg px-6 py-3 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full shadow-lg text-white transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.button>
          </div>
        </form>

        <div>
          <label className="label">
            <Link to="/register" className="label-text-alt link link-hover text-cyan-300">
              New User? Sign Up
            </Link>
          </label>
        </div>

      </motion.div>
    </div>
  );
};
