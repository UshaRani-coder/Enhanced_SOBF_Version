import React from 'react';
import { Link } from 'react-router-dom';

const DonateCTA = ({ title, description }) => {
  return (
    <div
      className={`mt-6 w-full flex flex-col items-center bg-gray-100 p-4 md:p-6 xl:p-10 rounded-lg shadow-lg `}
    >
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-indigo-700">
        {title}
      </h2>

      <p className="text-center text-gray-700 mb-4 lg:text-[18px]">
        {description}
      </p>

      <Link
        to="/donate-us"
        className="px-4 py-1 md:py-2 bg-logoYellow text-white rounded-lg shadow-lg hover:bg-logo-blue transition-all text-[16px] md:text-lg font-semibold"
      >
        Donate Now
      </Link>
    </div>
  );
};

export default DonateCTA;
