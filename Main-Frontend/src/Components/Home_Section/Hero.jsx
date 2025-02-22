import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroBanners } from '../../Reducers/heroBannerSlice';
import { AnimatePresence, motion } from 'framer-motion';

const Hero = ({ showPopup }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState(null);
  const dispatch = useDispatch();
  const { heroBanner, status } = useSelector((state) => state.heroBanner);

  useEffect(() => {
    dispatch(getHeroBanners());
  }, [dispatch]);

  useEffect(() => {
    if (!showPopup && heroBanner && heroBanner.length > 0) {
      if (heroBanner[currentIndex]?.image) {
        const img = new Image();
        img.src = heroBanner[currentIndex]?.image;
        img.onload = () => setLoadedImage(heroBanner[currentIndex]?.image);
      }
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [heroBanner, currentIndex, showPopup]);

  if (status === 'loading' || !heroBanner || heroBanner?.length === 0) {
    return (
      <div className="hero flex items-center justify-center w-full h-screen">
        <p className="text-white font-bold text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden font-quicksand w-[100%] h-[50vh] md:h-[80vh]  mt-[100px] lg:mt-[120px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={heroBanner[currentIndex]?._id}
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${loadedImage || heroBanner[currentIndex]?.image})`,
            backgroundSize: '100% 100%',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-75" />
        </motion.div>
      </AnimatePresence>

      {/* Scroll Arrows */}
      <div className="absolute top-[50%] left-[20px] z-20 transform -translate-y-1/2">
        <button
          onClick={() =>
            setCurrentIndex(
              (prevIndex) =>
                (prevIndex - 1 + heroBanner?.length) % heroBanner?.length,
            )
          }
          className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[15px] font-bold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-[50%] right-[20px] z-20 transform -translate-y-1/2">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner?.length)
          }
          className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[15px] font-bold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
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
            className="text-logoYellow text-center font-bold text-xl  leading-[30px] md:leading-[50px] lg:leading-[80px]  md:text-3xl lg:text-5xl w-[90%] md:w-[60%]"
            initial={{ opacity: 0 }}
            animate={showPopup ? { opacity: 1 } : { opacity: 1 }}
            transition={
              showPopup ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }
            }
          >
            {showPopup
              ? heroBanner[currentIndex]?.quotes
              : heroBanner[currentIndex]?.quotes
                  .split('')
                  .map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={showPopup ? {} : { delay: index * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
