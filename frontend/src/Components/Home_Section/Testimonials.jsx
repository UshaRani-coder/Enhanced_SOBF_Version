
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
    <div className="bg-light-lavender w-[100%]  pb-20 flex flex-col items-center">
      <div className="w-[95%]">
        <h1 className="text-center text-heading3 lg:text-heading2 font-bold mt-10 p-5 text-peacock-green relative hover:text-peacock-green-hover transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
          Testimonials
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
                  <h3 className="font-sans font-bold text-[rgba(0,18,51,0.4)] text-[12px]">{testimonial.profession}</h3>
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
