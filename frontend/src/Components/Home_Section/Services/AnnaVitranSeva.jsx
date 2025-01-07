import React from "react";
import { useLocation } from "react-router-dom";
import img1 from "../../../assets/Sobf Images/food distribution/fd2.avif";
import img2 from "../../../assets/Sobf Images/food distribution/fd7.avif";
import img3 from "../../../assets/Sobf Images/food distribution/fd9.avif";
import ImgBanner from "./ImgBanner";
import { Link } from "react-router-dom";

const GopalaBhog = ({ setService }) => {

  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if the current page is the home page
  const images = [
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
  ];

  return (
    <div
      className={`w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto ${
        isHomePage ? "" : "mt-20 mb-20" 
      }`}
    >
      {/* Only show the "Back to Services" button if on the home page */}
      {isHomePage && (
        <button
          aria-label="Play Video"
          className="back-button px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={() => setService(null)}
        >
          Back to Services
        </button>
      )}

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px] mt-[30px] ">
       
        <ImgBanner banners={images} />
        <div className="flex flex-col items-center md:items-start mx-[20px] w-[90%] lg:w-[50%] justify-center lg:mt-[50px]">
          <h1 className="text-center text-heading4 lg:text-heading3 font-bold mb-5">
          Anna Vitran Seva
          </h1>
          <p className="text-gray-700 text-justify text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px] md:text-left lg:leading-[30px]">
            Anna Vitran Seva Outlet in Shri Vrindavan Dham is not only serving
            affordable and satvik food prasadam to hundreds of beneficiaries,
            Anna Vitran Seva Outlet is also providing job opportunities to needy
            women beneficiaries. With this opportunity, they are able to help
            their families financially. Currently, we have more than 10 women
            beneficiaries.
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

export default GopalaBhog;
