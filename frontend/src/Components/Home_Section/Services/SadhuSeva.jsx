import React from "react";
import ImgBanner from "./ImgBanner";
import { Link } from "react-router-dom";
const SadhuSeva = ({ setService }) => {
  return (
    <div className="w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto">
      <div className="sm:mb-5 mb-5 lg:-mb-28">
        <button
          aria-label="Back to Services"
          className="back-button mb-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={() => setService(null)}
        >
          Back to Services
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <ImgBanner />

        <div className="flex flex-col md:items-start items-center mx-[20px] w-[90%] lg:w-[50%] justify-center">
          <h1 className="text-center text-heading4 lg:text-[27px] font-bold my-4  relative  transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] mt-5">
            Sadhu Seva
          </h1>
          <p className="text-gray-700 text-[16px] text-justify lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px]  md:text-left lg:leading-[30px]">
            Those who are fully depends on mercy and blessings of Shri Radha
            Krishna, for them we like to start daily food prasadam seva for them
            , here are thousands of devotees who are living and doing their
            sadhana on road side, they don&lsquo;t have house to live , food to eat
            but even then they are happily living in Shri Vrindavan Dham, and
            doing their daily Sadhana.
          </p>
          <button>
            <Link
              href=""
              className="px-8 py-3.5 relative rounded-lg group overflow-hidden font-semibold bg-orange text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg"
            >
              <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
              <span className="relative z-10">
                <Link to="/donate-us" onClick={""}>
                  Donate
                </Link>
              </span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SadhuSeva;
