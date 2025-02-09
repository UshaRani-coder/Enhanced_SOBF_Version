import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroBanners } from '../../Reducers/heroBannerSlice'; // Adjust path if needed
import { AnimatePresence,motion } from 'framer-motion';
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const dispatch = useDispatch();
  const { heroBanner, status } = useSelector((state) => state.heroBanner);
  
  
  
  useEffect(() => {
    dispatch(getHeroBanners());
  }, [dispatch]);

  useEffect(() => {
    if (heroBanner && heroBanner?.length > 0) { // Check if heroBanner exists
      setCurrentImage(heroBanner[currentIndex]?.image);
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner?.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [heroBanner, currentIndex]);

  const imageVariants = {
    enter: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      filter: "blur(8px) brightness(0.7)",
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const textVariants = {
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  if (status === "loading" || !heroBanner || heroBanner?.length === 0) { // Handle null or undefined
    return (
      <div className="hero flex items-center justify-center w-full h-screen">
        <p className="text-white font-bold text-xl">Loading...</p>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden font-quicksand w-[100%] h-[100vh] mt-[100px]">
      <AnimatePresence>
        <motion.div
          key={heroBanner[currentIndex]?.id}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: currentImage ? `url(${currentImage})` : 'none' }}
          variants={imageVariants}
          initial="exit"
          animate="enter"
          exit="exit"
        >
          {/* Ken Burns Effect (Optional - Uncomment if needed) */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: currentImage ? `url(${currentImage})` : 'none' }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />

          <div className="absolute inset-0 bg-black opacity-75" />
        </motion.div>
      </AnimatePresence>

      {/* Scroll Arrows */}
      <div className="absolute top-[50%] left-[20px] z-20 transform -translate-y-1/2">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + heroBanner?.length) % heroBanner?.length)}
          className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute top-[50%] right-[20px] z-20 transform -translate-y-1/2">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner?.length)}
          className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Quote Text */}
      <AnimatePresence>
        <motion.div
          key={heroBanner[currentIndex]?.quotes}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <motion.p
            className="text-logoYellow text-center font-bold text-3xl leading-[40px] md:leading-[70px] lg:leading-[80px] md:text-4xl lg:text-5xl w-[90%] md:w-[60%] shadow-md"
            style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}
            variants={textVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            {heroBanner[currentIndex]?.quotes || ""}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
