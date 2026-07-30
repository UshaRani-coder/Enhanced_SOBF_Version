import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

const UserFilter = ({
  showFilterDropdown,
  setShowFilterDropdown,
  eventOptions,

  selectedEvent,
  setSelectedEvent,

  eventDate,
  setEventDate,

  resetFilters,
}) => {
  const [tempEvent, setTempEvent] = useState(selectedEvent);
  const [tempDate, setTempDate] = useState(eventDate);

  if (!showFilterDropdown) return null;

  const applyFilters = () => {
    setSelectedEvent(tempEvent);
    setEventDate(tempDate);

    setShowFilterDropdown(false);
  };

  const handleReset = () => {
    setTempEvent('');
    setTempDate('');

    resetFilters();
  };

  return (
    <div className="fixed rounded-lg right-5 md:right-10 mt-2 bg-white text-gray-800 border border-gray-300 shadow-lg p-4 w-64 z-50">
      {/* Close Button */}
      <button
        className="absolute top-[18px] right-[20px]"
        onClick={() => setShowFilterDropdown(false)}
      >
        <RxCross1 size={10} />
      </button>

      {/* Event Filter */}
      <label className="block text-gray-700 text-sm mb-1">
        Filter by Event:
      </label>

      <select
        className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-3"
        value={tempEvent}
        onChange={(e) => setTempEvent(e.target.value)}
      >
        <option value="">All Events</option>

        {eventOptions.map((event) => (
          <option key={event} value={event}>
            {event}
          </option>
        ))}
      </select>

      {/* Event Date */}
      <label className="block text-gray-700 text-sm mb-1">
        Filter by Date:
      </label>

      <input
        type="date"
        className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-3"
        value={tempDate}
        onChange={(e) => setTempDate(e.target.value)}
      />

      {/* Apply */}
      <button
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700 transition"
        onClick={applyFilters}
      >
        Apply Filter
      </button>

      {/* Reset */}
      <button
        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600 transition"
        onClick={handleReset}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default UserFilter;
