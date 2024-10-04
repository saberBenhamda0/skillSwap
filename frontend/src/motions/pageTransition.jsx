import React from 'react'
import {motion} from 'framer-motion'

const PageTransition = (OgComponent) => {
  return (props) => (
    <>
      <OgComponent {...props} />
      <motion.div
        className="fixed top-0 left-0 w-full h-screen origin-bottom bg-[#7A91FF]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-screen origin-top bg-[#7A91FF]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}

export default PageTransition;
