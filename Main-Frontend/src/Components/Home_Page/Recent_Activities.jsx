import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts } from '../../reducers/postSlice';
import hardcodedPosts from '../../defaultData/recent-activities.json';
import PageHeader from '../common_components/PageHeader.jsx';
import FilterBar from '../common_components/FilterBar.jsx';
import PostList from '../common_components/PostList.jsx';
import useFilteredPosts from '@/hooks/useFilteredPosts.js';

const Recent_Activities = React.memo(() => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, status, error } = useSelector((state) => state.posts);

  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const sortOrder = 'desc'; // 'desc' for newest first, 'asc' for oldest first
  const [selectedYear, setSelectedYear] = useState(''); // Filter by year
  const [selectedMonth, setSelectedMonth] = useState(''); // Filter by month

  // scroll restoration
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('recent-activities-scroll');

    if (savedScroll !== null) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: Number(savedScroll),
          behavior: 'auto',
        });

        sessionStorage.removeItem('recent-activities-scroll');
      });
    }
  }, []);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [selectedYear, selectedMonth]);
  const isHomePage = useMemo(
    () => location.pathname === '/',
    [location.pathname],
  );

  // **Filtering logic**

  const finalPosts = useMemo(() => {
    if (posts && posts.length > 0) return posts;
    return hardcodedPosts;
  }, [posts]);
  

  const { filteredPosts, availableYears, availableFilteredMonths } =
    useFilteredPosts(finalPosts, selectedYear, selectedMonth);
  const noPostsMessage = useMemo(() => {
    if (finalPosts.length === 0)
      return 'No activities found. Check back later!';

    if (filteredPosts.length === 0)
      return 'No activities match your selected filters.';

    return null;
  }, [filteredPosts, finalPosts.length]);
  const displayedPosts = useMemo(() => {
    if (!filteredPosts.length) return [];

    const sortedPosts = [...filteredPosts].sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date),
    );

    return isHomePage
      ? sortedPosts.slice(0, 3)
      : sortedPosts.slice(0, page * postsPerPage);
  }, [filteredPosts, page, isHomePage, sortOrder]);
  // **Infinite Scroll**
  const loadMorePosts = () => {
    if (filteredPosts?.length > page * postsPerPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const hasMorePosts = displayedPosts.length < filteredPosts.length;
  const handleSeeMore = () => {
    navigate('/recent-activities');
  };

  const title = 'Support Braj Seva – Be one in a million';
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${
        isHomePage ? 'mt-[30px]' : 'mt-[120px]'
      }`}
    >
      <PageHeader
        title=" Recent Activities"
        subtitle=" Highlights of Our Latest Efforts and Community Engagement"
        description="Discover the most recent projects, events, and initiatives we've
        undertaken to make a difference in our communities."
      />

      {status === 'loading' && <p>Loading Activities...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      {/* Filter and Sort Controls */}

      <div className="flex  gap-2 small-range:gap-4 mb-5 items-center">
        <FilterBar
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          years={availableYears}
          months={availableFilteredMonths}
        />
      </div>
      {noPostsMessage && (
        <p className="text-center text-lg font-semibold text-gray-700 mt-4">
          {noPostsMessage}
        </p>
      )}

      <PostList
        posts={displayedPosts}
        hasMore={hasMorePosts}
        loadMore={loadMorePosts}
        detailRoute="/recent-activities"
        title={title}
        baseURL={baseURL}
        isHomePage={isHomePage}
      />
      {isHomePage && finalPosts?.length > 3 && (
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

export default Recent_Activities;
