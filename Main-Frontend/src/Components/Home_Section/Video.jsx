// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getfeaturedVideo } from "../../Reducers/featuredVideoSlice";
// import InfiniteScroll from "react-infinite-scroll-component";
// import loader from '../../assets/loader.webp'

// const Video = () => {
//   const dispatch = useDispatch();
//   const { featuredVideo, status } = useSelector((state) => state.featuredVideo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [videosToShow, setVideosToShow] = useState(3);

// 	// Fetch videos on component load
// 	useEffect(() => {
// 		if (status === "idle") {
// 			dispatch(getfeaturedVideo());
// 		}
// 	}, [status, dispatch]);

// 	return (
// 		<div className="container mx-auto">
// 			<h1 className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative transition-all ease-in-out">
// 				Our Featured Videos
// 				<hr className="mt-1 border-light-lavender border-[1px]" />
// 			</h1>
// 			{/* Video List */}
// 			<div className="mt-6 flex flex-col items-center justify-center md:flex-row flex-wrap  gap-6 justify-center">
// 				{featuredVideo?.length > 0 ? (
// 					featuredVideo.map((video) => {
// 						// Safely extract video ID
// 						const videoId = video?.URL?.match(/(?:\?v=)([^&]+)/)?.[1] || "";

// 						return (
// 							<div
// 								key={video?._id}
// 								className="border p-2 rounded w-full small-range:w-[80%] md:w-[35%]  hover:shadow-lg transition-shadow duration-300 flex-wrap">
// 								{videoId ? (
// 									<iframe
// 										src={`https://www.youtube.com/embed/${videoId}`}
// 										frameBorder="0"
// 										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 										allowFullScreen
// 										title="YouTube Video"
// 										className="w-full h-60 object-cover rounded"></iframe>
// 								) : (
// 									<p className="text-red-500 text-center">Invalid Video URL</p>
// 								)}
// 							</div>
// 						);
// 					})
// 				) : (
// 					<p>No videos found</p>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Video;

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
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  const handleShowMore = () => {
    navigate('/videos');
  };

  // Memoized list of videos to display based on the path
  const videosToDisplay = useMemo(
    () =>
      location.pathname === '/videos'
        ? featuredVideo
        : featuredVideo.slice(0, videosToShow),
    [location.pathname, featuredVideo, videosToShow],
  );

  const loadMoreVideos = () => {
    setVideosToShow((prevCount) => prevCount + 3);
  };

  return (
    <div className="">
      <div className='flex flex-col items-center'>
      <h1
        className={`text-center text-heading3 lg:text-heading2 font-bold pt-8  text-[#2d335d] relative transition-all ease-in-out ${
          location.pathname === '/videos' ? 'mt-[120px] ' : ''
        }`}
      >
        Our Featured Videos
        
      </h1>
      <hr className="mt-1 border-light-lavender border-[1px] w-1/2" />
      <h1 className="text-center text-2xl font-bold pt-5">
      Discover the powerful stories and moments captured in our latest videos.
      </h1>
      <h1 className="text-center text-xl mb-4 p-3 text-gray-600">
      Witness the impact of our work through inspiring stories and community-driven moments captured in our latest videos.
      </h1>
      </div>

      {status === 'loading' && <p> Videos loading...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      
      {/* Video List with InfiniteScroll */}
      <InfiniteScroll
        dataLength={videosToDisplay.length}
        next={loadMoreVideos}
        hasMore={videosToDisplay.length < featuredVideo.length}
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
          className={`
           flex flex-col items-center justify-center md:flex-row flex-wrap gap-4 justify-center w-full mt-6`}
        >
          {videosToDisplay.length > 0 ? (
            videosToDisplay.map((video) => {
              // Safely extract video ID
              const videoId = video?.URL?.match(/(?:\?v=)([^&]+)/)?.[1] || '';

              return (
                <div
                  key={video?._id}
                  className="border p-2 rounded w-full small-range:w-[90%] md:w-[42.5%] lg:w-[32%] hover:shadow-lg transition-shadow duration-300 flex-wrap"
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
                    <p className="text-red-500 text-center">
                      Invalid Video URL
                    </p>
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
