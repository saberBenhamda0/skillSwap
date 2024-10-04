import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { useSendLoginRequestMutation } from '../../redux/reducers/apiReducer';
import password_symbole from "/password_symbole.png"
import { useNavigate } from 'react-router-dom';
import { setJwtToken } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';

const Login = () => {

  const navigate = useNavigate()

  const  dispatch = useDispatch()


  const [inputs, setInputs] = useState({});

  const [sendLoginRequest, { data, error, isLoading} ] = useSendLoginRequestMutation();

  const [passwordShown, setPasswordShown] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit  = async  () => {
    const statuscode = await sendLoginRequest(inputs).unwrap()
    if(statuscode.status === 200)  {
    dispatch(setJwtToken(statuscode.data))
      navigate("/home")
    }
  };
    let response_status_code = error?.status

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center'>
        <div className='flex flex-col justify-between w-5/6 border-2 border-solid lg:w-1/4 rounded-2xl mt-28 lg:h-5/6 border-slate-100'>
          <div className='mt-8'>
            <h1 className='text-4xl text-center font-body'>Login</h1>
            <h3 className='mt-2 text-xl text-[#8F93A6] text-center font-body'>Hi, Welcome back</h3>
          </div>
          <div>
            <h5 className='ml-4 text-lg font-semibold font-body'>Email</h5>
            <input
              type='email'
              name='email'
              value={inputs.email || ''} 
              onChange={handleChange}
              placeholder="What's your email"
              className='px-3 py-4 m-2 w-11/12 border-2 border-solid border-[#EFEFF4] font-body text-black outline-none rounded-xl bg-tertiary placeholder:text-secondary'
            />
            <div className='relative mt-3'>
              <h5 className='relative ml-4 text-lg font-semibold font-body'>Password</h5>
              <input
                type={passwordShown ? "text" : "password" }
                name='password'
                value={inputs.password || ''} 
                onChange={handleChange}
                placeholder='Password'
                className='px-3 py-4 mx-2 my-1 w-11/12   font-body text-black border-solid border-[#EFEFF4] border-2 outline-none rounded-xl bg-tertiary placeholder:text-secondary'
              />
              <img
              onClick={()=> setPasswordShown(!passwordShown)}
              className='absolute cursor-pointer bottom-5 right-8' src={password_symbole} />

             
            </div>
            <div className='flex flex-row justify-between h-6 mx-3 mt-1'>
              <div>
                <input type='checkbox' id='remember' name='remember' />
                <label className='ml-1 text-sm lg:text-base font-body' htmlFor='remember'>
                  Remember Me
                </label>
              </div>
              <h4 className='text-sm font-bold lg:text-base font-body text-main'>Forgot Password?</h4>
            </div>
            <div className='flex items-center justify-center mt-6'>
             {response_status_code === 401 ?  <span className='text-lg text-red-500 text-semibold' >{error.data.detail}</span> : <></> }
              <button
                className='h-[61px] font-body font-normal w-10/12 rounded-xl text-white text-2xl bg-main'
                onClick={()=>handleSubmit()}
              >
                {isLoading ? "loading" : "login" }
              </button>
            </div>
          </div>
          <div className='flex justify-center items-center h-[80px] border-solid border-t-2 border-[#EFEFF4]'>
            <button>GOOGLE API</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
