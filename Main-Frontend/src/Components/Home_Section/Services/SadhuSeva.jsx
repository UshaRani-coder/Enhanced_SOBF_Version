import React,{useEffect} from 'react';
import sadhuSevaImg1 from '../../../assets/Sobf Images/Sadhu Seva/cropped-ss2.png';
import sadhuSevaImg2 from '../../../assets/Sobf Images/Sadhu Seva/cropped-ss3.png';
import sadhuSevaImg3 from '../../../assets/Sobf Images/Sadhu Seva/cropped-ss1.png';
import ImgBanner from './ImgBanner';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const SadhuSeva = ({ setService }) => {
   const location = useLocation();
  const isHomePage = location.pathname === '/';
   
  const images = [
    {
      img: sadhuSevaImg1,
    },
    {
      img: sadhuSevaImg2,
    },
    {
      img: sadhuSevaImg3,
    },
  ];
   useEffect(() => {
      if (location.pathname === '/swachh-vrindavan') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, [location.pathname]);
  const bannerS = images.map((image) => image.img);
  return (
    <div
    className={`w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto ${
      isHomePage ? '' : 'mt-[100px] lg:mt-[150px]  mb-20'
    }`}
  >
      <div className="sm:mb-5 mb-5 lg:-mb-28">
      {location.pathname == '/' && (
        <button
          aria-label="Back to Services"
          className="back-button mb-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={() => setService(null)}
        >
          Back to Services
        </button>
      )}
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:mt-[120px] lg:gap-x-[30px]  gap-y-[10px]">
      <div className="w-[100%] flex justify-center lg:w-[50%]">
          <ImgBanner banners={bannerS} />
        </div>
        <div className="flex flex-col md:items-start items-center mx-[20px] w-[90%] lg:w-[50%] justify-center">
          <h1 className="text-center text-heading4 lg:text-[1.9rem] font-bold mt-[10px]">
            Vrindavan Sadhu Seva
          </h1>
          <p className="text-gray-700 text-[16px] text-center lg:text-[18px]  font-workSans xl:mt-0 pb-[30px]  md:text-left lg:leading-[30px]">
            Those who are fully depends on mercy and blessings of Shri Radha
            Krishna, for them we like to start daily food prasadam seva for them
            , here are thousands of devotees who are living and doing their
            sadhana on road side, they don&lsquo;t have house to live , food to
            eat but even then they are happily living in Shri Vrindavan Dham,
            and doing their daily Sadhana.
          </p>
          <button>
            <Link
              to="/donate-us"
              href=""
              className="px-8 py-3.5 relative rounded-lg group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg"
            >
              <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
              <span className="relative z-10">Donate</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SadhuSeva;
