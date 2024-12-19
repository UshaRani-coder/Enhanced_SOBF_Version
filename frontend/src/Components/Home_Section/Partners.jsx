import React from 'react'
import raturiFoundationLogo from '../../assets/Sobf Images/partners/raturiFoundation2.avif'
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
    </div>
  )
}

export default Partners
