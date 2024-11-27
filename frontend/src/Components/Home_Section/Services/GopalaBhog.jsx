import React from "react";
import { useLocation } from "react-router-dom"; 
import gopalaBhogImg from "../../../assets/Sobf Images/food distribution/fd7.avif";
import ImgBanner from "./ImgBanner";
import { Link } from "react-router-dom";
const GopalaBhog = ({ setService }) => {
  const location = useLocation(); 

  const isHomePage = location.pathname === "/"; // Check if the current page is the home page

  return (
    <div
      className={`w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto ${
        isHomePage ? "" : "mt-40 mb-20" // Apply mt and mb only if not on home page
      }`}
    >
      {/* Only show the "Back to Services" button if on the home page */}
      {location.pathname == "/" && (
        <button
          aria-label="Play Video"
          className="back-button my-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={() => setService(null)}
        >
          Back to Services
        </button>
      )}

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <img
          src={gopalaBhogImg}
          alt="community-service"
          className="w-[90%] lg:w-[50%]"
        />

        <div className="flex flex-col items-center md:items-start mx-[20px] w-[90%] lg:w-[50%] justify-center">
          <h1 className="text-center text-heading4 lg:text-heading3 font-bold my-4 relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
            Gopala Bhog
          </h1>
          <p className="text-gray-700 text-justify text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 xl:pb-[50px] md:text-left lg:leading-[30px]">
            Gopala Bhog Outlet in Shri Vrindavan Dham is not only serving
            affordable and satvik food prasadam to hundreds of beneficiaries,
            Gopala Bhog Outlet is also providing job opportunities to needy
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
