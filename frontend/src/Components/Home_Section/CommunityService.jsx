import React from "react";
import CommunityServiceImg from "../../assets/communityService.jpg";

const CommunityService = () => {
  return (
    <div className="w-[100%] md:w-[90%]  flex flex-col items-center md:flex-row md:gap-x-[30px] xl:gap-x-[100px] md:gap-y-0 gap-y-[10px] md:mt-[50px]">
      <img
        src={CommunityServiceImg}
        alt="community-service"
        className="w-[90%] md:w-[50%] lg:w-[40%]"
      />
      <div className="flex flex-col items-start mx-[20px] md:mx-0 md:w-[50%]   ">
        <h1 className="font-sans text-blue font-bold text-lg lg:text-2xl xl:mb-[40px]">COMMUNITY SERVICE</h1>
        <p className="text-[#696f8c] text-[14px] lg:text-[16px] mt-2 font-workSans xl:mt-0 xl:pb-[50px]">
          “Soul of Braj” is focused on Community service as it is not only a way
          to give back, but it is great for volunteers as well. Helping others
          makes us feel better. By giving back, we helping ourselves. .
          <p className="mt-[20px] md:mt-[10px] lg:mt-[20px]" >
            Service to a just cause rewards the workers with more real happiness and
            satisfaction than any other venture of life.
          </p>
        </p>
      </div>
    </div>
  );
};

export default CommunityService;
