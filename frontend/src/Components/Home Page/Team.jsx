import React from 'react'
import chairmanImg from '../../assets/chairman.png'

const Team = () => {
  return (
    <div className='mt-[30px] flex flex-col items-center'>
      <h1 className='font-amatic font-bold text-orange tracking-wide text-xl md:text-3xl pt-[20px] lg:pb-[25px]'>OUR CORE TEAM</h1>
      <div className='mt-[20px] card flex flex-col items-center rounded-lg bg-seashell pb-[20px]'>
      <img src={chairmanImg} alt="chairman" className='rounded-t-lg h-[80%]'/>
      <div className='flex flex-col items-center '>
      <span className='font-sans text-blue font-bold mt-[10px] '>TARUN MISRA</span>
      <p className='text-[9px] font-workSans'>Chairman at <a href="https://sobf.in" target="_blank" rel="noopener noreferrer" className='cursor-pointer text-[#4a8bed]'>SOBF</a></p>
      <p className='text-[9px] font-workSans'>Managing Director - GOPALA BHOG</p>
      </div>
      </div>
    </div>
  )
}

export default Team
