import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEvents } from '../reducers/upcomingEventsSlice';

import EventModal from '../components/UpcomingEvents/EventModal';
import EventList from '../components/UpcomingEvents/EventList';

import useEventForm from '../hooks/useEventForm';

const UpcomingEvents = () => {
  const dispatch = useDispatch();

  const { events, status } = useSelector((state) => state.events);

  const {
    formData,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isUpdateMode,
    setIsUpdateMode,
    handleInputChange,
    handleFileChange,
    handleRemoveImage,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    openUpdateModal,
    resetForm,
  } = useEventForm();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [dispatch, status]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-[23px] small-range:text-2xl small-max:text-3xl md:text-4xl font-semibold">
          Upcoming Events
        </h1>

        <button
          className="   bg-[rgb(39,39,79)]
    text-white
    px-4 py-2
    small-max:px-5 small-max:py-2
    text-[14px] small-max:text-[16px]
    font-semibold
    rounded-full
    shadow-md
    transition-all duration-300 ease-out
    hover:bg-[rgb(49,49,95)]
    hover:shadow-[0_8px_25px_rgba(39,39,79,0.35)]
    active:scale-95
  "
          onClick={() => {
            resetForm();
            setIsUpdateMode(false);
            setIsModalOpen(true);
          }}
        >
          Add Event
        </button>
      </div>

      <EventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isUpdateMode={isUpdateMode}
        formData={formData}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        handleSubmit={isUpdateMode ? handleUpdatePost : handleAddPost}
      />

      <EventList
        events={events}
        openUpdateModal={openUpdateModal}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default UpcomingEvents;
