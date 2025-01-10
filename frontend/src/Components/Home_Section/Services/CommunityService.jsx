import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import ImgBanner from "./ImgBanner";
import { Link } from "react-router-dom";
import { heroes } from "../../../Constant/data";

const CommunityService = ({ setService }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if the current page is the home page

  return (
    <div
      className={`w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto ${
        isHomePage ? "" : "mt-20 mb-20" 
      }`}
    >
      {/* Only show the "Back to Services" button if on the home page */}
      {isHomePage && (
        <div className="sm:mb-5 mb-5 lg:-mb-28 ">
          <button
            aria-label="Back to Services"
            className="back-button mb-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
            onClick={() => setService(null)}
          >
            Back to Services
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[10px] lg:mt-[120px]">
        <ImgBanner banners={heroes} />
        <div className="flex flex-col md:items-start items-center mx-[20px] w-[90%] lg:w-[50%] justify-center">
          <h1 className="text-center text-heading4 lg:text-heading3 font-bold mb-5">
            Community Service
          </h1>
          <p className="text-gray-700 text-justify text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px] md:text-left lg:leading-[30px]">
            <span className="text-logo-yellow">“Soul of Braj”</span> is focused
            on Community service as it is not only a way to give back, but it is
            great for volunteers as well. Helping others makes us feel better.
            By giving back, we help ourselves. Service to a just cause
            rewards the workers with more real happiness and satisfaction than
            any other venture of life.
          </p>
          <button>
            <Link
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

export default CommunityService;
