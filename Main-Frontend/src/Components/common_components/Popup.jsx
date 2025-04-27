import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import brajkulamImg from '../../assets/Sobf Images/child_education_and_empowerment/cee28.jpg';
import sadhuSevaImg from '../../assets/Sobf Images/Sadhu Seva/cropped-ss8.png';
import yamunaCleaning from '../../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv6.jpg';

const Popup = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling

    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when popup closes
    };
  }, []);
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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[99999]">
      {/* <div className="relative w-[90%]  md:w-[60%] lg:w-[60%] xl:w-[40%]  h-[75vh] lg:h-[65vh] xl:h-[70vh]  bg-[#FFFEFA] rounded-lg shadow-lg flex flex-col mt-[100px] md:mt-[70px] lg:mt-0 xl:mt-[120px]"> */}
      <div className="relative w-[90%] md:w-[60%] lg:w-[60%] xl:w-[40%] bg-[#FFFEFA] rounded-lg shadow-lg flex flex-col mt-[120px] md:mt-[70px] lg:mt-0 xl:mt-[120px] h-[450px] md:h-[500px]  xl:h-[450px] safari:h-[80vh] firefox:h-[70vh] edge:h-[100vh]">
        {/* Close Button */}
        <button
          className="absolute top-[-10px] right-[-10px] text-white font-bold bg-red-500 hover:bg-red-700 rounded-full p-1"
          onClick={onClose}
        >
          <X size={12} />
        </button>

        {/* Images Section (Top Half) */}
        
        <div className="flex w-full h-[60%]  overflow-hidden">
  {popupImagesArray.map((item, index) => (
    <div
      key={index}
      className={`w-1/3 h-full bg-center bg-no-repeat ${
        index === 0 ? "rounded-tl-lg rounded-b-none" : index === popupImagesArray.length - 1 ? "rounded-tr-lg rounded-b-none" : ""
      }`}
      style={{
        backgroundImage: `url(${item.img})`,
        backgroundSize: "100% 100%",
      }}
    />
  ))}
</div>

        {/* Description Section (Bottom Half) */}
        <div className="flex flex-col items-center justify-center  px-6 text-center">
          <p className="text-lg font-bold md:text-2xl max-w-lg p-2 small-range:pt-4 lg:pt-6">
            Your support honors sadhus, nurtures young minds, and protects the
            sacred Yamuna.
          </p>

          {/* Donate Button */}
          <Link to={'/donate-us'} onClick={onClose} className="m-2">
            <button
              className="md:mt-6 xl:mt-0 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-2 px-4 md:px-4 md:py-3 rounded-full 
                     shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2 animate-bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentcolor"
                stroke="currentcolor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[14px] h-[14px]"
              >
                <path d="M20.8 4.6c-2.3-2.2-6.1-2.1-8.3.3l-.5.6-.5-.6C9.2 2.5 5.4 2.4 3.1 4.6a5.5 5.5 0 0 0 0 7.8l8.2 8.1 8.2-8.1a5.5 5.5 0 0 0 .3-7.8z" />
              </svg>
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
