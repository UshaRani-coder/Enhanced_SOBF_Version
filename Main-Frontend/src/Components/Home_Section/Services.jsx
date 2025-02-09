/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './services.css';
import { useSelector, useDispatch } from 'react-redux';
import { getServices } from '../../Reducers/OurServicesSlice.js';
import { useLocation, Link } from 'react-router-dom';
import ImgBanner from './Services/ImgBanner.jsx';



const Services = () => {
  const { services, status, error } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const [service, setService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const ourServicesRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getServices()); // Fetching posts
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Function to handle screen resizing and update AOS attributes
    const handleResize = () => {
      const elements = document.querySelectorAll('[data-aos]');

      elements.forEach((element) => {
        // Get stored default attributes
        const defaultAos =
          element.getAttribute('data-default-aos') || 'fade-right';
        const defaultDelay =
          element.getAttribute('data-default-aos-delay') || '100';

        if (window.innerWidth < 768) {
          // Change data-aos attributes for small screens
          element.setAttribute('data-aos', 'fade-up');
          element.setAttribute('data-aos-delay', '200');
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
          // Change data-aos attributes for medium screens
          element.setAttribute('data-aos', 'fade-down');
          element.setAttribute('data-aos-delay', '100');
        } else {
          // Revert to default data-aos attributes
          element.setAttribute('data-aos', defaultAos);
          element.setAttribute('data-aos-delay', defaultDelay);
        }
      });

      // Refresh AOS to apply the changes
      AOS.refresh();
    };

    // Initialize AOS
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
    });

    // Store default attributes on mount
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((element) => {
      if (!element.hasAttribute('data-default-aos')) {
        element.setAttribute(
          'data-default-aos',
          element.getAttribute('data-aos') || 'fade-right',
        );
        element.setAttribute(
          'data-default-aos-delay',
          element.getAttribute('data-aos-delay') || '100',
        );
      }
    });

    // Initial screen size check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if (services?.length > 0) {
      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        document.querySelectorAll(".service")?.forEach((element) => {
          const bgImage = element.getAttribute("data-bg");
          if (bgImage) {
            element.style.setProperty("--bg-image", `url(${bgImage})`);
          }
        });
      });
    }
  }, [services]);


  const scrollToServices = () => {
    ourServicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mb-14">
      <h1 ref={ourServicesRef} className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative transition-all ease-in-out">
        Our Services
        <hr className="mt-1 border-light-lavender border-[1px]" />
      </h1>
      {status === 'loading' && <p>Loading Services...</p>}

      {service === null ? (
        <ul className="services w-[100%] mt-[20px] flex flex-col items-center gap-y-[30px] md:gap-y-[70px] md:flex-row md:justify-center md:gap-x-[60px] lg:gap-x-[30px] md:flex-wrap">
          {services && services?.map((item, index) => (
            <li
              key={item._id}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              data-bg={item.images[0]}
              // onMouseEnter={() => setHoveredService(item._id)}
              onMouseOver={() => {
                setHoveredService(item._id);
                console.log("Mouse Over triggered for service:", item._id);
              }}
              onMouseLeave={() => setHoveredService(null)}
              className={`service rounded-tl-[50px] rounded-br-[50px] cursor-pointer w-[80%] md:w-[35%] lg:w-[25%] relative overflow-hidden h-[300px] flex flex-col items-center justify-center`}
              style={{
                backgroundColor: item.color,
              }}
              onClick={() => {
                setService(item.title);
                if (isHomePage) {
                  scrollToServices();
                }
              }}
            >
              {hoveredService === item._id && item.images && item?.images?.length > 0 && (
                <div
                  className="absolute inset-0 w-full h-full transition-all duration-500"
                  style={{
                    backgroundImage: `url(${item.images[0]})`,
                    backgroundColor: 'rgba(1, 29, 36, 0.8)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.4)',
                    zIndex: -1,
                  }}
                ></div>
              )}
              <div className="px-[20px] service-content relative z-40 h-full cursor-pointer flex flex-col items-center justify-center">
                <img src={item.logo} alt={item.title + " logo"} className="w-[40px] h-[40px] invert" /> {/* Added alt text */}
                <h2 className="text-[20px] text-center text-[#ffffff] font-bold">{item.title}</h2>
                <p className="pt-[5px] text-center text-[16px] lg:text-[18px] text-[#ffffff]">{item.small_description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto ${isHomePage ? '' : 'mt-20 mb-20'}`}>
          {isHomePage && (
            <div className="sm:mb-5 mb-5 lg:-mb-28 lg:ml-[30px]">
              <button
                aria-label="Back to Services"
                className="back-button mb-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
                onClick={() => setService(null)}
              >
                Back to Services
              </button>
            </div>
          )}
          <div className="flex flex-col lg:flex-row w-[100%] lg:items-stretch items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[10px] lg:mt-[120px]">
              {services?.filter(serviceData => serviceData.title === service)?.map(serviceData => (
              <div key={serviceData.id || serviceData._id} className="flex flex-col justify-center  items-center mx-[20px] lg:flex-row  justify-center w-[100%] lg:mx-0"> {/* Use serviceData.id if available, otherwise serviceData._id */}
                <div className="images-grid h-full w-[100%] md:w-[90%] lg:w-[40%] flex flex-wrap justify-center gap-5">
                  <ImgBanner banners={serviceData.images} />
                </div>
                <div className='flex flex-col items-center md:items-start w-[90%] lg:w-[60%] h-full'>
                <div className="flex flex-col md:mx-[30px]">
                <h1 className="text-center text-heading4 lg:text-[1.9rem] mt-[15px] md:text-left font-bold">{serviceData.title}</h1>
                <p className="text-gray-700 text-center text-[16px] lg:text-[18px] font-workSans xl:mt-0 pb-[30px] md:text-left lg:leading-[30px] mt-[10px]">{serviceData.description}</p>
                </div>
                <button className='md:self-start md:ml-[30px]'>
                  <Link to="/donate-us" className="px-8 py-3.5 relative rounded-lg group overflow-hidden font-semibold bg-orange text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg">
                    <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
                    <span className="relative z-10">Donate</span>
                  </Link>
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
