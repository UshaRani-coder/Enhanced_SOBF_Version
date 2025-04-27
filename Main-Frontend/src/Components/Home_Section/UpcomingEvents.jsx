import React, { useState, useEffect, useRef } from 'react';
import { MdLocationPin, MdAccessTimeFilled, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../Reducers/upcomingeventSlice';
import DOMPurify from 'dompurify';
import { Navigation, Pagination } from 'swiper/modules';


const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { events, status: eventsStatus } = useSelector((state) => state.events);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const swiperRef = useRef(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });


  // Fetch events data
  useEffect(() => {
    if (eventsStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventsStatus, dispatch]);


  // Filter events based on selected year/month
  const filteredEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      const matchesYear = selectedYear ? eventDate.getFullYear().toString() === selectedYear : true;
      const matchesMonth = selectedMonth ? (eventDate.getMonth() + 1).toString().padStart(2, '0') === selectedMonth : true;
      return matchesYear && matchesMonth;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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

  const formatDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) return 'N/A';

    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    return `${formattedDate} at ${displayHour}:${minutes} ${ampm}`;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setProgress(0);

    try {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 90) clearInterval(interval);
          return newProgress;
        });
      }, 200);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/post/register-event/${filteredEvents[selectedEventIndex]._id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
          }),
        }
      );

      clearInterval(interval);
      setProgress(100);

      const data = await response.json();
      if (response.ok) {
        toast.success('Registration successful!');
        setTimeout(() => {
          setShowForm(false);
          setFormData({ name: '', email: '' });
        }, 1000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Failed to register for the event');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  // Get unique years and months for filters
  const availableYears = [...new Set(events.map(event => new Date(event.date).getFullYear().toString()))];
  const availableMonths = [...new Set(
    events.map(event => (new Date(event.date).getMonth() + 1).toString().padStart(2, '0'))
  )].sort();

  const handleCardClick = (event, index) => {
    setSelectedEventIndex(index);
    setShowDetailModal(true);
  };

  const navigateEvents = (direction) => {
    if (direction === 'prev') {
      setSelectedEventIndex(prev => (prev - 1 + filteredEvents.length) % filteredEvents.length);
    } else {
      setSelectedEventIndex(prev => (prev + 1) % filteredEvents.length);
    }
  };
  const capitalize = (str) => {
    if (!str) return '';
    return str.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };




  return (
    <div className="bg-light-lavender flex flex-col items-center mb-10 pb-10 w-full px-4 md:px-14 lg:px-0 mt-10">
      <h1 className="inline-block text-[28px] md:text-heading3 lg:text-heading2 font-bold p-5 text-[#2d335d] relative transition-all ease-in-out">
        Upcoming Events
        <hr className="mt-1 border-blue border-[0.5px]" />
      </h1>
      <h2 className="text-center text-lg small-range:text-[20px] md:text-xl lg:text-2xl font-bold small-range:px-2">
        Get Ready for Our Events
      </h2>
      <p className="text-center text-md small-range:text-lg md:text-md lg:text-xl mb-6 small-range:px-3 small-range:pb-3 small-range:pt-1 text-gray-600">
        Stay tuned for impactful events that bring positive change to our community. Join us!
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-center w-full max-w-3xl lg:max-w-4xl items-center gap-4 mb-6">
        <div className="flex items-center gap-2 small-range:gap-4">
          <select
            className="border-2 border-none border-[rgb(30,58,138)] bg-[rgb(221,231,253)] text-[rgb(23,37,84)] 
            font-bold small-max:px-6 md:px-4 px-2 py-2 rounded-md shadow-md cursor-pointer 
            transition-all duration-300 hover:bg-[rgb(200,219,252)] hover:border-[rgb(23,37,84)] 
            focus:ring-2 focus:ring-[rgb(125,168,252)] focus:outline-none"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            className="border-2 border-none border-[rgb(22,101,52)] bg-[rgb(221,242,228)] text-[rgb(16,63,32)] 
            font-bold small-max:px-6 md:px-4 px-2 py-2 rounded-md shadow-md cursor-pointer 
            transition-all duration-300 hover:bg-[rgb(195,230,209)] hover:border-[rgb(16,63,32)] 
            focus:ring-2 focus:ring-[rgb(125,200,160)] focus:outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {availableMonths.map(month => (
              <option key={month} value={month}>
                {new Date(0, parseInt(month) - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="w-full max-w-6xl px-4 relative">
          {/* Add custom navigation arrows */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className=" sm:flex items-center justify-center w-10 h-10 p-2 md:w-10 md:h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-5 md:h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className=" sm:flex items-center justify-center w-10 h-10 p-2 md:w-10 md:h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-6 md:h-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {filteredEvents?.map((event, index) => {
              const statusStyles = getStatusStyles(event.status);
              return (
                <SwiperSlide key={event._id}>
                  <div
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
                    onClick={() => handleCardClick(event, index)}
                  >
                    <div className="relative w-full h-48 sm:h-56">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-t-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
                        }}
                      />
                    </div>

                    <div className="p-4">
                      <span className={`px-3 py-1 text-xs md:text-sm mb-3 inline-block font-bold rounded-full shadow-md ${statusStyles.bgColor} ${statusStyles.textColor} ${statusStyles.animate}`}>
                        {statusStyles?.icon} {statusStyles?.label}
                      </span>

                      <div className="flex flex-col gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <MdAccessTimeFilled className="text-[#1890CE] flex-shrink-0" />
                          <span className="text-gray-600 text-sm">
                            {formatDateTime(event?.date, event?.time)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MdLocationPin className="text-[#E82327] flex-shrink-0" />
                          <span className="text-gray-600 text-sm">
                            {event.location}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-[#2d335d] mb-2 line-clamp-2">
                        {capitalize(event?.title)}
                      </h3>

                      <div
                        className="text-gray-700 text-sm mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(event.description)
                            .replace(/<a /g, '<a class="text-blue-600 hover:underline" ')
                        }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl text-center">
          <p className="text-gray-600 text-lg">No events found for the selected filters.</p>
          <button
            onClick={() => { setSelectedYear(''); setSelectedMonth(''); }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
      {/* Event Detail Modal */}
      {showDetailModal && filteredEvents[selectedEventIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateEvents('prev')}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
              disabled={filteredEvents.length <= 1}
            >
              <MdChevronLeft size={32} className="text-gray-700" />
            </button>

            <button
              onClick={() => navigateEvents('next')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
              disabled={filteredEvents.length <= 1}
            >
              <MdChevronRight size={32} className="text-gray-700" />
            </button>

            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              {/* {capitalize(event.title)} */}
              <h2 className="text-2xl font-bold text-[#2d335d]">{capitalize(filteredEvents[selectedEventIndex].title)}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-6">
                <img
                  src={filteredEvents[selectedEventIndex].image}
                  alt={filteredEvents[selectedEventIndex].title}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                  <MdAccessTimeFilled className="text-[#1890CE] mr-2" />
                  <span className="text-gray-700">
                    {formatDateTime(filteredEvents[selectedEventIndex].date, filteredEvents[selectedEventIndex].time)}
                  </span>
                </div>

                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                  <MdLocationPin className="text-[#E82327] mr-2" />
                  <span className="text-gray-700">
                    {filteredEvents[selectedEventIndex].location}
                  </span>
                </div>

                <div className={`px-4 py-2 rounded-lg ${getStatusStyles(filteredEvents[selectedEventIndex].status).bgColor} ${getStatusStyles(filteredEvents[selectedEventIndex].status).textColor}`}>
                  {getStatusStyles(filteredEvents[selectedEventIndex].status).icon} {getStatusStyles(filteredEvents[selectedEventIndex].status).label}
                </div>
              </div>

              <div
                className="prose max-w-none text-gray-700 mb-6"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(filteredEvents[selectedEventIndex].description)
                    .replace(/<a /g, '<a class="text-blue-600 hover:underline" ')
                }}
              />

              {(filteredEvents[selectedEventIndex].status === 'upcoming' || filteredEvents[selectedEventIndex].status === 'happening') && (
                <button
                  onClick={() => {
                    setShowForm(true);
                    setShowDetailModal(false);
                  }}
                  className="mt-6 px-6 py-3 bg-[#2d335d] text-white font-semibold rounded-lg hover:bg-[#edb25a] transition-all"
                >
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showForm && filteredEvents[selectedEventIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Register for {filteredEvents[selectedEventIndex].title}</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setShowDetailModal(true);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </form>
            </div>

            {isLoading && (
              <div className="px-6 pb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default UpcomingEvents;