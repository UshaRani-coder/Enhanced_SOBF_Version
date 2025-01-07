import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addfeaturedVideo, getfeaturedVideo, removefeaturedVideo, updatefeaturedVideo } from '../Reducers/featuredVideoSlice';
import { toast } from "react-toastify";

const FeaturedVideo = () => {
  const dispatch = useDispatch();
  const { featuredVideo, status } = useSelector((state) => state.featuredVideo);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [URL, setURL] = useState('');

  // Fetch videos on component load
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getfeaturedVideo());
    }
  }, [status, dispatch]);

  // Add video
  const handleAddVideo = () => {
    dispatch(addfeaturedVideo({ URL }))
      .then(() => {
        toast.success('Video added successfully!');
        setIsModalOpen(false);
        setURL('');
      })
      .catch(() => {
        toast.error('Failed to add video!');
      });
  };

  // Update video
  const handleUpdateVideo = () => {
    if (currentVideo) {
      dispatch(updatefeaturedVideo({ id: currentVideo._id, URL }))
        .then(() => {
          toast.success('Video updated successfully!');
          setIsModalOpen(false);
          setURL('');
        })
        .catch(() => {
          toast.error('Failed to update video!');
        });
    }
  };

  // Delete video
  const handleDeleteVideo = (id) => {
    dispatch(removefeaturedVideo(id))
      .then(() => toast.success('Video deleted successfully!'))
      .catch(() => toast.error('Failed to delete video!'));
  };

  const openUpdateModal = (video) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentVideo(video);
    setURL(video.URL);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between px-14 pb-4">
        <h1 className="text-4xl">Featured Videos</h1>
        <button
          className="px-4 py-1 md:px-6 md:py-2 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            setURL('');
          }}
        >
          Add Video
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Video' : 'Add New Video'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="url">
                  Video URL
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={URL}
                  onChange={(e) => setURL(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={isUpdateMode ? handleUpdateVideo : handleAddVideo}
                >
                  {isUpdateMode ? 'Update Video' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video List */}
      <div className="mt-6 flex flex-wrap gap-4">
        {featuredVideo.length > 0 ? (
          featuredVideo.map((video) => (
            <div
              key={video._id}
              className="border p-4 rounded w-64  hover:shadow-lg transition-shadow duration-300 flex-wrap"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.URL?.match(/(?:\?v=)([^&]+)/)[1]}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
                className='w-full h-40 object-cover rounded'
              ></iframe>
              <div className="mt-2 flex gap-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => openUpdateModal(video)}
                >
                  Update
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteVideo(video._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedVideo;
