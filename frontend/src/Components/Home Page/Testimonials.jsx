import React from "react";
import { testimonials } from "../../Constant/testimonialData.jsx";
const Testimonials = () => {
  return (
    <div className=" mt-[30px]">
      <h1 className="font-amatic font-bold text-orange tracking-wide text-xl md:text-3xl pt-[20px] lg:pb-[25px]">
        WHAT OTHERS SAY ABOUT US
      </h1>
      <ul className="testimonials">
        {testimonials.map((testimonial, index) => {
          //console.log(testimonial)
          return (
            <li key={index} className="w-[200px]">
              {/* <img src={testimonial.url} alt="testimonial-person" className="rounded-full w-[70px]" /> */}
              <div
                className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]  rounded-full"
                style={{
                  backgroundImage: `url(${testimonial.img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                }}
              ></div>
              <h1>{testimonial.name}</h1>
              <p>{testimonial.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Testimonials;
