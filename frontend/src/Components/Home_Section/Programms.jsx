import React from 'react'
import noPoverty from "../../assets/no-poverty1.png"
import education1 from "../../assets/education1.png"
import food1 from "../../assets/food1.png"
import gender from "../../assets/gender-equality1.png"
import goodhealth from "../../assets/good-health1.png"
import cleanwater from "../../assets/clean-water1.png"



const Programms = () => {
  return (
    <div>
      <h1 className='text-heading2 lg:text-heading1 font-serif text-center pb-8 lg:pb-12 -pt-12'>Our <span className='text-orange '>Programmes</span>  </h1>
      <div className='flex flex-col lg:flex-row px-2 lg:px-24'>
        <div className='w-[99%] lg:w-[50%] pt-1 lg:py-12'>
          <div className='gap-4 flex p-2 lg:p-4'>
            <img className='bg-red-300/80 hover:bg-red-600  border-2 border-red-400 rounded-xl w-24 h-24' src={noPoverty} alt="" />
            <div>
              <h2 className='text-heading4 text-orange  font-sans font-bold hover:underline'>No Poverty</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-green-300 hover:bg-green-600  border-2 border-green-400 rounded-xl w-24 h-24' src={food1} alt="" />
            <div>
              <h2 className='text-heading4 text-orange font-bold font-sans hover:underline'>Zero Hunger</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-blue/80 hover:bg-blue  border-2 border-blue rounded-xl w-24 h-24' src={goodhealth} alt="" />
            <div>
              <h2 className='text-heading4 text-orange font-bold font-sans hover:underline'>Good health and Well being</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
        </div>
        <div className='w-[99%] lg:w-[50%] py-1 lg:py-12'>
          <div className='gap-4 flex p-4'> 
            <img className='bg-[#87CEEB] hover:bg-[#45a2c7]  border-2 border-[#2a80a2] rounded-xl w-24 h-24' src={education1} alt="" />
            <div>
              <h2 className='text-heading4 text-orange font-bold font-sans hover:underline'>Quality Education</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-[#987add] hover:bg-[#7b50de]  border-2 border-[#784fda] rounded-xl w-24 h-24' src={gender} alt="" />
            <div>
              <h2 className='text-heading4 text-orange font-bold font-sans hover:underline'>Gender Equality</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
          <div className='gap-4 flex p-4'>
            <img className='bg-[#FFA07A] hover:bg-[#d56b41]  border-2 border-[#bb5128] rounded-xl w-24 h-24' src={cleanwater} alt="" />
            <div>
              <h2 className='text-heading4 text-orange font-bold font-sans hover:underline  '>Clean water and sanitation</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Programms