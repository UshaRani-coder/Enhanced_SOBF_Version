import React from "react";

const ContactUs = () => {
  return (
    // Main container for the Contact Us section
    <div className="bg-orange-100 p-10 w-full">
      {/* Section title */}
      <h1 className="text-center text-4xl font-bold mb-4 p-5 text-orange hover:text-blue relative hover:text-blue-900 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] md:pt-[70px]">
        Your Support can change lives
      </h1>

      {/* Container for the contact information cards */}
      <div className="flex flex-col lg:flex-row justify-center gap-3 px-32  ">
        
        {/* Location Card */}
        <div className="p-5  lg:w-[33%] w-[99%]">
          <div className="items-center flex flex-col">
            <div className="bg-[#ff7700] justify-center flex rounded-[20px] p-4 hover:bg-blue">
              <svg
                className="h-28 w-28 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="p-5 font-bold text-2xl">Our Location</h1>
              <h3 className="max-w-xs text-gray-600">
                Soul of Braj Federation Chaitnya Vihar Phase-2, Plot No: 9-10,
                Near Electric Sub Station, Durga Mandir, Vrindavan, UttarPradesh
                281121
              </h3>
            </div>
          </div>
        </div>

        {/* Contact Us Card */}
        <div className="p-5 lg:w-[33%] w-[99%]">
          <div className="items-center flex flex-col">
            <div className="bg-[#ff7700] justify-center flex rounded-[20px] p-4 hover:bg-blue">
              <svg
                className="h-28 w-28 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect x="4" y="13" rx="2" width="4" height="6" />
                <rect x="16" y="13" rx="2" width="4" height="6" />
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                <path d="M18 19a6 3 0 0 1 -6 3" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="p-5 font-bold text-2xl">Contact Us</h1>
              <h3 className="max-w-xs text-gray-600">+91 8439406670</h3>
            </div>
          </div>
        </div>

        {/* Get in Touch Card */}
        <div className="p-5 lg:w-[33%] w-[99%]">
          <div className="items-center flex flex-col ">
            <div className="bg-[#ff7700] justify-center items-center flex rounded-[20px] p-4 hover:bg-[#2D2339]">
              <svg
                className="h-28 w-28 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="p-5 font-bold text-2xl">Get in touch</h1>
              <h3 className="max-w-xs text-gray-600">soulofbraj@gmail.com</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
