import React from 'react';

export const ProfilePage = () => {
  // Dummy data for illustration
  const user = {
    profileImage: 'https://example.com/profile.jpg',
    name: 'John Doe',
    memberSince: 'January 2021',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    paymentMethods: [
      { type: 'Visa', last4: '1234' },
      { type: 'MasterCard', last4: '5678' }
    ],
    recentBookings: [
      { car: 'Toyota Camry', date: '2024-08-30', status: 'Completed' },
      { car: 'Honda Accord', date: '2024-09-01', status: 'Pending' }
    ]
  };

  const handleClose = () => {
    // Implement close functionality here
    console.log('Close button clicked');
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center min-h-screen bg-gray-100 p-6">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Profile Details */}
        <div className="flex items-center justify-center md:justify-start mb-6">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">Member Since: {user.memberSince}</p>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h3>
          <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-gray-600"><strong>Address:</strong> {user.address}</p>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Payment Methods</h3>
          <ul>
            {user.paymentMethods.map((method, index) => (
              <li key={index} className="mb-2 text-gray-600">
                <span className="font-semibold">{method.type}:</span> {method.last4 ? `**** **** **** ${method.last4}` : method.email}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Bookings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Recent Bookings</h3>
          <ul>
            {user.recentBookings.map((booking, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <p className="text-gray-600"><strong>Car:</strong> {booking.car}</p>
                <p className="text-gray-600"><strong>Date:</strong> {booking.date}</p>
                <p className={`text-sm ${booking.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  <strong>Status:</strong> {booking.status}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
