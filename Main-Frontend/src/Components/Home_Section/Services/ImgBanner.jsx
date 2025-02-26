import React, { useState, useEffect, useRef } from 'react';

const ImgBanner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => clearInterval(timerRef.current);
  }, []);

  const scrollLeft = () => {
    setLoading(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length,
    );
  };

  const scrollRight = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handleMouseEnter = () => clearInterval(timerRef.current);
  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      scrollRight();
    }, 3000);
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden w-[90%] h-[60vh] rounded-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Image */}
      <img
        src={banners[currentIndex]}
        alt="banner"
        className="absolute w-full h-full object-cover transition-all duration-1000"
        onLoad={() => setLoading(false)} // Hide loader when the image loads
      />

      {/* Left Arrow */}
      <div
        className="scroll-arrow hidden lg:block absolute top-[50%] left-[10px] bg-[rgba(0,0,0,0.5)] text-white py-1 px-3 rounded-full z-10 cursor-pointer"
        style={{ transform: 'translateY(-50%)' }}
        onClick={scrollLeft}
      >
        &lt;
      </div>

      {/* Right Arrow */}
      <div
        className="scroll-arrow hidden lg:block absolute top-[50%] right-[10px] bg-[rgba(0,0,0,0.5)] text-white py-1 px-3 rounded-full z-10 cursor-pointer"
        style={{ transform: 'translateY(-50%)' }}
        onClick={scrollRight}
      >
        &gt;
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 flex justify-center gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-black/50'
            } cursor-pointer`}
            onClick={() => {
              setLoading(true);
              setCurrentIndex(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImgBanner;
