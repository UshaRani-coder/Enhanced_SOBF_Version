import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getfeaturedVideo } from "../../Reducers/featuredVideoSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import loader from '../../assets/loader.webp'

const Video = () => {
  const dispatch = useDispatch();
  const { featuredVideo, status } = useSelector((state) => state.featuredVideo);
  const location = useLocation();
  const navigate = useNavigate();

  const [videosToShow, setVideosToShow] = useState(3);

	// Fetch videos on component load
	useEffect(() => {
		if (status === "idle") {
			dispatch(getfeaturedVideo());
		}
	}, [status, dispatch]);

	return (
		<div className="container mx-auto">
			<h1 className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative transition-all ease-in-out">
				Our Featured Videos
				<hr className="mt-1 border-light-lavender border-[1px]" />
			</h1>
			{/* Video List */}
			<div className="mt-6 flex flex-col items-center justify-center md:flex-row flex-wrap  gap-6 justify-center">
				{featuredVideo?.length > 0 ? (
					featuredVideo.map((video) => {
						// Safely extract video ID
						const videoId = video?.URL?.match(/(?:\?v=)([^&]+)/)?.[1] || "";

						return (
							<div
								key={video?._id}
								className="border p-2 rounded w-full small-range:w-[80%] md:w-[35%]  hover:shadow-lg transition-shadow duration-300 flex-wrap">
								{videoId ? (
									<iframe
										src={`https://www.youtube.com/embed/${videoId}`}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										title="YouTube Video"
										className="w-full h-60 object-cover rounded"></iframe>
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
		</div>
	);
};

export default Video;
