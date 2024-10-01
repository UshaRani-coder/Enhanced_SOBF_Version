
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../../Constant/testimonialData.jsx";
import './testimonial.css';

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  return (
    <div className="bg-light-lavender mt-16 w-[100%]  pb-20 flex flex-col items-center text-center">
      <div className="w-[95%]">
        <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
          Testimonials
          <hr className="mt-1 border-blue border-[0.5px]" />
        </h1>
      </div>
      <div className="testimonials-slider w-[90%] md:w-[80%] lg:w-[90%] mt-[30px]">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-slide p-[10px] flex flex-col items-center">
              <div className="testimonial-card flex flex-col items-center rounded-lg relative w-[100%] bg-[#ffffff] my-[30px] p-[20px]">
                <div
                  className="testimonial-image box-border w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full absolute top-[-40px] left-[38%] md:left-[42%] lg:left-[38%] border-[rgb(237,241,255)] border-[10px]"
                  style={{
                    backgroundImage: `url(${testimonial.img})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="testimonial-content flex flex-col items-center   flex-1">
                  <h1 className="font-sans font-bold mt-[10px] ">{testimonial.name}</h1>
                  <h2 className="font-sans font-bold text-[rgba(0,18,51,0.4)] text-[12px]">{testimonial.profession}</h2>
                  <p className="testimonial-description font-workSans text-[14px] md:text-[16px] relative mt-[50px]">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
