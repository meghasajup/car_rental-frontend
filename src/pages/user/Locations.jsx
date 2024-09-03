import React from 'react';
import { motion } from 'framer-motion';

// Import images from assets
import image1 from '../../assets/hone/bekalfort.jpeg';
import image2 from '../../assets/hone/kannur.jpeg';
import image3 from '../../assets/hone/wayanad.jpeg';
import image4 from '../../assets/hone/kozhikode.jpeg';
import image5 from '../../assets/hone/malapuram.jpeg';

// Dummy data for locations
const locations = [
  { id: 1, city: "Kasargod", imgSrc: image1 },
  { id: 2, city: "Kannur", imgSrc: image2 },
  { id: 3, city: "Wayanad", imgSrc: image3 },
  { id: 4, city: "Kozhikode", imgSrc: image4 },
  { id: 5, city: "Malappuram", imgSrc: image5 },
];

export const LocationSection = () => {
  return (
    <section className="relative z-10 w-full py-16 text-grey">
      <div className="text-center pb-8">
        <h2 className="text-4xl font-bold">
           <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A3FFC] via-[#5821CE] to-[#3B1AAB]">Locations</span>
        </h2>
      </div>
      <div className="flex justify-center space-x-4 px-8">
        {locations.map(location => (
          <motion.div
            key={location.id}
            className="w-full max-w-xs relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={location.imgSrc}
              alt={`${location.name} Image`}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-center text-white">
                <h3 className="text-lg font-bold">{location.city}</h3>
                <p className="text-sm">{location.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
