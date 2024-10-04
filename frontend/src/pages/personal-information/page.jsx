import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import LeftBar from '../../components/leftBar';
import edit_icon from '/edit_icon.svg';
import { useGetUserInfoQuery } from '../../redux/reducers/apiReducer';
import LeftBarMobile from '../../components/LeftBarMobile';
import right from '/right.svg'



const PersonalInformation = () => {
  const navigate = useNavigate();
  const TOKEN = localStorage.getItem("access");
  const [clicked, setClicked] = useState(false);
  const { data: userInfo, isLoading, error } = useGetUserInfoQuery();
  const [info, setInfo] = useState({});
  const [toggleSideBarOnMobile, setToggleSideBarOnMobile] = useState(false)

  // checking if we are in mobile
  const isMobile = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((values) => ({ ...values, [name]: value }));
    console.log(info)
  };

  // Set initial state with userInfo data when it is fetched
  useEffect(() => {
    if (userInfo) {
      setInfo({});
    }

  }, [userInfo]);

  const handleSubmit = async () => {
    const statuscode = await sendLoginRequest(inputs).unwrap();
    if (statuscode.status === 200) {
      localStorage.removeItem("access");
      localStorage.setItem("access", statuscode.data.access);
      navigate("/home");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user info</div>;

  let keys = Object.keys(userInfo || {});
  let personalinfos = [
    { key: 'first_name', value: userInfo.first_name },
    { key: 'last_name', value: userInfo.last_name },
    { key: 'Job', value: 'web dev' },
    { key: 'email', value: userInfo.email },
    { key: 'phone_number', value: userInfo.phone_number },
  ];

  let locationInfos = [
    { key: 'country', value: userInfo.country },
    { key: 'region', value: userInfo.region },
    { key: 'city', value: userInfo.city },
    { key: 'Neighborhood', value: userInfo.Neighborhood },
    { key: 'PostalCode', value: '91000' },
  ];

  const EditButton = () => {

    return (
      <div
        className='flex flex-row items-center justify-center text-center cursor-pointer text-[#979797] w-16 h-10 lg:w-[100px] lg:h-[50px] mr-6 mb-16 rounded-lg border-solid border-2 border-[#EFEFF4]'
        onClick={() => navigate("/Personal_information/Edit")}>
        <p className='w-full m-2 text-sm lg:text-base'>Edit</p>
        <img className=' w-5 h-5  lg:w-[26px] lg:h-[26px] ' src={edit_icon} />
      </div>
  )
}


  const KeyValuePairEdit = ({holder, value}) => {

    return(
        <div className='m-4 w-60 '>
            <h6 className=' text-center font-body text-xl text-[#707487]' > {holder}  :</h6>
            <p className='mb-2 text-xl text-center break-all font-body'>{value}</p>
        </div>
    )
  }
    
    


  return (
    <div className='flex flex-col relative w-screen bg-[#F1F3FF] items-center justify-center h-full'>
      <div className='mt-[100px] lg:ml-32 bg-white w-10/12 lg:w-8/12 h-1/4 rounded-2xl flex flex-row items-center justify-between shadow'>
        <div className='flex flex-row items-center justify-between w-2/5 h-full'>
          <img src={`http://127.0.0.1:8000/${userInfo?.User_image}`} className='lg:w-[120px] w-24 h-24 m-2 lg:m-4 mr-4 lg:ml-10 lg:h-[120px]' />
          <div className='flex flex-col items-center justify-center w-full'>
            <h2 className='mb-3 text-lg font-bold lg:text-2xl break-before-all font-body'>Saberben Hamda</h2>
            <h4 className='mb-2 text-sm lg:text-base font-body'>Web Developer</h4>
            <h6 className='text-[#707487]  text-sm lg:text-base '>Chefchaouen</h6>
          </div>
        </div>

        <EditButton />
      </div>

      <div className='mt-[33px] flex flex-col items-start justify-between lg:ml-32 bg-white w-10/12 lg:w-8/12 h-3/5 rounded-2xl shadow'>

        <div className='flex flex-row items-center w-full h-full justify-betweenlg:w-8/12'>
          <h2  className='ml-6 text-2xl font-bold mb-14 font-body'>Personal Information</h2>
          <div className='flex flex-row items-start justify-end w-full mt-4 '>
            <EditButton />
          </div>
        </div>

                <div className='flex flex-row flex-wrap items-center justify-between w-full '>
                    {personalinfos.map((personalinfo, index)=>(
                        <KeyValuePairEdit holder={personalinfo.key} value={personalinfo.value}   />
                        )
 
                    )}
        </div>

      </div>

      <div className='my-[33px] lg:ml-32 bg-white w-10/12 lg:w-8/12 h-3/5 rounded-2xl shadow'>

        <div className='flex flex-row items-center justify-between w-full'>
            <h2  className='ml-6 text-2xl font-bold mb-14 font-body'>Adress</h2>
            <div className='mt-8 '>
            <EditButton />
          </div>
        </div>
                
                <div className='flex flex-row flex-wrap items-center justify-between w-full '>

                    {locationInfos.map((locationInfo, index)=> (
                        <KeyValuePairEdit value={locationInfo.value} holder={locationInfo.key} key={index} />
          ))}
        </div>
      </div>
      <Navbar />
      <div style={{display: isMobile() ? "block" : "none" }} onClick={()=>setToggleSideBarOnMobile(!toggleSideBarOnMobile)} className='absolute top-0 z-20 flex flex-row items-center justify-center h-full mt-24 left-2 '>
          <img  src={right} className='w-6 h-6 ' />
      </div>
      { !isMobile() && <LeftBar />}
      { toggleSideBarOnMobile && <LeftBarMobile  />}    </div>
  );
};

export default PersonalInformation;
