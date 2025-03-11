import React, { useState, useEffect } from 'react';
import img1 from '../../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv3.png';
import img2 from '../../assets/Sobf Images/health_and_awareness_camp/hac6.jpg';
import img3 from '../../assets/Sobf Images/women empowerment/we4.png';
import { MdLocationPin } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../Reducers/upcomingeventSlice';
import DOMPurify from 'dompurify';

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { events, status } = useSelector((state) => state.events);

  // Fetch teams data
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const fallbackEvents = [
    {
      id: '1',
      title: 'Community Clean-up Drive',
      description:
        'Join us in making Vrindavan cleaner and greener! This community-driven initiative aims to raise awareness about environmental responsibility. Volunteers will participate in waste collection, recycling activities, and tree planting to promote a healthier ecosystem. Lets work together for a cleaner tomorrow!',
      date: '2025-04-10',
      time: '10:00',
      location: 'Vrindavan Park',
      image: img1,
    },
    {
      id: '2',
      title: 'Health Awareness Camp',
      description:
        'A free health camp providing essential check-ups, consultations, and awareness sessions on preventive healthcare. Medical professionals will offer general health screenings, blood pressure checks, and dietary guidance. Take charge of your well-being and spread the message of a healthier society!',
      date: '2025-05-15',
      time: '09:30',
      location: 'Community Hall',
      image: img2,
    },
    {
      id: '3',
      title: 'Women Empowerment Seminar',
      description:
        'A seminar dedicated to empowering women through education, skill-building, and self-confidence. Inspirational speakers will share their journeys, and interactive workshops will help attendees gain valuable insights into financial independence, leadership, and personal growth. Lets uplift and support each other for a brighter future!',
      date: '2025-06-20',
      time: '11:00',
      location: 'City Auditorium',
      image: img3,
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
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
      setIsLoading(true);
      setProgress(0);
      const eventId = filteredEvents[currentIndex]._id; // Get the event ID
      // Simulate progress increase while waiting for the response
      let fakeProgress = 0;
      const interval = setInterval(() => {
        fakeProgress += 10;
        setProgress(fakeProgress);
        if (fakeProgress >= 90) clearInterval(interval); // Stop at 90% (API response will set 100%)
      }, 200);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/post/register-event/${eventId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: null, // Assuming new user registration
            username: formData.name,
            email: formData.email,
          }),
        },
      );
      clearInterval(interval);
      setProgress(100); // API response received, set progress to 100%
      const data = await response.json();
      if (response.ok) {
        toast.success('Your registration is successful!');
        setTimeout(() => {
          setShowForm(false);
          setFormData({ name: '', email: '' });
        }, 1000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong while registering for the event');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const getEventStatus = (eventDate) => {
    if (eventDate === today) {
      return {
        label: 'Happening Now',
        bgColor: 'bg-gradient-to-r from-purple-500 to-purple-700',
        icon: '🟢',
        textColor: 'text-white',
        animate: 'animate-bounce',
      };
    }
    return eventDate > today
      ? {
          label: 'Upcoming',
          bgColor: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
          icon: '⏳',
          textColor: 'text-white',
          animate: '',
        }
      : {
          label: 'Completed', // Changed from 'Past Event'
          bgColor: 'bg-gradient-to-r from-green-500 to-green-700', // Green for success
          icon: '🎯', // Represents completion
          textColor: 'text-white',
          animate: '',
        };
  };

  function formatDateAndTime(dateString, timeString) {
    // Parse date
    const [month, day, year] = dateString.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day); // Month is 0-indexed

    // Format date
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Parse time
    const [hours, minutes] = timeString.split(':').map(Number);

    // Format time
    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours; // 12 AM/PM
    const ampm = hours < 12 ? 'AM' : 'PM';

    const formattedTime = `${String(formattedHours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  }

  const sourceData = events.length > 0 ? events : fallbackEvents;

  const filteredEvents = sourceData.filter(
    (event) =>
      (selectedYear ? event.date.includes(selectedYear) : true) &&
      (selectedMonth ? event.date.includes(`-${selectedMonth}-`) : true),
  );

  // Reset currentIndex if it's out of range after filtering
  useEffect(() => {
    if (currentIndex >= filteredEvents.length) {
      setCurrentIndex(0);
    }
  }, [filteredEvents.length, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sourceData?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sourceData?.length - 1 : prevIndex - 1,
    );
  };
  const availableYears = [
    ...new Set(sourceData.map((event) => event.date.split('-')[0])),
  ];
  const availableMonths = [
    ...new Set(sourceData?.map((event) => event.date.split('-')[1])),
  ];

  useEffect(() => {
    if (showForm) {
      const scrollY = window.scrollY; // Save the current scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY); // Restore scroll position
    }
  }, [showForm]);

  return (
    <div className="bg-light-lavender flex flex-col items-center mb-10 pb-10 w-full px-4 md:px-14 lg:px-0 mt-10">
      <ToastContainer />
      <h1 className="inline-block text-[28px] md:text-heading3 lg:text-heading2 font-bold  p-5 text-[#2d335d] relative transition-all ease-in-out">
        Upcoming Events
        <hr className="mt-1 border-blue border-[0.5px]" />
      </h1>
      <h2 className="text-center text-lg small-range:text-[20px] md:text-xl lg:text-2xl font-bold small-range:px-2">
        Get Ready for Our Upcoming Events
      </h2>
      <p className="text-center text-md small-range:text-lg md:text-md lg:text-xl mb-6 small-range:px-3 small-range:pb-3 small-range:pt-1 text-gray-600">
        Stay tuned for impactful events that bring positive change to our
        community. Join us!
      </p>

      {/* Filter & Carousel Controls */}
      <div className="flex flex-col md:flex-row  md:justify-center w-full  max-w-3xl lg:max-w-4xl  items-center gap-4 mb-6">
        <div className="flex items-center gap-2 small-range:gap-4 ">
          {/* Filter by Year */}
          <select
            className="border-2 border-none  border-[rgb(30,58,138)] bg-[rgb(221,231,253)] text-[rgb(23,37,84)] 
            font-bold small-max:px-6 md:px-4 px-2  py-2 rounded-md shadow-md cursor-pointer 
            transition-all duration-300 hover:bg-[rgb(200,219,252)] hover:border-[rgb(23,37,84)] 
            focus:ring-2 focus:ring-[rgb(125,168,252)] focus:outline-none 
            max-h-[300px] overflow-y-auto scrollbar-none "
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="" className="font-bold">
              Filter by Year
            </option>
            {availableYears.map((year) => (
              <option
                key={year}
                value={year}
                className="max-h-[200px] overflow-y-auto font-bold "
              >
                {year}
              </option>
            ))}
          </select>

          {/* Filter by Month */}
          <select
            className="border-2 border-none border-[rgb(22,101,52)] bg-[rgb(221,242,228)] text-[rgb(16,63,32)] 
            font-bold small-max:px-6 md:px-4  px-2 py-2 rounded-md shadow-md cursor-pointer 
            transition-all duration-300 hover:bg-[rgb(195,230,209)] hover:border-[rgb(16,63,32)] 
            focus:ring-2 focus:ring-[rgb(125,200,160)] focus:outline-none 
            max-h-[300px] overflow-y-auto scrollbar-none "
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="" className="font-bold">
              Filter by Month
            </option>
            {availableMonths.map((month) => (
              <option
                key={month}
                value={month}
                className="max-h-[200px] overflow-y-auto font-bold "
              >
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 justify-end  small-range:mr-4 small-max:mr-0  w-full">
          {/* Previous Slide Button */}
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-900 transition-all"
            onClick={prevSlide}
          >
            ❮
          </button>

          {/* Next Slide Button */}
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-900 transition-all"
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>
      </div>
      {/* Conditional Rendering: Show events or fallback message */}
      {filteredEvents.length > 0 ? (
        <>
          {/* Carousel Wrapper */}
          <div className="relative w-full max-w-3xl lg:max-w-4xl overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredEvents.map((event) => {
                const formattedDateTime =
                  event && event.date && event.time
                    ? formatDateAndTime(
                        new Date(event.date).toLocaleDateString('en-US'),
                        event.time,
                      )
                    : 'N/A';
                const status = getEventStatus(
                  new Date(event.date).toISOString().split('T')[0],
                );

                return (
                  // <div key={event.id} className="min-w-full">
                  //   <div className="bg-white rounded-xl overflow-hidden ">
                  //     <img
                  //       src={event.image}
                  //       alt={event.title}
                  //       className="w-full h-full  object-cover rounded-t-xl"
                  //     />
                  //     <div className="p-3.5 small-range:p-5 text-start">
                  //       <span
                  //         className={`px-3 py-1 text-[10px] md:text-sm mb-4 inline-block font-bold ${status.bgColor} ${status.textColor} rounded-full shadow-md ${status.animate}`}
                  //       >
                  //         {status.icon} {status.label}
                  //       </span>
                  //       <div className="flex flex-col gap-y-1 md:flex-row md:gap-x-4  w-full mb-2 lg:gap-4">
                  //         <div className="flex flex-row items-center gap-1  lg:w-auto ">
                  //           <MdAccessTimeFilled className="w-[20px] h-[20px] text-[#1890CE] " />
                  //           <p className="text-gray-600 flex flex-col md:flex-row md:gap-1 text-[10px] small-range:text-[12px] md:text-[14px]">
                  //             <span>{formattedDateTime}</span>
                  //           </p>
                  //         </div>

                  //         <div className="flex flex-row  items-center gap-1  lg:w-auto ">
                  //           <MdLocationPin
                  //             size={21}
                  //             className=" md:w-[20px] md:h-[20px] text-[#E82327] "
                  //           />
                  //           <p className="text-gray-500 text-[10px] small-range:text-[12px] md:text-[14px]">
                  //             {event.location}
                  //           </p>
                  //         </div>
                  //       </div>
                  //       <h3 className="text-xl lg:text-2xl font-semibold text-[#2d335d]">
                  //         {event.title}
                  //       </h3>

                  //       <p
                  //         className="text-gray-700 lg:text-lg"
                  //         dangerouslySetInnerHTML={{
                  //           __html: DOMPurify.sanitize(
                  //             event?.description,
                  //           ).replace(/<a /g, '<a style="color: #4a90e2;" '),
                  //         }}
                  //       ></p>
                  //       {event.date >= today ? (
                  //         <button
                  //           onClick={() => setShowForm(true)}
                  //           className="mt-4 px-4 py-2 bg-[#2d335d] text-white font-semibold rounded-lg hover:bg-[#edb25a] transition-all"
                  //         >
                  //           Register Now
                  //         </button>
                  //       ) : null}
                  //     </div>
                  //   </div>
                  // </div>

                  <div key={event._id || event.id} className="min-w-full">
                    <div className="bg-white rounded-xl overflow-hidden relative">
                      {/* Image with fixed height */}
                      <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px]">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-t-xl"
                        />
                      </div>

                      <div className="p-3.5 small-range:p-5 text-start">
                        <span
                          className={`px-3 py-1 text-[10px] md:text-sm mb-4 inline-block font-bold ${status.bgColor} ${status.textColor} rounded-full shadow-md ${status.animate}`}
                        >
                          {status.icon} {status.label}
                        </span>
                        <div className="flex flex-col gap-y-1 md:flex-row md:gap-x-4  w-full mb-2 lg:gap-4">
                          <div className="flex flex-row items-center gap-1  lg:w-auto ">
                            <MdAccessTimeFilled className="w-[20px] h-[20px] text-[#1890CE] " />
                            <p className="text-gray-600 flex flex-col md:flex-row md:gap-1 text-[10px] small-range:text-[12px] md:text-[14px]">
                              <span>{formattedDateTime}</span>
                            </p>
                          </div>

                          <div className="flex flex-row items-center gap-1  lg:w-auto ">
                            <MdLocationPin
                              size={21}
                              className=" md:w-[20px] md:h-[20px] text-[#E82327] "
                            />
                            <p className="text-gray-600 text-[10px] small-range:text-[12px] md:text-[14px]">
                              {event.location}
                            </p>
                          </div>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-semibold text-[#2d335d]">
                          {event.title}
                        </h3>

                        <p
                          className="text-gray-700 lg:text-lg"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              event?.description,
                            ).replace(/<a /g, '<a style="color: #4a90e2;" '),
                          }}
                        ></p>
                        {event.date >= today ? (
                          <button
                            onClick={() => setShowForm(true)}
                            className="mt-4 px-4 py-2 bg-[#2d335d] text-white font-semibold rounded-lg hover:bg-[#edb25a] transition-all"
                          >
                            Register Now
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-lg mt-6">
          No events found for the selected filters.
        </p>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-[1000] w-[100%]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[80%] lg:w-[40%] mt-[80px] flex flex-col items-start">
            <h2 className="text-xl font-bold mb-4 text-center">
              Register for the Event
            </h2>
            <form onSubmit={handleSubmit} className="w-[100%]">
              <div className="mb-3 w-full ">
                <label className="block font-medium mb-[5px]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-400 p-2 rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-[5px]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-400 p-2 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="flex justify-end gap-x-2 mt-4">
                <button
                  type="button"
                  className="px-[26px] py-2 bg-gray-500 rounded hover:bg-gray-600 text-white font-medium"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-[26px] py-2 hover:bg-indigo-500 text-white rounded bg-indigo-700 font-medium"
                  onSubmit={handleSubmit}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          {isLoading && (
            <div className="w-[90%] md:w-[80%] lg:w-[40%] bg-gray-200 rounded-full h-4 mt-2 relative">
              <div
                className="bg-[#25D366] h-4 rounded-full transition-all duration-300 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
