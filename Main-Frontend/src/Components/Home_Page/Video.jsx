import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getfeaturedVideo } from '../../reducers/featuredVideoSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import loader from '../../assets/loader.webp';
import fallbackVideos from '../../defaultData/youtubeVideos.json';

const LazyYouTube = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoId) {
    return <p className="text-red-500 text-center py-10">Invalid Video URL</p>;
  }

  if (isPlaying) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="YouTube video player"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className="relative w-full h-full group"
      aria-label="Play video on YouTube"
    >
      {/* YouTube thumbnail */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt="YouTube video thumbnail"
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Dark overlay */}
      <span className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

      {/* YouTube Play Button */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="
            flex items-center justify-center
            w-[68px] h-[48px]
            rounded-[14px]
            bg-[#FF0000]
            shadow-lg
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-white fill-white ml-1"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      {/* YouTube label */}
      <span
        className="
          absolute bottom-3 left-3
          flex items-center gap-1.5
          bg-black/75
          text-white
          px-2.5 py-1
          rounded-md
          text-xs font-medium
          opacity-90
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-red-500 fill-red-500"
          aria-hidden="true"
        >
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
        </svg>
        Watch on YouTube
      </span>
    </button>
  );
};
const Video = () => {
  const dispatch = useDispatch();
  const { featuredVideo, status } = useSelector((state) => state.featuredVideo);

  const location = useLocation();
  const navigate = useNavigate();

  const [videosToShow, setVideosToShow] = useState(3);

  // Fetch videos
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getfeaturedVideo());
    }
  }, [status, dispatch]);

  // Scroll to top when visiting /videos
  useEffect(() => {
    if (location.pathname === '/videos') {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, [location.pathname]);

  const handleShowMore = () => {
    sessionStorage.setItem('scroll-section', 'featured-videos');
    sessionStorage.setItem('videos-scroll', window.scrollY);
    navigate('/videos');
  };

  const getVideoId = useCallback((url) => {
    if (!url) return null;

    try {
      return new URL(url).searchParams.get('v');
    } catch {
      return url.match(/(?:youtu\.be\/|v=|\/embed\/)([^&?/]+)/)?.[1] || null;
    }
  }, []);

  // Single source of truth
  const videosData = useMemo(() => {
    const hasApiVideos =
      Array.isArray(featuredVideo) && featuredVideo.length > 0;

    return hasApiVideos ? featuredVideo : fallbackVideos;
  }, [featuredVideo]);

  const videosToDisplay = useMemo(() => {
    return location.pathname === '/videos'
      ? videosData
      : videosData.slice(0, 3);
  }, [videosData, location.pathname]);

  const visibleVideos = useMemo(() => {
    return videosToDisplay.slice(0, videosToShow);
  }, [videosToDisplay, videosToShow]);

  const loadMoreVideos = useCallback(() => {
    if (location.pathname === '/videos') {
      setVideosToShow((prev) => prev + 3);
    }
  }, [location.pathname]);

  const showMoreVisible =
    location.pathname !== '/videos' && videosData.length > 3;

  return (
    <div className="mb-20 mx-2 lg:mx-4">
      <div className="flex flex-col items-center" id="featured-videos">
        <h1
          className={`text-center text-[30px] md:text-heading3 lg:text-heading2 font-bold pt-8 text-[#2d335d] relative transition-all ease-in-out ${
            location.pathname === '/videos' ? 'mt-[120px]' : ''
          }`}
        >
          Our Featured Videos
        </h1>

        <hr className="mt-1 border-light-lavender border-[1px] w-3/4 md:w-1/2 mb-[20px]" />

        <h1 className="text-center text-lg small-range:text-[20px] md:text-2xl font-bold">
          Discover the powerful stories and moments captured in our latest
          videos.
        </h1>

        <h1 className="text-center text-md small-range:text-lg md:text-xl mb-4 p-3 text-gray-600">
          Witness the impact of our work through inspiring stories and
          community-driven moments captured in our latest videos.
        </h1>
      </div>

      <InfiniteScroll
        dataLength={visibleVideos?.length}
        next={loadMoreVideos}
        hasMore={
          location.pathname === '/videos' &&
          visibleVideos?.length < videosToDisplay?.length
        }
        loader={
          status === 'loading' ? (
            <img
              src={loader}
              alt="Loading..."
              className="w-[88px] h-[88px] mt-[30px]"
            />
          ) : null
        }
        scrollThreshold={0.9}
        className="flex flex-col items-center justify-center"
      >
        <div
          className={`flex flex-col items-center justify-center md:flex-row lg:justify-center flex-wrap gap-4 w-full mt-6 ${
            location.pathname === '/videos'
              ? 'mb-[100px] md:gap-6 md:px-[20px]'
              : ''
          }`}
        >
          {visibleVideos?.length > 0 ? (
            visibleVideos.map((video) => {
              const videoId = getVideoId(video?.URL);

              return (
                <div
                  key={video?._id || video?.URL}
                  className="
                    border bg-white rounded-xl overflow-hidden
                    w-[95%] small-range:w-[90%]
                    md:w-[45%] lg:w-[32%]
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:scale-[1.02]
                    group relative
                  "
                >
                  <div className="w-full aspect-video overflow-hidden">
                    <LazyYouTube videoId={videoId} />
                  </div>

                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#2d335d10] to-transparent" />
                </div>
              );
            })
          ) : (
            <p>No videos found</p>
          )}
        </div>
      </InfiniteScroll>

      {showMoreVisible && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue text-white py-2 px-6 rounded-xl hover:bg-logoYellow transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Video;
