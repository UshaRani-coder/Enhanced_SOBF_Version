import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getBulletine } from "../../Reducers/bulletinSlice";

const Recent_Activities = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { bulletines, status, error } = useSelector((state) => state.bulletines);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${location.pathname === "/recent-activities" ? "mt-[120px]" : "mt-[30px]"
        }`}
    >
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-logoYellow relative transition-all ease-in-out">
        Recent Activities
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <h1 className="text-center text-2xl font-bold">
        Highlights of Our Latest Efforts and Community Engagement
      </h1>
      <h1 className="text-center text-xl mb-4 p-3 text-gray-600">
        Discover the most recent projects, events, and initiatives we&apos;ve
        undertaken to make a difference in our communities.
      </h1>

      {status === "loading" && <p>Loading activities...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col items-center gap-7 p-5 lg:flex-row lg:justify-center">
        {bulletines.map((activity) => (
          <div
            key={activity._id}
            className="flex flex-col items-center w-[80%] md:w-[55%] lg:w-[30%] bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
          >
            <img
              src={
                activity.images && activity.images.length > 0
                  ? activity.images[0]
                  : "https://via.placeholder.com/300"
              }
              alt={activity.title}
              className="w-full h-full md:h-[300px] rounded-t-lg object-cover"
            />
            <div className="px-[20px]">
              <div className="flex items-center gap-x-[5px] mt-[15px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[10px]"
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
                <span className="text-[13px]">{formatDate(activity.date)}</span>
              </div>
              <h1 className="font-bold mt-[10px] text-lg leading-[23px]">
                {activity.title}
              </h1>
              <p className="mt-[10px] text-[14px] text-justify">
                {activity.description}
              </p>
              <Link to={`/recent-activities/${activity._id}`}>
                <button
                  aria-label="View Details"
                  className="my-[20px] bg-logoYellow text-white font-semibold text-[14px] px-[10px] py-[5px] rounded-2xl transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  View Details
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
