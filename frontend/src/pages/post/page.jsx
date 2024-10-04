import React from 'react'
import Navbar from '../../components/navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetPostQuery, useSendEchangeRequestMutation } from '../../redux/reducers/apiReducer'
import { useState } from 'react'
import { Toaster, toast } from 'sonner';


const Post = () => {

  // getting the url object and get to access pathname so we got ex /post/3
  const location = useLocation()
  const id = location.pathname


  // we made a regex so we can access to post number in this case we called it id 
  const regex = /\/post\/(\d+)/;
  const match = id.match(regex);


  // we save the number is variable call number
  const number = match[1];
  
 const {data:post}  = useGetPostQuery(number)
 let [clicked, setClicked] = useState(false)

 let [sendEchangeRequest, {data}] = useSendEchangeRequestMutation()


 const HandleClick = async (username) => {
  data = {
    "receiver_id": `${username}`,
    "status":1
}
  const Response = await sendEchangeRequest(data).unwrap()
  if (Response.status === 200) {
    toast.success(Response.data.response)
  }
 }

 const navigate = useNavigate()
 


    return (
    <div className='w-full h-full min-h-screen '>
      <Toaster richColors />
      <Navbar />
      <div className='flex flex-col items-start justify-around w-full h-full lg:flex-row'>
        <div className='flex flex-col items-center justify-start w-full h-full mt-20 lg:w-2/3 '>
          <div className=' w-full flex lg:ml-16 flex-row justify-between h-[300px] mt-10 rounded-xl'>

            <img src={`${post?.Post_image}`} className='w-6/12 h-full ml-2 lg:ml-0 rounded-l-xl'/>
            <img src={`${post?.Post_image}`} className='w-6/12 h-full mr-2 lg:mr-0 rounded-r-xl'/>

          </div>
          <div className='flex flex-col justify-start w-full h-full mt-10 ml-10 lg:ml-32 rounded-xl'>
            <h2 className='text-[40px] mt-10 font-bold font-body'>
            Description :
            </h2>
            <p className=' text-[24px] ml-4 mt-5 font-body text-[#474953]'>
              {post?.description}
            </p>
          </div>

        </div>
        <div className='flex flex-col items-center justify-center w-full h-full mt-24 lg:w-3/12 '>
          <div className=' border-solid border-2  w-11/12 lg:w-full flex  flex-col items-center my-4  justify-between  h-[650px] rounded-xl border-[#EFEFF4]'>

            <div className='flex flex-col items-center justify-center w-full '>

              <div className='flex items-center justify-between w-full '> 
                
                <img src={`${post?.User_image}`} className='rounded-full ml-8 h-[60px] w-[60px] '/>

                <h3 onClick={()=> navigate(`/profile/${post.user}`)} className=' hover:cursor-pointer break-all w-full font-body text-start text-[28px] font-bold  '>
                   {post?.username}
                </h3>

              </div>

                <h4 className='font-body text-center mt-4 text-[20px]  text-[#707487]'>
                  has {post?.pastCollaboration} past coraborartion
                </h4>

            </div>

            <div className=' font-body text-center text-[#474953] text-[24px]'>
                {post?.userDescription}
            </div>

            <div className=' flex flex-row items-center justify-center  w-full rounded-2xl h-[70px]'>
              <p className=' border-solid border-2 border-[#EFEFF4] w-[150px]  grid place-content-center text-[14px] font-bold rounded-l-2xl h-[70px]'>
                Checkin <nb></nb>
               2024/12/18
               
              </p>
              <div className=' border-solid border-2 border-[#EFEFF4] w-[150px]  grid place-content-center text-[14px] font-bold rounded-r-2xl h-[70px]'>
                Ckeckout <nb></nb>
                2020/12/30
                </div>
            </div>

            <div className='flex flex-col items-center justify-center w-full'>
            <button
            onClick={()=>
{            setClicked(true)
              HandleClick(post?.username)}}
            className='  active:opacity-90 transition-opacity border-solid mb-10 font-body text-center text-2xl text-white font-bold bg-gradient-to-r from-[#6479E6] to-[#B7A7F9] border-2 border-[#EFEFF4] w-10/12 rounded-2xl h-[70px]'>
              {clicked ? "sent" : "Exchange"}
            </button>
            </div>

          </div>

          </div>
        </div>
      </div>
  )
}

export default Post 