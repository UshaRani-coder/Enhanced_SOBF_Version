import React from 'react';
import aboutus from "../assets/about-us.png";
import { images } from '../Constant/data';

const Gallery = () => {


  return (
    <div className='pt-[110px] py-6'>
      <img src={aboutus} alt="" className='w-full h-[190px] lg:h-[420px]' />
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <h1 className='text-4xl lg:text-6xl py-8 text-orange font-bold font-quicksand font-600 text-center'>Our Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full hover:opacity-90 relative group"
            >
              <img src={image.url} alt={`Shot ${index + 1}`} className="w-full h-auto transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg">
                <p className="text-white text-center font-bold px-4">{image.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
