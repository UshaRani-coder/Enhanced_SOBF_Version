/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationPin, MdAccessTimeFilled } from 'react-icons/md';
import DOMPurify from 'dompurify';
import ShareButton from '@/components/common_components/ShareButton';
import {
  getSpecificEvent,
  clearEventPost,
} from '@/reducers/upcomingeventSlice';
import fallbackEvents from '@/defaultData/upcoming-events.json';
import DonateCTA from '@/components/common_components/DonateCTA.jsx';
import formatDate from '@/utils/formatDate.js';
import {
  getStatusStyles,
  getEventStatus,
  formatTime,
} from '@/utils/eventUtils.js';
import EventRegistrationModal from '@/components/Home_Page/Upcoming Events/EventRegistrationModal.jsx';
import useEventRegistration from '@/hooks/useEventRegistration.js';

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { post, postStatus, registeredEventIds } = useSelector(
    (state) => state.events,
  );

  // fallback event (only used if API fails)
  const fallbackEvent = useMemo(() => {
    return fallbackEvents.find((item) => String(item._id) === String(id));
  }, [id]);

  // clear old event + fetch new one when ID changes
  useEffect(() => {
    dispatch(clearEventPost());

    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    if (id && isMongoId) {
      dispatch(getSpecificEvent(id));
    }
  }, [dispatch, id]);

  // FINAL SOURCE OF TRUTH
  const event = postStatus === 'succeeded' && post ? post : fallbackEvent;
  const isRegistered = registeredEventIds.includes(event?._id);

  const {
    showForm,
    setShowForm,
    formData,
    errors,
    isLoading,
    progress,
    handleInputChange,
    handleSubmit,
  } = useEventRegistration(event?._id);

const goBack = () => {
  navigate('/#events');
};
  // ---------------- UI STATES ----------------

  if (postStatus === 'loading' && !event) {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        <p className="text-lg">Loading event details...</p>
      </div>
    );
  }

  if (!event && postStatus !== 'loading') {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        <p className="text-lg text-red-500">Event not found!</p>
        <button
          className="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all mt-4"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const currentStatus =
    event?.startTime && event?.endTime
      ? getEventStatus(event.date, event.startTime, event.endTime)
      : event?.status;

  const statusStyles = getStatusStyles(currentStatus);
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;

  return (
    <div className="flex flex-col items-center w-[100%] md:w-[90%] p-[12px] mx-auto mt-[100px] lg:mt-[130px]">
      {/* TITLE */}
      <h1 className="text-xl md:text-3xl font-bold text-center my-4 md:my-[30px]">
        {event?.title}
      </h1>

      <div className="flex flex-col items-center w-full">
        {/* IMAGE */}

        <div className="w-full aspect-[16/9] overflow-hidden mb-4">
          <img
            src={event?.image}
            alt={event?.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* DETAILS */}
        <div className="w-full flex flex-col justify-start md:pt-4">
          <div className="flex items-center gap-5 xl:gap-7 mb-4">
            <div
              className={`px-3 py-2 rounded-xl text-xs md:text-sm  ${statusStyles.bgColor} ${statusStyles.textColor} ${statusStyles.animate}`}
            >
              {statusStyles.icon} {statusStyles.label}
            </div>

            <ShareButton
              title={`Check out this event: ${event?.title}`}
              url={`${baseURL}/events/${id}`}
              className={`px-3 border-0 inline-block font-bold rounded-xl shadow-md  ${statusStyles.bgColor} ${statusStyles.textColor} transition-all duration-300  hover:scale-105 hover:shadow-lg active:scale-95`}
            />
          </div>

          {/* TIME + LOCATION */}
          <div className="flex flex-wrap gap-2 mb:gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <MdAccessTimeFilled className="text-[#1890CE] mr-1 ml-[1px] md:text-xl" />
              <span>
                {formatDate(event?.date)} • {formatTime(event?.startTime)} -{' '}
                {formatTime(event?.endTime)}
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <MdLocationPin className="text-[#E82327] mr-1 text-lg md:text-xl" />
              <span>{event?.location}</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div
            className="md:text-lg text-gray-700 mb-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event?.description || '').replace(
                /<a /g,
                '<a style="color:#4a90e2" ',
              ),
            }}
          />

         {/* ACTION BUTTONS */}
<div className="flex flex-wrap gap-4 mt-4">
  {(currentStatus === 'upcoming' ||
    currentStatus === 'happening') && (
    <button
      disabled={isRegistered}
      className={`px-5 py-2 font-semibold rounded-lg transition-all ${
        isRegistered
          ? 'bg-green-600 text-white cursor-not-allowed'
          : 'bg-[#2d335d] text-white hover:bg-[#edb25a]'
      }`}
      onClick={() => {
        if (!isRegistered) {
          setShowForm(true);
        }
      }}
    >
      {isRegistered ? '✓ Registered' : 'Register Now'}
    </button>
  )}

  <button
    className="px-5 py-2 bg-logo-blue text-white font-medium rounded-lg hover:bg-logoYellow transition-all"
    onClick={goBack}
  >
    Back to Events
  </button>
</div>

          {/* DONATION */}
          <DonateCTA
            title="Support Our Mission!"
            description="Every donation helps us organize meaningful events, reach more people, and strengthen our community. Join us in making a lasting impact."
          />
        </div>
      </div>
      <EventRegistrationModal
        showForm={showForm}
        event={event}
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        progress={progress}
        onChange={handleInputChange}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EventDetails;
