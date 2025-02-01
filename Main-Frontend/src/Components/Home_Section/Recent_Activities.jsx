import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getBulletine } from '../../Reducers/bulletinSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import loader from '../../assets/loader.webp';

const Recent_Activities = React.memo(() => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  // Memoizing the date formatting function
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Dispatching the getBulletine action when status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);

  // Scroll to top when path changes
  useEffect(() => {
    if (location.pathname === '/recent-activities') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Enables smooth scrolling
      });
    }
  }, [location.pathname]);

  // Memoizing whether the page is the home page or not
  const isHomePage = useMemo(
    () => location.pathname === '/',
    [location.pathname],
  );

  // Managing pagination state
  const [page, setPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page

  // Adjusting the displayed posts based on the page type
  const displayedPosts = useMemo(() => {
    if (isHomePage) {
      return posts.slice(0, 3); // Display only 3 posts for the home page
    }
    return posts; // Display all posts for the /recent-activities page
  }, [posts, isHomePage]);

  // Handling Infinite Scroll logic
  const loadMorePosts = () => {
    if (posts.length > page * postsPerPage) {
      setPage((prevPage) => prevPage + 1); // Increment page to load more
    }
  };

  const hasMorePosts = posts.length > page * postsPerPage;

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${isHomePage ? 'mt-[30px]' : 'mt-[120px]'}`}
    >
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-[#2d335d] relative transition-all ease-in-out">
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

      {status === 'loading' && <p>Loading activities...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      <InfiniteScroll
        dataLength={displayedPosts.length}
        next={loadMorePosts} // Trigger the function to load more posts
        hasMore={hasMorePosts} // Check if there are more posts to load
        loader={
          <img
            src={loader}
            alt="Loading..."
            className="w-[20px] h-[20px] align-center"
          />
        } // Show loader while loading
        scrollableTarget="scrollableDiv"
        style={{ display: 'flex', flexDirection: 'column-reverse' }} // To put endMessage and loader at the top
        inverse={true}
      >
        <div className="flex flex-col items-center flex-wrap gap-[30px] lg:gap-[50px] lg:flex-row lg:justify-center p-5">
          {displayedPosts.map((activity) => (
            <div
              key={activity._id}
              className="flex flex-col items-center w-[90%] small-range:w-[85%]  md:w-[55%] lg:w-[30%] bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
            >
              <img
                src={
                  activity.images && activity.images.length > 0
                    ? activity.images[0]
                    : 'https://via.placeholder.com/300'
                }
                alt={activity.title}
                className="w-full h-full md:h-[300px] rounded-t-lg object-cover"
              />
              <div className="px-[15px]">
                <div className="flex items-center gap-x-[5px] mt-[15px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[10px]"
                  >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                  <span className="text-[13px]">
                    {formatDate(activity.date)}
                  </span>
                </div>
                <h1 className="font-bold text-xl line-clamp-2">
                  {activity.title}
                </h1>
                <p className="md:text-lg line-clamp-4">
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
      </InfiniteScroll>

      {isHomePage && posts.length > 3 && (
        <div className="text-center mt-5">
          <Link to="/recent-activities">
            <button className="bg-blue text-white font-bold py-4 px-8 rounded-xl hover:bg-logoYellow transition-colors duration-300">
              See More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
});

export default Recent_Activities;
