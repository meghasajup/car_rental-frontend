import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-hot-toast';

export const CreateCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data", data);
      const formData = new FormData();
      formData.append('brand', data.brand);
      formData.append('model', data.model);
      formData.append('year', data.year);
      formData.append('pricePerDay', data.pricePerDay);
      formData.append('capacity', data.capacity);
      formData.append('transmission', data.transmission);
      formData.append('fuelType', data.fuelType);
      formData.append('mileage', data.mileage);
      formData.append('color', data.color);
      formData.append('registrationNumber', data.registrationNumber);
      formData.append('availability', data.availability);
      formData.append('category', data.category);
      formData.append('location', data.location);
      formData.append('image', data.image[0]); // Assuming you're uploading one image

      const response = await axiosInstance.post('/admin/carCreate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);

      if (response) {
        toast.success('Car created successfully!');
        reset(); // Reset form after successful submission
      } 
    } catch (error) {
      toast.error('Error creating car. Please try again.');
      console.log(error);

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-lg shadow-xl w-full max-w-3xl space-y-6"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center">Add New Car</h2>

        {/* Grouping form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Brand */}
          <div>
            <input
              type="text"
              placeholder="Brand"
              {...register('brand', { required: 'Brand is required' })}
              className="input input-bordered w-full"
            />
            {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
          </div>

          {/* Model */}
          <div>
            <input
              type="text"
              placeholder="Model"
              {...register('model', { required: 'Model is required' })}
              className="input input-bordered w-full"
            />
            {errors.model && <p className="text-red-500">{errors.model.message}</p>}
          </div>

          {/* Year */}
          <div>
            <input
              type="number"
              placeholder="Year"
              {...register('year', { required: 'Year is required', valueAsNumber: true })}
              className="input input-bordered w-full"
            />
            {errors.year && <p className="text-red-500">{errors.year.message}</p>}
          </div>

          {/* Price Per Day */}
          <div>
            <input
              type="number"
              placeholder="Price Per Day"
              {...register('pricePerDay', { required: 'Price is required', valueAsNumber: true })}
              className="input input-bordered w-full"
            />
            {errors.pricePerDay && <p className="text-red-500">{errors.pricePerDay.message}</p>}
          </div>

          {/* Capacity */}
          <div>
            <input
              type="number"
              placeholder="Capacity"
              {...register('capacity', { required: 'Capacity is required', valueAsNumber: true })}
              className="input input-bordered w-full"
            />
            {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
          </div>

          {/* Transmission */}
          <div>
            <select
              {...register('transmission', { required: 'Transmission is required' })}
              className="select select-bordered w-full"
            >
              <option value="">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            {errors.transmission && <p className="text-red-500">{errors.transmission.message}</p>}
          </div>

          {/* Fuel Type */}
          <div>
            <select
              {...register('fuelType', { required: 'Fuel Type is required' })}
              className="select select-bordered w-full"
            >
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.fuelType && <p className="text-red-500">{errors.fuelType.message}</p>}
          </div>

          {/* Mileage */}
          <div>
            <input
              type="number"
              placeholder="Mileage"
              {...register('mileage', { required: 'Mileage is required', valueAsNumber: true })}
              className="input input-bordered w-full"
            />
            {errors.mileage && <p className="text-red-500">{errors.mileage.message}</p>}
          </div>

          {/* Color */}
          <div>
            <input
              type="text"
              placeholder="Color"
              {...register('color', { required: 'Color is required' })}
              className="input input-bordered w-full"
            />
            {errors.color && <p className="text-red-500">{errors.color.message}</p>}
          </div>

          {/* Registration Number */}
          <div>
            <input
              type="text"
              placeholder="Registration Number"
              {...register('registrationNumber', { required: 'Registration Number is required' })}
              className="input input-bordered w-full"
            />
            {errors.registrationNumber && (
              <p className="text-red-500">{errors.registrationNumber.message}</p>
            )}
          </div>

          {/* Availability */}
          <div>
            <select
              {...register('availability', { required: 'Availability is required' })}
              className="select select-bordered w-full"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            {errors.availability && <p className="text-red-500">{errors.availability.message}</p>}
          </div>

          {/* Category */}
          <div>
            <input
              type="text"
              placeholder="Category"
              {...register('category', { required: 'Category is required' })}
              className="input input-bordered w-full"
            />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>

          {/* Location */}
          <div>
            <input
              type="text"
              placeholder="Location"
              {...register('location', { required: 'Location is required' })}
              className="input input-bordered w-full"
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>

          {/* Image */}
          <div>
            <input
              type="file"
              {...register('image', { required: 'Please upload an image' })}
              className="input input-bordered w-full"
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] w-full mt-6 py-2 rounded-xl text-white">
          Create Car
        </button>
      </form>
    </div>
  );
};
