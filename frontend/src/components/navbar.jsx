import React, { useEffect } from 'react'
import logo from '../../public/logo.png'
import { useNavigate } from 'react-router-dom'
import { useSendRefreshTokenMutation, useSendLogoutRequestMutation } from '../redux/reducers/apiReducer'
import {  useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { setJwtToken } from '../redux/reducers/authReducer'
import { setUserInfo } from '../redux/reducers/userInfoReducer'
import setting from '/setting.svg'
import { useState } from 'react'
import  {motion} from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
const Navbar =  ()  => {

  let dispatch = useDispatch()
  const navigate = useNavigate()

  let { access: access_token, refresh: refresh_token} = useSelector((state)=> state.auth);
  
  localStorage.setItem("access", access_token);
  localStorage.setItem("refresh", refresh_token);

  let ACCESS_TOKEN = localStorage.getItem("access")
  let refresh = localStorage.getItem("refresh")

  let [sendRefreshToken, { data,isLoading, error }] = useSendRefreshTokenMutation()
  let [sendLogoutRequest, {logoutResponseData}] = useSendLogoutRequestMutation()
  let [clicktoggleMenuforMobile, setClickToggleMenuForMobile ] = useState(false)
  
  useEffect(() => {

    if (ACCESS_TOKEN) {
      let DECODE_JWT = jwtDecode(ACCESS_TOKEN)
      dispatch(setUserInfo(DECODE_JWT))
      
      const now_date = Math.floor(new Date().getTime()  / 1000);
      let count = DECODE_JWT.exp - now_date - 6000;
    
      if (count < 0) {
        (async () => {
          try {
            let response = await sendRefreshToken({ "refresh": `${refresh}` }).unwrap();
            if (response.status !== 200) {
              navigate("/login");
            } else {
              dispatch(setJwtToken(response.data));
            }
          } catch (err) {
            dispatch(setJwtToken({access:"", refresh:""}));
          }
        })();
      }
      
    }
    
  }, [ACCESS_TOKEN])
  


      

  
  /* backdrop-filter backdrop-blur-lg bg-opacity-30 w matensachi t7ayed bg color*/
  return (
    <div className='fixed top-0 z-50 flex flex-row items-center justify-between w-full h-20 border-b-2 border-gray-200 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-30'>
      <div className='flex flex-row w-full'>
        <img 
        alt='logo' 
        className='w-12 h-12 ml-4 cursor-pointer lg:ml-8 ' 
        src={logo}
        onClick={ ACCESS_TOKEN ? ()=>navigate("/home"): ()=>navigate("/")}
        />
        <h1 
        onClick={ ACCESS_TOKEN ? ()=>navigate("/home"): ()=>navigate("/")}
        className='ml-8 text-xl font-bold text-center cursor-pointer lg:ml-20 lg:text-3xl font-body text-main'>
              Skill Swap
        </h1>
      </div>

      <div  onClick={()=> setClickToggleMenuForMobile(!clicktoggleMenuforMobile)} className='relative flex flex-col-reverse items-end justify-center w-full h-full mr-10 lg:hidden '>
        <img  src={setting} className='w-6 h-6 cursor-pointer '/>
        { clicktoggleMenuforMobile &&
        <div className='absolute z-20 flex flex-col items-center justify-center w-3/12 text-center h-28 min-w-40 -bottom-20 right-6'>
          {ACCESS_TOKEN
           ?
           <motion.div 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
           className='flex flex-col items-center justify-center w-full h-full border-solid opacity-70 bg-main rounded-2xl '>
            <h3 onClick={()=>navigate("/profile")} className='mb-2 text-lg font-bold text-white cursor-pointer font-body'>
                profile
            </h3>
            <h3 
                        onClick={()=>{
                          sendLogoutRequest({"access" : `${ACCESS_TOKEN}`})
                          dispatch(setJwtToken({ access: "" }));
                            navigate("/login")
                        }          
                        }
            className='text-lg font-bold text-white cursor-pointer font-body'>
            loguot

            </h3>
           </motion.div>
           : 
           <div className='flex flex-col items-center justify-center w-full h-full border-solid opacity-70 bg-main rounded-2xl '>
            <h3 onClick={()=>navigate("/login")} className='mb-2 text-lg font-bold text-white cursor-pointer font-body'>
              login
          </h3>
          <h3
          onClick={()=>navigate("/signup")}
           className='text-lg font-bold text-white cursor-pointer font-body'>
          signup
          </h3>
          
           </div>

            }
        </div>
        }
      </div>

      
      { ACCESS_TOKEN ?
          <div className='flex flex-row '>
            <button 
            onClick={()=>navigate("/profile")}
            className=' bg-main text-center hover:opacity-80 border-none lg:border-solid transition-all   font-bold hidden lg:block lg:h-12  font-sans lg:mr-10 text-white lg:w-full px-1 lg:text-[20px] rounded-xl lg:px-10 '>
            Profile
            </button>

            <button 
            onClick={()=>{
              sendLogoutRequest({"access" : `${ACCESS_TOKEN}`})
              dispatch(setJwtToken({ access: "" }));
              navigate("/login")
            }
            }
            className=' bg-white border-main lg:border-solid border-2 lg:w-full  hidden  lg:block hover:opacity-80 text-center transition-all font-bold lg:h-12 font-sans lg:mr-10 text-main lg:text-[20px] rounded-xl lg:px-10 '>
            Logout
            </button>
          </div>
          :
      <div className='flex flex-row '>
        <button 
        onClick={()=>navigate("/signup")}
        className=' bg-white border-main lg:border-solid border-2 lg:w-full  hidden  lg:block hover:opacity-80 text-center transition-all font-bold lg:h-12 font-sans lg:mr-10 text-main lg:text-[20px] rounded-xl lg:px-10 '>
              signup
        </button>
        <button
        onClick={()=>navigate("/login")}
        className=' bg-main text-center hover:opacity-80 border-none lg:border-solid transition-all   font-bold hidden lg:block lg:h-12  font-sans lg:mr-10 text-white lg:w-full px-1 lg:text-[20px] rounded-xl lg:px-10 '>
              Login
        </button>
      </div>
      }
      
    </div>
  )
}

export default Navbar