import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement, CategoryScale);

export const AdminReportManagement = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchTotals();
  }, []);

  const fetchTotals = async () => {
    try {
      const [usersResponse, carsResponse, bookingsResponse, reviewsResponse] = await Promise.all([
        axiosInstance.get('/reports/users-total'),
        axiosInstance.get('/reports/cars-total'),
        axiosInstance.get('/reports/bookings-total'),
        axiosInstance.get('/reports/reviews-total'),
      ]);

      setTotalUsers(usersResponse.data.total);
      setTotalCars(carsResponse.data.total);
      setTotalBookings(bookingsResponse.data.total);
      setTotalReviews(reviewsResponse.data.total);
    } catch (error) {
      toast.error('Failed to fetch totals');
    }
  };

  const data = {
    labels: ['Users', 'Cars', 'Bookings', 'Reviews'],
    datasets: [
      {
        label: 'Total',
        data: [totalUsers, totalCars, totalBookings, totalReviews],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Report Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard title="Total Users" value={totalUsers} bgColor="bg-blue-500" />
        <ReportCard title="Total Cars" value={totalCars} bgColor="bg-green-500" />
        <ReportCard title="Total Bookings" value={totalBookings} bgColor="bg-yellow-500" />
        <ReportCard title="Total Reviews" value={totalReviews} bgColor="bg-purple-500" />
      </div>
      <div className="mt-8 flex justify-center">
        <div className="w-60 h-58">
          <h3 className="text-2xl font-bold text-center mb-4">Overall Statistics</h3>
          <Doughnut data={data} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } } } }} />
        </div>
      </div>
    </div>
  );
};

// Report Card Component with count-up and hover animations
const ReportCard = ({ title, value, bgColor }) => {
  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg text-white ${bgColor} flex flex-col items-center justify-center`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-3xl font-semibold">
        <CountUp end={value} duration={2} />
      </p>
    </motion.div>
  );
};
