import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroBanners } from '../../Reducers/heroBannerSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
      }, 3000);
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
  const capitalize = (str) => {
    if (!str) return '';
    return str.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };


  return (
    <div
      className="relative h-[87vh] md:h-[90vh] xl:h-[90vh] flex flex-col lg:flex-row items-center justify-center bg-[#0d1b2a] overflow-hidden pt-10 gap-4 lg:pt-[200px] xl:pt-16 px-4"
      id="next-section"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 opacity-30 blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 opacity-30 blur-[120px]"></div>
      </div>

      {/* Hero Image - takes 60% width */}
      <div className="relative w-full lg:w-[50%] h-[40%] lg:h-[60%] flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroBanner[currentIndex]?._id}
            className="w-full h-full flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio container */}
              <img
                src={heroBanner[currentIndex]?.image}
                alt="Hero Banner"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Text Content - takes 40% width */}
      <div className="z-10 text-center lg:text-left w-full lg:w-[40%] text-white flex flex-col justify-center h-full">
        <motion.h1
          className="font-extrabold text-[30px] small-range:text-[25px] md:text-5xl lg:text-[50px] xl:text-[50px] leading-[35px] md:leading-[50px] lg:leading-[55px] xl:leading-[55px] tracking-wide px-2 small-max:px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {capitalize(heroBanner[currentIndex]?.quotes)}
        </motion.h1>
        <Link to="/donate-us" className="mt-4 md:mt-6">
          <motion.button
            aria-label="Donate"
            className="text-white bg-logoYellow font-semibold rounded-full md:text-[1.1rem] text-heading5 px-4 py-2 md:px-6 md:py-3 shadow-lg transition transform duration-300 ease-in-out 
            hover:bg-yellow-500 hover:shadow-xl animate-bounce"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            Donate
          </motion.button>
        </Link>
      </div>


      {/* Navigation Dots */}
      <div className="absolute bottom-6 lg:bottom-[50px] flex gap-3">
        {heroBanner.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${currentIndex === index ? 'bg-logoYellow' : 'bg-white/50'
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;