import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getfeaturedVideo } from '../../Reducers/featuredVideoSlice';



const Video = () => {
  const dispatch = useDispatch();
  const { featuredVideo, status } = useSelector((state) => state.featuredVideo);

  const [URL, setURL] = useState('');

  // Fetch videos on component load
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getfeaturedVideo());
    }
  }, [status, dispatch]);


  return (
    <div className="container mx-auto">
      <h1 className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
        Our Featured Videos
        <hr className="mt-1 border-light-lavender border-[1px]" />
      </h1>
      {/* Video List */}
      <div className="mt-6 flex flex-wrap gap-6 justify-center">
        {featuredVideo.length > 0 ? (
          featuredVideo.map((video) => (
            <div
              key={video._id}
              className="border p-2 rounded w-[25%]  hover:shadow-lg transition-shadow duration-300 flex-wrap"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.URL?.match(/(?:\?v=)([^&]+)/)[1]}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
                className='w-full h-60 object-cover rounded'
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default Video;
