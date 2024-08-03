import React from 'react'
import noPoverty from "../../assets/no-poverty1.png"
import education from "../../assets/education.png"
import food1 from "../../assets/food1.png"
import gender from "../../assets/gender-equality1.png"
import goodhealth from "../../assets/good-health1.png"
import cleanwater from "../../assets/clean-water1.png"



const Programms = () => {
  return (
    <div className=''>

    <div className="w-full ">
    <h1 className="text-center text-heading3 lg:text-heading2 font-bold mt-10 mb-4 p-5 text-peacock-green relative hover:text-peacock-green-hover  transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
        Our initiatives
      </h1>
    </div>      
    
    <div className='flex flex-col lg:flex-row px-2 lg:px-24'>
        <div className='w-[99%] lg:w-[50%] pt-1 lg:py-12'>
          <div className='gap-4 flex p-4'>
            <img className='bg-violet-700 border-2rounded-xl w-11 h-11 p-1 rounded-lg' src={noPoverty} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold hover:text-peacock-green-hover'>No Poverty</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-violet-700 border-2rounded-xl w-11 h-11 rounded-lg p-1' src={food1} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold hover:text-peacock-green-hover'>Zero Hunger</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-violet-700 border-2rounded-xl w-11 h-11 rounded-lg p-1' src={goodhealth} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold hover:text-peacock-green-hover'>Good health and Well being</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
        </div>
        <div className='w-[99%] lg:w-[50%] py-1 lg:py-12'>
          <div className='gap-4 flex p-4'> 
            <img className='bg-violet-700 border-2rounded-xl w-11 h-11 rounded-lg p-1' src={education} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold hover:text-peacock-green-hover'>Quality Education</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-violet-700 border-2rounded-xl w-11 h-11 rounded-lg p-1' src={gender} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold hover:text-peacock-green-hover'>Gender Equality</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-violet-700 border-2rounded-xl w-11 h-11 rounded-lg p-1' src={cleanwater} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold hover:text-peacock-green-hover  '>Clean water and sanitation</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Programms