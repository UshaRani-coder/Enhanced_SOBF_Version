import React from 'react';

const PageHeader = ({ title, subtitle, description }) => {
  return (
    <div className="w-full text-center px-4 mb-2">
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold p-5 text-[#2d335d]">
        {title}
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>

      {subtitle && (
        <h2 className="text-center text-lg small-range:text-[20px] md:text-2xl font-bold px-2">
          {subtitle}
        </h2>
      )}

      {description && (
        <p className="text-center text-md small-range:text-lg md:text-xl mb-2 p-3 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default React.memo(PageHeader);