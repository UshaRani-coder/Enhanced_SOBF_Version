// import React, { useState } from "react";
// import logo from "../../assets/logo.png";
// import "../../App.css";
// import { NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [isActive, setIsActive] = useState(false);
//   const toggleMenu = () => {
//     setIsActive(!isActive);
//   };

//   const closeMenu = () => {
//     setIsActive(false);
//   };

//   const navItemClass = "text-primary hover:text-[#ff7700] ";
//   const activeNavItemClass = "text-[#ff7700] underline";

//   return (
//     <nav className="cursor-pointer w-[100%] md:flex md:pr-[30px] md:items-center font-poppins text-xl">
//       <div className="flex w-[100%] justify-between items-center p-[15px]">
//         <img src={logo} alt="logo" width={"90px"} />
//         <div
//           className={`ham-menu md:hidden flex flex-col gap-y-[4px] justify-center ${isActive ? "active" : ""}`}
//           onClick={toggleMenu}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>
//       <ul className={`nav-items ${isActive ? "active" : ""} flex flex-col items-center md:flex-row md:gap-x-[20px] hidden md:flex`}>
//         <li>
//           <NavLink
//             exact
//             to="/"
//             className={navItemClass}
//             activeClassName={activeNavItemClass}
//           >
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/about-us"
//             className={navItemClass}
//             activeClassName={activeNavItemClass}
//           >
//             About
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/vision"
//             className={navItemClass}
//             activeClassName={activeNavItemClass}
//           >
//             Vision
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/gallery"
//             className={navItemClass}
//             activeClassName={activeNavItemClass}
//           >
//             Gallery
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/contact-us"
//             className={navItemClass}
//             activeClassName={activeNavItemClass}
//           >
//             Contact
//           </NavLink>
//         </li>
//         <li className={navItemClass}>More</li>
//         <div>
//           <button className="bg-orange hover:bg-blue py-2 px-6 text-[#ffffff] rounded-lg font-semibold">Donate</button>
//         </div>
//       </ul>

//       {/* Mobile Menu */}
//       {isActive && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50"
//           onClick={closeMenu}
//         >
//           <div
//             className="bg-white rounded-lg p-5 w-[90%] max-w-md mx-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <ul className="flex flex-col items-center gap-y-8 mt-4">
//               <li>
//                 <NavLink
//                   exact
//                   to="/"
//                   className={navItemClass}
//                   activeClassName={activeNavItemClass}
//                   onClick={closeMenu}
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about-us"
//                   className={navItemClass}
//                   activeClassName={activeNavItemClass}
//                   onClick={closeMenu}
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/vision"
//                   className={navItemClass}
//                   activeClassName={activeNavItemClass}
//                   onClick={closeMenu}
//                 >
//                   Vision
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/gallery"
//                   className={navItemClass}
//                   activeClassName={activeNavItemClass}
//                   onClick={closeMenu}
//                 >
//                   Gallery
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact-us"
//                   className={navItemClass}
//                   activeClassName={activeNavItemClass}
//                   onClick={closeMenu}
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               <div>
//                 <button className="bg-orange py-2 w-80 hover:bg-blue px-6 text-[#ffffff] rounded-lg font-semibold">
//                   Donate
//                 </button>
//               </div>
//             </ul>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import "../../App.css";
const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  
  const navItemClass = "text-primary hover:text-[#ff7700] ";
  const activeNavItemClass = "text-[#ff7700] underline";
  return (
    <nav className="cursor-pointer w-[100%] md:flex md:pr-[15px] md:items-center top-[55px] md:top-[60px] fixed z-50 bg-[#ffffff]">
      <div className="flex w-[100%] justify-between items-center p-[15px]">
        <img src={logo} alt="logo" width={"70px"} />
        <div
          className={`ham-menu md:hidden flex flex-col gap-y-[4px] justify-center ${
            isActive ? "active" : ""
          }`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul
        className={`nav-items ${
          isActive ? "active" : ""
        } flex flex-col items-center gap-y-[20px] hidden md:flex  md:flex-row  md:gap-x-[20px]`}
        
      >
        <li className="hover:text-[#ff7700] font-semibold mt-[20px] md:mt-0">
          <NavLink
            to="/"
            className={navItemClass}
            activeClassName={activeNavItemClass}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
        </li>
        <li className="hover:text-[#ff7700] font-semibold">
          <NavLink
            to="/about-us"
            className={navItemClass}
            activeClassName={activeNavItemClass}
            onClick={toggleMenu}
          >
            About
          </NavLink>
        </li>
        <li className="hover:text-[#ff7700] font-semibold">
          <NavLink
            to="/vision"
            className={navItemClass}
            activeClassName={activeNavItemClass}
            onClick={toggleMenu}
          >
            Vision
          </NavLink>
        </li>
        <li className="hover:text-[#ff7700] font-semibold">
          <NavLink
            to="/gallery"
            className={navItemClass}
            activeClassName={activeNavItemClass}
            onClick={toggleMenu}
          >
            Gallery
          </NavLink>
        </li>
        <li className="hover:text-[#ff7700] font-semibold">
          <NavLink
            to="/contact-us"
            className={navItemClass}
            activeClassName={activeNavItemClass}
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </li>
        <li className="hover:text-[#ff7700] font-semibold">
          <NavLink
            to="/more"
            className={navItemClass}
            activeClassName={activeNavItemClass}
            onClick={toggleMenu}
          >
            More
          </NavLink>
        </li>
        <div>
          <button className="bg-[#ff7700] p-[5px] px-[20px] text-[#ffffff] rounded font-semibold">
            Donate
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
