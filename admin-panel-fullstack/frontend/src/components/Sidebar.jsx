import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/sobfLogo.png';
import { FiTarget } from 'react-icons/fi';
import { IoDocuments } from 'react-icons/io5';
import { GrGallery } from 'react-icons/gr';
import { RiAdminFill, RiServiceFill } from 'react-icons/ri';
import { SlCalender } from 'react-icons/sl';
import { FaUsers, FaAngleDown, FaAngleUp, FaPen, FaTable, FaYoutube, FaRegNewspaper } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, onOptionClick }) => {
  const location = useLocation();
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  
  return (
    <div
      className={`transition-all duration-300 h-screen flex flex-col overflow-y-auto scrollbar-none pb-[50px] z-70  ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div
        className={`p-4 flex items-center space-x-4 ${isCollapsed ? 'justify-center' : ''}`}
      >
        <img src={logo} alt="Logo" className="w-[50px]" />
        {!isCollapsed && (
          <span className="text-xl text-[#edb259] font-bold">Soul Of Braj</span>
        )}
      </div>
      <nav className="mt-10 flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              onClick={onOptionClick} // Hide sidebar on option click
              className={`flex items-center pt-2 pb-2  w-[90%] ${location.pathname === '/dashboard'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <RiAdminFill className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">Team Members</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/hero-banner"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === '/hero-banner'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaTable className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Hero Banner </span>}
            </Link>
          </li>
          <li>
            <Link
              to="/our-impacts"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === '/our-impacts'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              {/* <FaTable className="text-lg ml-4" /> */}
              <FiTarget className="text-xl ml-4 " />
              {!isCollapsed && <span className="ml-4">Our impacts </span>}
            </Link>
          </li>
          <li>
            <div
              onClick={() => {
                setIsEventsOpen(!isEventsOpen);
                onOptionClick(); // Ensure sidebar hides if needed
              }}
              className={`flex items-center pb-2 pt-2 w-[90%] cursor-pointer ${location.pathname.startsWith('/upcoming-events')
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <SlCalender className="text-lg ml-4" />
              {!isCollapsed && (
                <>
                  <span className="ml-4">Upcoming Events</span>
                  {isEventsOpen ? (
                    <FaAngleUp className="ml-auto mr-4" />
                  ) : (
                    <FaAngleDown className="ml-auto mr-4" />
                  )}
                </>
              )}
            </div>

            {/* Submenu Items */}
            {isEventsOpen && (
              <ul className="ml-8 space-y-1">
                <li>
                  <Link
                    to="/upcoming-events"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent closing menu on click
                      onOptionClick();
                    }}
                    className={`flex items-center pb-2 pt-2 mt-2 w-[90%] ${location.pathname === '/upcoming-events'
                        ? 'text-white bg-[rgb(39,39,79)]'
                        : 'text-[rgba(255,255,255,0.7)]'
                      } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
                  >

                    <SlCalender className="text-lg ml-4" />
                    {!isCollapsed && <span className="ml-4">Upcoming Events</span>}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upcoming-events/registered-users"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionClick();
                    }}
                    className={`flex items-center pb-2 pt-2 w-[90%] mt-2 ${location.pathname === '/upcoming-events/registered-users'
                        ? 'text-white bg-[rgb(39,39,79)]'
                        : 'text-[rgba(255,255,255,0.7)]'
                      } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
                  >
                    <FaUsers className="text-lg ml-4" />
                    {!isCollapsed && <span className="ml-4">Registered Users</span>}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/featured-videos"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === '/featured-videos'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaYoutube className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Featured Videos</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/legalDoc"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === '/legalDoc'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <IoDocuments className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Legal Documents</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/recent-activities"
              onClick={onOptionClick}
              className={`flex items-center pt-2 pb-2  w-[90%] ${location.pathname === '/recent-activities'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaPen className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">Recent Activities</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/bulletine"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === '/bulletine'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaRegNewspaper className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">News Bulletins </span>}
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === '/gallery'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <GrGallery className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4"> Gallery </span>}
            </Link>
          </li>
          <li>
            <Link
              to="/our-services"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === '/our-services'
                  ? 'text-white bg-[rgb(39,39,79)]'
                  : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <RiServiceFill className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4"> Our Services </span>}
            </Link>
          </li>
          <li>
            <Link
              to="/volunteer"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] mt-2 ${location.pathname === '/volunteer'
                ? 'text-white bg-[rgb(39,39,79)]'
                : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaUsers className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Volunteer</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/donate-for"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] mt-2 ${location.pathname === '/donate-for'
                ? 'text-white bg-[rgb(39,39,79)]'
                : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaUsers className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Donate For</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/subscribed-donors"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] mt-2 ${location.pathname === '/subscribed-donors'
                ? 'text-white bg-[rgb(39,39,79)]'
                : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaUsers className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Subscribed Donor</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/donors"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] mt-2 ${location.pathname === '/donors'
                ? 'text-white bg-[rgb(39,39,79)]'
                : 'text-[rgba(255,255,255,0.7)]'
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaUsers className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Donor Info</span>}
            </Link>
          </li>
          {/* {DonorDashboard} */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
