import React from 'react'
import raturiFoundationLogo from '../../assets/Sobf Images/partners/raturiFoundation.jpg'
import hinduFoundationLogo from '../../assets/Sobf Images/partners/hinduFoundation.jpg'
const Partners = () => {
  return (
    <div className='overflow-hidden '>
         <h1 className="text-center text-[25px] md:text-heading3 lg:text-heading2 font-bold  p-5 text-peacock-green relative z-10 hover:text-peacock-green-hover transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
        Supported by
      </h1>
       <ul className=' flex items-center justify-center  mt-[20px] [&_li]:mx-8 [&_img]:max-w-none '>
        <li ><img src={raturiFoundationLogo} alt="raturi-foundation" className='w-[58px] ' /></li>
        <li><img src={hinduFoundationLogo} alt="hindu-foundation" className='w-[50px] lg:w-[60px]' /></li>
      </ul> 
      {/* <ul className='flex items-center justify-center  mt-[20px] [&_li]:mx-4 [&_img]:max-w-none animate-partners-infinite-scroll' aria-hidden="true">
        <li><img src={raturiFoundationLogo} alt="raturi-foundation" className='w-[58px] md:w-[70px] lg:w-[90px]' /></li>
        <li><img src={hinduFoundationLogo} alt="hindu-foundation" className='w-[50px] md:w-[70px] lg:w-[90px]'  /></li>
      </ul> */}
    </div>
  )
}

export default Partners
