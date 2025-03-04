
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroBanners } from '../../Reducers/heroBannerSlice';
import { motion, AnimatePresence } from 'framer-motion';
import {Link} from 'react-router-dom'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { heroBanner, status } = useSelector((state) => state.heroBanner);

  useEffect(() => {
    dispatch(getHeroBanners());
  }, [dispatch]);

  useEffect(() => {
    if (heroBanner?.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroBanner, currentIndex]);

  if (status === 'loading' || !heroBanner?.length) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900">
        <p className="text-white font-semibold text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="  h-[85vh] md:h-[87vh] lg:h-[92vh] xl:h-[87vh] flex flex-col-reverse md:flex-row-reverse md:justify-center items-center justify-end  
    bg-[#0d1b2a] overflow-x-hidden mt-[90px] pt-10 gap-y-4"
    >
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 opacity-30 blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 opacity-30 blur-[120px]"></div>
      </div>

      {/* Text Content */}
      <div className=" z-10 text-center md:text-left md:w-[40%]  text-white">
        <motion.h1
          className="font-extrabold text-xl md:text-3xl lg:text-5xl xl:text-[45px]  leading-[25px] md:leading-[40px] lg:leading-[60px] xl:leading-[55px] tracking-wide small-max:px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {heroBanner[currentIndex]?.quotes}
        </motion.h1>
        <Link to="/donate-us">
        <motion.button
          aria-label="Donate"
          className="text-white mt-2 md:mt-4 md:ml-4 bg-logoYellow font-semibold rounded-full md:text-[1.1rem] text-heading5 px-4 py-2 md:px-6 md:py-3 shadow-lg transition transform duration-300 ease-in-out 
            hover:bg-yellow-500 hover:shadow-xl"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          Donate
        </motion.button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className=" flex justify-center items-center w-full md:w-[60%] h-[50%] md:h-[60%] xl:h-[75%]  overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroBanner[currentIndex]?._id}
            src={heroBanner[currentIndex]?.image}
            alt="Hero Banner"
            className=" rounded-xl shadow-2xl w-[95%]  h-full  overflow-x-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 flex gap-3">
        {heroBanner.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === index ? 'bg-logoYellow' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;



