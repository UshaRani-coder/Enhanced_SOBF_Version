import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getfeaturedVideo } from '../../reducers/featuredVideoSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import loader from '../../assets/loader.webp';
import YouTube from 'react-youtube';
import fallbackVideos from '../../defaultData/youtubeVideos.json';

const Video = () => {
  const dispatch = useDispatch();
  const { featuredVideo, status } = useSelector((state) => state.featuredVideo);

  const location = useLocation();
  const navigate = useNavigate();

  const [videosToShow, setVideosToShow] = useState(3);

  // fetch videos
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getfeaturedVideo());
    }
  }, [status, dispatch]);

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

  //  SINGLE SOURCE OF TRUTH
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

  const ytOptions = useMemo(
    () => ({
      width: '100%',
      playerVars: {
        rel: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
      },
    }),
    [],
  );

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

        <h1 className="text-center text-md small-range:text-lg md:text-xl mb-4 p-3 text-gray-600 ">
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
                  {videoId ? (
                    <div className="w-full aspect-video overflow-hidden">
                      <YouTube
                        videoId={videoId}
                        opts={{
                          ...ytOptions,
                          width: '100%',
                          height: '100%',
                        }}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <p className="text-red-500 text-center py-10">
                      Invalid Video URL
                    </p>
                  )}

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
            className="bg-blue text-white  py-2 px-6 rounded-xl hover:bg-logoYellow transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Video;
