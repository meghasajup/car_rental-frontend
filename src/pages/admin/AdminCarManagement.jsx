import React, { useEffect, useState, useRef } from "react"; // Import useRef
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./AdminCarStyle.css";
import Cookies from 'js-cookie';

export const AdminCarManagement = () => {
  const [cars, setCars] = useState([]);
  const [editCarId, setEditCarId] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    capacity: "",
    transmission: "",
    fuelType: "",
    mileage: "",
    color: "",
    registrationNumber: "",
    availability: true,
  });

  const navigate = useNavigate();
  const carRefs = useRef({}); // Create a ref object to store car refs

  // Fetch all cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axiosInstance({
          url: "/admin/cars",
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${Cookies.get('loginToken')}`,
          }
        });
        setCars(data.data);
      } catch (error) {
        toast.error("Error fetching cars");
        console.error("Error fetching cars", error);
      }
    };
    fetchCars();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Edit Button Click
  const handleEdit = (car) => {
    setEditCarId(car._id);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      capacity: car.capacity,
      transmission: car.transmission,
      fuelType: car.fuelType,
      mileage: car.mileage,
      color: car.color,
      registrationNumber: car.registrationNumber,
      availability: car.availability,
    });

    // Scroll to the car item immediately after setting the edit state
    setTimeout(() => {
      if (carRefs.current[car._id]) {
        carRefs.current[car._id].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100); // Adjust the delay as needed
  };

  // Handle Update Car
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/admin/carUpdate/${editCarId}`, formData);
      const updatedCars = cars.map((car) =>
        car._id === editCarId ? { ...car, ...formData } : car
      );
      setCars(updatedCars);
      setEditCarId(null); // Reset after updating
      toast.success("Car updated successfully");
    } catch (error) {
      toast.error("Error updating car");
      console.error("Error updating car", error);
    }
  };

  // Handle Delete Car
  const handleDelete = async (carId) => {
    try {
      await axiosInstance.delete(`/admin/carDelete/${carId}`);
      setCars(cars.filter((car) => car._id !== carId));
      toast.success("Car deleted successfully");
    } catch (error) {
      toast.error("Error deleting car");
      console.error("Error deleting car", error);
    }
  };

  return (
    <div className="admin-car-management">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <h1 className="text-3xl font-bold text-center">Car Management</h1>
      {/* Button to Navigate to Create Car Page */}
      <button
        className="bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB] shadow-xl p-2 mb-3 mt-4 rounded-lg text-white"
        onClick={() => navigate("/admin/create-car")}
      >
        Create Car
      </button>

      <div className="car-list">
        {/* List of Cars in Reverse Order */}
        {cars.slice().reverse().map((car) => (
          <div key={car._id} className="car-item" ref={el => carRefs.current[car._id] = el}>
            {/* Car Image */}
            <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-image" />
            <h2>{car.brand} {car.model}</h2>
            <p>Year: {car.year}</p>
            <p>Price Per Day: ₹{car.pricePerDay}</p>
            {/* Display other car details */}
            <div className="car-actions">
              <button
                className="bg-gradient-to-r from-[#66bb6a] via-[#43a047] to-[#388e3c] shadow-xl py-2 px-3 rounded-lg text-white"
                onClick={() => handleEdit(car)}
              >
                Edit
              </button>
              <button
                className="bg-gradient-to-r from-[#ff6f61] via-[#f44336] to-[#e57373] shadow-xl py-2 px-3 rounded-lg text-white"
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Car Form */}
      {editCarId && (
        <div className="edit-car-form shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-3">Edit Car</h2>
          <form
            className="car-form-grid"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="brand"
              value={formData.brand}
              placeholder="Brand"
              onChange={handleChange}
            />
            <input
              type="text"
              name="model"
              value={formData.model}
              placeholder="Model"
              onChange={handleChange}
            />
            <input
              type="number"
              name="year"
              value={formData.year}
              placeholder="Year"
              onChange={handleChange}
            />
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              placeholder="Price Per Day"
              onChange={handleChange}
            />
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              placeholder="Capacity"
              onChange={handleChange}
            />
            <input
              type="text"
              name="transmission"
              value={formData.transmission}
              placeholder="Transmission"
              onChange={handleChange}
            />
            <input
              type="text"
              name="fuelType"
              value={formData.fuelType}
              placeholder="Fuel Type"
              onChange={handleChange}
            />
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              placeholder="Mileage"
              onChange={handleChange}
            />
            <input
              type="text"
              name="color"
              value={formData.color}
              placeholder="Color"
              onChange={handleChange}
            />
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              placeholder="Registration Number"
              onChange={handleChange}
            />
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </select>

            <button className="btn-update" onClick={handleUpdate}>
              Update Car
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
