import React from 'react'
import raturiFoundationLogo from '../../assets/Sobf Images/partners/raturiFoundation.avif'
import hinduFoundationLogo from '../../assets/Sobf Images/partners/hinduFoundation.avif'
const Partners = () => {
  return (
    <div className='overflow-hidden mt-[30px] mb-[50px]'>
      <h1 className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
        Supported by
        <hr className="mt-1 border-light-lavender border-[1px]" />
      </h1>
       <ul className=' flex items-center justify-center  mt-[20px] [&_li]:mx-2 [&_img]:max-w-none gap-20'>
        <li ><img src={raturiFoundationLogo} alt="raturi-foundation" className='w-[78px] lg:w-[200px] object-cover' /></li>
        <li><img src={hinduFoundationLogo} alt="hindu-foundation" className='w-[70px] lg:w-[200px] object-cover' /></li>
      </ul> 
      {/* <ul className='flex items-center justify-center  mt-[20px] [&_li]:mx-4 [&_img]:max-w-none animate-partners-infinite-scroll' aria-hidden="true">
        <li><img src={raturiFoundationLogo} alt="raturi-foundation" className='w-[58px] md:w-[70px] lg:w-[90px]' /></li>
        <li><img src={hinduFoundationLogo} alt="hindu-foundation" className='w-[50px] md:w-[70px] lg:w-[90px]'  /></li>
      </ul> */}
    </div>
  )
}

export default Partners
