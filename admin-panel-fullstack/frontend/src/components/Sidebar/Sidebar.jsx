import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/sobfLogo.png';
import { SlCalender } from 'react-icons/sl';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import SidebarItem from './SidebarItem';
import { sidebarItems, upcomingEventItems } from './sidebarData';
import { getSidebarItemClass } from '../../utils/sidebarUtils';

const Sidebar = ({ isCollapsed, onOptionClick }) => {
  const location = useLocation();
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const isRouteActive = (pathname, path) => pathname === path;

  const isEventSectionActive = (pathname) =>
    pathname.startsWith('/upcoming-events');
  return (
    <div
      className={`transition-all duration-300 h-screen flex flex-col overflow-y-auto scrollbar-none pb-[50px] z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div
        className={`p-4 flex items-center space-x-4 ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        <img src={logo} alt="Logo" className="w-[50px]" />

        {!isCollapsed && (
          <span className="text-xl text-[#edb259] font-bold">Soul Of Braj</span>
        )}
      </div>

      <nav className="mt-10 flex-1">
        <ul className="space-y-2">
          {/* Upcoming Events Dropdown */}
          <li>
            <div
              onClick={() => {
                setIsEventsOpen((prev) => !prev);
                onOptionClick();
              }}
              className={`${getSidebarItemClass(
                isEventSectionActive(location.pathname),
              )} cursor-pointer`}
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

            {isEventsOpen && (
              <ul className="ml-8 space-y-1">
                {upcomingEventItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    item={item}
                    isCollapsed={isCollapsed}
                    isActive={isRouteActive(location.pathname, item.path)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionClick();
                    }}
                  />
                ))}
              </ul>
            )}
          </li>
          {/* Normal Sidebar Items */}
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              isCollapsed={isCollapsed}
              isActive={isRouteActive(location.pathname, item.path)}
              onClick={onOptionClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
