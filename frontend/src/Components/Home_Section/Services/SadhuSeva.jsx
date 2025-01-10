import React from "react";
import sadhuSevaImg1 from '../../../assets/Sobf Images/food distribution/sadhuSeva.jpg'
import sadhuSevaImg2 from '../../../assets/Sobf Images/food distribution/sadhuSeva1.jpg'
import sadhuSevaImg3 from '../../../assets/Sobf Images/food distribution/sadhuSeva2.jpg'
import ImgBanner from "./ImgBanner";
import { Link } from "react-router-dom";
const SadhuSeva = ({ setService }) => {
  const images = [
        {
          img: sadhuSevaImg1,
        },
        {
          img: sadhuSevaImg2,
        },
        {
          img: sadhuSevaImg3,
        },
      ];
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

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:mt-[120px] lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <ImgBanner banners={images}/>
        <div className="flex flex-col md:items-start items-center mx-[20px] w-[90%] lg:w-[50%] justify-center">
          <h1 className="text-center text-heading4 lg:text-heading3 font-bold mb-5">
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
