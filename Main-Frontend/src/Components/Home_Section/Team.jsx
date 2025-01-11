import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../Reducers/TeamSlice";

const Team = () => {
  const { teams, status, error } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div className="bg-[#111827] mt-[30px] pb-[40px] flex flex-col items-center text-center w-full">
      <div className="w-[90%]">
        <h1 className="inline-block text-heading3 lg:text-heading2 font-bold pt-5 text-logoYellow relative z-10">
          Meet Our Team
          <hr className="mt-1 border-light-lavender border-[0.5px]" />
        </h1>
      </div>

      {status === "loading" && <p className="text-white">Loading...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      <div className="mt-[50px] team-cards flex flex-col items-center p-3 justify-center md:flex-row md:flex-wrap md:w-[80%] lg:w-[100%] md:gap-x-[40px] gap-y-[25px] md:gap-y-[20px] lg:gap-y-[40px] lg:gap-x-[100px]">
        {teams.map((item) => (
          <div key={item._id} className="flex items-center flex-col gap-y-[5px] md:w-[300px]">
            {/* Team Member Image */}
            <div
              className="w-[200px] h-[200px] rounded-full"
              style={{
                backgroundImage: `url(${item.image || "/default-avatar.png"})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {/* Team Member Details */}
            <div className="flex flex-col gap-y-[10px] items-center">
              <span className="font-sans text-white font-bold mt-[10px] text-[16px] lg:text-[18px]">
                {item.name}
              </span>
              <p className="text-[12px] lg:text-[14px] font-workSans text-[rgba(255,255,255,0.5)]">
                {item.role}
              </p>

              {/* Social Links */}
              <div className="socials flex gap-x-[10px]">
                {item.linkedIn && (
                  <a
                    href={item.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#374151] p-[5px] rounded-full hover:scale-[1.2] cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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
                  </a>
                )}

                {item.instagram && (
                  <a
                    href={item.instagram.startsWith("http") ? item.instagram : `http://${item.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#374151] p-[5px] rounded-full hover:scale-[1.2] cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" x="0px" y="0px" width="10" height="10" viewBox="0 0 48 48">
                      <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5"></stop><stop offset=".328" stopColor="#ff543f"></stop><stop offset=".348" stopColor="#fc5245"></stop><stop offset=".504" stopColor="#e64771"></stop><stop offset=".643" stopColor="#d53e91"></stop><stop offset=".761" stopColor="#cc39a4"></stop><stop offset=".841" stopColor="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"></stop><stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
