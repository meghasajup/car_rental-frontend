import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/hone/footerIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userRegister } from '../../services/userApi';
import toast from 'react-hot-toast';

export const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('username', getValues('username'));
      formData.append('name', getValues('name'));
      formData.append('email', getValues('email'));
      formData.append('phone', getValues('phone'));
      formData.append('password', getValues('password'));
      formData.append('confirmPassword', getValues('confirmPassword'));
  
      // Append the profile image (file)
      const profileImage = getValues('profileImage')[0];
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
  
      const response = await userRegister(formData);
  
      toast.success('Registration Success');
      navigate('/login');
    } catch (error) {
      toast.error('Registration Failed');
      console.log(error);
    }
  };
  

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img src={backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />

      <motion.div
        className="relative z-10 bg-white bg-opacity-20 p-12 rounded-xl shadow-xl max-w-lg w-full mt-8 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-6">
          <motion.h1
            className="text-4xl font-bold text-grey mb-3"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Create Your Account
          </motion.h1>
          <motion.p
            className="text-lg text-gray mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Sign up to start your journey with us and enjoy exclusive features.
          </motion.p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* <div className="form-control">
              <label className="label">
                <span className="label-text text-gray font-semibold">User Name</span>
              </label>
              <input
                type="text"
                {...register("username")}
                placeholder="UserName"
                className="input input-bordered rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
                required
              />
            </div> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="input input-bordered rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray font-semibold">Mobile</span>
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Mobile"
                className="input input-bordered rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Email Address</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input input-bordered rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
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
              placeholder="Password"
              className="input input-bordered rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Confirm Password</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="input input-bordered rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Profile Image</span>
            </label>
            <input
              type="file"
              {...register('profileImage')}
              className="input input-bordered rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"

              required
            />
          </div>

          <div className="form-control">
            <motion.button
              className="btn text-lg px-6 py-3 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full shadow-lg text-white transition-transform w-full"
              type='submit'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="label-text-alt link link-hover text-cyan-300">
            Already have an account? Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};