import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { useSendRegisterUserRequestMutation } from '../../redux/reducers/apiReducer';
import { Toaster, toast } from 'sonner';
import PageTransition from '../../motions/pageTransition';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setJwtToken } from '../../redux/reducers/authReducer';

const Signup = () => {
  const [inputs, setInputs] = useState({});
  let dispatch = useDispatch()
  let [sendRegisterUserRequest, isLoading] = useSendRegisterUserRequestMutation();
  let navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    try {
      let response = await sendRegisterUserRequest(inputs).unwrap();
      let access = response?.data.access
      let refresh = response?.data.refresh
      dispatch(setJwtToken({access, refresh}))
      toast.success(response?.data.response);
      navigate("/sign-up/2")
    } catch (err) {
      toast.error(err?.response);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster richColors />
      <div className='flex items-center justify-center'>
        <div className='flex flex-col justify-between w-5/6 h-full mb-12 border-2 border-solid lg:w-1/4 rounded-2xl mt-28 border-slate-100'>
          <div className='mt-8 '>
            <h1 className='text-4xl text-center font-body'>Signup</h1>
          </div>
          <div className=''>
            <h5 className='ml-4 text-lg font-semibold font-body'>Email</h5>
            <input
              type="email"
              name="email"
              value={inputs.email || ''}
              onChange={handleChange}
              placeholder="what's your email"
              className="px-3 py-4 m-2 w-11/12 border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
            />
            <h5 className='ml-4 text-lg font-semibold font-body'>Username</h5>
            <input
              type="username"
              name="username"
              value={inputs.username || ''}
              onChange={handleChange}
              placeholder="enter username"
              className="px-3 py-4 m-2 w-11/12 border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary"
            />
            <div className='mt-3 '>
              <h5 className='ml-4 text-lg font-semibold font-body'>Password</h5>
              <input
                type="password"
                name="password1"
                value={inputs.password1 || ''}
                onChange={handleChange}
                placeholder="password"
                className="px-3 py-4 mx-2 my-1 w-11/12 font-body text-black border-solid border-[#EFEFF4] border-2 outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
            </div>
            <div className='mt-3 '>
              <h5 className='ml-4 text-lg font-semibold font-body'>Confirm Password</h5>
              <input
                type="password"
                name="password2"
                value={inputs.password2 || ''}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="px-3 py-4 mx-2 my-1 w-11/12 font-body text-black border-solid border-[#EFEFF4] border-2 outline-none rounded-xl bg-tertiary placeholder:text-secondary"
              />
              {inputs.password1 !== inputs.password2 && (
                <p className='grid text-xl font-semibold text-center text-red-500 place-content-center'>Passwords do not match</p>
              )}
            </div>
            <div className='flex items-center justify-center mt-6'>
              <button
                onClick={handleSubmit}
                className='h-[61px] mb-4 font-body font-normal w-10/12 rounded-xl text-white text-2xl bg-main'>Signup
              </button>
            </div>
          </div>
          <div className='flex justify-center items-center h-[80px] border-solid border-t-2 border-[#EFEFF4] '>
            <button>
              GOOGLE API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTransition(Signup);
