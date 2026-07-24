import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ImgBanner from './ImgBanner';
import hardcodedServices from '@/defaultData/ourServices.json';

const ServiceDetails = ({
  setService,
  services = [],
  service: selectedService,
}) => {
  const location = useLocation();
  const { id } = useParams();

  const isHomePage = location.pathname === '/';

  const finalServices = useMemo(
    () =>
      Array.isArray(services) && services.length > 0
        ? services
        : hardcodedServices,
    [services],
  );

  const service = useMemo(() => {
    if (isHomePage) {
      return finalServices.find((item) => item.title === selectedService);
    }

    return finalServices.find((item) => item._id === id);
  }, [finalServices, isHomePage, selectedService, id]);

  if (!service) {
    return (
      <div className="mt-[150px] flex justify-center items-center h-[50vh]">
        <h1 className="text-2xl font-bold">Service not found.</h1>
      </div>
    );
  }

  return (
    <div
      className={`w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto ${
        isHomePage ? '' : 'mt-[150px] mb-20'
      }`}
    >
      {isHomePage && (
        <div className="w-full md:w-[90%] flex justify-center md:justify-start lg:ml-4  2xl:ml-14 ">
          <button
            aria-label="Back to Services"
            className="back-button my-4 px-4 py-2  bg-logo-blue text-white rounded
             hover:bg-logo-blue hover:text-white hover:scale-105
             active:scale-95 active:translate-y-[1px]
             transition-all duration-150 "
            onClick={() => setService(null)}
          >
            Back to Services
          </button>
        </div>
      )}
      <div className="flex flex-col lg:flex-row  items-center lg:items-stretch xl:items-center lg:gap-x-[30px] gap-y-[10px] w-full">
        <div className="w-full h-[55vh] lg:h-auto xl:h-[65vh] justify-center lg:w-[50%] flex">
          <ImgBanner banners={service.images} />
        </div>

        <div className="flex flex-col justify-center md:items-start items-center mx-[20px] w-[90%] lg:w-[50%] lg:mx-0 xl:justify-start">
          <h1 className="text-center lg:text-left text-heading4 lg:text-[1.9rem] font-bold mt-[10px]">
            {service.title}
          </h1>

          <p
            className="text-gray-700 text-center text-[16px] lg:text-[18px] font-workSans pb-[30px] md:text-left lg:leading-[30px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(service.description).replace(
                /<a /g,
                '<a style="color:#4a90e2;" ',
              ),
            }}
          />

          <Link
            to="/donate-us"
            className="px-8 py-3.5 relative rounded-lg group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 hover:bg-logo-blue hover:shadow-lg"
          >
            <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 bg-logo-blue group-hover:w-full"></span>
            <span className="relative z-10">Donate</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceDetails);
