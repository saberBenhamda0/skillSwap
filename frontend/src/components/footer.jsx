import React from 'react'

  
  const Footer = () => {
    return (
  <footer className="py-8 text-gray-700 bg-white border-2 border-gray-100 border-solid">
    <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
      <div className="mb-4 md:mb-0">
        <h3 className="text-xl font-bold">SkillSwap</h3>
        <p className="text-sm">Connecting people through knowledge exchange</p>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-500 transition-colors duration-300 hover:text-gray-900">About Us</a>
        <a href="#" className="text-gray-500 transition-colors duration-300 hover:text-gray-900">FAQs</a>
        <a href="#" className="text-gray-500 transition-colors duration-300 hover:text-gray-900">Contact Us</a>
      </div>
    </div>
  </footer>
  
    )
  }
  

export default Footer 