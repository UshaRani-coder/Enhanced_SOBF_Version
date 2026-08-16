/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import hardcodedPosts from '../defaultData/recent-activities.json';
import { getPostById } from '../reducers/postSlice';
import DOMPurify from 'dompurify';
import ShareButton from '@/components/common_components/ShareButton';
import DonateCTA from '@/components/common_components/DonateCTA.jsx';
import  formatDate  from '@/utils/formatDate.js';

const RecentActivityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    if (isMongoId) {
      dispatch(getPostById(id));
    }
  }, [dispatch, id]);

  const activity = useMemo(
    () =>
      post || hardcodedPosts.find((item) => String(item._id) === String(id)),
    [post, id],
  );

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] min-h-screen p-4">
        <p className="text-lg text-red-500">Activities not found!</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/recent-activities');
  };

  const title = 'Support Braj Seva – Be one in a million';
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;

  return (
    <div className="flex flex-col items-center min-h-screen w-[100%] md:w-[90%] p-[12px] mx-auto mt-[100px] lg:mt-[130px]">
      <h1 className="text-xl md:text-3xl font-bold text-center my-4 md:my-[30px]">
        {activity.title}
      </h1>
      <div className="flex flex-col items-center w-full">
        <div
          className={`w-full ${
            activity.images?.length === 1
              ? ''
              : 'flex flex-wrap justify-center gap-4'
          }`}
        >
          {activity?.images && activity?.images?.length > 0 ? (
            activity?.images?.length === 1 ? (
              // Single Image

              <div className="w-full aspect-[16/9] overflow-hidden mb-4">
                <img
                  src={activity?.images[0]}
                  alt={activity?.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ) : (
              // Multiple Images
              activity?.images?.map((image, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[48%] lg:w-[48%] h-[50vh] overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${activity?.title} - ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))
            )
          ) : (
            // Fallback Image
            <div className="w-full h-[80vh] overflow-hidden">
              <img
                src="https://via.placeholder.com/600"
                alt="Placeholder"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {activity.videos?.length === 1 && (
          <div
            className={`w-full m-[15px] ${
              activity.videos?.length === 1
                ? ''
                : 'flex flex-wrap justify-center gap-4'
            }`}
          >
            {activity?.videos && activity?.videos?.length > 0 ? (
              activity?.videos?.length === 1 ? (
                // Single Video
                <div className="w-full h-[80vh] overflow-hidden">
                  <video
                    controls
                    src={activity?.videos[0]}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              ) : (
                // Multiple Videos
                activity?.videos?.map((video, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-[48%] lg:w-[48%] h-[60vh] overflow-hidden"
                  >
                    <video
                      controls
                      src={video}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))
              )
            ) : null}
          </div>
        )}

        <div className="w-full flex flex-col justify-start pt-0">
          <div className="text-sm text-gray-500 flex items-center gap-x-[5px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[14px]"
            >
              <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>{' '}
            {formatDate(activity.date)}
          </div>
          <p
            className="md:text-lg text-gray-700 mt-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(activity.description).replace(
                /<a /g,
                '<a style="color: #4a90e2; " ',
              ),
            }}
          ></p>

          <div className="flex flex-row items-center gap-3 sm:gap-5 mt-2">
            <button
              className="px-4 py-2 font-semibold text-xs sm:text-sm md:text-base text-white rounded-xl shadow-md bg-gradient-to-r from-[#2d335d] to-[#44508f] hover:scale-105 transition-all duration-300"
              onClick={handleBack}
            >
              Back to Recent Activities
            </button>

            <div onClick={(e) => e.stopPropagation()} className="mt-3">
              <ShareButton
                title={title}
                url={`${baseURL}/recent-activities/${activity?._id}`}
                className="px-3 py-[7px] md:py-[9px] border-0 hover:scale-105 text-xs md:text-sm mb-3 inline-block font-bold  shadow-md bg-gradient-to-r from-[#2d335d] to-[#44508f] text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              />
            </div>
          </div>
          <DonateCTA
            title="Make a Difference!"
            description="Your support helps us continue our mission of making the world a better place. Every contribution brings us closer to achieving our goals and empowering the community."
          />
        </div>
      </div>
    </div>
  );
};

export default RecentActivityDetails;
