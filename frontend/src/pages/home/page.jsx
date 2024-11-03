import React, { useState, useEffect, Fragment } from 'react';
import Navbar from '../../components/navbar';
import SkillCard from '../../components/SkillCard';
import { useGetAllPostQuery, useSendAddPostRequestMutation, useGetPostWithTheSameTypeQuery } from '../../redux/reducers/apiReducer';
import { updatePosts } from '../../redux/reducers/postsReducer';
import { useDispatch, useSelector } from 'react-redux';
import {motion} from 'framer-motion';
import add_post_icon from '/add_post_icon.svg';
import removePopOut from '/removePopOut.svg'
import right from '/right.svg'
import { Toaster, toast } from 'sonner';



const SkillsBarComponent = ({ skill, index, activeIndex, setActiveIndex }) => {
    const dispatch = useDispatch();
    const { data: filterPost, isLoading } = useGetPostWithTheSameTypeQuery(`${skill}`);
    
    if (isLoading){
        return <h1>IS LOADIIING</h1>
    }
    const HandleClick = () => {
        setActiveIndex(index);
        if (filterPost) {
            dispatch(updatePosts(filterPost));
        }
    };




    return (
        <div>
            <h5
                key={index}
                onClick={HandleClick}
                className={`m-2 text-xl font-[500] hover:cursor-pointer font-body ${activeIndex === index ? "text-blue-600" : "text-black"}`}
            >
                {skill}
            </h5>
        </div>
    );
};

const Home = () => {


    let [sendAddPostRequest] = useSendAddPostRequestMutation()
    const { data: posts, isLoading } = useGetAllPostQuery();
    
    
    let { username, userDescription, pastCollaboration, user_id, User_image } = useSelector((state)=> state.userInfo);
    const StorePosts = useSelector(state => state.posts?.posts);
    const dispatch = useDispatch();


    
    let [visible, setVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);
    const [sideBarVisible, setSideBarVisible] = useState(false)

    // chechking if we user using mobile return true if we are in mobile

      const isMobile = () => {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      }


      useEffect(() => {
        setSideBarVisible(isMobile)
      }, [])
      


    useEffect(() => {
        if (posts) {
            dispatch(updatePosts(posts));
        }

    }, [dispatch, posts]);


    const skills = [
        "Web Development",
        "Web Design",
        "Programming",
        "3D Modeling",
        "Graphic Design",
        "SEO Optimization",
        "UI-UX Design",
        "E-commerce Solutions",
        "CMS Integration",
        "Responsive Design",

    ];

    

    const AddPostComponent = ({visible, setVisible}) => {
        let [clicked, setClicked] = useState(false)
        const [inputs, setInputs] = useState({
            username: "",
            description: "",
            userDescription: "",
            type: "",
            pastCollaboration: null,
            price: 0,
            Post_image: null,
            User_image: null,
            user: null
          });

          

        const handleChange = (event) => {
            const { name, value } = event.target;
            setInputs((values) => ({ ...values, [name]: value }));
          };


          const handleChangeImage = (event) => {
              setInputs((prevInputs) => ({
                ...prevInputs,
                Post_image: event.target.files[0],
                username: `${username}`,  // Add or overwrite the specific properties
                userDescription: `${userDescription}`,
                pastCollaboration: pastCollaboration,
                user: user_id,
                User_image: `${User_image}`
              }));}

        const HandleAddPost = async ({inputs}) => {

            let formData = new FormData()

            formData.append("username", inputs.username);
            formData.append("userDescription", inputs.userDescription);
            formData.append("description", inputs.description);
            formData.append("price", inputs.price);
            formData.append("userDescription", inputs.userDescription);
            formData.append("type", inputs.type);
            formData.append("pastCollaboration", inputs.pastCollaboration);
            formData.append("user", inputs.user);
            formData.append("Post_image", inputs.Post_image);
            
            let user_image_response = await fetch(`${inputs.User_image}`, {method:'GET'});
            let user_image = await user_image_response.blob(); // Convert the response to a blob
            
            formData.append("User_image", user_image, "user_image.jpg"); // Append the blob with a filename
            
            let response = await sendAddPostRequest(formData).unwrap()
            if (response.status === 201) {
                setVisible(false)
                toast.success("the post added with success")
            }
            if (response.status === 400) {
                toast.error("something went wrong make sure every field is correct or try later")
            }
            console.log(inputs)

        }


        return (
            visible && 
            <div className='fixed inset-0 flex flex-col items-center justify-center w-screen bg-black bg-opacity-25 backdrop-blur-sm'>
                <div className=' w-11/12 lg:w-5/12 relative mt-24 bg-white border-2 border-solid shadow-xl flex flex-col items-center justify-center h-[600px] rounded-3xl'>
                <img onClick={()=> setVisible(!visible)}   src={removePopOut} className='absolute z-10 transition-opacity cursor-pointer hover:opacity-50 top-5 right-5 ' />
                    <div className='flex w-full fleex-col h-1/2 '>

                    <div class="flex flex-col items-center justify-center">

                        <input onChange={handleChangeImage} name="Post_image"  type='file' className=' lg:py-12 lg:pl-4 ml-4 rounded-full m-8 flex items-center justify-start w shadow-md h-[80px] w-[80px] lg:w-[145px] lg:h-[145px]'>

                        </input>

                        </div>

                        <div className='flex flex-col items-start justify-around w-full mt-14 '>

                            <select onChange={handleChange} name='type' placeholder='add type of skill' className='rounded-l  font-main placeholder:text-[#8F93A6] placeholder:font-main shadow-md w-11/12 lg:w-[335px] mb-8 h-[45px]'>
                                    <option name='type' value="Web Development">Web Development</option>
                                    <option name='type' value="Web Design">Web Design</option>
                                    <option name='type' value="Programming">Programming</option>
                                    <option name='type' value="3D Modeling">3D Modeling</option>
                                    <option name='type' value="Graphic Design">Graphic Design</option>
                                    <option name='type' value="SEO Optimization">SEO Optimization</option>
                                    <option name='type' value="UI/UX Design">UI/UX Design</option>
                                    <option name='type' value="E-commerce Solutions">E-commerce Solutions</option>
                                    <option name='type' value="CMS Integration">CMS Integration</option>
                                    <option name='type' value="Responsive Design">Responsive Design</option>
                            </select>
                            <div className='flex flex-row items-center justify-between w-11/12'>
                                <label className='text-xl font-semibold font-main'>
                                    Price : 
                                </label>
                                <input onChange={handleChange} name='price' type='number' className='  rounded-l font-main placeholder:text-[#8F93A6] placeholder:font-main shadow-md w-full lg:w-[160px] h-[45px]' />
                            </div>

                        </div>

                    </div>
                    <div className='flex flex-col items-center justify-center w-full h-1/2'>
                        <textarea onChange={handleChange} name='description' placeholder='Entre Discrpition' className='lg:w-[495px] w-11/12 text-start pl-2 pt-2 font-main resize-none font-main placeholder:text-[#8F93A6] bg-white h-[252px] border-2 boder-solid border-[#EFEFF4] shadow-md rounded-l' />
                    </div>
                    <button
                    onClick={()=> 
                        
                        HandleAddPost({inputs})}
                        className=' my-6 grid place-content-center active:opacity-90 transition-opacity border-solid font-body text-center text-2xl text-white font-bold bg-gradient-to-r from-[#6479E6] to-[#B7A7F9] border-2 border-[#EFEFF4] w-[300px] rounded-2xl h-[70px]'>
                        add post
            </button>                </div>
            </div>
        )
    }


    
    if (isLoading) { 
        return <h1>IS LOAADIING</h1>;
    }
    return (
        <Fragment >
        <Toaster className='z-50 ' richColors />
        <div className='flex flex-row'>
            <Navbar />
            <motion.div  onClick={()=> setVisible(!visible)}  whileHover={{scale:1.2}}  className='fixed z-10 grid w-12 h-12 rounded-full shadow-xl place-content-center bg-main bottom-5 right-5'>
                <img className='rotate-45 ' src={add_post_icon} />
            </motion.div>

            <img src={right} onClick={()=> setSideBarVisible(!sideBarVisible)} className='z-10 w-6 h-6 mt-28 lg:hidden'/>
                
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                scaleX:  1 ,
                }}

                exit={{
                    scaleX: 1,
                    transitionEnd: {
                    display: "none", // Set display to none after animation ends when exiting
                    },
                }}



            style={{display:sideBarVisible ? "none" :"block"  }} 
            className="lg:flex flex-col origin-left  items-center  lg:mt-16 lg:w-1/4  lg:min-h-screen bg-[#EFEFF4]"
            >

                <h2 className='m-10 text-3xl font-bold font-body'>
                    Learn
                </h2>
                {skills.map((skill, index) => (
                    <SkillsBarComponent
                        key={index}
                        index={index}
                        skill={skill}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                ))}
            </motion.div>
            <div className='flex flex-wrap w-10/12 mt-16 lg:w-3/4'>
                {StorePosts?.map((post, index) => (
                    <SkillCard
                        key={index}
                        index={index}
                        user={post?.user}
                        description={post?.description}
                        pastCollaboration={post?.pastCollaboration}
                        price={post.price}
                        Post_image={`${post?.Post_image}`}
                        User_image={`${post?.User_image}`}
                        username={post?.username}
                        id={post?.id}
                    />
                ))}
            </div>
        </div>
        <AddPostComponent setVisible={setVisible} visible={visible} />
        </Fragment>
    );
};

export default Home;
