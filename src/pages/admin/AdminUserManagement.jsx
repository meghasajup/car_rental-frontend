import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export const AdminUserManagement = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);

    const password = watch('password');

    // Fetch users 
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axiosInstance({
                url: '/admin/users',
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${Cookies.get('loginToken')}`,
                }
            });
            setUsers(data.data);
        } catch (error) {
            toast.error('Error fetching users');
            console.error('Error fetching users:', error);
        }
    };

    // Create or update user
    const onSubmit = async (formData) => {
        if (editingUserId) {
            try {
                await axiosInstance.put(`/admin/userUpdate/${editingUserId}`, formData);
                fetchUsers();
                reset();
                setEditingUserId(null);
                toast.success('User updated successfully');
            } catch (error) {
                toast.error('Error updating user');
                console.error('Error updating user:', error);
            }
        } else {
            try {
                await axiosInstance.post('/admin/createuserByAd', formData);
                fetchUsers();
                reset();
                toast.success('User created successfully');
            } catch (error) {
                toast.error('Error creating user');
                console.error('Error creating user:', error);
            }
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`/admin/userByDelete/${userId}`);
            fetchUsers();
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error('Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    const editUser = (user) => {
        setEditingUserId(user._id);
        reset({
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    };

    return (
        <div className="min-h-screen p-4 sm:p-10">
            <div className="max-w-4xl mx-auto shadow-xl rounded-lg p-4 sm:p-8 border border-gray-900">
                <motion.h2
                    className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {editingUserId ? 'Edit User' : 'Create User'}
                </motion.h2>

                {/* User Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            className="p-2 border border-gray rounded focus:ring-2 focus:ring-blue-400"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Name"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="email"
                            className="p-2 border border-gray rounded focus:ring-2 focus:ring-blue-400"
                            {...register('email', { required: 'Email is required' })}
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <input
                            type="text"
                            className="p-2 border border-gray rounded focus:ring-2 focus:ring-blue-400"
                            {...register('phone', { required: 'Phone is required' })}
                            placeholder="Phone"
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>

                    {!editingUserId && (
                        <>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="p-2 border border-gray rounded focus:ring-2 focus:ring-blue-400"
                                    {...register('username', { required: 'Username is required' })}
                                    placeholder="Username"
                                />
                                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="password"
                                    className="p-2 border border-gray rounded focus:ring-2 focus:ring-blue-400"
                                    {...register('password', { required: 'Password is required' })}
                                    placeholder="Password"
                                />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="password"
                                    className="p-2 border border-gray rounded focus:ring-2 focus:ring-blue-400"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: value => value === password || 'Passwords do not match'
                                    })}
                                    placeholder="Confirm Password"
                                />
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                            </div>
                        </>
                    )}

                    <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] hover:bg-blue-600 text-white py-2 rounded-lg shadow transition duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        {editingUserId ? 'Update User' : 'Create User'}
                    </motion.button>
                </form>

                {/* User List */}
                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Users List</h3>
                    <ul className="grid grid-cols-1 gap-4">
                        {users.map((user) => (
                            <motion.li
                                key={user._id}
                                className="flex justify-between items-center p-4 bg-white shadow rounded-lg hover:bg-gray-50"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={user.profileImage || 'default-image-url.jpg'}
                                        alt={user.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{user.name}</p>
                                        <p className="text-gray-600">{user.email}</p>
                                        <p className="text-gray-600">{user.phone}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-center"
                                        onClick={() => editUser(user)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-center"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </motion.li>
                        ))}
                    </ul>

                </motion.div>
            </div>
        </div>
    );
};
