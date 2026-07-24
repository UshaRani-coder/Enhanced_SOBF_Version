/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificBulletine } from '../reducers/bulletinSlice';
import hardcodedPosts from '../defaultData/newsbulletine.json';
import DOMPurify from 'dompurify';
import ShareButton from '@/components/common_components/ShareButton.jsx';
import DonateCTA from '@/components/common_components/DonateCTA.jsx';
import  formatDate  from '@/utils/formatDate.js';

const NewsBulletinDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { specificBulletine, status } = useSelector(
    (state) => state.bulletines,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    if (isMongoId) {
      dispatch(getSpecificBulletine(id));
    }
  }, [dispatch, id]);

  const bulletine = useMemo(() => {
    if (specificBulletine) return specificBulletine;

    return hardcodedPosts.find((item) => String(item._id) === String(id));
  }, [specificBulletine, id]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!bulletine) {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        <p className="text-lg text-red-500">News not found!</p>
      </div>
    );
  }
  const normalizeImage = (img) => {
    if (!img) return null;

    if (typeof img === 'string') return img;

    if (typeof img === 'object') return img.url;

    return null;
  };
 

  const handleBack = () => {
    navigate('/press-release');
  };
  const title = 'Support Braj Seva – Be one in a million';
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;
  return (
    <div className="flex flex-col items-center w-[100%] md:w-[90%] p-[12px] mx-auto mt-[100px] lg:mt-[130px]">
      <h1 className="text-xl md:text-3xl font-bold text-center my-4 md:my-[30px]">
        {bulletine?.title}
      </h1>
      <div className="flex flex-col items-center w-full">
        {/* Images Section */}
        <div
          className={`w-full ${
            bulletine?.images?.length === 1
              ? ''
              : 'flex flex-wrap justify-center gap-4'
          }`}
        >
          {bulletine?.images && bulletine?.images?.length > 0 ? (
            bulletine?.images?.length === 1 ? (
              // Single Image

              <div className="w-full aspect-[16/9] overflow-hidden">
                <img
                  src={normalizeImage(bulletine?.images[0])}
                  alt={bulletine?.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                <img
                  src={normalizeImage(bulletine?.images[0])}
                  alt={bulletine?.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ) : (
              // Multiple Images
              bulletine.images.map((image, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[48%] lg:w-[48%] h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden"
                >
                  <img
                    src={normalizeImage(image)}
                    alt={`${bulletine.title} - ${index + 1}`}
                    loading="lazy"
                    decoding="async"
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

        {/* Videos Section */}
        <div
          className={`w-full mt-[20px] ${
            bulletine.videos?.length === 1
              ? ''
              : 'flex flex-wrap justify-center gap-4'
          }`}
        >
          {bulletine?.videos && bulletine?.videos?.length > 0 ? (
            bulletine?.videos?.length === 1 ? (
              // Single Video with 50vh height
              <div className="w-full h-[80vh] overflow-hidden">
                <video
                  controls
                  src={bulletine?.videos[0]}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ) : (
              // Multiple Videos with 50vh height
              bulletine?.videos?.map((video, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[48%] lg:w-[48%] h-[50vh] overflow-hidden"
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

        <div className="w-full flex flex-col justify-start p-2 pt-0">
          <div className="text-sm text-gray-500 flex items-center gap-x-[5px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[14px]"
            >
              <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>{' '}
            {formatDate(bulletine?.date)}
          </div>
          <p
            className="md:text-lg text-gray-700"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(bulletine?.description).replace(
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
              Back to Press Release
            </button>

            <div onClick={(e) => e.stopPropagation()} className="mt-3">
              <ShareButton
                title={title}
                url={`${baseURL}/press-release/${bulletine?._id}`}
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

export default NewsBulletinDetails;
