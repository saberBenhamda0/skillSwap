import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/page'
import Main from './pages/main/page'
import Signup from './pages/signup/page'
import Home from './pages/home/page'
import Post from './pages/post/page'
import Profile from './pages/profile/page'
import PersonalInformation from './pages/personal-information/page'
import History from './pages/history/page'
import ChangePassword from './pages/change-password/page'
import Personal_information_Edit from './pages/Personal_information_Edit/page'
import ProfileVisitor from './pages/profile-visit/page'
import AddPost from './pages/add-post/page'
import SignUpSecondPage from './pages/sign-up-second-page/page'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'


function App() {
  let location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
      <Route path='/post/:id' element={<Post />} />
      <Route path='/post/add' element={<AddPost />} />
      <Route path='/profile/:id' element={<ProfileVisitor />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Main />}/>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/Home' element={<Home/>} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/personal_information' element={<PersonalInformation />}/>
      <Route path='Personal_information/Edit' element={<Personal_information_Edit/>}/>
      <Route path='/history' element={<History />} />
      <Route path='/change_password' element={<ChangePassword />} />
      <Route path='/sign-up/2' element={<SignUpSecondPage />} />
    </Routes>
    </AnimatePresence>

  )
}

export default App
