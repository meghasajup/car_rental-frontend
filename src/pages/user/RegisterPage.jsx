import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/hone/footerIcon.png';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img src={backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />

      {/* Main Content with spacing for header and footer */}
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

        <form className="space-y-4"> {/* Reduced vertical spacing between fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Reduced horizontal spacing between Name and Mobile */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray font-semibold">Full Name</span>
              </label>
              <input
                type="text"
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
              placeholder="Password"
              className="input input-bordered rounded-lg  p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered rounded-lg  p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray font-semibold">Profile Image</span>
            </label>
            <input
              type="file"
              className="input input-bordered rounded-lg  p-3 text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-transform"
              required
            />
          </div>

          <div>
            <label className="label">
              <Link to="/login" className="label-text-alt link link-hover text-cyan-300">
                Already have an account? Login
              </Link>
            </label>
          </div>

          <div className="form-control">
            <motion.button
              className="btn text-lg px-6 py-3 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] rounded-full shadow-lg text-white transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};