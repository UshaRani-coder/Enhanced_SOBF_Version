import React, { useEffect, useRef, useState } from 'react';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { MdAccessTimeFilled } from 'react-icons/md';
import {
  createEventPost,
  fetchEvents,
  removeEvent,
  updateEventPost,
  updateEventStatus,
} from '../Reducers/upcomingEventsSlice';

const UpcomingEvents = () => {
  ReactQuill.Quill = Quill;
  const quillRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    date: '',
    time: '',
    location: '',
    status: 'upcoming',
  });
  const dispatch = useDispatch();
  const { events, status } = useSelector((state) => state.events);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required.');
      return false;
    }
    if (!formData.date) {
      toast.error('Please pick the date of the event');
      return false;
    }
    if (!formData.image) {
      toast.error('Please add an Image');
      return false;
    }
    if (!formData.location) {
      toast.error('Please add the location of the Event');
      return false;
    }
    if (!formData.time) {
      toast.error('Please add the time of the Event');
      return false;
    }
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (formData?.image && !validImageTypes.includes(formData?.image.type)) {
      toast.error('Only valid image files (JPEG, PNG, JPG) are allowed.');
      return false;
    }
    return true;
  };

  const handleAddPost = async () => {
    if (!validateForm()) return;
    const newPost = new FormData();
    newPost.append('image', formData.image);
    newPost.append('title', formData.title);
    newPost.append('description', formData.description);
    newPost.append('location', formData.location);
    newPost.append('date', formData.date);
    newPost.append('time', formData.time);
    newPost.append('status', formData.status);
    dispatch(createEventPost(newPost))
      .unwrap()
      .then(() => {
        toast.success('Event Post added successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(fetchEvents());
      })
      .catch((error) => {
        toast.error(error || 'Failed to add Event Post.');
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdatePost = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required it can't be empty.");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required.');
      return false;
    }
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (formData?.image && !validImageTypes.includes(formData?.image.type)) {
      toast.error('Only valid image files (JPEG, PNG, JPG) are allowed.');
      return;
    }
    const updatedPost = new FormData();
    updatedPost.append('title', formData.title);
    updatedPost.append('description', formData.description);
    updatedPost.append('location', formData.location);
    updatedPost.append('date', formData.date);
    updatedPost.append('time', formData.time);
    updatedPost.append('status', formData.status);
    if (formData.image) updatedPost.append('image', formData.image);

    setIsLoading(true);
    dispatch(updateEventPost({ id: currentPost._id, updatedData: updatedPost }))
      .unwrap()
      .then(() => {
        toast.success('Event updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(fetchEvents());
      })
      .catch((error) => {
        console.error('Update Error:', error);
        toast.error(error?.message || 'Failed to update our Event Post');
      })
      .finally(() => setIsLoading(false));
  };

  const handleStatusChange = (eventId, newStatus) => {
    dispatch(updateEventStatus({ id: eventId, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success(`Event marked as ${newStatus}`);
        dispatch(fetchEvents());
      })
      .catch((error) => {
        toast.error(error || 'Failed to update event status');
      });
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Event? This action cannot be undone.',
    );
    if (confirmDelete) {
      setIsLoading(true);
      dispatch(removeEvent(id));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, value } = e;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      date: '',
      time: '',
      location: '',
      status: 'upcoming',
    });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      title: post?.title || '',
      description: post?.description || '',
      image: null,
      date: post?.date || null,
      time: post?.time || null,
      location: post?.location || '',
      status: post?.status || 'upcoming',
    });
  };

  function formatDateAndTime(dateString, timeString) {
    const [month, day, year] = dateString.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const [hours, minutes] = timeString.split(':').map(Number);
    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;
    const ampm = hours < 12 ? 'AM' : 'PM';
    const formattedTime = `${String(formattedHours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'happening':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto z-[0]">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-[23px] small-range:text-2xl small-max:text-3xl md:text-4xl font-semibold">
          Upcoming Events
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Event
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ml-20">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Event' : 'Add New Event'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData?.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter the title of the Event"
                />
              </div>
              <div className="mb-4">
                <style>
                  {`.ql-container {padding: 8px; min-height: 100px;}
                  .ql-editor {font-size: 1rem; font-weight: normal; line-height: 1.5; letter-spacing:0.5px; padding: 10px;}
                  .ql-toolbar {border-radius: 8px 8px 0 0; background-color: #f9fafb;}
                  .ql-editor.ql-blank::before {font-style: normal !important;}`}
                </style>
                <label className="block font-semibold mb-2">Description</label>
                <ReactQuill
                  value={formData?.description || ''}
                  ref={quillRef}
                  onChange={(value) =>
                    handleInputChange({ name: 'description', value })
                  }
                  className="w-full bg-white"
                  placeholder="Enter the description of the Event"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData?.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData?.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData?.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded "
                  placeholder="Enter event location"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="happening">Happening</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                {formData?.image && (
                  <div className="relative w-24 h-24 mb-4">
                    <img
                      src={
                        formData?.image instanceof File
                          ? URL?.createObjectURL(formData?.image)
                          : formData?.image
                      }
                      alt="Image Preview"
                      className="w-24 h-24 object-cover rounded-md "
                    />
                    <svg
                      className="absolute top-0 right-0 cursor-pointer "
                      onClick={() => handleRemoveImage()}
                      width={16}
                      height={16}
                      viewBox="0 0 122.88 122.88"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#ff4141"
                        d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                  onClick={isUpdateMode ? handleUpdatePost : handleAddPost}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      ></svg>
                      Processing...
                    </span>
                  ) : isUpdateMode ? (
                    'Update'
                  ) : (
                    'Add'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 px-4">
        {events && events?.length > 0 ? (
          events?.map((post) => {
            const formattedDateTime =
              post && post?.date && post?.time
                ? formatDateAndTime(
                    new Date(post.date).toLocaleDateString('en-US'),
                    post?.time,
                  )
                : 'N/A';
            return (
              <div
                key={post._id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col z-0 bg-white"
              >
                {/* Image Section */}
                <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 relative">
                  {post?.image ? (
                    <img
                      src={post?.image}
                      alt="Event Image"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://placehold.co/800x400?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MdAccessTimeFilled className="mr-1 text-[#1890CE]" />
                      <span>{formattedDateTime}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-4 h-4 mr-1"
                        fill="#D90210"
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                      <span>{post?.location || 'N/A'}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {post?.title}
                  </h3>

                  <div
                    className="text-gray-700 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post?.description).replace(
                        /<a /g,
                        '<a style="color: #4a90e2;" ',
                      ),
                    }}
                  />

                  {/* Action Buttons */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openUpdateModal(post);
                      }}
                    >
                      <MdEdit className="text-lg" />
                      <span className="hidden xs:inline">Edit</span>
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(post.id || post._id);
                      }}
                    >
                      <MdDelete className="text-lg" />
                      <span className="hidden xs:inline">Delete</span>
                    </button>

                    {/* Status Change Buttons - only show relevant options */}
                    {post.status !== 'upcoming' && (
                      <button
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors"
                        onClick={() => handleStatusChange(post._id, 'upcoming')}
                      >
                        <span className="hidden sm:inline">Mark as </span>
                        Upcoming
                      </button>
                    )}
                    {post.status !== 'happening' && (
                      <button
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-100 transition-colors"
                        onClick={() =>
                          handleStatusChange(post._id, 'happening')
                        }
                      >
                        <span className="hidden sm:inline">Mark as </span>
                        Happening
                      </button>
                    )}
                    {post.status !== 'completed' && (
                      <button
                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-100 transition-colors"
                        onClick={() =>
                          handleStatusChange(post._id, 'completed')
                        }
                      >
                        <span className="hidden sm:inline">Mark as </span>
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No events found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
