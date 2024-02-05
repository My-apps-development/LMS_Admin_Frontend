import { useState } from "react"
import { FaChevronDown } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaUserLarge } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";
import { IoPower } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";


const SideMenu = () => {

    const [isCourseOpen, setIsCourseOpen] = useState(false)
    const [isAssignmentOpen, setIsAssignmentOpen] = useState(false)
    const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

    return (

        <div className="fixed">
            <aside className="w-30% h-screen flex justify-start items-center gap-5 flex-col  font-semibold shadow-xl">
                <div className="mt-10">
                    <img src="https://s3-alpha-sig.figma.com/img/2b7a/e2a9/ab1815762d340c9974f3e447205cfc0a?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVqTssfLKAkKuK7FxoGcwekgZU5s2CeVO4LyCghKGfpGdv8SoqG6YpCp9utoHyx5VxwOFNdaumLDciVcLmrJlerqlFHc2Kiy5BIOpkszs1AfV6WeVLBKWrsZKw4lINkJp5PYZElwhIHauq0RtGyX0sqqzhv-Z8xG9sTOtQbm7zRS0FfDbiF0kEes8IW1g~el~oSQmO6DPHjDQU~i66mjvVX0dEaq~wL7sjDVQWubVu1sHJIzY3zu9MkGcAXvargy-F8znxU2yZxfkNC~eeckaBWieQqrCXQ8QKoc-l4nHQJgzr3snpGGw3ovATCZdYaJX9B6fp9uie~zsCS6iYnHVw__" alt="" className="w-16 h-16" />
                </div>
                <Divider />
                <div className="w-[100%] flex flex-col gap-5 px-5 ">
                    <NavLink to="/">
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full">
                            <p className="flex justify-center items-center text-gray-500"><MdSpaceDashboard /></p>
                            <h1 className="text-xl hover:text-pink-600 text-gray-500 w-full">Dashboard</h1>
                        </div>
                    </NavLink>
                    <div className="w-[100%] p-2 text-gray-500 flex flex-col gap-1">
                        <div onClick={() => setIsCourseOpen(!isCourseOpen)} className="flex justify-between items-center">
                            <div className="flex justify-center items-center gap-2">
                                <p><FaBook /></p>
                                <h1 className="text-xl text-gray-500">Courses</h1>
                            </div>
                            <p><FaChevronDown /></p>
                        </div>
                        <div className={`sm ${isCourseOpen ? "flex" : "hidden"} flex-col gap-5 mt-5`}>
                            <NavLink to="/Courses/Categories"><p>Categories</p></NavLink>
                            <NavLink to="/Courses/CourseList"><p>Course List</p></NavLink>
                        </div>
                    </div>
                    <div className="w-[100%] p-2 text-gray-500 flex flex-col gap-1">
                        <div onClick={() => setIsAssignmentOpen(!isAssignmentOpen)} className="flex justify-between items-center">
                            <div className="flex justify-center items-center gap-2">
                                <p><FaBook /></p>
                                <h1 className="text-xl text-gray-500">Assignment</h1>
                            </div>
                            <p><FaChevronDown /></p>
                        </div>
                        <div className={`sm ${isAssignmentOpen ? "flex" : "hidden"} flex-col gap-5 mt-5`}>
                            
                            <p>Assignment</p>
                            <NavLink to="/Assessment/List"><p>Question List</p></NavLink>

                        </div>
                    </div>
                    <div className="w-[100%] p-2 text-gray-500 flex flex-col gap-1">
                        <div onClick={() => setIsEnrollmentOpen(!isEnrollmentOpen)} className="flex justify-between items-center">
                            <div className="flex justify-center items-center gap-2">
                                <p><FaBook /></p>
                                <h1 className="text-xl text-gray-500">Enrollment</h1>
                            </div>
                            <p><FaChevronDown /></p>
                        </div>
                        <div className={`sm ${isEnrollmentOpen ? "flex" : "hidden"} flex-col gap-5 mt-5`}>
                            <NavLink to="/Course/Enrollment"><p>Course Enrollment</p></NavLink>
                            <NavLink to="/Enrollment/List"><p>Enrollment List</p></NavLink>
                        </div>
                    </div>

                    <NavLink to="/users">
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full">
                            <p className="flex justify-center items-center text-gray-500"><FaUserLarge /></p>
                            <h1 className="text-xl hover:text-pink-600 text-gray-500 w-full">Users</h1>
                        </div>
                    </NavLink>

                    <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full">
                        <p className="flex justify-center items-center text-gray-500"><AiOutlineSafetyCertificate /></p>
                        <h1 className="text-xl hover:text-pink-600 text-gray-500 w-full">Certificate</h1>
                    </div>

                    <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full">
                        <p className="flex justify-center items-center text-gray-500"><RiMenu2Line /></p>
                        <h1 className="text-xl hover:text-pink-600 text-gray-500 w-full">Menu</h1>
                    </div>

                    <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full">
                        <p className="flex justify-center items-center text-gray-500"><MdSettings /></p>
                        <h1 className="text-xl hover:text-pink-600 text-gray-500 w-full">Settings</h1>
                    </div>

                    <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full">
                        <p className="flex justify-center items-center text-gray-500"><IoPower /></p>
                        <h1 className="text-xl hover:text-pink-600 text-gray-500 w-full">Logout</h1>
                    </div>
                </div>
            </aside>
        </div>

    )
}

export default SideMenu