import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getPosts, removePost } from "../../Reducers/postSlice";

const Press_Release = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Fetch posts and status from the Redux store
  const { bulletines, status, error } = useSelector((state) => state.bulletines);

  // Fetch posts when the component loads
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${location.pathname === "/press-release" ? "mt-[120px]" : "mt-0"
        }`}
    >
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-[#2d335d] relative transition-all ease-in-out">
        Press Release
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <h1 className="text-center text-2xl font-bold">
        Announcing Our Latest Initiatives and Achievements Nationwide
      </h1>
      <h1 className="text-center text-xl mb-4 p-3 text-gray-600">
        Stay informed about our recent collaborations, upcoming events, and the
        impact of our efforts across the country.
      </h1>

      {/* Display Loading or Error Messages */}
      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col items-center flex-wrap gap-[30px] lg:gap-[50px] lg:flex-row lg:justify-center p-5">
        {/* {posts.length === 3 && posts.map((news) => ( */}
        {bulletines.map((news) =>(
          <div
            key={news._id}
            className="flex flex-col items-center w-[90%] md:w-[55%] lg:w-[30%] bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
          >
            <img
              src={
                news.images && news.images.length > 0
                  ? news.images[0]
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s'
              }
              alt="media"
              className="w-full h-full md:h-[300px] rounded-t-lg "
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
                <span className="text-[13px]">{formatDate(news.date)}</span>
              </div>
              <h1 className="font-bold mt-[10px] text-lg leading-[23px] line-clamp-2">
                {news.title}
              </h1>
              <p className="mt-[10px] text-[14px] line-clamp-4  ">
                {news.description}
              </p>
              <Link to={`/press-release/${news._id}`}>
                <button
                  aria-label="View Details"
                  className="my-[20px] bg-logoYellow text-white font-semibold text-[14px] px-[10px] py-[5px] rounded-2xl border-none transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg"
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

export default Press_Release;
