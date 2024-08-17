import React from 'react'
import raturiFoundationLogo from '../../assets/Sobf Images/partners/raturiFoundation.jpg'
import hinduFoundationLogo from '../../assets/Sobf Images/partners/hinduFoundation.jpg'
const Partners = () => {
  return (
    <div className='overflow-hidden mt-[30px] mb-[50px]'>
      <h1 className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
        Supported by
      </h1>
       <ul className=' flex items-center justify-center  mt-[20px] [&_li]:mx-8 [&_img]:max-w-none '>
        <li ><img src={raturiFoundationLogo} alt="raturi-foundation" className='w-[78px] lg:w-[98px] ' /></li>
        <li><img src={hinduFoundationLogo} alt="hindu-foundation" className='w-[70px] lg:w-[90px]' /></li>
      </ul> 
      {/* <ul className='flex items-center justify-center  mt-[20px] [&_li]:mx-4 [&_img]:max-w-none animate-partners-infinite-scroll' aria-hidden="true">
        <li><img src={raturiFoundationLogo} alt="raturi-foundation" className='w-[58px] md:w-[70px] lg:w-[90px]' /></li>
        <li><img src={hinduFoundationLogo} alt="hindu-foundation" className='w-[50px] md:w-[70px] lg:w-[90px]'  /></li>
      </ul> */}
    </div>
  )
}

export default Partners
