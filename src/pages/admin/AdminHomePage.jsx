import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Car, Calendar, Star, FileText } from 'lucide-react';

export const AdminHomePage = () => {
  return (
    <div className="p-6 md:p-10 min-h-screen">
      <motion.h1
        className="text-4xl font-bold text-gray mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Management */}
        <motion.div
          className="backdrop-blur-md shadow-md rounded-lg p-6 hover:shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="w-12 h-12 text-gray mb-4" />
          <h2 className="text-2xl font-bold mb-2">Users Management</h2>
          <p className="text-gray mb-4">Manage users, view user profiles, and handle user roles.</p>
          <Link to="/admin/users">
            <motion.button
              className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-full text-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Users
            </motion.button>
          </Link>
        </motion.div>

        {/* Cars Management */}
        <motion.div
          className="backdrop-blur-md shadow-md rounded-lg p-6 hover:shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Car className="w-12 h-12 text-gray mb-4" />
          <h2 className="text-2xl font-bold mb-2">Cars Management</h2>
          <p className="text-gray mb-4">Add, update, or remove cars from the system.</p>
          <Link to="/admin/cars">
            <motion.button
              className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-full text-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Cars
            </motion.button>
          </Link>
        </motion.div>

        {/* Bookings Management */}
        <motion.div
          className="backdrop-blur-md shadow-md rounded-lg p-6 hover:shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="w-12 h-12 text-gray mb-4" />
          <h2 className="text-2xl font-bold mb-2">Bookings Management</h2>
          <p className="text-gray mb-4">View and manage customer bookings.</p>
          <Link to="/admin/bookings">
            <motion.button
              className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-full text-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Bookings
            </motion.button>
          </Link>
        </motion.div>

        {/* Reviews Management */}
        <motion.div
          className="backdrop-blur-md shadow-md rounded-lg p-6 hover:shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Star className="w-12 h-12 text-gray mb-4" />
          <h2 className="text-2xl font-bold mb-2">Reviews Management</h2>
          <p className="text-gray mb-4">Moderate user reviews and ratings for cars.</p>
          <Link to="/admin/reviews">
            <motion.button
              className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-full text-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Reviews
            </motion.button>
          </Link>
        </motion.div>

        {/* Reports */}
        <motion.div
          className="backdrop-blur-md shadow-md rounded-lg p-6 hover:shadow-lg flex flex-col items-center text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="w-12 h-12 text-gray mb-4" />
          <h2 className="text-2xl font-bold mb-2">Reports</h2>
          <p className="text-gray mb-4">View system reports for cars, users, and bookings.</p>
          <Link to="/admin/reports">
            <motion.button
              className="mt-2 px-3 py-2 bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] text-white rounded-full text-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Reports
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
