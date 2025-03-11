
import React, { useState, useEffect } from 'react';
import '../../App.css';
import { heroes_donate } from '../../Constant/data';
import { AnimatePresence, motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
const DonateHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState(null);

  useEffect(() => {
    if (heroes_donate && heroes_donate.length > 0) {
      if (heroes_donate[currentIndex]?.img) {
        const img = new Image();
        img.src = heroes_donate[currentIndex]?.img;
        img.onload = () => setLoadedImage(heroes_donate[currentIndex]?.img);
      }
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes_donate.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [heroes_donate, currentIndex]);

  return (
    <div className="relative overflow-hidden font-quicksand w-[100%] h-[50vh] md:h-[85vh]  xl:h-[80vh] mt-[100px] lg:mt-[120px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={heroes_donate[currentIndex]?._id}
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${loadedImage || heroes_donate[currentIndex]?.img})`,
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
                (prevIndex - 1 + heroes_donate?.length) % heroes_donate?.length,
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
            setCurrentIndex(
              (prevIndex) => (prevIndex + 1) % heroes_donate?.length,
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Quote Text */}
      <AnimatePresence>
        <motion.div
          key={heroes_donate[currentIndex]?.text}
          className="absolute top-20 md:inset-0 flex items-center justify-center z-10"
        >
          <motion.p
            className="text-logoYellow text-center font-bold text-3xl leading-[40px] small-max:leading-[45px] md:leading-[60px] lg:leading-[80px] small-range:text-[25px] small-max:text-3xl md:text-[45px] lg:text-5xl w-[90%] md:w-[60%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {heroes_donate[currentIndex]?.text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[30]">
          <ScrollLink to="donate-form" smooth={true} duration={1200}>
            <button
              aria-label="Donate"
              className="text-white bg-logoYellow font-semibold rounded-full md:text-[1.1rem] text-heading5 px-5 py-2.5 animate-bounce"
            >
              Donate
            </button>
          </ScrollLink>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default DonateHero;
