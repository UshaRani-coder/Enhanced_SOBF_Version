import React from "react";
import aboutus from "../assets/about-us.png";
import { images } from "../Constant/data";

const Gallery = () => {
  return (
    <div className="pt-[110px] py-6">
      <img src={aboutus} alt="" className="w-full h-[190px] lg:h-[420px]" />
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <div className="w-full">
          <h1 className="text-center text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-peacock-green relative hover:text-peacock-green-hover  transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
            Gallery
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <div key={index} className="w-full hover:opacity-90 relative group">
              <img
                src={image.url}
                alt={`Shot ${index + 1}`}
                className="w-full h-auto transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg">
                <p className="text-white text-center font-bold px-4">
                  {image.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
