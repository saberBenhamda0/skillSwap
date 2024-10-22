import React from 'react'
import textVariant from '../motions/textVariant'
import {motion} from 'framer-motion'

const Card = (props) => {

  return (
    <motion.div
    initial='hidden'
    whileInView='show'    
    variants= {textVariant(props.index / 8)}
    className=' lg:h-2/5  lg:w-1/3  w-2/5 h-3/6 relative hover:shadow-xl shadow-md ease-in-out duration-300 flex justify-between flex-col items-center border-2 border-[#D9DFFF] rounded-3xl bg-[#EFEFF4]'>
      <div className='absolute z-0 w-12 h-12 lg:w-20 lg:h-20 bg-[#D1D8FB] rounded-full top-[0.7rem] lg:top-2 right-[43%] lg:right-[32%]'/>
    <img src={props.src} alt='component pic' className='z-10 w-10 h-10 mt-4 lg:w-16 lg:h-16 ' />
    <h4 className='text-[#313131] text-base w-24 text-center font-body font-semibold lg:text-2xl'>
      {props.title}
    </h4>
    <p className='mx-4 mb-4 font-normal text-sm lg:text-base text-center font-body text-[#8F93A6]'>
    {props.description}
    </p>
    </motion.div>  )
}

export default Card