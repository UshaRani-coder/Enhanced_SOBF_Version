export const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString, startTime, endTime) => {
  if (!dateString || !startTime || !endTime) {
    return 'N/A';
  }

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);

    const ampm = hours >= 12 ? 'PM' : 'AM';

    const displayHour = hours % 12 || 12;

    return `${displayHour}:${String(minutes).padStart(2, '0')} ${ampm}`;
  };

  return `${formattedDate} | ${formatTime(startTime)} - ${formatTime(endTime)}`;
};
