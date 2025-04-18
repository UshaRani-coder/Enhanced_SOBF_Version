/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificBulletine } from '../Reducers/bulletinSlice';
import hardcodedPosts from '../defaultData/newsbulletine.json';
import DOMPurify from 'dompurify';

const NewsBulletinDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { specificBulletine, status } = useSelector(
    (state) => state.bulletines,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSpecificBulletine(id));
    }
  }, [dispatch, id]);

  const activity = useMemo(
    () =>
      specificBulletine ||
      hardcodedPosts.find((item) => String(item._id) === String(id)),
    [specificBulletine, id],
  );

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!specificBulletine) {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        <p className="text-lg text-red-500">News not found!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleBack = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/press-release', { state: { scrollTo: 'pressRelease' } });
  };

  return (
    <div className="flex flex-col items-center w-[100%] md:w-[90%] p-[12px] mx-auto mt-[100px] lg:mt-[130px]">
      <h1 className="text-xl md:text-3xl font-bold text-center my-4 md:mb-[30px]">
        {specificBulletine?.title}
      </h1>
      <div className="flex flex-col items-center w-full">
        {/* Images Section */}
        <div
          className={`w-full ${specificBulletine?.images?.length === 1
            ? ''
            : 'flex flex-wrap justify-center gap-4'
            }`}
        >
          {specificBulletine?.images && specificBulletine?.images?.length > 0 ? (
            specificBulletine?.images?.length === 1 ? (
              // Single Image with 50vh height
              <div className="w-full h-[80vh] overflow-hidden">
                <img
                  src={specificBulletine?.images[0]}
                  alt={specificBulletine?.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ) : (
              // Multiple Images with 50vh height
              specificBulletine.images.map((image, index) => (
                <div key={index} className="w-full sm:w-[48%] lg:w-[48%] h-[80vh] overflow-hidden">
                  <img
                    src={image}
                    alt={`${specificBulletine.title} - ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))
            )
          ) : (
            // Fallback Image with 50vh height
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
          className={`w-full mt-[20px] ${specificBulletine.videos?.length === 1
            ? ''
            : 'flex flex-wrap justify-center gap-4'
            }`}
        >
          {specificBulletine?.videos && specificBulletine?.videos?.length > 0 ? (
            specificBulletine?.videos?.length === 1 ? (
              // Single Video with 50vh height
              <div className="w-full h-[80vh] overflow-hidden">
                <video
                  controls
                  src={specificBulletine?.videos[0]}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ) : (
              // Multiple Videos with 50vh height
              specificBulletine?.videos?.map((video, index) => (
                <div key={index} className="w-full sm:w-[48%] lg:w-[48%] h-[50vh] overflow-hidden">
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
          <div className="text-sm text-gray-500 flex items-center gap-x-[5px] mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-[14px]"
            >
              <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>{' '}
            {formatDate(specificBulletine?.date)}
          </div>
          <p
            className="md:text-lg text-gray-700"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                specificBulletine?.description,
              ).replace(/<a /g, '<a style="color: #4a90e2; " '),
            }}
          ></p>

          <div className="flex">
            <button
              className="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all mt-4"
              onClick={handleBack}
            >
              Back to Press Release
            </button>
          </div>
          <div className="mt-12 w-full flex flex-col items-center bg-gray-100 p-4 md:p-6 xl:p-10 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-indigo-700">
              Make a Difference!
            </h2>
            <p className="text-center text-gray-700 mb-4 lg:text-[18px]">
              Your support helps us continue our mission of making the world
              a better place. Every contribution brings us closer to
              achieving our goals and empowering the community.
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