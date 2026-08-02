import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getEventsUsersFromDB } from '../reducers/eventuserSlice';
import { formatDate } from '../utils/dateUtils.js';

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

  // Convert users -> registrations
  const registrations =
    eventUser
      ?.map((user) =>
        user.registeredEvents.map((registration) => ({
          registrationId: registration._id,
          userId: user._id,

          username: user.username,
          email: user.email,

          event: registration.event,
          registeredAt: registration.registeredAt,
        })),
      )
      .flat() || [];

  const eventOptions = [
    ...new Set(registrations.map((item) => item.event?.title)),
  ].filter(Boolean);

  const filteredUsers = registrations.filter((item) => {
    const matchesSearch =
      item.username?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase());

    const matchesEvent = selectedEvent
      ? item.event?.title === selectedEvent
      : true;

    const matchesDate = eventDate
      ? new Date(item.registeredAt).toISOString().split('T')[0] === eventDate
      : true;

    return matchesSearch && matchesEvent && matchesDate;
  });

  // select individual registration
  const toggleSelectUser = (registrationId) => {
    setSelectedUsers((prev) =>
      prev.includes(registrationId) ? [] : [registrationId],
    );
  };

  const resetFilters = () => {
    setSearch('');

    setSelectedEvent('');

    setEventDate('');

    setShowFilterDropdown(false);
  };

  const replaceTemplateVariables = (template, registration) => {
    const event = registration?.event;

    return template

      .replace(/{{username}}/g, registration?.username || 'Devotee')

      .replace(/{{eventName}}/g, event?.title || 'N/A')

      .replace(/{{eventDate}}/g, event?.date ? formatDate(event.date) : 'N/A')
      .replace(/{{eventStartTime}}/g, event?.startTime || 'N/A')

      .replace(/{{eventEndTime}}/g, event?.endTime || 'N/A')

      .replace(/{{eventLocation}}/g, event?.location || 'N/A');
  };

  const sendEmails = async (selectedTemplate) => {
    if (!selectedUsers.length) {
      toast.error('No users selected');

      return;
    }

    if (!selectedTemplate) {
      toast.error('Please select an email template');

      return;
    }

    const selectedRegistrations = registrations.filter((item) =>
      selectedUsers.includes(item.registrationId),
    );

    const emails = selectedRegistrations.map((registration) => ({
      email: registration.email,

      subject: selectedTemplate.subject,

      message: replaceTemplateVariables(selectedTemplate.message, registration),
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/send-emails-to-selected-users`,
        {
          emails,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Email sent successfully!');

        setSelectedUsers([]);
      } else {
        toast.error(response.data.message || 'Failed to send emails');
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || 'Failed to send emails');
    }
  };

  // For EmailComposer preview
  const selectedRegistration = registrations.find(
    (item) => item.registrationId === selectedUsers[0],
  );

  return {
    eventUser,

    filteredUsers,

    eventOptions,

    selectedUser: selectedRegistration,

    selectedEventDetails: selectedRegistration?.event,

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

    replaceTemplateVariables,

    isMobile,

    isHovered,

    setIsHovered,
  };
};

export default useRegisteredUsers;
