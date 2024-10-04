import React from 'react'
import Navbar from '../../components/navbar'
import {motion} from 'framer-motion'
import hero_section from '../../../public/hero-section.png'
import textVariant from '../../motions/textVariant'
import Card from '../../components/Card.jsx'
import plus_icon from '/circle_plus.svg'
import circle_minus from '/circle_minus.svg'
import sec5_1 from '/sec5_1.jpg'
import sec5_2 from '/sec5_2.jpg'

import { useState, useEffect } from 'react'


const menuVars = { 
  initial:{
      scaleY:0,
  },
  animate:{
      scaleY:1,
      transition:{
          duration:0.5,
          ease:[0.12, 0, 0.39, 0]
      }
  },
  exit:{
      scaleY:0,
      transition:{
          delay:0.3,
          duration:0.5,
          ease:[0.22, 1, 0.36, 1]
      }
  }
}

const QuestionVars = { 
  initial:{
      opacity:0,
  },
  animate:{
      opacity:1,
      transition:{
          duration:0.5,
          ease:[0.12, 0, 0.39, 0]
      }
  },
  exit:{
      sopacity:0,
      transition:{
          delay:0.3,
          duration:0.5,
          ease:[0.22, 1, 0.36, 1]
      }
  }
}

/*  CONSTANT CHANGE FOR CHANGING THE INFO ON THE PAGE  */
const reasons = [
  {
  title: "Collaborative Learning",
  description: "Learn from experts and peers in a supportive environment."
},
{
  title: "Flexible Exchange Options",
  description: "Choose from various formats to suit your learning preferences.."
},
{
  title: "Expand Your Network",
  description: "Connect with like-minded individuals passionate about personal growth."
},
{
  title: "Continuous Improvement",
  description: "Embrace lifelong learning and skill development."
},
{
  title: "Peer Support",
  description: "Gain insights and encouragement from both experts and peers in a supportive community."
},
]

const faqList = [
  {
      question: "What is SkillSwap?",
      answer: "SkillSwap is a platform designed to connect individuals who want to exchange skills and knowledge. Users can offer their expertise in one area while learning from others in different fields, fostering a collaborative and supportive community."
  },
  {
      question: "Why should I choose SkillSwap over other platforms?",
      answer: "SkillSwap stands out due to its unique focus on skill exchange and personal growth. Unlike traditional learning platforms, SkillSwap allows you to directly interact with experts and peers, providing a more personalized and hands-on learning experience."
  },
  {
      question: "How does SkillSwap ensure the quality of its users?",
      answer: "SkillSwap maintains high standards by implementing a thorough vetting process for all users. We also encourage feedback and ratings after each skill exchange to ensure that our community remains professional and reliable."
  },
  {
      question: "Is SkillSwap free to use?",
      answer: "SkillSwap offers both free and premium membership options. The free membership provides access to basic features, while the premium membership includes additional benefits such as advanced search options and priority support."
  }
];



const cards = [
  {
    title: "Website Design",
    description: "colaborate-- with other people to echange skills",
    src:'/ux.png'
  },
  {
    title: "Programing",
    description: "colaborate with other people to echange skills",
    src:'/programming.png'
  },
  {
    title: "Video Editor",
    description: "colaborate with other people to echange skills",
    src:'/clapperboard.png'
  },
  
  {
  title: "Graphic Designer",
  description: "colaborate with other people to echange skills",
  src:'/graphic-designer.png'
},
]


const signs = [
  {
    title: "Search skills you want",
    src:'/sec4_pic1.jpg'
  },
  {
    title: "Echange skills",
    src:'/sec4_pic2.jpg'
  },
  {
    title: "Learn together",
    src:'/sec4_pic3.jpg'
  },

]

/*  STATES   */


/*  FUNCTION COMPONENT USED ONE TIME IN THE PAGE  */


export const SignComponent = (props) => {
  return (
    <motion.div
    initial='hidden'
    whileInView='show'    
    variants= {textVariant(props.key / 10)}
    className='z-10 flex flex-col items-center justify-center w-full h-full mb-8 '>
    <h3 className='text-center font-body font-bold text-2xl text-[#313131] mb-2 '>{props.title}</h3>
    <img alt='hero section image' className=' lg:w-[300px] w-4/6 h-32 lg:h-[160px] border-2  rounded-2xl ' src={props.src} />
  </motion.div>
    )
}



/*  MAIN COMPONENT EVERY COMPONENT REPRESNET AN PAGE IN THE HOME PAGE  */




function HeroSection() {
  return (
    <div className='relative w-full h-screen'>
      <div className='flex flex-row w-full '>
        <div className="absolute top-96 left-[-250px] w-96 h-40 lg:w-96 lg:h-96 rounded-full bg-main blur-[250px] lg:blur-[250px]"></div>
        <div className="absolute top-16 right-0 z-0 w-0 h-0 lg:h-full  lg:w-96 bg-[#7A91FF] rounded-l-[180px] "></div>
        <img alt='hero section image' className='absolute h-60 w-60 bottom-20 right-24 lg:mt-0 lg:ml-0 z-10 sm:w-6 lg:w-[710px] lg:h-[541px] lg:right-24 lg:top-0 ' src={hero_section} />
      </div>

      <div className='z-10 flex flex-col items-center justify-start w-full h-full mt-10 lg:mt-0 lg:justify-center lg:items-start'>
        <motion.div 
        
        initial='hidden'
        whileInView='show'    
        variants= {textVariant()}
        className='font-main mx-6 w-2/3 mt-[20%]  mb-4 font-bold text-[#0c33f3] lg:text-[80px] sm:text-[60px] xs:text-[50px] text-4xl lg:leading-[98px] lg:mt-2 '>

          exchange skills online    

        </motion.div>

        <motion.div 
            initial='hidden'
            whileInView='show'    
        variants= {textVariant()}
        className='text-[#595C6C] mx-8 font-normal font-body  lg:mt-10 w-2/3 lg:w1/3 tracking-wide  lg:leading-8  '>

        SkillSwap is a web application that connects users based on their skills and interests, allowing them to exchange knowledge and expertise in a collaborative environment. Users can create profiles highlighting their skills, 
        areas of expertise, and the skills they want to learn. The platform facilitates skill exchanges through various mediums such as one-on-one sessions, group workshops, or virtual classrooms.

        </motion.div>

      </div>
    </div>
  )
}


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


export  function Info() {
  return (
    <div className='flex flex-col items-center w-full bg-white lg:h-screen'>
    <motion.div 
    
    initial='hidden'
    whileInView='show'    
    variants= {textVariant()}
    className='font-body font-bold  px-6 text-main lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2'>
        why SkillSwap ?
    </motion.div>

      <div className='flex flex-wrap w-full mt-20 '>
      <div className='z-10 flex flex-col flex-wrap items-center justify-center w-full lg:flex-row lg:items-start'>
  {reasons.map((reason, index) => (
    <motion.div
    
    initial='hidden'
    whileInView='show'    
    variants= {textVariant(index / 8)}
    
    key={index} 
    className='z-10 flex flex-col items-center justify-between w-2/3 mb-2 mr-4 transition-all bg-white border-2 border-gray-100 h-70 lg:w-2/12 hover:shadow-xl lg:h-70'>
      <h1 className='text-[#313131] text-center m-4 pt-12 font-bold text-[30px]'>
        {reason.title}
      </h1>
      <p className='text-[14px] m-4 pb-24 text-[#707487] font-body text-secondary tracking-wider'>  
        {reason.description}
      </p>
    </motion.div>
  ))}
</div>


</div>  
 </div>
  )
}


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */




export const Skills = () => {
  return (
    <div className='flex flex-col w-full h-screen mt-10 lg:flex-row '>

      <div className='flex flex-col justify-start w-full bg-white'>
        <h2  className='font-body mb-5  font-bold leading-10 lg:mb-10 text-2xl px-6 text-main lg:text-7xl sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2' >
        the quickest way to learn modern skills 
        </h2>
        <p  className='text-[#8F93A6] leading-6  w-4/5 text-sm lg:leading-9 ml-4 lg:mx-12 lg:text-2xl font-normal lg:pt-10  font-body    '>
        Engage in meaningful collaborations with like-minded individuals to share and exchange a diverse range of skills. Enhance your capabilities and knowledge through active participation and mutual learning, fostering a continuous improvement mindset.
        </p>
      </div>

      <div className='flex flex-row flex-wrap w-full gap-8 pl-8 mt-8 bg-white lg:flex-wrap lg:flex-row gap-x-12'>
      {cards.map((card, index) => (
          <Card
          key={index}
            src={card.src}
            title={card.title}
              description={card.description}
              index={index}
              />
      ))}


      
      </div>
    </div>
  )
}



/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


export const StartRight = () => {
  return (
    <div className='w-full relative mt-52 lg:mt-0 flex flex-col lg:flex-row h-full bg-[#E8ECFF]'>
      <div className='flex flex-col w-full pb-24 h-1/2 lg:mb-0 lg:w-1/2 '>
        <h1 className='font-main font-bold h-1/4  px-6 text-[#0c33f3] lg:text-[80px] sm:text-4xl xs:text-[50px] text-4xl lg:leading-[98px] mt-2'>
        You can start learning right now 
        </h1>
        <div className='flex items-center justify-center h-full mt-24 lg:mt-44 lg:flex-row lg:h-3/4'>
        <motion.img whileHover={{scale:1.2}} alt='hero section image' className='absolute lg:w-1/4 lg:h-[35%] w-2/3 mb-12 ml-12 lg:mb-32 lg:ml-32  border-2 border-[#A6B5FF] rounded-2xl ' src={sec5_1} />
        <motion.img whileHover={{scale:1.2}} alt='hero section image' className='absolute lg:w-1/4 lg:h-[35%] w-2/3 mt-12 mr-12 lg:mt-32 lg:mr-32 border-2 border-[#A6B5FF] rounded-2xl ' src={sec5_2} />

        </div>
      </div>
        <div className='flex flex-col items-center justify-between w-full h-full mt-12 lg:mt-0 lg:w-1/2'>

      {signs.map((sign, index)=>(
            <SignComponent key={index} title={sign.title} src={sign.src} />
      ))}


        </div>
    </div>
  )
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
 
 export const Question = () => {
  const [clicked, setIsClicked] = useState([])
  useEffect(() => {
    // Initialize the clicked state with an array of 'false' values
    setIsClicked(faqList.map(() => false));
  }, []);
    console.log(clicked)
   return (
    <>
     <div className='flex flex-col items-center justify-start w-full h-screen min-h-screen bg-white '>
        <h2 className='font-body font-bold h-1/4 text-center mb-4  px-6 text-[#0c33f3] lg:text-[80px] sm:text-[60px] xs:text-[50px] text-2xl lg:leading-[98px] mt-12'>
        Frequently asked questions
        </h2>

          {faqList.map((question, index) => (
        <div key={index} className='relative border-[#BEC3D7] flex flex-col justify-center items-center border-y-2 w-3/4 lg:w-1/2 '>
        {
              clicked[index] ?
              <img onClick={()=>setIsClicked(prevClicked => prevClicked.map((value, i) => i === index ? !value : value))} src={circle_minus} className='absolute top-1/4 hover:cursor-pointer -left-[10%] '  />
            :           
            <img onClick={()=>setIsClicked(prevClicked => prevClicked.map((value, i) => i === index ? !value : value))} src={plus_icon} className='absolute top-1/4 hover:cursor-pointer -left-[10%] '  />

            }

            <h4 className='lg:m-[20px] m-4 text-lg lg:text-2xl font-semibold text-center text-black font-body'>
            {question.question}
            </h4>

            { clicked[index] &&
            <motion.div 
            variants={QuestionVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className='lg:w-[686px] w-5/6 mb-4 origin-top text-[#707487] text-base lg:text-lg h-[100% + 100px] '>
              {question.answer}
            </motion.div>
            }
            </div>
          ))}


        
     </div>
     </>
   )
 }
 




/*MAIN COMPONENT */



const Main = () => {
  return (
    <div className='w-screen h-full overflow-x-hidden'>
      <Navbar />
      <HeroSection />
      <Info />
      <Skills />
      <StartRight />
      <Question />
    </div>
  )
}

export default Main