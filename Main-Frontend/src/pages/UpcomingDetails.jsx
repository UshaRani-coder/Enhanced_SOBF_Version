/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationPin, MdAccessTimeFilled } from 'react-icons/md';
import DOMPurify from 'dompurify';
import ShareButton from '@/Components/common_components/ShareButton';
import { getSpecificEvent } from '@/Reducers/upcomingeventSlice';
// import hardcodedEvents from '@/defaultData/upcoming-events.json';

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, status } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSpecificEvent(id));
    }
  }, [dispatch, id]);

  // const event = useMemo(
  //   () => post || hardcodedEvents.find((item) => String(item._id) === String(id)),
  //   [post, id]
  // );

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center w-full mt-[150px] p-4">
        <p className="text-lg">Loading event details...</p>
      </div>
    );
  }

  if (!post) {
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

  const statusStyles = getStatusStyles(post.status);

  const handleBack = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center w-[100%] md:w-[90%] p-[12px] mx-auto mt-[100px] lg:mt-[130px]">
      <h1 className="text-xl md:text-3xl font-bold text-center my-4 md:mb-[30px]">
        {post.title}
      </h1>

      <div className="flex flex-col items-center w-full">
        {/* Image Gallery */}
        <img src={post?.image} className="w-full sm:w-[48%] lg:w-[100%] h-[80vh] overflow-hidden" alt="" />
        {/* Event Details */}
        <div className="w-full flex flex-col justify-start pt-4">
          <div className="flex items-center gap-4 mb-4">
            <div className={`px-3 py-1 rounded-full ${statusStyles.bgColor} ${statusStyles.textColor}`}>
              {statusStyles.icon} {statusStyles.label}
            </div>
            <ShareButton
              title={`Check out this event: ${post.title}`}
              url={`${window.location.origin}/events/${id}`}
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <MdAccessTimeFilled className="text-[#1890CE] mr-2" />
              <span>
                {formatDate(post.date)} at {formatTime(post.time)}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <MdLocationPin className="text-[#E82327] mr-2" />
              <span>{post.location}</span>
            </div>
          </div>

          <div
            className="md:text-lg text-gray-700 mb-6"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.description).replace(
                /<a /g,
                '<a style="color: #4a90e2; " '
              ),
            }}
          />

          {(post.status === 'upcoming' || post.status === 'happening') && (
            <button
              className="px-6 py-3 bg-[#2d335d] w-40 m-auto text-white font-semibold rounded-lg hover:bg-[#edb25a] transition-all"
              onClick={() => window.open(post.registrationLink || '#', '_blank')}
            >
              Register Now
            </button>
          )}

          <div className="flex mt-6">
            <button
              className="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              onClick={handleBack}
            >
              Back to Events
            </button>
          </div>

          {/* Donation CTA */}
          <div className="mt-6 w-full flex flex-col items-center bg-gray-100 p-4 md:p-6 xl:p-10 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-indigo-700">
              Support Our Events!
            </h2>
            <p className="text-center text-gray-700 mb-4 lg:text-[18px]">
              Your contributions help us organize more events that benefit the community.
              Every donation makes a difference in bringing people together.
            </p>
            <Link
              to="/donate-us"
              className="px-6 py-3 bg-logoYellow text-white rounded-lg shadow-lg hover:bg-logo-blue transition-all text-lg font-semibold"
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