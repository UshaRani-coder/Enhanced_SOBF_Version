import React from 'react';
import { MdLocationPin, MdAccessTimeFilled } from 'react-icons/md';
import DOMPurify from 'dompurify';
import ShareButton from '@/Components/common_components/ShareButton.jsx';
import {
  getEventStatus,
  getStatusStyles,
  formatDateTime,
  formatTime,
  capitalize,
} from '@/utils/eventUtils';

const EventCard = ({
  event,
  index,
  title,
  baseURL,
  onCardClick,
  onRegister,
  setShowForm,
  isRegistered,
}) => {
  const currentStatus = getEventStatus(
    event.date,
    event.startTime,
    event.endTime,
  );

  const statusStyles = getStatusStyles(currentStatus);

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full md:min-h-[520px]"
      onClick={() => onCardClick(event)}
    >
      <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 pb-0 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span
            className={`px-3 py-2 text-xs md:text-sm mb-3 inline-block font-bold rounded-xl shadow-md ${statusStyles.bgColor} ${statusStyles.textColor} ${statusStyles.animate}`}
          >
            {statusStyles?.icon} {statusStyles?.label}
          </span>

          <div onClick={(e) => e.stopPropagation()}>
            <ShareButton
              title={title}
              url={`${baseURL}/events/${event._id}`}
              className={`px-3 py-[7px] md:py-[9px] border-0 text-xs md:text-sm mb-3 inline-block font-bold rounded-full shadow-md ${statusStyles.bgColor} ${statusStyles.textColor} `}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-2">
            <MdAccessTimeFilled className="text-[#1890CE] flex-shrink-0" />
            <span className="text-gray-600 text-sm">
              <span className="text-gray-600 text-sm">
                {formatDateTime(event.date, event.startTime)} -{' '}
                {formatTime(event.endTime)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MdLocationPin className="text-[#E82327] flex-shrink-0 text-lg" />
            <span className="text-gray-600 text-sm">{event.location}</span>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-[#2d335d] mb-2 line-clamp-1">
          {capitalize(event?.title)}
        </h3>

        <div
          className="text-gray-700 text-sm  line-clamp-3 flex-grow"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(event.description).replace(
              /<a /g,
              '<a class="text-blue-600 hover:underline" ',
            ),
          }}
        />
      </div>

      {/* Register Button - only show for upcoming/happening events */}
      {(currentStatus === 'upcoming' || currentStatus === 'happening') && (
        <div className="p-4 pt-0 mt-auto" onClick={(e) => e.stopPropagation()}>
          <button
            disabled={isRegistered}
            className={`w-full mt-4 px-4 py-2 font-semibold rounded-lg transition-all ${
              isRegistered
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-[#2d335d] text-white hover:bg-[#edb25a]'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isRegistered) {
                onRegister(index);
                setShowForm(true);
              }
            }}
          >
            {isRegistered ? '✓ Registered' : 'Register Now'}
          </button>
        </div>
      )}

      {/* Show different text for completed events */}
      {currentStatus === 'completed' && (
        <div className="p-4 pt-0 mt-auto">
          <div className="w-full mt-4 px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg text-center">
            Event Completed
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(EventCard);
