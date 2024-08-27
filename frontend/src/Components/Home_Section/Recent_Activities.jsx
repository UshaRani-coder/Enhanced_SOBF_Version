import React from "react";
import recentActivities from "../../Constant/recentActivities.jsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Recent_Activities = () => {
  const location = useLocation();
  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${
        location.pathname === "/recent-activities" ? "mt-[120px]" : "mt-[30px]"
      }`}
    >
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-[#2d335d] relative transition-all ease-in-out">
        Recent Activities
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <h1 className="text-center text-2xl font-bold">
        Highlights of Our Latest Efforts and Community Engagement
      </h1>
      <h1 className="text-center text-xl mb-4 p-3 text-gray-600">
        Discover the most recent projects, events, and initiatives we've
        undertaken to make a difference in our communities.
      </h1>

      <div className="flex flex-col items-center gap-[50px] lg:gap-[100px]  md:flex-row md:justify-center">
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className=" flex flex-col items-center w-[80%] md:w-[35%] lg:w-[30%] bg-white rounded-lg  shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
          >
            <img
              src={activity.media}
              alt="media"
              className="w-full h-full md:h-[300px] "
            />
            <div className=" px-[20px]">
              <div className="flex items-center gap-x-[5px] mt-[15px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[10px]"
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
                <span className="text-[13px]">{activity.date}</span>
              </div>
              <h1 className="font-bold mt-[10px] text-lg leading-[23px] flex-grow">
                {activity.title}
              </h1>
              <p className="mt-[10px] text-[14px] text-justify flex-grow">
                {activity.description}
              </p>
              <Link to="/recent-activities">
                <button className="my-[20px] bg-logoYellow text-white font-semibold text-[14px] px-[10px] py-[5px] rounded-2xl border-none transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg">
                  {activity.button}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent_Activities;
