import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io"
// import { IoCloseCircleOutline } from "react-icons/io5";
import { errorMessage } from "../../Utils/notificationManager";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const adminData = JSON.parse(localStorage.getItem("admin"))
    const [state, setState] = useState({ right: false })
    const [notificationList, setNotificationList] = useState([])
    const style = {
        position: 'absolute',
        top: '42%',
        left: '68%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        p: 2,
        border: '1px solid #910033',
    };
    const fetchNotification = async() => {
        try{
            const response = await axiosInstance.get("/notification/notification")
            const data = await response?.data
            setNotificationList(data?.notifications);
        } catch(error){
            errorMessage(error?.response?.data?.message) 
        }
    }

    useEffect(()=>{
        fetchNotification()
    },[])
    // console.log(adminData);
    return (
        <div className="flex justify-between items-center p-2 w-[100%] font-semibold mt-2 static" data-aos="fade-down">
            <div className="flex justify-center items-center p-2 border-2 w-[50%] ml-20 rounded-lg">
                <p className="text-4xl w-14 text-center"><FiSearch /></p>
                <input type="search" name="" id="" className="p-2 w-full" placeholder="Search for Courses, Users and Companies"/>
            </div>

            <div className="flex justify-center items-center text-2xl p-2 ml-40 text-gray-600 cursor-pointer"  onClick={() => setState((prevState) => ({ ...prevState, right: true }))}>
                <p><IoMdNotificationsOutline /></p>
            </div>

            <div className="flex w-[20%] gap-2 justify-center items-center cursor-pointer">
                <div className="w-[30%]">
                    <img src="https://img.freepik.com/free-photo/businessman-working-laptop_23-2147839979.jpg?size=626&ext=jpg&ga=GA1.1.1985124745.1695480142&semt=sph" alt="" className="w-12 h-12 object-cover rounded-full" />
                </div>

                <div className="w-full">
                    <h1 className="text-gray-700">{adminData?.fullname}</h1>
                    <p className="text-gray-500">{adminData?.email}</p>
                </div>
            </div>

            <div>
                <Drawer
                    anchor="right"
                    open={state.right}
                    classes={{
                        paper: { ...style },
                    }}
                    PaperProps={{
                        sx: { width: "30%" },
                    }}
                >
                    <div>
                        <div className="flex justify-between items-center w-full font-semibold px-4">
                            <h1 className="text-2xl mt-4">Notifications</h1>
                            <button className="p-2 w-10 h-10 flex justify-center items-center text-center rounded-full border-2 border-[#B32073] bg-[#B32073] text-white hover:scale-95 hover:duration-300 hover:bg-inherit hover:border-2 hover:border-[#B32073] hover:text-gray-500 mt-4" onClick={() => { setState((prevState) => ({ ...prevState, right: false })) }
                            }><CloseIcon /></button>
                        </div>

                        <div className="mt-10 flex justify-center items-center w-full gap-2 flex-col">
                            {notificationList?.map((notification, index) => {
                                return (
                                    <div key={index} className="flex flex-col p-5 font-semibold shadow-xl border-2 w-full">
                                        <div className="flex justify-between items-center capitalize">
                                            <h1 className="text-sm">{notification?.title}</h1>
                                            <p className="text-xs">{notification?.time}</p>
                                        </div>
                                        <div className="flex justify-between items-center capitalize text-xs">
                                            <p>{notification?.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </Drawer>
            </div>
        </div>
    )
}

export default Header