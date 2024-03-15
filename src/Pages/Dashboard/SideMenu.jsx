import { useState } from "react"
import { FaChevronDown } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaUserLarge } from "react-icons/fa6";
// import { MdSettings } from "react-icons/md";
import { IoPower } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

import { successMessage } from "../../Utils/notificationManager";
import { HiOfficeBuilding } from "react-icons/hi";


const SideMenu = () => {

    const navigate = useNavigate()

    const [isCourseOpen, setIsCourseOpen] = useState(false)
    const [isAssignmentOpen, setIsAssignmentOpen] = useState(false)
    // const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)


    const handleLogout = (e) => {
        e.preventDefault()

        localStorage.clear()
        successMessage("Successfully Logged Out")
        navigate("/login")
    }

    return (

        <div className="fixed">
            <aside className="w-56 h-screen flex justify-start items-center gap-2 text-sm flex-col  font-semibold shadow-xl" data-aos="fade-right">
                <div className="mt-10  border-b-2 w-full flex justify-center items-center py-4 border-gray-400">


                    <img src="/Logo.png" alt="" className="w-20 h-20" />

                </div>

                <div className="w-[100%] flex flex-col gap-2 px-5 mt-10">
                    <NavLink to="/" className={({ isActive, isPending }) => isPending ? "flex  flex-row items-center duration-300 hover:shadow-xl hover:scale-105 hover:text-[#B32073]  pr-6" : isActive ? "flex text-[#B32073] flex-row items-center duration-300 scale-105 pr-6 bg-gray-300  rounded hover:text-[#B32073] hover:shadow-xl " : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full hover:text-[#B32073]">
                            <p className="flex justify-center items-center "><MdSpaceDashboard /></p>
                            <h1 className="text-xl  w-full hover:text-[#B32073]">Dashboard</h1>
                        </div>
                    </NavLink>
                    <div className="w-[100%]  text-gray-500 flex flex-col gap-1">
                        <div onClick={() => setIsCourseOpen(!isCourseOpen)} className="flex justify-between items-center p-2 hover:text-[#B32073] hover:bg-gray-300">
                            <div className="flex justify-center items-center gap-2">
                                <p><FaBook /></p>
                                <h1 className="text-xl text-gray-500 cursor-pointer hover:text-[#B32073]" >Courses</h1>
                            </div>
                            <p><FaChevronDown /></p>
                        </div>
                        <div className={`sm ${isCourseOpen ? "flex" : "hidden"} flex-col gap-5 mt-5`}>
                            <NavLink to="/Courses/Categories" className={({ isActive, isPending }) => isPending ? "flex p-2 text-xl flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? `flex text-xl flex-row items-center duration-300 scale-105 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl ${setIsCourseOpen(true)}`: "text-gray-500"}>
                                <p className="hover:text-[#B32073] w-full p-2 ">Categories</p>
                            </NavLink>
                            <NavLink to="/Courses/CourseList" className={({ isActive, isPending }) => isPending ? "flex text-xl p-2 flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? `flex text-xl flex-row items-center duration-300 scale-105 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl ${setIsCourseOpen(true)}` : "text-gray-500"}>
                                <p className="hover:text-[#B32073] w-full p-2 ">Course List</p>
                            </NavLink>
                        </div>
                    </div>

                    <div className="w-[100%]  text-gray-500 flex flex-col gap-1">
                        <div onClick={() => setIsAssignmentOpen(!isAssignmentOpen)} className="flex p-2 justify-between items-center hover:text-[#B32073]">
                            <div className="flex justify-center items-center gap-2">
                                <p><FaBook /></p>
                                <h1 className="text-xl cursor-pointer hover:text-[#B32073] text-gray-500">Assessment</h1>
                            </div>
                            <p><FaChevronDown /></p>
                        </div>
                        <div className={`sm ${isAssignmentOpen ? "flex" : "hidden"} flex-col gap-2 mt-1`}>

                            {/* <p >Assignment</p> */}
                            <NavLink to="/Assessment/Record" className={({ isActive, isPending }) => isPending ? "flex p-2 text-xl flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? `flex text-xl flex-row items-center duration-300 scale-105 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl ${setIsAssignmentOpen(true)}`: "text-gray-500"}><p className="hover:text-[#B32073] w-full p-2 rounded hover:bg-gray-300 ">Record</p></NavLink>
                            <NavLink to="/Assessment/List" className={({ isActive, isPending }) => isPending ? "flex text-xl hover:text-[#B32073] flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? `flex text-xl flex-row items-center duration-300 scale-105 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl ${setIsAssignmentOpen(true)}` : "text-gray-500"}><p className="hover:text-[#B32073] w-full p-2 rounded hover:bg-gray-300 ">Question List</p></NavLink>

                        </div>
                    </div>
                    {/* <div className="w-[100%] text-gray-500 flex flex-col gap-1">
                        <div onClick={() => setIsEnrollmentOpen(!isEnrollmentOpen)} className="flex p-2 justify-between items-center hover:text-[#B32073]">
                            <div className="flex justify-center items-center gap-2 hover:text-[#B32073]  text-gray-500">
                                <p><FaBook /></p>
                                <h1 className="text-xl text-gray-500 cursor-pointer hover:text-[#B32073]">Enrollment</h1>
                            </div>
                            <p><FaChevronDown /></p>
                        </div>
                        <div className={`sm ${isEnrollmentOpen ? "flex" : "hidden"} flex-col gap-5 mt-5`}>
                            <NavLink to="/Course/Enrollment" className={({ isActive, isPending }) => isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl" : ""}><p className="hover:text-[#B32073] text-gray-500 p-3 rounded hover:bg-gray-300">Course Enrollment</p></NavLink>
                            <NavLink to="/Enrollment/List" className={({ isActive, isPending }) => isPending ? "flex hover:text-[#B32073] flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl" : ""}><p className="hover:text-[#B32073] p-3 rounded hover:bg-gray-300 text-gray-500">Enrollment List</p></NavLink>
                        </div>
                    </div> */}

                    <NavLink to="/users" className={({ isActive, isPending }) => isPending ? "flex hover:text-[#B32073] flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex text-[#B32073] flex-row items-center duration-300 scale-105 pr-6 bg-gray-300  rounded hover:text-[#B32073] hover:shadow-xl" : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full hover:text-[#B32073]">
                            <p className="flex justify-center items-center  hover:text-[#B32073]"><FaUserLarge /></p>
                            <h1 className="text-xl hover:text-[#B32073]  w-full">Users</h1>
                        </div>
                    </NavLink>

                    <NavLink to="/Certificate" className={({ isActive, isPending }) => isPending ? "flex text-[#B32073] hover:text-[#B32073] flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl" : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full hover:text-[#B32073]">
                            <p className="flex  hover:text-[#B32073] justify-center items-center "><AiOutlineSafetyCertificate /></p>
                            <h1 className="text-xl hover:text-[#B32073]  w-full">Certificate</h1>
                        </div>
                    </NavLink>

                    <NavLink to="/menu/Library" className={({ isActive, isPending }) => isPending ? "flex gap-2 text-[#B32073] hover:text-[#B32073]  items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex  gap-2 flex-row items-center duration-300 scale-105 pr-6 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl" : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full cursor-pointer hover:text-[#B32073]">
                            <p className="flex justify-center items-center "><RiMenu2Line /></p>
                            <h1 className="text-xl hover:text-[#B32073]  w-full">Library</h1>
                        </div>
                    </NavLink>



                    {/* <NavLink className={({ isActive, isPending }) => isPending ? "flex hover:text-[#B32073] flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex text-[#B32073] flex-row items-center duration-300 scale-105 pr-6 bg-gray-300  rounded hover:text-[#B32073] hover:shadow-xl" : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full cursor-pointer hover:text-[#B32073]">
                            <p className="flex justify-center items-center"><MdSettings /></p>
                            <h1 className="text-xl hover:text-[#B32073] w-full">Settings</h1>
                        </div>
                    </NavLink> */}


                    <NavLink to="/Company" className={({ isActive, isPending }) => isPending ? "flex gap-2 text-[#B32073] hover:text-[#B32073]  items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex  gap-2 flex-row items-center duration-300 scale-105 pr-6 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl" : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full cursor-pointer hover:text-[#B32073]">

                            <p className="flex justify-center items-center "><HiOfficeBuilding /></p>
                            <h1 className="text-xl hover:text-[#B32073]  w-full">Company</h1>


                        </div>
                    </NavLink>

                    <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full cursor-pointer hover:text-[#B32073]" onClick={handleLogout}>
                        <p className="flex justify-center items-center "><IoPower /></p>
                        <h1 className="text-xl hover:text-[#B32073] text-gray-500 w-full">Logout</h1>
                    </div>
                </div>
            </aside>
        </div>

    )
}

export default SideMenu