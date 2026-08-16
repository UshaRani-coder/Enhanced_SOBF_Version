import React from 'react';
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl';

const ServiceCard = ({ item, index, onSelect }) => {
  return (
    <li
      data-aos="fade-up"
      data-aos-delay={`${index * 50}`}
      className="group service rounded-tl-[50px] rounded-br-[50px] cursor-pointer mx-2 w-[90%] small-max:w-[85%] md:w-[35%] lg:w-[25%] relative overflow-hidden h-[300px] flex flex-col items-center justify-center transition-all duration-500 hover:backdrop-blur-md hover:bg-opacity-80"
      style={{
        backgroundColor: item.color,
        backgroundImage: `linear-gradient(
    rgba(45, 51, 93, 0.5),
    rgba(45, 51, 93, 0.5)
  ), url(${getCloudinaryUrl(item.images[0], 640)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
      onClick={() => onSelect(item.title)}
    >
      <div className="px-[20px] service-content relative z-40 h-full flex flex-col items-center justify-center">
        <img
          src={getCloudinaryUrl(item.logo, 100)}
          alt={`${item.title} logo`}
          loading="lazy"
          decoding="async"
          width="40"
          height="40"
          className="w-[40px] h-[40px] invert"
        />

        <h2 className="text-[20px] text-center text-white font-bold">
          {item.title}
        </h2>

        <p className="pt-[5px] text-center text-[16px] lg:text-[18px] text-white">
          {item.small_description}
        </p>
      </div>

      <div className="absolute inset-0 bg-black group-hover:opacity-0 opacity-30 transition-opacity duration-500" />
    </li>
  );
};

export default React.memo(ServiceCard);
