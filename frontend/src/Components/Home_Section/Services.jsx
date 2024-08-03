import React, { useState } from "react";
import CommunityService from "./CommunityService";
const Services = () => {
  const [service, setService] = useState("communityService");

  const services = [
    {
      id: "communityService",
      name: "Community Service",
      component: CommunityService,
    },
    { id: "gopalaBhog", name: "Gopala Bhog" },
    { id: "swachhSwasthVrindavan", name: "Swachh & Swasth Vrindavan" },
    { id: "brajkulamCommunityCenter", name: "Brajkulam Community Center" },
    { id: "upcomingProjects", name: "Upcoming Projects" },
  ];

  const SelectedService = services.find((s) => s.id === service)?.component;

  return (
    <div className=" py-[100px] text-[10px]  xl:text-[15px] flex flex-col justify-center items-center mt-[30px]">
      <ul className="hidden font-sans text-blue font-bold md:flex justify-center gap-x-[30px] lg:gap-x-[40px] xl:gap-x-4 items-center cursor-pointer">
        {services.map(({ id, name }) => (
          <li
            key={id}
            onClick={() => setService(id)}
            className="transition ease-in-out duration-500 delay-150 border-2 border-blue rounded-full px-[20px] py-[5px] xl:w-auto text-center hover:text-peacock-green hover:bg-blue"
          >
            {name}
          </li>
        ))}
      </ul>
      {SelectedService && <SelectedService />}
    </div>
  );
};

export default Services;
