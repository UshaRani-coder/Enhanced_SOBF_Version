import React, { useState } from 'react';
import DonateForModel from './DonateForModel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DonationOptions = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const donationCategories = [
    {
      id: 1,
      title: "Donate for Food",
      description: "Help provide nutritious meals to underprivileged families.",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "bg-white border-orange-200 hover:bg-orange-50",
      textColor: "text-blue",
      progress: 65,
      raised: "₹32,500",
      goal: "₹50,000",
      details: "Your donation will provide 10 meals for every ₹500 contributed."
    },
    {
      id: 2,
      title: "Donate for Clothes",
      description: "Contribute warm clothing to those in need.#help everyone",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "bg-white border-blue-200 hover:bg-blue-50",
      textColor: "text-blue",
      progress: 72,
      raised: "₹18,000",
      goal: "₹25,000",
      details: "Each ₹300 provides a complete set of seasonal clothing."
    },
    {
      id: 3,
      title: "Yamuna Cleaning",
      description: "Support our efforts to clean the sacred river.#help everyone",
      image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "bg-white border-teal-200",
      textColor: "text-blue",
      progress: 45,
      raised: "₹45,600",
      goal: "₹1,00,000",
      details: "₹1,000 funds one day of cleaning operations."
    },
    {
      id: 4,
      title: "Education Support",
      description: "Help children get access to quality education.#help everyone",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      color: "bg-white border-purple-200",
      textColor: "text-blue",
      progress: 38,
      raised: "₹19,000",
      goal: "₹50,000",
      details: "₹500 provides school supplies for one child."
    }
  ];

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}  xs:flex items-center justify-center w-8 h-6 p-2 md:w-10 md:h-10 rounded-full  shadow-md bg-gray-100 transition-colors z-10`}
        style={{ ...style, right: "0.5rem" }}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-6 md:h-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}  xs:flex items-center justify-center w-8 h-6 p-2 md:w-10 md:h-10 rounded-full  shadow-md bg-gray-100 transition-colors z-10`}
        style={{ ...style, left: "0.5rem" }}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-6 md:h-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
        </svg>
      </div>
    );
  };

  const openModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  // Responsive slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true
        }
      }
    ]
  };

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-8 md:py-12 mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="inline-block text-[28px] md:text-heading3 lg:text-heading2 font-bold p-5 text-[#2d335d] relative transition-all ease-in-out">
          Donate For
          <hr className="mt-1 border-blue border-[0.5px]" />
        </h1>
        <p className="mt-2 xs:mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your contribution makes a real difference
        </p>
      </div>

      <div className="relative px-1 xs:px-2 sm:px-3">
        <Slider {...settings}>
          {donationCategories?.map((category) => (
            <div key={category.id} className="px-1 xs:px-1.5 sm:px-2">
              <div
                className={`${category.color} border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full`}
              >
                {/* Image Section */}
                <div className="h-32 sm:h-40 md:h-44 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 xs:p-5 sm:p-6 flex-grow">
                  <div className="flex items-center mb-2 xs:mb-3">
                    <h3 className={`${category.textColor} text-lg xs:text-xl sm:text-2xl font-semibold`}>
                      {category.title}
                    </h3>
                  </div>

                  <p className="text-xs xs:text-sm sm:text-base text-gray-700 mb-3 xs:mb-4 sm:mb-5">
                    {category.description}
                  </p>

                  <div className="mb-3 xs:mb-4">
                    <div className="flex justify-between text-xs xs:text-sm mb-1 xs:mb-2">
                      <span className="font-medium">{category.progress}% funded</span>
                      <span className="text-gray-600">{category.raised} raised</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 xs:h-2.5">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: `${category.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-xs xs:text-sm text-gray-500 mt-1">
                      Goal: {category.goal}
                    </div>
                  </div>
                </div>

                <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(category);
                    }}
                    className="w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 text-xs xs:text-sm sm:text-base rounded-lg font-medium text-white bg-blue hover:bg-blue-700 transition-colors"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {isModalOpen && selectedDonation && (
        <DonateForModel donation={selectedDonation} onClose={closeModal} />
      )}
    </div>
  );
};

export default DonationOptions;