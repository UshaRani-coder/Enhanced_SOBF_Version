import React from 'react';
import DOMPurify from 'dompurify';
import { MdEdit, MdDelete } from 'react-icons/md';

const TeamList = ({ teams, onEdit, onDelete }) => {
  return (
    <div className="mt-6 flex flex-col items-center md:items-stretch p-6 small-max:p-0 md:p-6 justify-center md:flex-row md:flex-wrap md:justify-start w-[100%] md:gap-x-[40px] gap-y-[45px] md:gap-y-[60px] lg:gap-y-[40px] lg:gap-x-[100px]">
      {teams && teams.length > 0 ? (
        teams.map((member, index) => (
          <div
            key={member._id || index}
            className="flex items-center flex-1 flex-col gap-y-[5px] md:gap-y-[10px] w-[300px]"
          >
            {/* Profile Image */}
            <div
              className="w-[200px] h-[200px] rounded-full"
              style={{
                backgroundImage: `url(${
                  member?.image || 'https://via.placeholder.com/150'
                })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* Name + Role */}
            <div className="flex flex-col items-center">
              <span className="font-bold mt-[10px] text-[16px] lg:text-[18px]">
                {member?.name}
              </span>

              <div
                className="text-[14px] md:text-[16px] break-words max-w-[280px] text-center"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(member.role).replace(
                    /<a /g,
                    '<a style="color:#4a90e2" ',
                  ),
                }}
              />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-x-[12px]">
              {/* LinkedIn */}
              <a
                href={member?.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20px"
                  fill="#146EBE"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={member?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[25px] h-[25px]"
                  x="0px"
                  y="0px"
                  width="10"
                  height="10"
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
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
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
                    d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
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
              </a>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                onClick={() => onEdit(member)}
              >
                <MdEdit className="text-blue-800 text-2xl" />
                Edit
              </button>

              <button
                className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2 shadow-lg transition duration-300 hover:shadow-xl"
                onClick={() => onDelete(member._id)}
              >
                <MdDelete className="text-red-800 text-2xl" />
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
         <div className="flex w-full justify-center">
        <p>No team members found.</p>
        </div>
      )}
    </div>
  );
};

export default TeamList;
