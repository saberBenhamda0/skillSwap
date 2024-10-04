import React from 'react'
import {motion} from 'framer-motion'
import textVariant from '../motions/textVariant'
import leftbar_symbole from '/leftbar_symbole.svg'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { useLocation } from 'react-router-dom'
const LeftBar = () => {

    const lists = [
    'home',
    'Profile',
    'History',
    'Personal_information',
    'Change_password',
]


    let location = useLocation();

    let name = location.pathname


    const [clickedIndex, setClickedIndex] = useState(null);

    const navigate = useNavigate()

    const HandleClick = (index, list) => {
        setClickedIndex(index)
        navigate(`/${list}`)
    }


  return (
    <div className='h-full l absolute  lg:block left-0 top-[66px] rounded-r-2xl w-2/12  bg-[#7A91FF]'> 
        <div className='mt-16 '>
        {lists.map((list, index)=> 
        (    <motion.div 
            onClick={()=>HandleClick(index, list)} 
            
            key={index}
            initial='hidden'
            whileInView='show'    
            variants= {textVariant(index / 8)}
        className='flex flex-row justify-start m-6 ml-8 cursor-pointer '
        >
                <img src={leftbar_symbole} className='w-[30px] mr-2 h-[30px]'></img>
                <ul id={index} className={`'ml-6 text-xl font-semibold ${`/${list}` === name  ? "text-main" : "text-white"} font-body'`}>{list}</ul>
            </motion.div>
        ))}
        </div>
    </div>
)
}

export default LeftBar