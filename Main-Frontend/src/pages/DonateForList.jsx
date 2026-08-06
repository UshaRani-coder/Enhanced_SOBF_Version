import { fetchAllDonations } from '@/reducers/donateForSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const DonateForList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, status, error } = useSelector((state) => state.donateFor);

  const ITEMS_PER_LOAD = 6;

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [categories]);

  useEffect(() => {
    dispatch(fetchAllDonations());
  }, [dispatch]);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [location.hash]);

  const loading = status === 'loading';

  const handleDonateNow = (id) => {
    navigate(`/donate/${id}`);
  };

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-8 md:py-12 mx-auto mt-20">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="inline-block text-[20px] md:text-heading3 lg:text-heading2 font-bold p-5 text-[#2d335d] relative transition-all ease-in-out">
          All Donation Categories
          <hr className="mt-1 border-blue border-[0.5px]" />
        </h1>
        <p className="mt-2 xs:mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Explore all the causes you can contribute to.
        </p>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div
        id="donate-categories"
        className="relative px-1 xs:px-2 sm:px-3 w-[90%] md:w-[80%] m-auto "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(0, visibleCount).map((category) => {
            const progress =
              (parseInt(category.raised.replace(/₹|,/g, '')) /
                parseInt(category.goal.replace(/₹|,/g, ''))) *
              100;

            return (
              <div key={category._id} className="px-1 xs:px-1.5 sm:px-2">
                <div className="text-blue border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={category?.image}
                      alt={category?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 xs:p-5 sm:p-6 flex-grow">
                    <h3 className="text-blue text-lg xs:text-xl sm:text-2xl font-semibold mb-2">
                      {category.title}
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-base text-gray-700 mb-3">
                      {category.description}
                    </p>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">
                          {progress.toFixed(0)}% funded
                        </span>
                        <span className="text-gray-600">
                          {category.raised} raised
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">
                        Goal: {category.goal}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      onClick={() => handleDonateNow(category._id)}
                      className="w-full py-2 text-sm rounded-lg font-medium text-white bg-blue hover:bg-blue-700 transition-colors"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
             
              </div>
            );
          })}
        </div>
      </div>
         {visibleCount < categories.length && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() =>
                        setVisibleCount((prev) =>
                          Math.min(prev + ITEMS_PER_LOAD, categories.length),
                        )
                      }
                      className="px-6 py-3 rounded-lg bg-blue text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
    </div>
  );
};

export default DonateForList;
