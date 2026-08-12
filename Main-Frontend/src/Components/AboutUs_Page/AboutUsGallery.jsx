import React from 'react';
import { Link } from 'react-router-dom';

import cee14 from '@/assets/Sobf Images/child_education_and_empowerment/cee14.avif';
import cee11 from '@/assets/Sobf Images/child_education_and_empowerment/cee11.avif';
import ca5 from '@/assets/Sobf Images/children_activities/ca5.avif';
import ca15 from '@/assets/Sobf Images/children_activities/ca3.avif';
import ca6 from '@/assets/Sobf Images/children_activities/ca6.avif';
import hac4 from '@/assets/Sobf Images/health_and_awareness_camp/hac4.avif';

const AboutUsGallery = () => {
  const images = [cee14, ca5, hac4, cee11, ca15, ca6];

  return (
    <div className="container mx-auto p-0 lg:p-4 px-4 lg:px-20 text-center mb-20">
      <h1 className="text-heading3 lg:text-heading1 inline-block font-bold mb-4 py-5 text-logoYellow">
        Collected Shots
        <hr className="mt-1 border-light-lavender border-[1px]" />
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {images.map((image, index) => (
          <div key={index} className="w-full hover:opacity-90">
            <img
              src={image}
              alt={`Shot ${index + 1}`}
              loading="lazy"
              decoding="async"
              width={450}
              height={211}
              className="w-full h-[250px] md:h-[300px] object-cover rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/gallery"
          className="bg-blue text-white font-bold py-4 px-8 rounded-xl hover:bg-logoYellow transition-colors duration-300"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default AboutUsGallery;
