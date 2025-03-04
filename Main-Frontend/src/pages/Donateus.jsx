import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import education from '../assets/banner2.png';
import food from '../assets/Sobf Images/food distribution/FoodDonation.png';
import objective from '../assets/objective.png';
import donate from '../assets/donateMotive.png';
import { donors_words } from '../Constant/data';
import { our_donors } from '../Constant/data';
import Donate_hero from '../Components/Donate_page/donate_hero.jsx';
import PaymentScreenshot from '../assets/Sobf Images/PaymentScreenshot.png';
import Impacts from '../Components/Home_Section/Impacts.jsx';
import QRCode from '../assets/QRCode.png';
const Donateus = () => {
  const [activeTab, setActiveTab] = useState('whydonate');
  const location = useLocation();
  useEffect(() => {
      if (location.pathname === '/donate-us') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, [location.pathname]);

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'whydonate':
        return (
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 sm:gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={objective} // Use curly braces here, not angle brackets
                alt="Community Service Projects"
                className="mt-4 md:w-full sm:w-1/2 lg:h-[60vh] sm:h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2 pt-[20px] md:pt-0  ">
              <p className="text-[16px] md:text-lg text-gray-600 text-center md:text-left lg:leading-[30px]">
                Donating to us means contributing to a mission dedicated to
                simplifying complex processes, enhancing efficiency, and driving
                growth through innovative services. We empower communities to
                navigate the ever-changing tech landscape, ensuring that
                resources reach those in need effectively. Your donation
                supports our diverse programs that address fundamental issues
                such as poverty, hunger, health, education, gender equality, and
                sanitation. By supporting us, you become part of a movement that
                has already impacted over 15,000 lives, distributed essential
                items, and fostered community development. Join us in making a
                tangible difference in countless lives.
              </p>
            </div>
          </div>
        );

      case 'howweuse':
        return (
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={food} // Use curly braces here, not angle brackets
                alt="Community Service Projects"
                className="mt-4 md:w-full sm:w-1/2 h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2   ">
              <p className="text-[16px] md:text-lg text-gray-600 text-center md:text-left lg:leading-[30px]">
                We utilize donations strategically to maximize their impact on
                the communities we serve. Funds are allocated to various
                programs that address critical needs such as food distribution,
                sanitary napkin distribution, and providing access to clean
                water and sanitation. Our programs focus on sustainable
                development and community empowerment, ensuring that each dollar
                donated translates into real-world benefits. We maintain
                transparency and efficiency in our operations, ensuring that
                donations are used effectively to support our mission.
                Additionally, we invest in our volunteers, enhancing their
                ability to serve and expand our reach to more individuals and
              </p>
            </div>
          </div>
        );

      case 'whereweuse':
        return (
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={education} // Use curly braces here, not angle brackets
                alt="Community Service Projects"
                className="mt-4 md:w-full sm:w-1/2 h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2   ">
              <p className="text-[16px] md:text-lg text-gray-600 text-center md:text-left ">
                Your generous donations are used across multiple impactful
                programs and initiatives. Our focus areas include addressing
                poverty, hunger, health and well-being, quality education,
                gender equality, and clean water and sanitation. We have reached
                over 15,000 lives, distributed food and sanitary napkins, and
                engaged over 200 volunteers in our efforts. Our community
                service projects, such as Anna Vitran Seva, Swachh & Swasth
                Vrindavan, and the Brajkulam Community Center, are designed to
                foster sustainable development and community well-being. By
                contributing, you are directly supporting these programs and
                helping us extend our reach to more villages and individuals in
                need.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Hero section */}
      <Donate_hero />

      {/* Tabs */}
      <div className="w-full lg:w-full px-4 mt-10">
        <div className="flex">
          <button
            aria-label="Play Video"
            className={`poppins-medium  w-[33.3%] px-3 py-2 rounded-tl-lg text-sm md:text-lg ${
              activeTab === 'whydonate'
                ? 'text-white bg-logoYellow'
                : 'bg-light-lavender text-gray-700'
            }`}
            onClick={() => setActiveTab('whydonate')}
          >
            Why donate us
          </button>
          <button
            aria-label="Play Video"
            className={`poppins-medium w-[33.3%]  px-3 py-2 text-sm md:text-lg  ${
              activeTab === 'howweuse'
                ? 'text-white bg-logoYellow'
                : 'bg-light-lavender text-gray-700'
            }`}
            onClick={() => setActiveTab('howweuse')}
          >
            How we use
          </button>
          <button
            aria-label="Play Video"
            className={`poppins-medium w-[33.3%]  px-3 py-2 rounded-tr-lg text-sm md:text-lg  ${
              activeTab === 'whereweuse'
                ? 'text-white bg-logoYellow'
                : 'bg-light-lavender text-gray-700'
            }`}
            onClick={() => setActiveTab('whereweuse')}
          >
            Where we use
          </button>
        </div>
        <div className="p-4 py-8 bg-gray-50 rounded-b-lg text-lg rounded-lg border ">
          {renderContent()}
        </div>
      </div>

      {/* dynamic number datas */}
      <div className="max-w[90%] text-center">
        <h1 className="inline-block text-[29px] small-range:text-heading3 lg:text-heading2 font-bold my-4 p-5 text-blue ">
          Our Achievements
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <Impacts />
      </div>

      {/* Donate form */}
      <div id="donate-form">
        {/* Title section for the donate form */}
        <div className="min-h-screen  p-6 bg-gray-100 flex  items-center justify-center rounded-lg ">
          {/* Container for the donate form */}
          <div className="container max-w-screen-lg mx-auto md:mt-32 md:mb-16 mt-28 mb-10 flex flex-col items-center">
            <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6 md:w-[100%]">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                <div className="text-gray-600">
                  <div className="flex justify-center">
                    <span className="font-medium md:text-[2rem] text-logoYellow text-heading4 py-3 pr-2">
                      Personal
                    </span>

                    <span className="font-medium md:text-[2rem] text-logo-blue text-heading4 py-3">
                      Details
                    </span>
                  </div>

                  <p className="pt-1.5 lg:pb-0 pb-4 flex justify-center">
                    Please fill out all the fields.
                  </p>
                </div>

                <div className="w-full">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 ">
                    <div className="md:flex md:justify-center md:items-center md:gap-[30px] ">
                      <div className="md:w-[75%] lg:w-[100%]">
                        <div className="md:col-span-5 mt-[10px]">
                          <label htmlFor="first_name">Full Name</label>
                          <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                            placeholder="Full Name"
                            required
                            minLength="2"
                          />
                        </div>
                        <div className="md:col-span-5 mt-[10px]">
                          <label htmlFor="dob">Date of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            id="dob"
                            placeholder="dd/mm/yyyy"
                            className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                            required
                          />
                        </div>
                        <div className="md:col-span-5 mt-[10px]">
                          <label htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                            placeholder="example@gmail.com"
                            required
                          />
                        </div>

                        <div className="md:col-span-5 mt-[10px]">
                          <label htmlFor="phone">Mobile Number</label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                            placeholder="Mobile Number"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center  gap-[15px] md:mt-[20px] hidden md:block md:w-[200px] lg:w-[30%] ">
                        <p className=" text-lg font-semibold ">
                          Scan the QR code to proceed:
                        </p>
                        <img
                          src={QRCode}
                          alt="QR Code"
                          className="w-32 h-32 md:w-[200px] md:h-[200px] mt-4 mx-auto md:mx-0"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pan">PAN Number</label>
                      <input
                        type="text"
                        name="pan"
                        id="pan"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender placeholder:text-[10px] small-max:placeholder:text-[12px] md:placeholder:text-[14px]"
                        placeholder="Enter a valid PAN number (e.g., ABCDE1234F)"
                        maxLength="10"
                      />
                    </div>
                    <div className="md:col-span-5 ">
                      <label htmlFor="aadhar">Aadhar Number (Optional)</label>
                      <input
                        type="number"
                        name="aadhar"
                        id="aadhar"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender placeholder:text-[10px] small-max:placeholder:text-[12px] md:placeholder:text-[14px]"
                        placeholder="Enter a valid 12-digit Aadhaar number (e.g., 123456789012)"
                        maxLength="12"
                        pattern="\d{12}"
                        color="#edf1ffdb"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pin">PIN Code</label>
                      <input
                        type="number"
                        name="pin"
                        id="pin"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="ex. 236790"
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="donation_for">Donation For</label>
                      <select
                        name="donation_for"
                        id="donation_for"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        required
                      >
                        <option value="">Select Program/Service</option>
                        <option value="program1">
                          Child and Education empowerment
                        </option>
                        <option value="program2">Children activities</option>
                        <option value="program3">Food distribution</option>
                        <option value="program3">Women empowerment</option>
                        <option value="program3">Health awareness camp</option>
                        <option value="program3">
                          Sanitary pads distribution
                        </option>
                        <option value="program3">Face mask distribution</option>
                      </select>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="donation_amount">Donation Amount</label>
                      <input
                        type="number"
                        name="donation_amount"
                        id="donation_amount"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="transaction_id">Transaction ID</label>
                      <input
                        type="number"
                        name="transaction_id"
                        id="transaction_id"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender placeholder:text-[10px] small-max:placeholder:text-[12px] md:placeholder:text-[14px]"
                        placeholder="Enter the ID of transaction (e.g., TXN12345ABC67890)"
                        required
                      />
                    </div>
                    <div className="md:col-span-5 md:hidden">
                      <div className="flex flex-col items-center gap-[15px] mt-[20px] ">
                        <p className="block text-md small-range:text-lg font-semibold">
                          Scan the QR code to proceed:
                        </p>
                        <img
                          src={QRCode}
                          alt="QR Code"
                          className="w-[80%] h-[80%] mx-auto md:mx-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col  md:flex-row justify-center pt-10 md:gap-10 gap-3">
                <button
                  aria-label="Play Video"
                  className="text-white bg-blue hover:bg-logoYellow border-gray-300 focus:outline-none  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation opportunity Image*/}
      <div className="pt-10">
        <img
          src={donate}
          alt="donation oppurtunity"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Donateus;
