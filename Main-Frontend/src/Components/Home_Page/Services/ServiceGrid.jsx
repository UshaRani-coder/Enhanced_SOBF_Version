import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceGrid = ({ services, onSelect }) => {
  return (
    <ul className="services w-full mt-[20px] flex flex-col items-center gap-y-[30px] md:gap-y-[70px] md:flex-row md:justify-center md:gap-x-[60px] lg:gap-x-[30px] md:flex-wrap">
      {services.map((item, index) => (
        <ServiceCard
          key={item._id}
          item={item}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default React.memo(ServiceGrid);