import React from "react";
import { useParams } from "react-router-dom";
import News from "../Constant/pressReleaseData";
import { Link } from "react-router-dom";

const ActivityDetails = () => {
  const { id } = useParams();
  const activity = News.find((act) => act.id === parseInt(id));

  if (!activity) {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        Activity not found!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-[150px] p-4">
      <h1 className="text-3xl font-bold text-center mb-4 w-full">{activity.title}</h1>
      {/* Flex container for image and content */}
      <div className="flex flex-col lg:flex-row w-full lg:gap-[20px]">
        {/* Image covering half the screen */}
        <div className="w-full lg:w-[60%] h-full flex-shrink-0">
          <img
            src={activity.media}
            alt={activity.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Content section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start p-4">
          <div className="text-sm text-gray-500 mb-4">Date: {activity.date}</div>
          <p className="text-lg text-gray-700 text-justify mb-4">{activity.description}</p>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all mt-4"
            onClick={() => window.history.back()}
          >
            Back to Recent Activities
          </button>
          {/* Donation Section */}
          <div className="mt-12 w-full flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">Make a Difference!</h2>
            <p className="text-center text-gray-700 mb-4">
              Your support helps us continue our mission of making the world a better place.
              Every contribution brings us closer to achieving our goals and empowering the community.
            </p>
            <Link
              to="/donate-us"
              className="px-6 py-3 bg-logoYellow text-white rounded-lg shadow-lg hover:bg-logo-blue transition-all text-lg font-semibold"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ActivityDetails;
