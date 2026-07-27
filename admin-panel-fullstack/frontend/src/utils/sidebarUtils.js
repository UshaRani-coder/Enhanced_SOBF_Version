
export const getSidebarItemClass = (isActive) => `
  flex items-center
  pt-2
  pb-2
  w-[90%]
  rounded
  transition-colors
  duration-200
  ${
    isActive
      ? "text-white bg-[rgb(39,39,79)]"
      : "text-[rgba(255,255,255,0.7)]"
  }
  hover:text-white
  hover:bg-[rgb(39,39,79)]
`;

