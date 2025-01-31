import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NewsBulletinDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const bulletines = useSelector((state) => state.bulletines.bulletines); // Redux posts
  const activity = bulletines.find((bulletin) => bulletin._id === id);

  if (!activity) {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        Activity not found!
      </div>
    );
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const handleBack = () => {
    navigate('/press-release', { state: { scrollTo: 'pressRelease' } });
  };

  return (
    <div className="flex flex-col items-center w-full mt-[100px] md:mt-[140px]  p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-[30px]">
        {activity.title}
      </h1>
      <div className="flex flex-col lg:flex-row w-full lg:gap-[20px]">
        <div
          className={`w-full lg:w-[60%] ${
            activity.images?.length === 1
              ? ''
              : 'grid grid-cols-1 md:grid-cols-2 gap-4'
          }`}
        >
          {activity.images && activity.images.length > 0 ? (
            activity.images.length === 1 ? (
              // Single Image
              <img
                src={activity.images[0]}
                alt={activity.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            ) : (
              // Multiple Images
              activity.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${activity.title} - ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              ))
            )
          ) : (
            // Fallback Image
            <img
              src="https://via.placeholder.com/600"
              alt="Placeholder"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-start p-4">
          <div className="text-sm text-gray-500 mb-4 flex items-center gap-x-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[10px]"
            >
              <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>{' '}
            {formatDate(activity.date)}
          </div>
          <p className="text-lg text-gray-700  mb-4">{activity.description}</p>
          <div className="flex">
            <button
              className="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all mt-4"
              onClick={handleBack}
            >
              Back to Press Release
            </button>
          </div>
          <div className="mt-12 w-full flex flex-col items-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
              Make a Difference!
            </h2>
            <p className="text-center text-gray-700 mb-4">
              Your support helps us continue our mission of making the world a
              better place. Every contribution brings us closer to achieving our
              goals and empowering the community.
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

export default NewsBulletinDetails;
