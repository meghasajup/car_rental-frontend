import React from 'react';
import './Testimonials.css';

// Import images from the assets folder
import johnDoeImage from '../../assets/hone/John Doe.jpg';
import janeSmithImage from '../../assets/hone/Jane Smith.jpg';
import emilyJohnsonImage from '../../assets/hone/Emily Johnson.jpg';
import michaelBrownImage from '../../assets/hone/Michael Brown.jpg';
import sarahWilsonImage from '../../assets/hone/Sarah Wilson.jpg';
import davidLeeImage from '../../assets/hone/David Lee.jpg';
import lauraGarciaImage from '../../assets/hone/Laura Garcia.jpg';
import robertDavisImage from '../../assets/hone/Robert Davis.jpg';

const testimonials = [
  {
    quote: "The service was outstanding! The car was in excellent condition and the staff was incredibly helpful. I'll definitely use this service again.",
    name: "John Doe",
    role: "Businessman",
    image: johnDoeImage,
  },
  {
    quote: "Affordable prices and top-notch customer support. Renting a car has never been this easy and stress-free.",
    name: "Jane Smith",
    role: "Travel Blogger",
    image: janeSmithImage,
  },
  {
    quote: "I was impressed with the variety of vehicles available and how easy it was to pick up and drop off the car. Highly recommend!",
    name: "Emily Johnson",
    role: "Frequent Traveler",
    image: emilyJohnsonImage,
  },
  {
    quote: "Exceptional experience from start to finish. The booking process was seamless, and the car was spotless.",
    name: "Michael Brown",
    role: "Software Engineer",
    image: michaelBrownImage,
  },
  {
    quote: "I’ve used many car rental services, but this one stands out for its customer care and efficiency.",
    name: "Sarah Wilson",
    role: "Event Planner",
    image: sarahWilsonImage,
  },
  {
    quote: "I needed a car last minute, and they delivered beyond my expectations. Fantastic service!",
    name: "David Lee",
    role: "Photographer",
    image: davidLeeImage,
  },
  {
    quote: "Great service and the best prices around. I felt like a valued customer every step of the way.",
    name: "Laura Garcia",
    role: "Real Estate Agent",
    image: lauraGarciaImage,
  },
  {
    quote: "The car rental experience was smooth, and I appreciated the flexibility in the return process.",
    name: "Robert Davis",
    role: "Sales Manager",
    image: robertDavisImage,
  },
];

export default function Testimonials() {
  return (
    <section id='testimonials' className="py-12 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-gray text-center mb-10">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {testimonials.slice(0, 8).map((testimonial, index) => (
          <div key={index} className="p-6 rounded-lg shadow-lg">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-image"
            />
            <p className="text-gray mb-4">"{testimonial.quote}"</p>
            <h3 className="text-xl font-semibold text-gray">{testimonial.name}</h3>
            <p className="text-gray">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
