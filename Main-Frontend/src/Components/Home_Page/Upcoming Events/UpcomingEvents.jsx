import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '@/reducers/upcomingeventSlice.js';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import fallbackEvents from '@/defaultData/upcoming-events.json';
import { lockScroll, unlockScroll } from '@/utils/scrollLock';
import FilterBar from '@/components/common_components/FilterBar.jsx';
import useFilteredPosts from '@/hooks/useFilteredPosts.js';
import EventCard from './EventCard.jsx';
import EventRegistrationModal from './EventRegistrationModal.jsx';
import PageHeader from '@/components/common_components/PageHeader.jsx';

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { events, listStatus } = useSelector((state) => state.events);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [swiperState, setSwiperState] = useState({
    activeIndex: 0,
    totalSlides: 0,
  });
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  // Lock the bg scroll when this modal is active
  useEffect(() => {
    if (showForm) lockScroll();
    else unlockScroll();

    return () => unlockScroll();
  }, [showForm]);

  useEffect(() => {
    if (listStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [listStatus, dispatch]);

  const sourceEvents = useMemo(() => {
    if (listStatus === 'succeeded') {
      return events?.length ? events : fallbackEvents;
    }

    if (listStatus === 'failed') {
      return fallbackEvents;
    }

    return fallbackEvents;
  }, [events, listStatus]);
  const {
    filteredPosts: filteredEvents,
    availableYears,
    availableFilteredMonths,
  } = useFilteredPosts(sourceEvents, selectedYear, selectedMonth);

  const finalEvents = filteredEvents.length > 0 ? filteredEvents : sourceEvents;
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
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
        setProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 90) clearInterval(interval);
          return newProgress;
        });
      }, 200);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/post/register-event/${
          finalEvents[selectedEventIndex]._id
        }`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
          }),
        },
      );

      clearInterval(interval);
      setProgress(100);

      const data = await response.json();
      if (response.ok) {
        setRegisteredEvents((prev) => {
          const updated = new Set(prev);
          updated.add(finalEvents[selectedEventIndex]._id);
          return updated;
        });

        toast.success(data.message || 'Registration successful!');

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

  const handleCardClick = (event) => {
    sessionStorage.setItem('home-scroll', window.scrollY);
    navigate(`/events/${event._id}`);
  };

  const shouldDisablePrev = () => {
    if (!swiperRef.current) return true;

    return swiperRef.current.isBeginning;
  };

  const shouldDisableNext = () => {
    if (!swiperRef.current) return false;

    return swiperRef.current.isEnd;
  };

  const title = 'Support Braj Seva – Be one in a million';
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;

  return (
    <div
      className="bg-light-lavender flex flex-col items-center  pb-10 w-full px-4 md:px-6 lg:px-0 mt-2"
      id="events"
    >
      <PageHeader
        title=" Upcoming Events"
        subtitle="Get Ready for Our Events"
        description="Stay tuned for impactful events that bring positive change to our
        community. Join us!"
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-center w-full max-w-3xl lg:max-w-4xl items-center gap-4 mb-6">
        <div className="flex items-center gap-2 small-range:gap-4">
          <FilterBar
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            years={availableYears}
            months={availableFilteredMonths}
          />
        </div>
      </div>

      <div className="w-full max-w-6xl px-4  relative">
        {/* Navigation arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={shouldDisablePrev()}
          className="disabled:opacity-50 disabled:cursor-not-allowed sm:flex items-center justify-center w-10 h-10 p-2 md:w-10 md:h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 md:w-5 md:h-5 text-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m15 19-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={shouldDisableNext()}
          className="disabled:opacity-50 disabled:cursor-not-allowed sm:flex items-center justify-center w-10 h-10 p-2 md:w-10 md:h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 md:w-6 md:h-6 text-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m9 18 6-6-6-6"
            />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setSwiperState({
              activeIndex: swiper.activeIndex,
              totalSlides: swiper.slides.length,
            });
          }}
          onSlideChange={(swiper) => {
            setSwiperState({
              activeIndex: swiper.activeIndex,
              totalSlides: swiper.slides.length,
            });
          }}
        >
          {finalEvents?.map((event, index) => {
            return (
              <SwiperSlide key={event._id}>
                <EventCard
                  event={event}
                  index={index}
                  title={title}
                  baseURL={baseURL}
                  onCardClick={handleCardClick}
                  setShowForm={setShowForm}
                  isRegistered={registeredEvents.has(event._id)}
                  onRegister={(index) => {
                    setSelectedEventIndex(index);
                    setShowForm(true);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Registration Modal */}
      <EventRegistrationModal
        showForm={showForm}
        event={finalEvents[selectedEventIndex]}
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        progress={progress}
        onChange={handleInputChange}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpcomingEvents;
