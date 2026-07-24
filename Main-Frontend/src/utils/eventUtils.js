export const getEventStatus = (eventDate, startTime, endTime) => {
  const now = new Date();

  const date = new Date(eventDate);

  const start = new Date(date);
  const [startHour, startMinute] = startTime.split(':');
  start.setHours(Number(startHour), Number(startMinute), 0, 0);

  const end = new Date(date);
  const [endHour, endMinute] = endTime.split(':');
  end.setHours(Number(endHour), Number(endMinute), 0, 0);

  if (now < start) return 'upcoming';
  if (now >= start && now <= end) return 'happening';

  return 'completed';
};

export const getStatusStyles = (status) => {
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

export const formatDateTime = (dateString, timeString) => {
  if (!dateString || !timeString) return 'N/A';

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);

  return `${formattedDate}, ${
    hour % 12 || 12
  }:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const formatTime = (timeString) => {
  if (!timeString) return 'N/A';

  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);

  return `${hour % 12 || 12}:${minutes} ${
    hour >= 12 ? 'PM' : 'AM'
  }`;
};

export const capitalize = (str) => {
  if (!str) return '';

  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};