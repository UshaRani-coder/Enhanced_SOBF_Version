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
    if (!heroBanner?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroBanner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroBanner]);

  const capitalize = (str = '') =>
    str
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  if (status === 'loading' || !heroBanner?.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0b1220] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div id='next-section' className="relative  flex items-center bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#0b1220] overflow-hidden px-4 sm:px-6 lg:px-16 py-10">
      {/* background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-10 lg:gap-12">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            key={heroBanner[currentIndex]?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
  text-white font-bold
  text-2xl sm:text-3xl md:text-4xl lg:text-4xl
  leading-[1.4] lg:leading-[1.5] xl:leading[2]
"
          >
            {capitalize(heroBanner[currentIndex]?.quotes)}
          </motion.h1>

          <p className="mt-4 sm:mt-5 text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            Together we can create meaningful impact through compassion,
            service, and community support.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link to="/donate-us">
              <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow-md">
                Donate Now
              </button>
            </Link>

            <button
              onClick={() => {
                document.getElementById('events')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            >
              Explore Events
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroBanner[currentIndex]?._id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={heroBanner[currentIndex]?.image}
                alt="Hero Banner"
                className="
                  w-full object-cover
                  h-[240px] sm:h-[300px] md:h-[380px] lg:h-[500px]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroBanner.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-yellow-400' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
