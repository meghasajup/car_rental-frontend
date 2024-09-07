import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
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
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            4.0
          </Typography>
        </div>
        <Typography color="gray" className="text-gray-500">
          {car.category || 'Category'}
        </Typography>
        <Typography color="gray" className="text-gray-500">
          {car.fuelType || 'Fuel Type'}
        </Typography>
        <Typography color="gray" className="text-gray-500">
          {car.description || 'No Description Available'}
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          <Tooltip content="Air Conditioning">
            <span className="cursor-pointer rounded-full border border-gray-200/5 bg-gray-500/5 p-3 text-gray-500 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6 12a6 6 0 0112 0H6z" />
                <path d="M12 6a6 6 0 016 6h-1.2a4.8 4.8 0 00-4.8-4.8V6zM6.8 12H6a6 6 0 016-6v1.2a4.8 4.8 0 00-4.8 4.8zM12 18a6 6 0 016-6h1.2a4.8 4.8 0 00-4.8 4.8V18zM6.8 18H6a6 6 0 016-6v1.2a4.8 4.8 0 00-4.8 4.8z" />
              </svg>
            </span>
          </Tooltip>

          <Tooltip content="Bluetooth">
            <span className="cursor-pointer rounded-full border border-gray-200/5 bg-gray-500/5 p-3 text-gray-500 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M11.97 2.03L10 4l1.5 1.5 1.47-1.46 1.5 1.5-2.97 2.97 3 3.01-1.5 1.5L12 10.5l-1.5 1.5 1.5 1.5-1.97 1.97 3.97 3.97L15.5 18l-2.03-2.03 1.97-1.97-2.97-2.97 2.97-2.97L12 4l1.5-1.5L13 2.03 11.97 2.03z" />
              </svg>
            </span>
          </Tooltip>

          <Tooltip content="GPS">
            <span className="cursor-pointer rounded-full border border-gray-200/5 bg-gray-500/5 p-3 text-gray-500 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a2 2 0 110 4 2 2 0 010-4zm0 12a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8z" />
              </svg>
            </span>
          </Tooltip>

          <Tooltip content="Parking Sensors">
            <span className="cursor-pointer rounded-full border border-gray-200/5 bg-gray-500/5 p-3 text-gray-500 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zm0 16a6 6 0 01-6-6 6 6 0 016-6 6 6 0 016 6 6 6 0 01-6 6zm0-9a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </span>
          </Tooltip>

          <Tooltip content="USB Port">
            <span className="cursor-pointer rounded-full border border-gray-200/5 bg-gray-500/5 p-3 text-gray-500 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2a2 2 0 00-2 2v5a2 2 0 002 2 2 2 0 002-2V4a2 2 0 00-2-2zm0 7a1 1 0 01-1-1V4a1 1 0 012 0v4a1 1 0 01-1 1zm-6 9h4v-2H6a2 2 0 00-2 2v1a1 1 0 001 1h4v-2H6v-2zm8 0h4v-2h-4v2zm-6-6h12v2H8v-2z" />
              </svg>
            </span>
          </Tooltip>
        </div>
      </CardBody>

      <CardFooter className="pt-3">
        <Link to={`/user/cart`}>
          <Button size="lg"  className=" width-[80px] from-indigo-700 to-purple-700 bg-gradient-to-r text-white p-4">
            Add to cart
          </Button>
        </Link>
      </CardFooter>

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