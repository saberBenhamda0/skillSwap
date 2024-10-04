import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import LeftBar from '../../components/leftBar'
import password_symbole from '/password_symbole.png'
import { useSendChangePasswordRequestMutation } from '../../redux/reducers/apiReducer'
import see_password from '/see_password.svg'
import { Toaster, toast } from 'sonner';
import LeftBarMobile from '../../components/LeftBarMobile';
import right from '/right.svg'


const ChangePassword = () => {

  const [clicked, setClicked] = useState(false)
  


  let  [sendChangePassordRequest, {data, error} ] = useSendChangePasswordRequestMutation()

  const [input, setInput] = useState({})
  
  const handlesubmite = async (input) => {
    try {
      const response = await sendChangePassordRequest(input).unwrap();
      
      toast.success(response.data.response);
    } catch (err) {
        toast.error(err.data.error);
    }
  };


  const handleChange = (event) => {

    const { name, value } = event.target;
    setInput((values) => ({ ...values, [name]: value }));
  };


  const [toggleSideBarOnMobile, setToggleSideBarOnMobile] = useState(false)

  // checking if we are in mobile
  const isMobile = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }


  return (
    <div className='  w-screen mt-[66px] flex flex-row items-center justify-center bg-[#F1F3FF] min-h-screen h-full '>
      <Toaster richColors />
      <div className='flex flex-col items-center justify-start w-11/12 bg-white lg:w-8/12 lg:ml-48 h-5/6 rounded-xl'>

        <h2 className='w-full m-6 mt-10 ml-20 text-2xl font-bold text-start font-body'>
                  Password
        </h2>

        <div className='relative flex flex-col items-center justify-start w-full ml-4 lg:items-start'>
          <h5 className='w-full m-4 text-xl font-semibold lg:ml-4 ml-14 text-start font-main'>
              old password :
            </h5>
            <div className='relative w-full lg:w-1/2'>
            <input
              onChange={handleChange}
            placeholder="old password"
            name="old_password"
            type={clicked ? 'text' : 'password' }
          value={input.old_password} 
          className=' lg:pl-6 lg:w-full w-11/12 lg:mx-4 bg-[#F6F6F6] h-[48px] border-solid border-2 rounded-md border-[#AFAFAF]'
            />
            
            <img 
              onClick={()=>setClicked(!clicked)}
              className=' w-[30px] cursor-pointer lg:right-0 right-[10%] h-[30px] absolute bottom-2 ' src={clicked ? see_password : password_symbole}/>
              
            </div>
        </div>

        <div className='relative flex flex-col items-center justify-start w-full ml-4 lg:items-start'>
        <h5 className='w-full m-4 text-xl font-semibold lg:ml-4 ml-14 text-start font-main'>
          New Password :
          </h5>
          <div className='relative w-full lg:w-1/2'>
          <input
            onChange={handleChange}
          placeholder="new password"
          name="password1"
          type={clicked ? 'text' : 'password' }
          value={input.password1} 
          className=' lg:pl-6 lg:w-full w-11/12 lg:mx-4 bg-[#F6F6F6] h-[48px] border-solid border-2 rounded-md border-[#AFAFAF]'
          />
          <img 
          onClick={()=>setClicked(!clicked)}
          className=' w-[30px] cursor-pointer lg:right-0 right-[10%] h-[30px] absolute bottom-2 ' src={clicked ? see_password : password_symbole}/>
          </div>
          
        </div>

        <div className='flex flex-col items-center justify-start w-full ml-4 lg:items-start'>
          <h5 className='w-full m-4 text-xl font-semibold lg:ml-4 ml-14 text-start font-main'>
            confirme password :
          </h5>
          <div className='relative w-full lg:w-1/2'>

          <input
            onChange={handleChange}
          placeholder="confirme password"
          name="password2"
          type={clicked ? 'text' : 'password' }
          value={input.password2} 
          className=' lg:pl-6 lg:w-full w-11/12 lg:mx-4 bg-[#F6F6F6] h-[48px] border-solid border-2 rounded-md border-[#AFAFAF]'
          />
          <img
          onClick={()=>setClicked(!clicked)}
          className=' w-[30px] cursor-pointer lg:right-0 right-[10%] h-[30px] absolute bottom-2 ' src={clicked ? see_password : password_symbole}/>
          </div>
          
        </div>
      <span className='ml-10 font-semibold text-center text-red-500 font-body'>
        { input.password1 === input.password2 ? null : "password are not matching"}
      </span>

        <div className='w-full '>
        <button
            onClick={()=>handlesubmite(input)}
            className=' my-10  lg:ml-4 lg:w-1/2  active:opacity-90 transition-opacity border-solid font-body text-center text-base lg:text-2xl text-white font-bold bg-gradient-to-r from-[#FF0000] to-[#FE6E6E] border-2 border-[#EFEFF4] w-11/12 rounded-2xl h-12 lg:h-[70px]'>
              Change passwrod
        </button>
        </div>

      </div>
      <Navbar />
      <div style={{display: isMobile() ? "block" : "none" }} onClick={()=>setToggleSideBarOnMobile(!toggleSideBarOnMobile)} className='absolute top-0 z-20 flex flex-row items-center justify-center h-full mt-24 left-2 '>
          <img  src={right} className='w-6 h-6 ' />
      </div>
      { !isMobile() && <LeftBar />}
      { toggleSideBarOnMobile && <LeftBarMobile  />}    </div>
  )
}

export default ChangePassword