import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBulletine } from '../../reducers/bulletinSlice';
import hardcodedBulletins from '../../defaultData/newsbulletine.json';
import PageHeader from '../common_components/PageHeader.jsx';
import FilterBar from '../common_components/FilterBar.jsx';
import PostList from '../common_components/PostList.jsx';
import useFilteredPosts from '@/hooks/useFilteredPosts.js';

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
  const sortOrder = 'desc';

  // Fetch posts when the component loads
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);


  const isHomePage = location.pathname === '/';

  // Managing pagination state
  const [page, setPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page

  const { filteredPosts, availableYears, availableFilteredMonths } =
    useFilteredPosts(finalBulletines, selectedYear, selectedMonth);
  const noPostsMessage = useMemo(() => {
    if (finalBulletines.length === 0) return 'No news found. Check back later!';

    if (filteredPosts.length === 0)
      return 'No news match your selected filters.';

    return null;
  }, [filteredPosts, finalBulletines.length]);

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
      <PageHeader
        title="Press Release"
        subtitle="Announcing Our Latest Initiatives and Achievements Nationwide"
        description="Stay informed about our recent collaborations, and the
        impact of our efforts across the country."
      />

      {/* Display Loading or Error Messages */}
      {status === 'loading' && <p>Loading posts...</p>}

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
        detailRoute="/press-release"
        title={title}
        baseURL={baseURL}
        isHomePage={isHomePage}
      />
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
