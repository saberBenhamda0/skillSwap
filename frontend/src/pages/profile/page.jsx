import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import website_design from '/clapperboard.png';
import Chart from '../../components/chart';
import LeftBar from '../../components/leftBar';
import { useGetUserInfoQuery, useGetAllRequestQuery, useAcceptEchangeRequestMutation } from '../../redux/reducers/apiReducer';
import delete_icon from '/delete_icon.svg';
import accept from '/accept.svg';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import right from '/right.svg'
import LeftBarMobile from '../../components/LeftBarMobile';

const Profile = () => {
    const navigate = useNavigate();
    const { data: userInfo } = useGetUserInfoQuery();
    const { data: users } = useGetAllRequestQuery();
    const [visibility, setVisibility] = useState([]);
    const [toggleSideBarOnMobile, setToggleSideBarOnMobile] = useState(false)
    const [acceptEchangeRequest, { isLoading }] = useAcceptEchangeRequestMutation();


    const isMobile = () => {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      }

    useEffect(() => {
        if (users?.data) {
            setVisibility(users.data.map(() => true));
        }

    }, [users?.data]);

    const HandleAccept = async (request_id) => {
        console.log(request_id);
        let data = {
            "request_id": request_id,
            "status": 2
        };
        let response = await acceptEchangeRequest(data).unwrap();
        if (response.status === 200) {
            toast.success(response?.data?.response);
        }
    };

    const HandleReject = async (request_id) => {
        console.log(request_id);
        let data = {
            "request_id": request_id,
            "status": 3
        };
        let response = await acceptEchangeRequest(data).unwrap();
        if (response.status === 200) {
            toast.error(response?.data?.response);
        }
    };



    return (
        <div className='flex lg:flex-row flex-row-reverse w-screen relative bg-[#F1F3FF] h-full'>
            <Toaster richColors />
            <div className='flex flex-row mt-[66px] items-center justify-between  w-full lg:w-10/12 h-full lg:h-screen  lg:ml-60'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-col items-start justify-start w-full h-full mr-8 lg:mt-12 lg:justify-between lg:flex-row'>
                        <div className='flex flex-row w-11/12 mt-6 bg-white shadow-md lg:mt-0 lg:ml-16 lg:w-6/12 rounded-xl h-5/6 lg:h-3/6'>
                                <div className='flex flex-col items-center justify-center w-5/12 h-full '>
                                    <img src={`http://127.0.0.1:8000/${userInfo?.User_image}`} className='h-40 rounded-full lg:w-40' />
                                </div>
                                <div className='flex flex-col items-start w-7/12 h-full'>
                                    <h2 className='w-full my-4 ml-4 text-2xl font-bold break-all font-body'>{userInfo?.username}</h2>
                                    <div className='flex flex-col items-start justify-start w-full mb-2 lg:flex-row'>
                                        <h4 className='text-[#707487] '>Email :</h4>
                                        <p className='w-full ml-2 break-all font-body'>{userInfo?.email}</p>
                                    </div>
                                    <div className='flex flex-col items-start justify-start w-full mb-2 lg:flex-row'>
                                        <h4 className='text-[#707487]'>Phone :</h4>
                                        <p className='ml-2 font-body'>{userInfo?.phone_number}</p>
                                    </div>
                                    <h4 className='mb-2 text-[#707487]'>Description :</h4>
                                    <p className='mb-4 font-body'>{userInfo?.bio}</p>
                                </div>
                        </div>
                        <div className='flex flex-col items-center w-10/12 mt-6 overflow-auto bg-white shadow-md lg:mt-0 lg:mr-16 lg:w-4/12 rounded-xl h-96 lg:h-3/6'>
                                <h2 className='my-4 text-2xl font-bold font-body'>Echange Request</h2>
                                <div className='w-10/12 h-40 lg:h-[100px]'>
                                    {users?.data?.map((user, index) => (
                                        visibility[index] && (
                                            <div key={users.request_id[index]} className='flex flex-row justify-between align-middle items-center border-x-2 border-t-2 border-[#EFEFF4]'>
                                                <div className='flex flex-row items-center align-middle'>
                                                    <img className='mx-4 w-[30px] h-[30px]' src={`http://127.0.0.1:8000${user.User_image}`} alt='User' />
                                                    <h2 onClick={() => navigate(`/profile/${user.id}`)} className='my-4 ml-2 text-xl font-bold cursor-pointer font-body'>
                                                        {user.username}
                                                    </h2>
                                                </div>
                                                <div className='flex flex-row items-center align-middle'>
                                                    <img
                                                        onClick={() => {
                                                            HandleAccept(users?.request_id[index]);
                                                            setVisibility(prevState => prevState.map((v, i) => i === index ? false : v));
                                                        }}
                                                        className='active:opacity-70 transition-opacity mx-4 w-[25px] hover:cursor-pointer h-[25px]'
                                                        src={accept}
                                                        alt='Accept'
                                                    />
                                                    <img
                                                        onClick={() => {
                                                            HandleReject(users?.request_id[index]);
                                                            setVisibility(prevState => prevState.map((v, i) => i === index ? false : v));
                                                        }}
                                                        className='active:opacity-70 transition-opacity hover:cursor-pointer mx-4 w-[25px] h-[25px]'
                                                        src={delete_icon}
                                                        alt='Reject'
                                                    />
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full h-12 mt-4 mb-6 bg-red-500 '>
                    </div>
                </div>
            </div>
            

            <div style={{display: isMobile() ? "block" : "none" }} onClick={()=>setToggleSideBarOnMobile(!toggleSideBarOnMobile)} className='z-20 flex flex-row items-center justify-center h-full mt-24 '>
                <img  src={right} className='w-6 h-6 ' />
            </div>
            <Navbar />
            { !isMobile() && <LeftBar />}
            { toggleSideBarOnMobile && <LeftBarMobile  />}

        </div>
    );
};

export default Profile;
