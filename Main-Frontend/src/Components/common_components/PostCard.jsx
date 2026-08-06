import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ShareButton from './ShareButton.jsx';
import  formatDate  from '@/utils/formatDate';

const PostCard = ({ news, detailRoute, title, baseURL }) => {
  return (
    <div className="flex flex-col items-start md:p-[15px] w-full small-range:w-[90%] md:w-[350px] bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg md:min-h-[450px] lg:min-h-[500px]">
      <img
        src={
          news?.images?.length > 0
            ? news.images[0]?.url || news.images[0]
            : 'https://via.placeholder.com/600'
        }
        alt={news?.title}
        loading="lazy"
        decoding="async"
        className="w-full h-56 md:h-64 lg:h-72 rounded-lg object-cover"
      />

      <div className="px-[10px]">
        {/* Date */}
        <div className="flex items-center gap-x-[5px] mt-[15px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[10px]"
          >
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </svg>

          <span className="text-[13px]">
            {formatDate(news?.date)}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bold text-xl line-clamp-1">
          {news?.title}
        </h2>

        {/* Description */}
        <p
          className="md:text-lg line-clamp-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(news?.description).replace(
              /<a /g,
              '<a style="color:#4a90e2;" '
            ),
          }}
        />

        {/* Buttons */}
        <div className="flex gap-5">
          <Link
            to={`${detailRoute}/${news?._id}`}
            onClick={() => {
              sessionStorage.setItem('home-scroll', window.scrollY);
            }}
          >
            <button
              aria-label="View Details"
              className="my-[20px]  text-white  bg-gradient-to-r from-[#2d335d] to-[#44508f] focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105  font-semibold text-xs md:text-sm px-[12px] py-[6px] rounded-full transition-all duration-300 ease-in-out"
            >
              View Details
            </button>
          </Link>

          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-5"
          >
            <ShareButton
              title={title}
              url={`${baseURL}${detailRoute}/${news?._id}`}
               className="px-3 py-[6px] border-0 text-xs md:text-sm mb-3 inline-block font-bold rounded-full shadow-md bg-gradient-to-r from-[#2d335d] to-[#44508f] text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostCard);