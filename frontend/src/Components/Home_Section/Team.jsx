import React from "react";
import { Link } from "react-router-dom";
import TarunMisra from "../../assets/OurTeam/TarunMisra.avif";
import DevRaturi from "../../assets/OurTeam/DevRaturi.avif";
import MarkRameshRamdeen from "../../assets/OurTeam/MarkRameshRamdeen.avif";
import SaurabhSinha from "../../assets/OurTeam/SaurabhSinha.avif";
import ShaluSharma from "../../assets/OurTeam/ShaluSharma.avif";

const Team = () => {
  return (
    <div className="bg-[#111827] mt-[30px] pb-[40px] flex flex-col items-center text-center w-full">
      <div className="w-[90%]">
        <h1 className="inline-block text-heading3 lg:text-heading2 font-bold  pt-5 text-logoYellow relative z-10 ">
          Meet Our Team
          <hr className="mt-1 border-light-lavender border-[0.5px]" />
        </h1>
      </div>
      <div className=" mt-[100px] team-cards flex flex-col items-center p-3 justify-center md:flex-row md:flex-wrap md:w-[80%] lg:w-[100%]  md:gap-x-[40px] md:gap-y-[20px] lg:gap-y-[40px] lg:gap-x-[100px]">
        {/* card 1 */}
        <div className="flex items-center flex-col gap-y-[5px] md:w-[300px]">
          <div
            className="w-[200px] h-[200px]  rounded-full"
            style={{
              backgroundImage: `url(${TarunMisra})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="flex flex-col gap-y-[10px] items-center">
            <div className="flex flex-col items-center  ">
              <span className="font-sans text-white font-bold mt-[10px] text-[16px] lg:text-[18px] ">
                TARUN MISRA
              </span>
             <p className="text-[12px] lg:text-[14px] font-workSans text-[rgba(255,255,255,0.5)]">
  Founder & Director at&nbsp; 
  <Link
    href="https://sobf.in"
    target="_blank"
    rel="noopener noreferrer"
    className="cursor-pointer text-[#4a8bed]"
  >
    SOBF
  </Link>
</p>
            </div>
            <div className="socials flex gap-x-[10px] ">
              <Link to={"https://www.linkedin.com/in/sobftarun/"}>
                <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  >
                    <path
                      fill="#0288D1"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                    ></path>
                  </svg>
                </div>
              </Link>
              <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 50 50"
                >
                  <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
              </div>
              <div className="bg-[#374151] hover:scale-[1.2] cursor-pointer p-[5px]  rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 48 48"
                >
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5"></stop>
                    <stop offset=".328" stopColor="#ff543f"></stop>
                    <stop offset=".348" stopColor="#fc5245"></stop>
                    <stop offset=".504" stopColor="#e64771"></stop>
                    <stop offset=".643" stopColor="#d53e91"></stop>
                    <stop offset=".761" stopColor="#cc39a4"></stop>
                    <stop offset=".841" stopColor="#c837ab"></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                    cx="11.786"
                    cy="5.54"
                    r="29.813"
                    gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#4168c9"></stop>
                    <stop
                      offset=".999"
                      stopColor="#4168c9"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                  ></path>
                  <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                  <path
                    fill="#fff"
                    d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="flex items-center flex-col gap-y-[5px] md:w-[300px]">
          <div
            className="w-[200px] h-[200px]   rounded-full"
            style={{
              backgroundImage: `url(${ShaluSharma})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="flex flex-col gap-y-[10px] items-center">
            <div className="flex flex-col items-center  ">
              <span className="font-sans text-white font-bold mt-[10px] text-[16px] lg:text-[18px] ">
                SHALU SHARMA
              </span>
              <p className="text-[12px] lg:text-[14px] font-workSans text-[rgba(255,255,255,0.5)]">
                Founder and Director at&nbsp;
                <Link
                  href="https://sobf.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#4a8bed]"
                >
                   SOBF
                </Link>
              </p>
            </div>
            <div className="socials flex gap-x-[10px] ">
              <Link
                to={
                  "https://www.linkedin.com/in/d-r-opt-shalu-sharma-353b70202/"
                }
              >
                <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  >
                    <path
                      fill="#0288D1"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                    ></path>
                  </svg>
                </div>
              </Link>
              <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 50 50"
                >
                  <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
              </div>
              <div className="bg-[#374151] hover:scale-[1.2] cursor-pointer p-[5px]  rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 48 48"
                >
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5"></stop>
                    <stop offset=".328" stopColor="#ff543f"></stop>
                    <stop offset=".348" stopColor="#fc5245"></stop>
                    <stop offset=".504" stopColor="#e64771"></stop>
                    <stop offset=".643" stopColor="#d53e91"></stop>
                    <stop offset=".761" stopColor="#cc39a4"></stop>
                    <stop offset=".841" stopColor="#c837ab"></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                    cx="11.786"
                    cy="5.54"
                    r="29.813"
                    gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#4168c9"></stop>
                    <stop
                      offset=".999"
                      stopColor="#4168c9"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                  ></path>
                  <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                  <path
                    fill="#fff"
                    d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>


        {/* card 3 */}
        <div className="flex items-center flex-col gap-y-[5px] md:w-[300px]">
          <div
            className="w-[200px] h-[200px] rounded-full"
            style={{
              backgroundImage: `url(${DevRaturi})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="flex flex-col gap-y-[10px] items-center ">
            <div className="flex flex-col items-center  ">
              <span className="font-sans text-white font-bold mt-[10px] text-[16px] lg:text-[18px] ">
                DEV RATURI
              </span>
              <p className="text-[12px] lg:text-[14px] font-workSans text-[rgba(255,255,255,0.5)]">
                Honorary Director &nbsp;
                <Link
                  href="https://sobf.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#4a8bed]"
                >
                  SOBF
                </Link>
              </p>
              <p className="text-[12px] mx-[10px] md:mx-0 lg:text-[14px] font-workSans text-[rgba(255,255,255,0.5)]">
                Founder & CEO at&nbsp;
                <Link
                  href="https://raturi.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#4a8bed]"
                >
                  Raturi Foundation
                </Link>
                &nbsp;&&nbsp;
                <Link
                  href="https://amberpalace.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#4a8bed]"
                >
                  Amber Palace
                </Link>
                &nbsp;Indian Restaurants, India and China
              </p>
            </div>
            <div className="socials flex gap-x-[10px] ">
              <Link to={"https://www.linkedin.com/in/sobftarun/"}>
                <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  >
                    <path
                      fill="#0288D1"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                    ></path>
                  </svg>
                </div>
              </Link>
              <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 50 50"
                >
                  <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
              </div>
              <div className="bg-[#374151] hover:scale-[1.2] cursor-pointer p-[5px]  rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 48 48"
                >
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5"></stop>
                    <stop offset=".328" stopColor="#ff543f"></stop>
                    <stop offset=".348" stopColor="#fc5245"></stop>
                    <stop offset=".504" stopColor="#e64771"></stop>
                    <stop offset=".643" stopColor="#d53e91"></stop>
                    <stop offset=".761" stopColor="#cc39a4"></stop>
                    <stop offset=".841" stopColor="#c837ab"></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                    cx="11.786"
                    cy="5.54"
                    r="29.813"
                    gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#4168c9"></stop>
                    <stop
                      offset=".999"
                      stopColor="#4168c9"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                  ></path>
                  <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                  <path
                    fill="#fff"
                    d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* card 4 */}
        <div className="flex items-center flex-col gap-y-[5px] md:w-[300px]">
          <div
            className="w-[200px] h-[200px]   rounded-full"
            style={{
              backgroundImage: `url(${SaurabhSinha})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="flex flex-col gap-y-[10px] items-center">
            <div className="flex flex-col items-center  ">
              <span className="font-sans text-white font-bold mt-[10px] text-[16px] lg:text-[18px] ">
                SAURABH SINHA
              </span>
              <p className="text-[12px] lg:text-[14px] font-workSans text-[rgba(255,255,255,0.5)]">
                Advisory Board Member at&nbsp;
                <Link
                  href="https://sobf.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#4a8bed]"
                >
                  SOBF
                </Link>
              </p>
              <p className="text-[12px] mx-[10px] md:mx-0 lg:text-[14px] font-workSans text-[rgba(255,255,255,0.5)]">
                  CEO & Founder- Indian Bureaucracy
                </p>
            </div>
            <div className="socials flex gap-x-[10px] ">
              <Link to={"https://www.linkedin.com/in/sobftarun/"}>
                <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  >
                    <path
                      fill="#0288D1"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                    ></path>
                  </svg>
                </div>
              </Link>
              <div className="bg-[#374151] p-[5px]  rounded-full hover:scale-[1.2] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 50 50"
                >
                  <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
              </div>
              <div className="bg-[#374151] hover:scale-[1.2] cursor-pointer p-[5px]  rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 48 48"
                >
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5"></stop>
                    <stop offset=".328" stopColor="#ff543f"></stop>
                    <stop offset=".348" stopColor="#fc5245"></stop>
                    <stop offset=".504" stopColor="#e64771"></stop>
                    <stop offset=".643" stopColor="#d53e91"></stop>
                    <stop offset=".761" stopColor="#cc39a4"></stop>
                    <stop offset=".841" stopColor="#c837ab"></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <radialGradient
                    id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                    cx="11.786"
                    cy="5.54"
                    r="29.813"
                    gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#4168c9"></stop>
                    <stop
                      offset=".999"
                      stopColor="#4168c9"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                  <path
                    fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                  ></path>
                  <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                  <path
                    fill="#fff"
                    d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
