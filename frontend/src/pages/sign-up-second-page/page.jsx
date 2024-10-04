import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { useSendRegisterUserRequestMutation } from '../../redux/reducers/apiReducer';
import { Toaster, toast } from 'sonner';
import PageTransition from '../../motions/pageTransition';
import {motion, AnimatePresence} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/reducers/userInfoReducer';
import { useSendAddInfoRequestMutation } from '../../redux/reducers/apiReducer';
import {  useNavigate } from 'react-router-dom';


const SignUpSecondPage = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch();
  let {email, first_name, last_name, bio, phone_number, country, region, city, Neighborhood} = useSelector((state)=>state.userInfo)
  let {access} = useSelector((state)=>state.auth)
  const [inputs, setInputs] = useState({});
  let [sendRegisterUserRequest, isLoading] = useSendRegisterUserRequestMutation();
  let [invisible, setInvisible] = useState([true,false,false])

  let [sendAddInfoRequest] = useSendAddInfoRequestMutation()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs)
  };

  const handleSubmit = async ( index) => {
    dispatch(setUserInfo(inputs));
    
    setInvisible(invisible[index] = false)

    const newInvisible = [...invisible];
    newInvisible[index] = false;
    newInvisible[index + 1] = true;

    // Update the state with the new array
    setInvisible(newInvisible);

  };
  window.scrollTo(0, 0);

  let formData = new FormData()
  const handleImageChange =  (event) => {
    

    formData.append("first_name", inputs.first_name);
    formData.append("last_name", inputs.last_name);
    formData.append("bio", inputs.bio);
    formData.append("phone_number", inputs.phone_number);
    formData.append("country", inputs.country);
    formData.append("region", inputs.region);
    formData.append("city", inputs.city);
    formData.append("Neighborhood", inputs.Neighborhood);
    formData.append("User_image", event.target.files[0]);

  }

  const handleSendUserInfo = async (formData)  => {
    let response = await sendAddInfoRequest(formData).unwrap()
    if (response.status === 200) {
      toast.success("the user and info have been added with success")
      navigate("/home")
    }
    else if (response.status !== 200) {
      toast.error(response.data)
    }
  }

  return (
    <motion.div>
        <Navbar />
      <Toaster richColors />
      <div className='flex items-center justify-center'>
{
      invisible[0] &&(
        <AnimatePresence mode="wait">
        <motion.div 
        key={0}
        layout
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 1 },
        }}
        className='flex flex-col items-center justify-start w-2/4 h-screen mb-12 border-2 border-solid rounded-2xl mt-28 border-slate-100'>
          <div className='mt-8 '>
            <h1 className='text-4xl text-center font-body'>Personal information</h1>
          </div>
          <div >
            <div className='flex flex-row items-center justify-between my-5 '>
              <div>
                <label className='ml-4 text-lg font-semibold font-body'>first name :</label>
                <input
                  name="first_name"
                  value={inputs.first_name || ''}
                  onChange={handleChange}
                  placeholder="what's your email"
                  className="px-3 py-4 m-2 w-[350px] border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
                />
              </div>
              <div>
                <label className='ml-4 text-lg font-semibold font-body'>second name : </label>
                <input
                  name="last_name"
                  value={inputs.last_name || ''}
                  onChange={handleChange}
                  placeholder="what's your email"
                  className="px-3 py-4 m-2 w-[350px] border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
              </div>
            </div>
            <div className='my-5 '>
              <h5 className='ml-4 text-lg font-semibold font-body'>Phone number : </h5>
              <input
                name="phone_number"
                value={inputs.phone_number || ''}
                onChange={handleChange}
                placeholder="enter username"
                className="px-3 py-4 m-2 w-[350px] border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
            </div>
            <div className='my-5 '>
              <h5 className='ml-4 text-lg font-semibold font-body'>Bio :</h5>
              <textarea
                type="text"
                name="bio"
                value={inputs.bio || ''}
                onChange={handleChange}
                placeholder="password"
                className="px-3 h-60 py-4 mx-2 my-1 w-full font-body text-black border-solid border-[#EFEFF4] border-2 outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
            </div>
            <div className='flex items-center justify-center mt-6'>
              <button
                onClick={()=>handleSubmit(0)}
                className='h-[61px] font-body font-normal w-[300px] rounded-xl text-white text-2xl bg-main'>Next
              </button>
            </div>
          </div>
        </motion.div>
        </AnimatePresence>
        )
        }

{
      invisible[1] &&
        <AnimatePresence mode="wait">
        <motion.div
        key={0}
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 1 },
        }}
         className='flex flex-col items-center justify-start w-2/4 h-screen mb-12 border-2 border-solid rounded-2xl mt-28 border-slate-100'>
          <div className='mt-8 '>
            <h1 className='text-4xl text-center font-body'>Personal information page two</h1>
          </div>
          <div >
            <div className='flex flex-row items-center justify-between my-5 '>
              <div>
                <label className='ml-4 text-lg font-semibold font-body'>country :</label>
                <input
                  name="country"
                  value={inputs.country || ''}
                  onChange={handleChange}
                  placeholder="what's your email"
                  className="px-3 py-4 m-2 w-[350px] border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
                />
              </div>
              <div>
                <label className='ml-4 text-lg font-semibold font-body'>region : </label>
                <input
                  name="region"
                  value={inputs.region || ''}
                  onChange={handleChange}
                  placeholder="what's your email"
                  className="px-3 py-4 m-2 w-[350px] border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
              </div>
            </div>
            <div className='my-5 '>
              <h5 className='ml-4 text-lg font-semibold font-body'>city : </h5>
              <input
                name="city"
                value={inputs.city || ''}
                onChange={handleChange}
                placeholder="enter username"
                className="px-3 py-4 m-2 w-[350px] border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
            </div>
            <div className='my-5 '>
              <h5 className='ml-4 text-lg font-semibold font-body'>Neighborhood :</h5>
              <textarea
                type="text"
                name="Neighborhood"
                value={inputs.Neighborhood || ''}
                onChange={handleChange}
                placeholder="password"
                className="px-3 h-60 py-4 mx-2 my-1 w-full font-body text-black border-solid border-[#EFEFF4] border-2 outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
            </div>
            <div className='flex items-center justify-center mt-6'>
              <button
                onClick={()=>handleSubmit(1)}
                className='h-[61px] font-body font-normal w-[300px] rounded-xl text-white text-2xl bg-main'>Next
              </button>
            </div>
          </div>
        </motion.div>
        </AnimatePresence>
        }

{
      invisible[2] &&
      <AnimatePresence mode='wait'>
        <motion.div
        key={0}
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 1 },
        }}
         className='flex flex-col items-center justify-start w-2/4 h-screen mb-12 border-2 border-solid rounded-2xl mt-28 border-slate-100'>
          <div className='mt-8 '>
            <h1 className='text-4xl text-center font-body'>Entre A profile picture</h1>
          </div>

          <input onChange={handleImageChange} type='file' name='User_image'  className='w-40 h-40 pt-12 pl-4 mt-10 border-2 border-solid rounded-full shadow-md border-slate-200'>

          </input>
          <div className='flex items-center justify-center mt-6'>
              <button
                onClick={()=>handleSendUserInfo(formData)}
                className='h-[61px] font-body font-normal w-[300px] rounded-xl text-white text-2xl bg-main'>Next
              </button>
            </div>

        </motion.div>
        </AnimatePresence>
        }


      </div>
    </motion.div>
  );
};

export default PageTransition(SignUpSecondPage);
