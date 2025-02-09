import React,{useCallback} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecentActivityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const activity = posts.find((post) => post._id === id);

  if (!activity) {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        <p className="text-lg text-red-500">Activity not found!</p>
      </div>
    );
  }
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);
  const handleBack = () => {
    navigate('/recent-activities', { state: { scrollTo: 'recentActivities' } });
  };
  return (
     <div className="flex flex-col items-center w-[100%] md:w-[80%]  mx-auto mt-[50px]   ">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-[30px]">
            {activity.title}
          </h1>
          <div className="flex flex-col items-center w-full ">
            <div
              className={`w-full p-4 ${
                activity.images?.length === 1
                  ? ''
                  : 'flex flex-wrap justify-center gap-4 '
              }`}
            >
              {activity?.images && activity?.images?.length > 0 ? (
                activity?.images?.length === 1 ? (
                  // Single Image
                  <img
                    src={activity?.images[0]}
                    alt={activity?.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  // Multiple Images
                  activity?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${activity?.title} - ${index + 1}`}
                      className="p-4 w-full sm:w-[48%] lg:w-[48%] h-auto object-cover rounded-lg shadow-lg"
                    />
                  ))
                )
              ) : (
                // Fallback Image
                <img
                  src="https://via.placeholder.com/600"
                  alt="Placeholder"
                  className="p-4 w-full h-full object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
    
           {activity.videos?.length === 1 && <div
              className={`p-4 w-full mt-[5px] ${
                activity.videos?.length === 1
                  ? ''
                  : 'flex flex-wrap justify-center gap-4'
              }`}
            >
              {activity?.videos && activity?.videos?.length > 0 ? (
                activity?.videos?.length === 1 ? (
                  // Single Video
                  <video
                    controls
                    src={activity?.videos[0]}
                    className="p-4 w-full h-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  // Multiple Videos
                  activity?.videos?.map((video, index) => (
                    <video
                      key={index}
                      controls
                      src={video}
                      className="p-4 w-full sm:w-[48%] h-auto object-cover rounded-lg shadow-lg"
                    />
                  ))
                )
              ) : null}
            </div>}
    
            <div className="w-full  flex flex-col justify-start p-6 pt-0">
              <div className="text-sm text-gray-500 flex items-center gap-x-[5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-[10px]"
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>{' '}
                {formatDate(activity.date)}
              </div>
              <p className="text-lg text-gray-700  ">{activity.description}</p>
              <div className="flex">
                <button
                  className="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all mt-4"
                  onClick={handleBack}
                >
                  Back to Recent Activities
                </button>
              </div>
              <div className="mt-12 w-full flex flex-col items-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
                  Make a Difference!
                </h2>
                <p className="text-center text-gray-700 mb-4 lg:mx-[200px]">
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

export default RecentActivityDetails;
