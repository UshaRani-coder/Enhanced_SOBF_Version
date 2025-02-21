

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import Images for Mobile (below md)
import brajkulamImg from '../../assets/Sobf Images/child_education_and_empowerment/cee28.jpg';
import sadhuSevaImg from '../../assets/Sobf Images/Sadhu Seva/cropped-ss8.png';
import yamunaCleaning from '../../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv6.jpg';

// Import Images for md & above
import mdBrajkulamImg from '../../assets/Sobf Images/children_activities/ca1.png'
import mdSadhuSevaImg from '../../assets/Sobf Images/Sadhu Seva/ss9.png'
import mdYamunaCleaning from '../../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv1.png'

const popupImagesArray = [
  {
    img: sadhuSevaImg,
    description:
      'Your donation provides essential care and support for elderly and needy sadhus.',
  },
  {
    img: brajkulamImg,
    description:
      'Your donation empowers underprivileged children with education and a brighter future.',
  },
  {
    img: yamunaCleaning,
    description:
      'Your donation helps restore and preserve the sacred Yamuna River for future generations.',
  },
];

const popupImagesArrayMD = [
  {
    img: mdBrajkulamImg,
    description:
      'Your donation empowers underprivileged children with education and a brighter future.',
  },
  {
    img: mdSadhuSevaImg,
    description:
      'Your donation provides essential care and support for elderly and needy sadhus.',
  },
  {
    img: mdYamunaCleaning,
    description:
      'Your donation helps restore and preserve the sacred Yamuna River for future generations.',
  },
];

const Popup = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [isMD, setIsMD] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const updateSize = () => setIsMD(window.innerWidth >= 768);
    window.addEventListener('resize', updateSize);

    startSlideshow();
    
    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const startSlideshow = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (isMD ? popupImagesArrayMD.length : popupImagesArray.length));
    }, 3000);
  };

  const stopSlideshow = () => {
    clearInterval(intervalRef.current);
  };

  const imagesToShow = isMD ? popupImagesArrayMD : popupImagesArray;

  return (
    <div className="fixed inset-0 flex items-center justify-center pt-64 bg-black bg-opacity-30 z-[99999] ">
      <div className="relative w-[90%] small-max:w-[85%] md:w-[95%] max-w-4xl h-[100vh] rounded-lg  flex flex-col">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white bg-black bg-opacity-50 rounded-full p-1 z-20"
          onClick={onClose}
        >
          <X size={15} />
        </button>

        {/* Slideshow */}
        <div
          className="relative w-full h-full flex flex-col items-center justify-center"
          onMouseEnter={stopSlideshow}
          onMouseLeave={startSlideshow}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex flex-col items-center justify-center w-full h-full  p-6 rounded-lg text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundImage: `url(${imagesToShow[currentIndex].img})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {/* Description */}
              <motion.p
                className="text-lg font-bold md:text-2xl small-max:mt-[50px] lg:mt-[100px] text-white mb-6 max-w-lg p-2 bg-gray-900 bg-opacity-50 lg:bg-opacity-60 rounded-md"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                {imagesToShow[currentIndex].description}
              </motion.p>

              {/* Donate Button */}
              <Link to={'/donate-us'} onClick={onClose}>
                <motion.button
                  className="bg-orange animate-bounce hover:bg-red-700 text-white px-6 text-md py-3 rounded-lg font-semibold shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                >
                  Donate Now
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Popup;
