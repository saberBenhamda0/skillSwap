import React from 'react'
import star from '/Star.svg'
import { useNavigate } from 'react-router-dom'


const SkillCard = (props) => {

    const naviagate = useNavigate()
  return (
    <div onClick={()=>naviagate(`/post/${props.id}`)} key={props?.id} className='lg:w-3/12 w-3/4 hover:shadow-xl overflow-hidden relative transition-shadow hover:cursor-pointer m-10 h-[350px] rounded-2xl border-solid border-2 border-[#EFEFF4]'>
        <img src={props.Post_image} className='w-screen h-[150px]'/>
        <div className=' h-[50px]  flex flex-row items-center my-2 justify-start'>
            <img src={props.User_image} className=' w-[41px] h-[41px] mx-4 rounded-full' />
            <h5 className='text-xl font-semibold font-body'>{props.username}</h5>
        </div>
        <div className='h-[75px] m-2 overflow-hidden text-base font-body'>
        {props.description}
        </div>
        <div className='flex flex-row items-center justify-start gap-1 mx-2 my-2'> 
            <img src={star} className='absolute bottom-[34px] ' />
            <p className='absolute font-bold left-8 bottom-8 '>
                    4.7
            </p>
            <p className=' absolute bottom-8 left-16 text-[#8F93A6]'>
                ({props.pastCollaboration})
            </p>
        </div>
        <p className='absolute bottom-0 mx-2 my-2 text-lg font-bold '>
            price : {props.price}$
        </p>
    </div>
  )
}

export default SkillCard