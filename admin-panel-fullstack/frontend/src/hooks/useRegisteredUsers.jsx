import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getEventsUsersFromDB } from '../reducers/eventuserSlice';

const useRegisteredUsers = () => {
  const dispatch = useDispatch();

  const { eventUser } = useSelector((state) => state.eventUser);

  const [search, setSearch] = useState('');

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');

  const [eventDate, setEventDate] = useState('');

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [isHovered, setIsHovered] = useState(false);

  // Fetch registered users
  useEffect(() => {
    dispatch(getEventsUsersFromDB());
  }, [dispatch]);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Unique event names
  const eventOptions = [
    ...new Set(eventUser?.map((user) => user?.registeredEvents?.[0]?.title)),
  ].filter(Boolean);

  // Filter users
  const filteredUsers =
    eventUser?.filter((user) => {
      const username = user?.username?.toLowerCase() || '';

      const email = user?.email?.toLowerCase() || '';

      const matchesSearch =
        username.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase());

      const userEvent = user?.registeredEvents?.[0]?.title;

      const matchesEvent = selectedEvent ? userEvent === selectedEvent : true;

      const matchesDate = eventDate
        ? new Date(user?.registeredEvents?.[0]?.date)
            .toISOString()
            .split('T')[0] === eventDate
        : true;
      return matchesSearch && matchesEvent && matchesDate;
    }) || [];

  // Select / deselect users

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) => (prev[0] === userId ? [] : [userId]));
  };

  // Reset filters
  const resetFilters = () => {
    setSearch('');

    setSelectedEvent('');

    setStartDate('');

    setEndDate('');

    setShowFilterDropdown(false);
  };

  // Replace dynamic variables
  const replaceTemplateVariables = (template, user) => {
    const event = user?.registeredEvents?.[0];

    return template

      .replace(/{{username}}/g, user?.username || 'Devotee')

      .replace(/{{eventName}}/g, event?.title || 'N/A')

      .replace(
        /{{eventDate}}/g,
        event?.date ? new Date(event.date).toLocaleDateString() : 'N/A',
      )

      .replace(/{{eventTime}}/g, event?.time || 'N/A')

      .replace(/{{eventLocation}}/g, event?.location || 'N/A');
  };

  // Send personalized emails
  const sendEmails = async (selectedTemplate) => {
    if (!selectedUsers.length) {
      toast.error('No users selected');
      return;
    }

    if (!selectedTemplate) {
      toast.error('Please select an email template');
      return;
    }

    const users = eventUser.filter((user) => selectedUsers.includes(user._id));

    const emails = users.map((user) => ({
      email: user.email,
      subject: selectedTemplate.subject,
      message: replaceTemplateVariables(selectedTemplate.message, user),
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/send-emails-to-selected-users`,
        {
          emails,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Emails sent successfully!');

        setSelectedUsers([]);
      } else {
        toast.error(response.data.message || 'Failed to send emails');
      }
    } catch (error) {
      console.error('Error sending emails:', error);

      toast.error(error.response?.data?.message || 'Failed to send emails');
    }
  };

  const selectedUser = eventUser?.find((user) => user._id === selectedUsers[0]);

  const selectedEventDetails = selectedUser?.registeredEvents?.[0];
  return {
    // data
    selectedUser,
    selectedEventDetails,
    eventUser,
    filteredUsers,
    eventOptions,

    // search
    setSearch,

    // selection
    selectedUsers,
    toggleSelectUser,

    // filters
    selectedEvent,
    setSelectedEvent,
    eventDate,
    setEventDate,
    showFilterDropdown,
    setShowFilterDropdown,
    resetFilters,

    // email
    sendEmails,
    replaceTemplateVariables,

    // responsive
    isMobile,
    isHovered,
    setIsHovered,
  };
};

export default useRegisteredUsers;
