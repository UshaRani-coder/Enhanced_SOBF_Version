import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getBulletine } from '../../Reducers/bulletinSlice';
import DOMPurify from 'dompurify';
import { availableMonths } from '@/utils/availableMonths';
import hardcodedBulletins from '../../defaultData/newsbulletine.json';
import ShareButton from '../common_components/ShareButton';

const Press_Release = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(''); // Filter by year
  const [selectedMonth, setSelectedMonth] = useState(''); // Filter by month

  // Fetch posts and status from the Redux store
  const { bulletines, status } = useSelector((state) => state.bulletines);
  const finalBulletines = useMemo(() => {
    if (bulletines && bulletines.length > 0) return bulletines;
    return hardcodedBulletins;
  }, [bulletines]);
  // Sorting order state
  const [sortOrder] = useState('desc'); // Default: Newest first
 
  // Fetch posts when the component loads
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);
  useEffect(() => {
    if (location.pathname === '/press-release') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);

  // Check if it's the home page
  const isHomePage = useMemo(
    () => location.pathname === '/',
    [location.pathname],
  );

  // Managing pagination state
  const [page, setPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page

  // **Extract unique years and months**
  const availableYears = useMemo(() => {
    const years = new Set(
      finalBulletines.map((bulletin) => new Date(bulletin.date).getFullYear()),
    );
    return Array.from(years).sort((a, b) => b - a); // Sort descending
  }, [finalBulletines]);
  const availableFilteredMonths = useMemo(() => {
    const sourcePosts =
      status === 'succeeded' && bulletines?.length > 0
        ? bulletines
        : hardcodedBulletins;

    const months = new Set();

    sourcePosts.forEach((post) => {
      const date = new Date(post.date);

      if (!selectedYear || date.getFullYear() === parseInt(selectedYear)) {
        months.add(availableMonths[date.getMonth()]);
      }
    });

    return availableMonths.filter((month) => months.has(month));
  }, [bulletines, status, selectedYear]);
  // **Filtering logic**
  const filteredPosts = useMemo(() => {
    return finalBulletines.filter((bulletin) => {
      const postDate = new Date(bulletin.date);
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
  }, [finalBulletines, selectedYear, selectedMonth]);

  const noPostsMessage = useMemo(() => {
    if (finalBulletines.length === 0) return 'No News found. Check back later!';
    if (filteredPosts.length === 0)
      return 'No news match your selected filters.';
    return null;
  }, [filteredPosts, finalBulletines.length, selectedYear, selectedMonth]);

  const displayedPosts = useMemo(() => {
    if (!filteredPosts || filteredPosts.length === 0) return [];
    const sortedPosts = [...filteredPosts].sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date),
    );
    return isHomePage ? sortedPosts.slice(0, 3) : sortedPosts;
  }, [filteredPosts, isHomePage, sortOrder]);

  // **Infinite Scroll**
  const loadMorePosts = () => {
    if (filteredPosts.length > page * postsPerPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const hasMorePosts = filteredPosts.length > page * postsPerPage;

  const handleSeeMore = () => {
    navigate('/press-release');
  };
  const title = 'Support Braj Seva – Be one in a million';
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;
  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${isHomePage ? 'mt-[30px]' : 'mt-[120px]'}`}
    >
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold p-5 text-[#2d335d] relative transition-all ease-in-out">
        Press Release
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <h1 className="text-center text-lg small-range:text-[20px] md:text-2xl font-bold px-2">
        Announcing Our Latest Initiatives and Achievements Nationwide
      </h1>
      <h1 className="text-center text-md small-range:text-lg md:text-xl mb-4 p-3 text-gray-600">
        Stay informed about our recent collaborations, upcoming events, and the
        impact of our efforts across the country.
      </h1>

      {/* Display Loading or Error Messages */}
      {status === 'loading' && <p>Loading posts...</p>}

      {/* Filter and Sort Controls */}

      <div className="flex  gap-2 small-range:gap-4 mb-5 items-center">
        <select
          className="border-2 border-none  border-[rgb(30,58,138)] bg-[rgb(221,231,253)] text-[rgb(23,37,84)] 
            font-bold md:px-4 px-2  py-2 rounded-md shadow-md cursor-pointer 
            transition-all duration-300 hover:bg-[rgb(200,219,252)] hover:border-[rgb(23,37,84)] 
            focus:ring-2 focus:ring-[rgb(125,168,252)] focus:outline-none 
            max-h-[200px] overflow-y-auto scrollbar-none "
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" className="font-bold">
            Filter by Year
          </option>
          {availableYears?.map((year) => (
            <option
              key={year}
              value={year}
              className="max-h-[200px] scrollbar-none overflow-y-auto font-bold "
            >
              {year}
            </option>
          ))}
        </select>

        <select
          className="border-2 border-none border-[rgb(22,101,52)] bg-[rgb(221,242,228)] text-[rgb(16,63,32)] 
            font-bold md:px-4  px-2 py-2 rounded-md shadow-md cursor-pointer 
            transition-all duration-300 hover:bg-[rgb(195,230,209)] hover:border-[rgb(16,63,32)] 
            focus:ring-2 focus:ring-[rgb(125,200,160)] focus:outline-none 
            max-h-[200px] overflow-y-auto scrollbar-none "
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="" className="font-bold">
            Filter by Month
          </option>
          {availableFilteredMonths?.map((month) => (
            <option
              key={month}
              value={month}
              className="max-h-[200px] overflow-y-auto scrollbar-none font-bold "
            >
              {month}
            </option>
          ))}
        </select>
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
        loader={<h4 className="text-center w-[100%]">Loading more...</h4>}
        scrollableTarget="scrollableDiv"
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse={true}
      >
        <div className="flex flex-col items-center  lg:flex-row lg:items-stretch  lg:justify-center lg:flex-wrap gap-[30px] w-full  lg:gap-[50px] p-5">
          {displayedPosts?.map((news) => (
            <div
              key={news._id}
              className="flex flex-col  items-start md:p-[15px] w-[100%] small-range:w-[90%] md:w-[55%] lg:w-[350px] bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg  md:min-h-[450px] lg:min-h-[500px]"
            >
              <img
                src={
                  news?.images?.length > 0
                    ? news.images[0]?.url || news.images[0]
                    : 'https://via.placeholder.com/600'
                }
                alt={news?.title}
                loading="lazy"
                decoding="async"
                className="w-full h-56 md:h-64 lg:h-72 rounded-lg object-cover"
              />
              <div className="px-[10px]">
                <div className="flex items-center gap-x-[5px] mt-[15px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-[10px]"
                  >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                  <span className="text-[13px]">{formatDate(news?.date)}</span>
                </div>
                <h1 className="font-bold text-xl line-clamp-1">
                  {news?.title}
                </h1>
                <p
                  className="md:text-lg line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(news?.description).replace(
                      /<a /g,
                      '<a style="color: #4a90e2; " ',
                    ),
                  }}
                ></p>
                <div className="flex gap-5">
                  <Link
                    to={`/press-release/${news?._id}`}
                    onClick={() => {
                      sessionStorage.setItem('home-scroll', window.scrollY);
                    }}
                  >
                    {' '}
                    <button
                      aria-label="View Details"
                      className="my-[20px]  text-white  bg-gradient-to-r from-[#2d335d] to-[#44508f] focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105  font-semibold text-[14px] px-[12px] py-[6px] rounded-full transition-all duration-300 ease-in-out"
                      // onClick={() => window.scrollTo(0, 0)}
                    >
                      View Details
                    </button>
                  </Link>

                  <div onClick={(e) => e.stopPropagation()} className="mt-5">
                    <ShareButton
                      title={title}
                      url={`${baseURL}/press-release/${news?._id}`}
                      className="px-3 py-[6px] border-0 text-xs md:text-sm mb-3 inline-block font-bold rounded-full shadow-md bg-gradient-to-r from-[#2d335d] to-[#44508f] text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {isHomePage && finalBulletines?.length > 3 && (
        <div className="text-center mt-5">
          <button
            onClick={handleSeeMore}
            className="bg-blue text-white font-bold py-4 px-8 rounded-xl hover:bg-logoYellow transition-colors duration-300"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
});

export default Press_Release;
