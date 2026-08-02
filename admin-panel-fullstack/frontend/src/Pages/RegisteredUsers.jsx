import React, { useState, useEffect } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import useRegisteredUsers from '../hooks/useRegisteredUsers';
import useDebounce from '../hooks/useDebounce.js';
import UserFilter from '../components/RegisteredUsers/UserFilter';
import EmailComposer from '../components/RegisteredUsers/EmailComposer';
import RegisteredUserTable from '../components/RegisteredUsers/RegisteredUserTable';
import RegisteredUserCard from '../components/RegisteredUsers/RegisteredUserCard';

const RegisteredUsers = () => {
  const {
    eventUser,
    selectedUser,
    selectedEventDetails,
    filteredUsers,
    eventOptions,

    setSearch,

    selectedUsers,
    toggleSelectUser,

    selectedEvent,
    setSelectedEvent,

    eventDate,
    setEventDate,

    showFilterDropdown,
    setShowFilterDropdown,

    resetFilters,

    sendEmails,

    isMobile,
    isHovered,
    setIsHovered,
  } = useRegisteredUsers();

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useDebounce(searchInput, 500);
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);
  return (
    <div className="p-4 w-full overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Registered Users
      </h1>

      {/* Search + Filter + Email Button */}
      <div className="flex items-center justify-between gap-3 w-full mb-4">
        {/* Search */}
        <div className="flex items-center space-x-2 bg-gray-200 rounded-lg px-3 py-2 shadow-sm w-full">
          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <FaFilter size={13} />

            <span>Filter</span>
          </button>

          <UserFilter
            showFilterDropdown={showFilterDropdown}
            setShowFilterDropdown={setShowFilterDropdown}
            eventOptions={eventOptions}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            eventDate={eventDate}
            setEventDate={setEventDate}
            resetFilters={resetFilters}
          />
        </div>

        {/* Send Email Button */}
        <button
          onClick={() => sendEmails(selectedTemplate)}
          className={`fixed bottom-6 right-6 md:static flex items-center px-4 py-2 bg-[#CC493C] hover:bg-[#b63f33] hover:scale-105 hover:shadow-xl text-white rounded-md shadow-lg transition-all duration-300

          ${
            isMobile
              ? isHovered
                ? 'w-auto px-5'
                : 'w-12 justify-center'
              : 'w-auto'
          }

          `}
          onMouseEnter={() => isMobile && setIsHovered(true)}
          onMouseLeave={() => isMobile && setIsHovered(false)}
        >
          <MdEmail size={23} />

          <span
            className={`whitespace-nowrap ${
              isMobile && !isHovered ? 'hidden' : 'ml-2'
            }`}
          >
            Send Email
          </span>
        </button>
      </div>

      {/* Email Composer */}
      <EmailComposer
        eventDetails={{
          eventName: selectedEventDetails?.title,
          eventDate: selectedEventDetails?.date,
          eventStartTime: selectedEventDetails?.startTime,
          eventEndTime: selectedEventDetails?.endTime,
          eventLocation: selectedEventDetails?.location,
        }}
        user={selectedUser}
        onTemplateChange={setSelectedTemplate}
      />

      {/* Mobile Cards */}
      <RegisteredUserCard
        users={filteredUsers}
        selectedUsers={selectedUsers}
        toggleSelectUser={toggleSelectUser}
      />

      {/* Desktop Table */}
      <RegisteredUserTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        toggleSelectUser={toggleSelectUser}
      />
    </div>
  );
};

export default RegisteredUsers;
