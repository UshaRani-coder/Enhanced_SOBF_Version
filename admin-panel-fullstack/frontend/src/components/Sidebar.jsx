
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/sobfLogo.avif";
import {FaPen, FaChartBar, FaTable, } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";


const Sidebar = ({ isCollapsed, onOptionClick }) => {
  const location = useLocation();

  return (
    <div className={`transition-all duration-300 h-screen flex flex-col  ${isCollapsed ? "w-20" : "w-64"}`}>
      <div className={`p-4 flex items-center space-x-4 ${isCollapsed ? "justify-center" : ""}`} >
        <img src={logo} alt="Logo" className="w-[50px]" />
        {!isCollapsed && (<span className="text-xl text-[#edb259] font-bold">Soul Of Braj</span>)}
      </div>
      <nav className="mt-10 flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              onClick={onOptionClick} // Hide sidebar on option click
              className={`flex items-center pt-2 pb-2  w-[90%] ${location.pathname === "/"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <RiAdminFill className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">Admin</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/hero-banner"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === "/hero-banner"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
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
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === "/our-impacts"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              {/* <FaTable className="text-lg ml-4" /> */}
              <FiTarget className="text-xl ml-4 " />
              {!isCollapsed && <span className="ml-4">Our impacts </span>}
            </Link>
          </li>
          <li>
            <Link
              to="/featured-videos"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === "/featured-videos"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
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
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === "/legalDoc"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <IoDocuments className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Legal Docs</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/recent-activities"
              onClick={onOptionClick}
              className={`flex items-center pt-2 pb-2  w-[90%] ${location.pathname === "/recent-activities"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
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
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === "/bulletine"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaRegNewspaper className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4"> Bulletins </span>}
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              onClick={onOptionClick}
              className={`flex items-center pb-2 pt-2 w-[90%] ${location.pathname === "//gallery"
                ? "text-white bg-[rgb(39,39,79)]"
                : "text-[rgba(255,255,255,0.7)]"
                } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <GrGallery className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4"> Gallery </span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
