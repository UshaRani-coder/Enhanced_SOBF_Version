import { fetchAllDonations } from "@/reducers/donateForSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DonateForPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, status, error } = useSelector((state) => state.donateFor);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchAllDonations());
  }, [dispatch]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const sortedCategories = [...categories].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDisplayedCategories(sortedCategories.slice(0, 6));
    }
  }, [categories]);

  // Function to truncate description to 10 words
  const truncateDescription = (text) => {
    const words = text.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return text;
  };

  const loading = status === "loading";

  const handleSeeMore = () => {
    navigate("/donate-for");
  };

  const handleDonateNow = (id) => {
    navigate(`/donate/${id}`);
  };

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-8 md:py-12 mx-auto ">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="inline-block text-[24px] sm:text-heading3  lg:text-heading2 font-bold p-5 text-[#2d335d] relative transition-all ease-in-out">
          All Donation Categories
          <hr className="mt-1 border-blue border-[0.5px]" />
        </h1>
        <p className="mt-2 xs:mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Explore all the causes you can contribute to.
        </p>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="relative px-1 xs:px-2 sm:px-3 w-[80%] m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCategories?.map((category) => {
            const progress =
              (parseInt(category.raised.replace(/₹|,/g, "")) /
                parseInt(category.goal.replace(/₹|,/g, "")) *
                100)

            return (
              <div key={category._id} className="px-1 xs:px-1.5 sm:px-2">
                <div className="text-blue border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full">
                  {/* <div className="h-32 sm:h-40 md:h-44 overflow-hidden"> */}
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
                      {truncateDescription(category.description)}
                    </p>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{progress.toFixed(0)}% funded</span>
                        <span className="text-gray-600">{category.raised} raised</span>
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

                  <button
                    onClick={() => handleDonateNow(category._id)}
                    className="w-full py-2 text-sm rounded-lg font-medium text-white bg-blue hover:bg-blue-700 transition-colors"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {categories?.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={handleSeeMore}
              className="px-6 py-2 bg-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateForPreview;