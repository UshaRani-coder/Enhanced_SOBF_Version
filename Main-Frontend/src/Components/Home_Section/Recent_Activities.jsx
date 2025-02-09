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

  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for newest first, 'asc' for oldest first
  const [selectedYear, setSelectedYear] = useState(''); // Filter by year
  const [selectedMonth, setSelectedMonth] = useState(''); // Filter by month

  // Memoizing the date formatting function
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (location.pathname === '/recent-activities') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const isHomePage = useMemo(
    () => location.pathname === '/',
    [location.pathname],
  );

  // **Extract unique years and months**
  const availableYears = useMemo(() => {
    const years = new Set(
      posts.map((post) => new Date(post.date).getFullYear()),
    );
    return Array.from(years).sort((a, b) => b - a); // Sort descending
  }, [posts]);

  const availableMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // **Filtering logic**
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const postDate = new Date(post.date);
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth(); // 0 = January, 1 = February

      const matchesYear = selectedYear
        ? postYear === parseInt(selectedYear)
        : true;
      const matchesMonth = selectedMonth
        ? postMonth === availableMonths.indexOf(selectedMonth)
        : true;

      return matchesYear && matchesMonth;
    });
  }, [posts, selectedYear, selectedMonth]);

  const noPostsMessage = useMemo(() => {
    if (posts.length === 0) return 'No activities found. Check back later!';
    if (filteredPosts.length === 0)
      return 'No activities match your selected filters.';
    return null;
  }, [filteredPosts, posts.length, selectedYear, selectedMonth]);

  const displayedPosts = useMemo(() => {
    if (!filteredPosts || filteredPosts?.length === 0) return [];
    const sortedPosts = [...filteredPosts].sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date),
    );
    return isHomePage ? sortedPosts?.slice(0, 3) : sortedPosts;
  }, [filteredPosts, isHomePage, sortOrder]);

  // **Infinite Scroll**
  const loadMorePosts = () => {
    if (filteredPosts?.length > page * postsPerPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const hasMorePosts = filteredPosts?.length > page * postsPerPage;

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${isHomePage ? 'mt-[30px]' : 'mt-[120px]'}`}
    >
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold  p-5 text-[#2d335d] relative transition-all ease-in-out">
        Recent Activities
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <h1 className="text-center text-lg small-range:text-[20px] md:text-2xl font-bold px-2">
        Highlights of Our Latest Efforts and Community Engagement
      </h1>
      <h1 className="text-center text-md small-range:text-lg md:text-xl mb-4 p-3 text-gray-600">
        Discover the most recent projects, events, and initiatives we&apos;ve
        undertaken to make a difference in our communities.
      </h1>

      {status === 'loading' && <p>Loading Activities...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      {/* Filter and Sort Controls */}

      <div className="flex flex-wrap gap-4 mb-5 items-center">
        {/* Year Filter (Scrollable, Navy Blue) */}
        <select
          className="border-2 border-none  border-[rgb(30,58,138)] bg-[rgb(221,231,253)] text-[rgb(23,37,84)] 
             font-bold md:px-4 px-2  py-2 rounded-md shadow-md cursor-pointer 
             transition-all duration-300 hover:bg-[rgb(200,219,252)] hover:border-[rgb(23,37,84)] 
             focus:ring-2 focus:ring-[rgb(125,168,252)] focus:outline-none 
             max-h-[300px] overflow-y-auto scrollbar-none "
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" className="font-bold">
            Filter by Year
          </option>
          {availableYears.map((year) => (
            <option
              key={year}
              value={year}
              className="max-h-[200px] overflow-y-auto font-bold "
            >
              {year}
            </option>
          ))}
        </select>

        {/* Month Filter (Scrollable, Forest Green) */}
        <select
          className="border-2 border-none border-[rgb(22,101,52)] bg-[rgb(221,242,228)] text-[rgb(16,63,32)] 
             font-bold md:px-4  px-2 py-2 rounded-md shadow-md cursor-pointer 
             transition-all duration-300 hover:bg-[rgb(195,230,209)] hover:border-[rgb(16,63,32)] 
             focus:ring-2 focus:ring-[rgb(125,200,160)] focus:outline-none 
             max-h-[300px] overflow-y-auto scrollbar-none "
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="" className="font-bold">
            Filter by Month
          </option>
          {availableMonths.map((month) => (
            <option
              key={month}
              value={month}
              className="max-h-[200px] overflow-y-auto font-bold "
            >
              {month}
            </option>
          ))}
        </select>

        {/* Sort Button */}
        {/* {displayedPosts.length >= 2 && (
    <button
      onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
      className="bg-logoBlue text-white font-semibold py-2 px-5 rounded-lg shadow-md 
                 hover:bg-logoYellow hover:text-logoBlue transition-all duration-300 
                 focus:ring-2 focus:ring-logoYellow focus:ring-offset-2"
    >
      Sort by Date: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
    </button>
  )} */}
      </div>
      {noPostsMessage && (
        <p className="text-center text-lg font-semibold text-gray-700 mt-4">
          {noPostsMessage}
        </p>
      )}
      <InfiniteScroll
        dataLength={displayedPosts?.length}
        next={loadMorePosts}
        hasMore={hasMorePosts}
        loader={
          <img
            src={loader}
            alt="Loading..."
            className="w-[20px] h-[20px] align-center"
          />
        }
        scrollableTarget="scrollableDiv"
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse={true}
      >
        <div className="flex flex-col items-center  lg:flex-row lg:items-stretch  lg:justify-center lg:flex-wrap gap-[30px] w-full  lg:gap-[50px] p-5">
          {displayedPosts?.map((activity) => (
            <div
              key={activity._id}
              className="flex flex-col  items-start md:p-[15px] w-[100%] small-range:w-[90%] md:w-[55%] lg:w-[350px] bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
            >
              <img
                src={activity?.images && activity?.images?.length > 0 ? activity.images[0] : 'https://via.placeholder.com/300'}
                alt={activity.title}
                className="w-full h-full md:h-[300px] rounded-lg object-cover"
              />
              <div className="px-[10px] pt-[10px]">
                <span className="text-[13px] ">
                  {formatDate(activity.date)}
                </span>
                <h1 className="font-bold text-xl line-clamp-1">
                  {activity.title}
                </h1>
                <p className="md:text-lg line-clamp-4">
                  {activity.description}
                </p>
                <Link to={`/recent-activities/${activity._id}`}>
                  {' '}
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

      {isHomePage && posts?.length > 3 && (
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
