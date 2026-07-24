import React from 'react';

const FilterBar = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  years = [],
  months = [],
  
}) => {
  return (
    <div className="flex gap-2 small-range:gap-4 mb-5 items-center">
      {/* Year Filter */}
      <select
        className="border-none bg-[rgb(221,231,253)] text-[rgb(23,37,84)]
          font-bold md:px-4 px-2 py-2 rounded-md shadow-md cursor-pointer
          transition-all duration-300 hover:bg-[rgb(200,219,252)]
          focus:ring-2 focus:ring-[rgb(125,168,252)] focus:outline-none"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Filter by Year</option>

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Month Filter */}
      <select
        className="border-none bg-[rgb(221,242,228)] text-[rgb(16,63,32)]
          font-bold md:px-4 px-2 py-2 rounded-md shadow-md cursor-pointer
          transition-all duration-300 hover:bg-[rgb(195,230,209)]
          focus:ring-2 focus:ring-[rgb(125,200,160)] focus:outline-none"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Filter by Month</option>

        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(FilterBar);