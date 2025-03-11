import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { getEventsUsersFromDB } from '../Reducers/eventuserSlice';
import axios from 'axios';

const RegisteredUsers = () => {
  const dispatch = useDispatch();
  const { eventUser } = useSelector((state) => state.eventUser);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      event: 'Hackathon',
      date: '2025-01-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      event: 'Webinar',
      date: '2025-02-05',
    },
    {
      id: 3,
      name: 'Alexander Theodore Montgomery',
      email: 'alex.montgomery@example.com',
      event: 'Advanced ML Workshop',
      date: '2025-02-15',
    },
    {
      id: 4,
      name: 'Isabella Charlotte Kensington',
      email: 'isabella.kensington@example.com',
      event: 'AI & Future Tech',
      date: '2025-04-02',
    },
    {
      id: 5,
      name: 'Christopher Whitmore',
      email: 'chris.whitmore@example.com',
      event: 'Blockchain Trends',
      date: '2025-05-21',
    },
    {
      id: 6,
      name: 'Olivia Harrington',
      email: 'olivia.harrington@example.com',
      event: 'Sustainable Development',
      date: '2025-06-10',
    },
    {
      id: 7,
      name: 'Benjamin Hollingsworth',
      email: 'benjamin.hollingsworth@example.com',
      event: 'UI/UX Design Strategies',
      date: '2025-07-05',
    },
  ]);

  useEffect(() => {
    dispatch(getEventsUsersFromDB());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get unique event names for dropdown
  const eventOptions = [
    ...new Set(eventUser.map((user) => user?.registeredEvents[0]?.title)),
  ];

  // Filter logic
  const filteredUsers = eventUser.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesEvent = selectedEvent ? user.event === selectedEvent : true;
    const matchesDate =
      (!startDate || new Date(user.date) >= new Date(startDate)) &&
      (!endDate || new Date(user.date) <= new Date(endDate));

    return matchesSearch && matchesEvent && matchesDate;
  });

  // Email templates
  const emailTemplates = [
    {
      subject: `🎉 Confirmation of Your Registration.`,
      message: `Dear Devotees,

We are thrilled to confirm your registration for [Event Name]! Thank you for signing up, and we can't wait to see you there.

Here are the event details:
- Event Name: [Event Name]
- Date: [Event Date]
- Time: [Event Time]
- Location: [Event Location]

If you have any questions or need further information, feel free to reach out to us at [Support Email].

Best regards,
[Your Organization Name]`,
    },
    {
      subject: '⏰ Reminder:Event is Just Around the Corner!',
      message: `Dear Devotees,

This is a friendly reminder that [Event Name] is just around the corner! We are excited to have you join us.

Here are the event details:
- Event Name: [Event Name]
- Date: [Event Date]
- Time: [Event Time]
- Location: [Event Location]

Please make sure to arrive on time and bring any necessary materials. If you have any questions, feel free to contact us at [Support Email].

Looking forward to seeing you there!

Best regards,
[Your Organization Name]`,
    },
    {
      subject: "🙏 Thank you for attending the SOBF event! Stay connected with us for more initiatives.",
      message: `Dear Devotees,

Thank you for attending [Event Name]! We hope you had a great time and found the event informative and enjoyable.

We would love to hear your feedback. Please take a moment to fill out our feedback form: [Feedback Form Link].

If you have any questions or need further information, feel free to reach out to us at [Support Email].

Best regards,
[Your Organization Name]`,
    }
  ];


  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);



  // Toggle user selection
  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) // Deselect if already selected
        : [...prev, userId] // Select if not already selected
    );
  };

  // Send emails to selected users
  const sendEmails = async () => {
    if (selectedUsers.length === 0) {
      alert('No users selected');
      return;
    }

    // Get selected users' emails
    const emails = selectedUsers.map((userId) =>
      eventUser.find((user) => user._id === userId)?.email
    );

    // Use the selected email template
    const subject = selectedTemplate.subject;
    const message = selectedTemplate.message;

    try {
      // Call the backend API to send emails
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/send-emails-to-selected-users`, {
        emails,
        subject,
        message,
      });

      if (response.status === 200) {
        alert('Emails sent successfully!');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails');
    }
  };

  return (
    <div className="p-4 w-full overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center p-0">
        Registered Users
      </h1>

      <div className="flex items-center justify-between md:gap-2 w-full mb-4 ">
        {/* Search Bar */}
        <div className="flex items-center  space-x-2 bg-gray-200 rounded-lg px-3 py-2 shadow-sm w-full">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className=" ">
          {/* Filter Button */}
          <button
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ml-3 md:ml-0"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <FaFilter className="text-white" size={13} />
            <span className="font-normal">Filter</span>
          </button>

          {/* Filter Dropdown */}
          {showFilterDropdown && (
            <div className="fixed rounded-lg right-5 md:right-10 mt-2 bg-white text-gray-800 border-gray-300 shadow-lg  p-4 w-64 z-50">
              <button
                className="absolute top-[18px] right-[20px]  "
                onClick={() => setShowFilterDropdown(false)}
              >
                <RxCross1 className="text-black font-bold" size={10} />
              </button>

              {/* Event Filter */}
              <label className="block text-gray-700  text-sm mb-1">
                Filter by Event:
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-3 cursor-pointer"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">All Events</option>
                {eventOptions.map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
              </select>

              {/* Date Range Filter */}
              <label className="block text-gray-700 text-sm mb-1">
                Start Date:
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label className="block text-gray-700 text-sm mb-1">
                End Date:
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              {/* Reset Filters Button */}
              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600 transition"
                onClick={() => {
                  setSearch('');
                  setSelectedEvent('');
                  setStartDate('');
                  setEndDate('');
                  setShowFilterDropdown(false); // Close modal after reset
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        {/* Bulk Action: Send Emails */}
        <button
          onClick={sendEmails}
          className={`fixed bottom-6 right-6 md:static flex items-center  px-4 py-2 bg-[#CC493C] hover:bg-[#b63f33] hover:scale-105 hover:shadow-xl  text-white rounded-md shadow-lg transition-all duration-300 
        ${isMobile ? (isHovered ? 'w-auto px-5' : 'w-12 justify-center') : 'w-auto'}`}
          onMouseEnter={() => isMobile && setIsHovered(true)}
          onMouseLeave={() => isMobile && setIsHovered(false)}
        >
          <MdEmail size={23} />
          <span
            className={`whitespace-nowrap ${isMobile && !isHovered ? 'hidden' : 'ml-2'}`}
          >
            Send Emails
          </span>
        </button>
      </div>
      {/* Email Template Selection */}
      <div className="mt-4">
        <label className="block text-gray-700 text-sm mb-1">Select Email Template:</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-3 cursor-pointer"
          value={selectedTemplate.subject}
          onChange={(e) => {
            const selected = emailTemplates.find((template) => template.subject === e.target.value);
            setSelectedTemplate(selected);
          }}
        >
          {emailTemplates.map((template) => (
            <option key={template.subject} value={template.subject} >
              {template.subject}
            </option>
          ))}
        </select>
      </div>

      {/* Customize Email Message */}
      <div className="mt-4">
        <label className="block text-gray-700 text-sm mb-1">Customize Email Message:</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-3"
          rows="5"
          value={selectedTemplate.message}
          onChange={(e) => setSelectedTemplate({ ...selectedTemplate, message: e.target.value })}
        />
      </div>
      {/* Card View for Small Screens */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 ">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 shadow rounded-lg border space-y-1 hover:shadow-lg overflow-hidden"
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={() => toggleSelectUser(user._id)}
                className="mr-2 cursor-pointer"
              />
              <h2 className="font-semibold text-lg break-words">
                {user.username}
              </h2>
              <p className="text-gray-600 break-words">{user.email}</p>
              <p className="text-gray-700 text-sm break-words">
                <strong>Event :</strong> {user?.registeredEvents[0]?.title}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Registered Date :</strong>{' '}
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No registered users found.
          </p>
        )}
      </div>

      {/* Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-lg">
        <table className="w-full min-w-[700px] bg-white shadow-md rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-200  text-md">
              <th className="px-4 py-3 text-left font-medium">Select</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Event Name</th>
              <th className="px-4 py-3 text-left font-medium">
                Registration Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers?.map((user) => (
                <tr key={user._id} className="border-b text-sm">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleSelectUser(user._id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user?.registeredEvents[0]?.title}</td>
                  <td className="px-4 py-2"> {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No registered users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredUsers;
