/* eslint-disable react/prop-types */
import { useState } from "react";
import { data } from "../../Constant/data";
// import { data } from "../../Constant/data";

function Accordion() {
  // State to keep track of which FAQ is currently selected/open
  const [selected, setSelected] = useState(null);

  // Function to handle opening/closing of FAQs
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Split data into two arrays for left and right columns
  const leftColumnData = data.slice(0, Math.ceil(data.length / 2));
  const rightColumnData = data.slice(Math.ceil(data.length / 2));

  return (
    // Outer container with full width and padding
    <div className="w-full max-w-full p-5">
      {/* Inner container for centering content */}
      <div className="flex flex-col items-center justify-center p-4">
        {/* Content wrapper with maximum width */}
        <div className="w-full max-w-[1200px] text-center">
        <h1 className="inline-block text-heading3 lg:text-heading2  font-bold mb-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
            Frequently Asked Questions
            <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
          </h1>
          <h1 className="text-center text-2xl font-bold">
            We work with Satisfaction, encourage groups, and our members are nationwide
          </h1>
          <h1 className="text-center text-xl mb-12 p-3 text-gray-600">
            Explore common inquiries about collaborating, volunteering, donations, and our mission to help people in need.
          </h1>
          {/* Flex container for columns, switches to row layout on medium screens */}
          <div className="flex flex-col md:flex-row gap-[20px] lg:gap-[80px]">
            {/* Left column */}
            <div className="w-full md:w-1/2 space-y-4 text-justify">
              {leftColumnData.map((dataItem) => (
                <AccordionItem
                  key={dataItem.id}
                  dataItem={dataItem}
                  isSelected={selected === dataItem.id}
                  onSelect={handleSingleSelection}
                />
              ))}
            </div>
            {/* Right column */}
            <div className="w-full md:w-1/2 space-y-4 text-justify">
              {rightColumnData.map((dataItem) => (
                <AccordionItem
                  key={dataItem.id}
                  dataItem={dataItem}
                  isSelected={selected === dataItem.id}
                  onSelect={handleSingleSelection}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for individual FAQ items
function AccordionItem({ dataItem, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(dataItem.id)}
      className="bg-white border border-gray-300 rounded-md shadow-md overflow-hidden hover:bg-gray-50 transition-all duration-300"
    >
      {/* FAQ question and toggle button */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold pr-4 hover:text-blue">{dataItem.question}</h2>
        {/* Toggle icon, changes based on selected state */}
        <span className="text-2xl font-bold flex-shrink-0 text-logo-yellow">
          {isSelected ? '-' : '+'}
        </span>
      </div>
      
      {/* FAQ answer, only shown when selected */}
      {isSelected && (
        <>
        <hr className="pb-2"/>
        <div className="px-4 pb-4 text-gray-600">{dataItem.answer}</div>
        </>
      )}
    </div>
  );
}

export default Accordion;
