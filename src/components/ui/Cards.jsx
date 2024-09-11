import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import 'tailwindcss/tailwind.css';
import { Link } from "react-router-dom";

export function CarCard({ car }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked); // Toggle the state between true and false
  };

  return (
    <Card className="w-full max-w-[26rem] shadow-2xl p-4 bg-transparent transform transition-all duration-300 hover:shadow-3xl hover:scale-105">
      <CardHeader floated={false} color="blue-gray">

        <img
          src={car.image}
          alt="car image"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium text-gray-500">
            {car.model || 'Model'}
          </Typography>
        </div>
        <Typography color="gray" className="text-gray-500">
          Price Per Day: ₹{car.pricePerDay || 'Price per day'}

        </Typography>
        <Typography color="gray" className="text-gray-500">
          {car.location || 'Not available'}
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          {/* Tooltip for Air Conditioning */}
          <Tooltip content="Air Conditioning">
            <span className="cursor-pointer p-3 text-gray hover:text-gray">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6 12a6 6 0 0112 0H6z" />
                <path d="M12 6a6 6 0 016 6h-1.2a4.8 4.8 0 00-4.8-4.8V6zM6.8 12H6a6 6 0 016-6v1.2a4.8 4.8 0 00-4.8 4.8zM12 18a6 6 0 016-6h1.2a4.8 4.8 0 00-4.8 4.8V18zM6.8 18H6a6 6 0 016-6v1.2a4.8 4.8 0 00-4.8 4.8z" />
              </svg>
            </span>
          </Tooltip>

          {/* Tooltip for Bluetooth */}
          <Tooltip content="Bluetooth">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M11.97 2.03L10 4l1.5 1.5 1.47-1.46 1.5 1.5-2.97 2.97 3 3.01-1.5 1.5L12 10.5l-1.5 1.5 1.5 1.5-1.97 1.97 3.97 3.97L15.5 18l-2.03-2.03 1.97-1.97-2.97-2.97 2.97-2.97L12 4l1.5-1.5L13 2.03 11.97 2.03z" />
              </svg>
            </span>
          </Tooltip>

          {/* Tooltip for GPS */}
          <Tooltip content="GPS">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a2 2 0 110 4 2 2 0 010-4zm0 12a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8z" />
              </svg>
            </span>
          </Tooltip>

          {/* Tooltip for Parking Sensors */}
          <Tooltip content="Parking Sensors">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zm0 16a6 6 0 01-6-6 6 6 0 016-6 6 6 0 016 6 6 6 0 01-6 6zm0-9a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </span>
          </Tooltip>

          {/* Tooltip for USB Port */}
          <Tooltip content="USB Port">
            <span className="cursor-pointer p-3 text-gray-500 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a2 2 0 00-2 2v5a2 2 0 002 2 2 2 0 002-2V4a2 2 0 00-2-2zm0 7a1 1 0 01-1-1V4a1 1 0 012 0v4a1 1 0 01-1 1zm-6 9h4v-2H6a2 2 0 00-2 2v1a1 1 0 001 1h4v-2H6v-2zm8 0h4v-2h-4v2zm-6-6h12v2H8v-2z" />
              </svg>
            </span>
          </Tooltip>
        </div>
      </CardBody>

      <CardFooter className="pt-3">
        <Link to={`/user/car-details/${car._id}`}>
          <Button size="lg" fullWidth={true} className="from-indigo-700 to-purple-700 bg-gradient-to-r text-white p-4">
            More Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
