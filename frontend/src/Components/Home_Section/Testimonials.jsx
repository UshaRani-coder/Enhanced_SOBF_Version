// // import React from "react";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import { testimonials } from "../../Constant/testimonialData.jsx";
// // import './testimonial.css'
// // const Testimonials = () => {
// //   const settings = {
// //     dots: true,
// //     speed: 500,
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
    
// //   };
// //   return (
// //     <div className="bg-seashell w-[100%] mt-[30px] flex flex-col items-center">
// //       <h1 className="text-heading5 md:text-heading4 mt-[30px] font-serif font-bold text-orange lg:pb-[25px]">
// //         WHAT OTHERS SAY ABOUT US
// //       </h1>
// //       <ul className="testimonials flex flex-col items-center  mt-[30px] ">
// //       <Slider {...settings}>
// //         {testimonials.map((testimonial, index) => {
// //           //console.log(testimonial)
// //           return (
// //             <li key={index} className=" rounded-lg relative w-[280px]  md:w-[350px]  bg-[#ffffff] my-[30px] p-[20px]">
// //               {/* <img src={testimonial.url} alt="testimonial-person" className="rounded-full w-[70px]" /> */}
// //               <div
// //                 className="w-[70px] h-[70px] md:w-[100px] md:h-[100px]  rounded-full absolute top-[-40px] left-[35%] border-seashell border-[7px]"
// //                 style={{
// //                   backgroundImage: `url(${testimonial.img})`,
// //                   backgroundPosition: "center",
// //                   backgroundSize: "cover",
// //                   backgroundRepeat: "no-repeat",
// //                 }}
// //               ></div>
// //               <div className="flex flex-col items-center ">
// //               <h1 className="font-sans font-bold mt-[30px] md:mt-[50px]">{testimonial.name}</h1>
// //               <h3 className="font-sans font-bold text-[rgba(0,18,51,0.4)] text-[12px]">{testimonial.profession}</h3>
// //               <p className="testimonial-description font-workSans text-[14px] md:text-[16px] relative mt-[50px]"> {testimonial.description} </p>
             
// //               </div>
// //             </li>
// //           );
// //         })}
// //         </Slider>
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Testimonials;

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { testimonials } from "../../Constant/testimonialData.jsx";
// import './testimonial.css';

// const Testimonials = () => {
  
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 2,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           horizontal: true,
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           horizontal: true,
//         }
//       }
//     ]
//   };


//   return (
//     <div className="bg-seashell w-[100%] mt-[30px] flex flex-col items-center">
//       <h1 className="text-heading5 md:text-heading4 mt-[30px] font-serif font-bold text-orange lg:pb-[25px]">
//         WHAT OTHERS SAY ABOUT US
//       </h1>
//       <div className="testimonials-slider w-[90%] md:w-[80%] lg:w-[70%] mt-[30px]">
//         <Slider {...settings}>
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="testimonial-slide p-[10px]">
//               <div className="rounded-lg relative w-[100%] bg-[#ffffff] my-[30px] p-[20px]">
//                 <div
//                   className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full absolute top-[-40px] left-[35%] border-seashell border-[7px]"
//                   style={{
//                     backgroundImage: `url(${testimonial.img})`,
//                     backgroundPosition: "center",
//                     backgroundSize: "cover",
//                     backgroundRepeat: "no-repeat",
//                   }}
//                 ></div>
//                 <div className="flex flex-col items-center mt-[50px]">
//                   <h1 className="font-sans font-bold mt-[30px] md:mt-[50px]">{testimonial.name}</h1>
//                   <h3 className="font-sans font-bold text-[rgba(0,18,51,0.4)] text-[12px]">{testimonial.profession}</h3>
//                   <p className="testimonial-description font-workSans text-[14px] md:text-[16px] relative mt-[50px]">
//                     {testimonial.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../../Constant/testimonialData.jsx";
import './testimonial.css';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
}



const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows for smaller screens
          dots: true,    // Keep dots for navigation
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows for smaller screens
          dots: true,    // Keep dots for navigation
        }
      }
    ]
  };

  return (
    <div className="bg-seashell w-[100%] mt-[30px] flex flex-col items-center">
      <h1 className="text-heading5 md:text-heading4 mt-[30px] font-serif font-bold text-orange lg:pb-[25px]">
        WHAT OTHERS SAY ABOUT US
      </h1>
      <div className="testimonials-slider w-[90%] md:w-[80%] lg:w-[70%] mt-[30px]">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-slide p-[10px]">
              <div className="rounded-lg relative w-[100%] bg-[#ffffff] my-[30px] p-[20px]">
                <div
                  className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full absolute top-[-40px] left-[38%] md:left-[42%] lg:left-[38%] border-seashell border-[7px]"
                  style={{
                    backgroundImage: `url(${testimonial.img})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="flex flex-col items-center mt-[20px]">
                  <h1 className="font-sans font-bold  md:mt-[50px]">{testimonial.name}</h1>
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
