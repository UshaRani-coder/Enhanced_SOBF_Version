import React from "react";

const RefundPolicy = () => {
  return (
    <div className="w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto mt-32">
      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <div className="flex flex-col items-center md:items-center mx-[20px] w-[90%] lg:w-[70%] justify-center">
          <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2  font-bold mb-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
            Refund and Cancellation Policy
            <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
          </h1>

          <div className="text-gray-700 text-justify text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px] lg:leading-[30px]">
            <p>
              Our focus is complete Donor / Contributor satisfaction. In the
              event, if you are displeased with the services provided, we will
              investigate, but there is no refund and cancellation policy.
            </p>
            <p>
              In case of dissatisfaction from our services, Donor / Contributors
              have the liberty to write to us about their problems/issues. We
              will solve their issues on a priority basis.
            </p>

            <h2 className="text-xl font-semibold mt-5 text-black">
              No Cancellation / Refund Policy
            </h2>
            <p>
              For any problems/issues, please contact us on{" "}
              <strong>+91 8439406670</strong> or{" "}
              <a href="mailto:soulofbraj@gmail.com">soulofbraj@gmail.com</a>.
            </p>
            <p>
              We will try our best to create the suitable design concepts for
              our Donors / Contributors.
            </p>

            <h2 className="text-xl font-semibold mt-5 text-black">
              Contact Information
            </h2>
            <p>
              <strong>Tarun Misra</strong>
              <br />
              <strong>Founder & Director</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
