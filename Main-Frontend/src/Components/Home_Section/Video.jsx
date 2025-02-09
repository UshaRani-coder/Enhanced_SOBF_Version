

import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getfeaturedVideo } from '../../Reducers/featuredVideoSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import loader from '../../assets/loader.webp';

const Video = () => {
  const dispatch = useDispatch();
  const { featuredVideo, status } = useSelector((state) => state.featuredVideo);
  const location = useLocation();
  const navigate = useNavigate();

  const [videosToShow, setVideosToShow] = useState(3);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getfeaturedVideo());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (location.pathname === '/videos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleShowMore = () => {
    navigate('/videos');
  };

  // Memoized video list with correct filtering
  const videosToDisplay = useMemo(() => {
    if (!featuredVideo || featuredVideo.length === 0) return [];

    return location.pathname === '/videos'
      ? featuredVideo // Show all videos on the /videos page
      : featuredVideo.slice(0, 3); // Show only 3 videos on the homepage
  }, [location.pathname, featuredVideo]);

  // Infinite Scroll - Load more videos
  const loadMoreVideos = () => {
    if (location.pathname === '/videos') {
      setVideosToShow((prevCount) => prevCount + 3);
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center'>
        <h1
          className={`text-center text-heading3 lg:text-heading2 font-bold pt-8 text-[#2d335d] relative transition-all ease-in-out ${
            location.pathname === '/videos' ? 'mt-[120px]' : ''
          }`}
        >
          Our Featured Videos
        </h1>
        <hr className="mt-1 border-light-lavender border-[1px] w-3/4 md:w-1/2 mb-[20px]" />
        <h1 className="text-center text-lg small-range:text-[20px] md:text-2xl font-bold">
          Discover the powerful stories and moments captured in our latest videos.
        </h1>
        <h1 className="text-center text-md small-range:text-lg md:text-xl mb-4 p-3 text-gray-600">
          Witness the impact of our work through inspiring stories and community-driven moments captured in our latest videos.
        </h1>
      </div>

      {status === 'loading' && <p> Videos loading...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      {/* Video List with InfiniteScroll */}
      <InfiniteScroll
        dataLength={videosToDisplay.length}
        next={loadMoreVideos}
        hasMore={location.pathname === '/videos' && videosToDisplay.length < featuredVideo.length}
        loader={
          status === 'loading' ? (
            <img
              src={loader}
              alt="Loading..."
              className="w-[50px] h-[50px] mt-[30px]"
            />
          ) : null
        }
        scrollThreshold={0.9}
        className="flex flex-col items-center justify-center"
      >
        <div
          className={`flex flex-col items-center justify-center md:flex-row flex-wrap gap-4 w-full mt-6 ${
            location.pathname === '/videos' ? 'mb-[100px]  md:gap-6 md:px-[20px]' : ''
          }`}
        >
          {videosToDisplay.length > 0 ? (
            videosToDisplay.map((video) => {
              // Extract video ID safely
              const videoId = video?.URL?.match(/(?:\?v=)([^&]+)/)?.[1] || '';

              return (
                <div
                  key={video?._id}
                  className="border p-2 small-range:mx-2 md:mx-0 rounded w-full small-range:w-[90%] md:w-[42.5%] lg:w-[32%] hover:shadow-lg transition-shadow duration-300"
                >
                  {videoId ? (
                    <div className="relative group">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Video"
                        className="w-full h-60 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                      ></iframe>
                    </div>
                  ) : (
                    <p className="text-red-500 text-center">Invalid Video URL</p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No videos found</p>
          )}
        </div>
      </InfiniteScroll>

      {/* Show More button for homepage */}
      {location.pathname !== '/videos' && featuredVideo.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue text-white font-bold py-4 px-8 rounded-xl hover:bg-logoYellow transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Video;
