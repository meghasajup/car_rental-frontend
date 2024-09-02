import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css'; // Import the CSS file

// Import images
import image1 from '../../assets/hone/John Doe.jpg';
import image2 from '../../assets/hone/Jane Smith.jpg';
import image3 from '../../assets/hone/Emily Johnson.jpg';
import image4 from '../../assets/hone/Michael Brown.jpg';
import image5 from '../../assets/hone/Sarah Wilson.jpg';
import image6 from '../../assets/hone/David Lee.jpg';
import image7 from '../../assets/hone/Laura Garcia.jpg';
import image8 from '../../assets/hone/Robert Davis.jpg';

const testimonials = [
  {
    quote: "The service was outstanding! The car was in excellent condition and the staff was incredibly helpful. I'll definitely use this service again.",
    name: "John Doe",
    role: "Businessman",
    image: image1,
  },
  {
    quote: "Affordable prices and top-notch customer support. Renting a car has never been this easy and stress-free.",
    name: "Jane Smith",
    role: "Travel Blogger",
    image: image2,
  },
  {
    quote: "I was impressed with the variety of vehicles available and how easy it was to pick up and drop off the car. Highly recommend!",
    name: "Emily Johnson",
    role: "Frequent Traveler",
    image: image3,
  },
  {
    quote: "Exceptional experience from start to finish. The booking process was seamless, and the car was spotless.",
    name: "Michael Brown",
    role: "Software Engineer",
    image: image4,
  },
  {
    quote: "I’ve used many car rental services, but this one stands out for its customer care and efficiency.",
    name: "Sarah Wilson",
    role: "Event Planner",
    image: image5,
  },
  {
    quote: "I needed a car last minute, and they delivered beyond my expectations. Fantastic service!",
    name: "David Lee",
    role: "Photographer",
    image: image6,
  },
  {
    quote: "Great service and the best prices around. I felt like a valued customer every step of the way.",
    name: "Laura Garcia",
    role: "Real Estate Agent",
    image: image7,
  },
  {
    quote: "The car rental experience was smooth, and I appreciated the flexibility in the return process.",
    name: "Robert Davis",
    role: "Sales Manager",
    image: image8,
  },
];

const boxVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  return (
    <section id='testimonials'>
      <div className="py-12 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-gray-500 text-center mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={boxVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
