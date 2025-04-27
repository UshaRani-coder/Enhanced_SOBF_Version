import { handleRedirectCall, handleRedirectMail, handleRedirectMap } from '@/utils/SOBF_Map';


const Support = () => {
  return (
    <div className=" p-5 w-full pt-[10px] text-center">
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold my-4  text-blue relative  transition-all ease-in-out ">
        Your Support can change lives
        <hr className="mt-1 border-light-lavender border-[1px]" />
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-3 lg:px-32  ">
        {/* Location Card */}
        <div className="p-5  lg:w-[33%] w-[99%]">
          <div className="items-center flex flex-col">
            <button
              aria-label="Play Video"
              className="bg-[#fb4a59] justify-center flex rounded-[20px]  hover:bg-blue transition ease-in-out duration-500 delay-50"
              onClick={handleRedirectMap}
            >
              <svg
                className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>
            {/* Container for the location card text */}
            <div className="text-center">
              <h1 className="p-5 font-bold lg:text-2xl md:text-xl text-2xl pb-0">
                Our Location
              </h1>
              <h2 className="max-w-xs text-gray-600 lg:text-[16px] md:text-[13px] text-[16px]">
                Soul of Braj Federation Chaitnya Vihar Phase-2, Plot No: 9-10,
                Near Electric Sub Station, Durga Mandir, Vrindavan, UttarPradesh
                281121
              </h2>
            </div>
          </div>
        </div>

        {/* Contact Us Card */}
        <div className="p-5 lg:w-[33%] w-[99%]">
          {/* Container for the contact us card */}
          <div className="items-center flex flex-col">
            {/* Button to redirect to call */}
            <button
              aria-label="Play Video"
              className="bg-[#3da288] justify-center flex rounded-[20px]  hover:bg-blue transition ease-in-out duration-500 delay-50"
              onClick={handleRedirectCall}
            >
              <svg
                className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect x="4" y="13" rx="2" width="4" height="6" />
                <rect x="16" y="13" rx="2" width="4" height="6" />
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                <path d="M18 19a6 3 0 0 1 -6 3" />
              </svg>
            </button>
            {/* Container for the contact us card text */}
            <div className="text-center">
              <h1 className="p-5 font-bold lg:text-2xl md:text-xl text-2xl pb-0">
                Contact Us
              </h1>
              <h2 className="max-w-xs text-gray-600 md:text-[16px] text-[16px]">
                +91 8439406670
              </h2>
            </div>
          </div>
        </div>

        {/* Get in Touch Card */}
        <div className="p-5 lg:w-[33%] w-[99%]">
          {/* Container for the get in touch card */}
          <div className="items-center flex flex-col ">
            {/* Button to redirect to email */}
            <button
              aria-label="Play Video"
              className="bg-[#32aaf7] justify-center items-center flex rounded-[20px]  hover:bg-[#2D2339] transition ease-in-out duration-500 delay-50"
              onClick={handleRedirectMail}
            >
              <svg
                className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                ></path>
              </svg>
            </button>
            {/* Container for the get in touch card text */}
            <div className="text-center">
              <h1 className="p-5 font-bold lg:text-2xl md:text-xl text-2xl pb-0">
                Get in touch
              </h1>
              <h2 className="max-w-xs text-gray-600 md:text-[16px] text-[16px]">
                soulofbraj@gmail.com
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
