/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationPin, MdAccessTimeFilled } from 'react-icons/md';
import DOMPurify from 'dompurify';
import ShareButton from '@/Components/common_components/ShareButton';
import {
  getSpecificEvent,
  clearEventPost,
} from '@/Reducers/upcomingeventSlice';
import fallbackEvents from '@/defaultData/upcoming-events.json';

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { post, postStatus } = useSelector((state) => state.events);

  // fallback event (only used if API fails)
  const fallbackEvent = useMemo(() => {
    return fallbackEvents.find((item) => String(item._id) === String(id));
  }, [id]);

  // clear old event + fetch new one when ID changes
  useEffect(() => {
    dispatch(clearEventPost());
    dispatch(getSpecificEvent(id));
  }, [dispatch, id]);

  // FINAL SOURCE OF TRUTH
  const event = postStatus === 'succeeded' && post ? post : fallbackEvent;

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

  // ---------------- HELPERS ----------------

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };
  const getEventStatus = (eventDate, startTime, endTime) => {
    if (!eventDate || !startTime || !endTime) {
      return event?.status || 'upcoming';
    }

    const now = new Date();

    const date = new Date(eventDate);

    const start = new Date(date);
    const [startHour, startMinute] = startTime.split(':');

    start.setHours(Number(startHour), Number(startMinute), 0, 0);

    const end = new Date(date);
    const [endHour, endMinute] = endTime.split(':');

    end.setHours(Number(endHour), Number(endMinute), 0, 0);

    if (now < start) return 'upcoming';

    if (now >= start && now <= end) {
      return 'happening';
    }

    return 'completed';
  };
  const getStatusStyles = (status) => {
    switch (status) {
      case 'happening':
        return {
          label: 'Happening Now',
          bgColor: 'bg-gradient-to-r from-purple-400 to-purple-600',
          icon: '🟢',
          textColor: 'text-white',
          animate: 'animate-pulse',
        };
      case 'completed':
        return {
          label: 'Completed',
          bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
          icon: '✅',
          textColor: 'text-white',
          animate: '',
        };
      case 'upcoming':
      default:
        return {
          label: 'Upcoming',
          bgColor: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
          icon: '⏳',
          textColor: 'text-white',
          animate: '',
        };
    }
  };

  const currentStatus =
    event?.startTime && event?.endTime
      ? getEventStatus(event.date, event.startTime, event.endTime)
      : event?.status;

  const statusStyles = getStatusStyles(currentStatus);
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;

  // ---------------- UI ----------------

  return (
    <div className="flex flex-col items-center w-[100%] md:w-[90%] p-[12px] mx-auto mt-[100px] lg:mt-[130px]">
      {/* TITLE */}
      <h1 className="text-xl md:text-3xl font-bold text-center my-4 md:mb-[30px]">
        {event?.title}
      </h1>

      <div className="flex flex-col items-center w-full">
        {/* IMAGE */}
        <div className="w-full h-[70vh] overflow-hidden mb-4">
          <img
            src={event?.image}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            alt={event?.title}
          />
        </div>

        {/* DETAILS */}
        <div className="w-full flex flex-col justify-start pt-4">
          <div className="flex items-center gap-5 xl:gap-7 mb-4">
            <div
              className={`px-3 py-2 rounded-xl text-xs md:text-sm  ${statusStyles.bgColor} ${statusStyles.textColor} ${statusStyles.animate}`}
            >
              {statusStyles.icon} {statusStyles.label}
            </div>

            <ShareButton
              title={`Check out this event: ${event?.title}`}
              url={`${baseURL}/events/${id}`}
              className={`px-3 border-0  inline-block font-bold rounded-xl shadow-md  ${statusStyles.bgColor} ${statusStyles.textColor}`}
            />
          </div>

          {/* TIME + LOCATION */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <MdAccessTimeFilled className="text-[#1890CE] mr-1 md:text-xl" />
              <span>
                {formatDate(event?.date)} • {formatTime(event?.startTime)} -{' '}
                {formatTime(event?.endTime)}
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <MdLocationPin className="text-[#E82327] mr-1 md:text-xl" />
              <span>{event?.location}</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div
            className="md:text-lg text-gray-700 mb-6"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event?.description || '').replace(
                /<a /g,
                '<a style="color:#4a90e2" ',
              ),
            }}
          />

          {/* REGISTER */}
          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap justify-start gap-4 mt-4">
            {(currentStatus === 'upcoming' ||
              currentStatus === 'happening') && (
              <button
                className="px-5 py-2 bg-[#2d335d] text-white font-medium rounded-lg hover:bg-[#edb25a] transition-all"
                onClick={() =>
                  window.open(event?.registrationLink || '#', '_blank')
                }
              >
                Register Now
              </button>
            )}

            <button
              className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all"
              onClick={() => navigate('/')}
            >
              Back to Events
            </button>
          </div>

          {/* DONATION */}
          <div className="mt-6 w-full flex flex-col items-center bg-gray-100 p-4 md:p-6 xl:p-10 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-indigo-700">
              Support Our Events!
            </h2>
            <p className="text-center text-gray-700 mb-4 lg:text-[18px]">
              Your contributions help us organize more events that benefit the
              community. Every donation makes a difference in bringing people
              together.
            </p>

            <Link
              to="/donate-us"
              className="px-5 py-2 bg-logoYellow text-white rounded-lg shadow-lg hover:bg-logo-blue transition-all  font-medium"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
