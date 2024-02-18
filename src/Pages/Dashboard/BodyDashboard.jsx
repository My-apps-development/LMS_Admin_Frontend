import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { IoBookSharp } from "react-icons/io5";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineAssignment } from "react-icons/md";
import { HiMiniNewspaper } from "react-icons/hi2";
import { PiVideoFill } from "react-icons/pi";
import { MdOutlineOndemandVideo } from "react-icons/md";



const BodyDashboard = () => {
    const [userData, setUserData] = useState({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', "Week 5", "Week 6", "Week 7"],
        datasets: [
            {
                label: "Students",
                data: [25, 50, 75, 100, 25, 43, 25],
                backgroundColor: [
                    "#d24787"
                ],
                borderColor: "black",
                borderWidth: 1,

            },
        ],
    });

    const [courseList, setCourseList] = useState([])
    const [QuestionList, setQuestionList] = useState([])
    const [UserList, setUserList] = useState([])
    const [chapterList, setChapterList] = useState([])



    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get("/homepage/courses")
            const data = await response.data
            setCourseList(data.Courses);
        } catch (error) {
            console.log("Error Fetching Courses", error.message);
        }
    }

    const fetchQuestions = async () => {
        try {
            const response = await axiosInstance.get("/Quiz/fetch")
            const data = await response.data
            setQuestionList(data.data);
        } catch (error) {
            console.log("Error Fetching Questions", error.message);
        }
    }


    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("/users")
            const data = await response.data
            setUserList(data.users);
        } catch (error) {
            console.log("Error Fetching Users", error.message);
        }
    }

    const fetchChapters = async () => {
        try {
            const response = await axiosInstance.get("/homepage/fetchChapters")
            const data = await response.data
            setChapterList(data.chapter);
        } catch(error){
            console.log("Error Fetching Chapters", error.message);
        }
    }


    useEffect(() => {
        fetchCourses()
        fetchQuestions()
        fetchUsers()
        fetchChapters()
    }, [])
    return (
        <>

            <div className=" ml-56 flex flex-col font-semibold justify-center items-center mt-8 mb-10 w-[85%]">

                <div className="flex justify-start items-center p-3 w-full">
                    <h1 className="text-2xl text-gray-700">Dashboard</h1>
                </div>
                <div className="grid grid-cols-4 p-5 gap-5 w-[100%] text-xl ">
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><IoBookSharp /></p>
                        <p className="ml-5 text-gray-500">Total Courses</p>
                        <p className="ml-5">{courseList.length}</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><PiVideoFill /></p>
                        <p className="ml-5 text-gray-500">Total Chapters</p>
                        <p className="ml-5">{chapterList.length}</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><HiMiniNewspaper /></p>
                        <p className="ml-5 text-gray-500">Completed Courses</p>
                        <p className="ml-5">12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><FaUsers /></p>
                        <p className="ml-5 text-gray-500">Total Completed Course</p>
                        <p className="ml-5">{UserList.length}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 p-5 gap-5 w-[100%] text-xl ">
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><IoNewspaperSharp /></p>
                        <p className="ml-5 text-gray-500">Total Questions</p>
                        <p className="ml-5">{QuestionList.length}</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><MdOutlineOndemandVideo /></p>
                        <p className="ml-5 text-gray-500">Answered Questions</p>
                        <p className="ml-5">12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><MdOutlineAssignment /></p>
                        <p className="ml-5 text-gray-500">Completed Assignments</p>
                        <p className="ml-5">12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p className="text-[#B32073] ml-5 mt-3"><MdOutlineAssignment /></p>
                        <p className="ml-5 text-gray-500">Total Certificates</p>
                        <p className="ml-5">12</p>
                    </div>
                </div>

                <div className="w-[100%] flex gap-5">
                    <div className="w-[70%] shadow-xl p-3 ml-5">
                        <div className="flex justify-between items-center">
                            <h1 className="text-gray-700">Active User (Students) </h1>
                            <p className="border-2 px-4 py-2 rounded-lg bg-[#B32073] w-40 text-center text-white">Jan 2024 &gt;</p>
                        </div>
                        <div className="w-[100%]">
                            <Bar data={userData}/>
                        </div>
                    </div>
                    <div className="w-[25%] shadow-xl p-3">
                        <div className="flex justify-start items-center w-[100%] p-2">
                            <h1 className="text-gray-700">Users List</h1>
                        </div>
                        <div className="flex flex-col gap-3 w-auto text-sm">
                            {
                                UserList.map((item, index) => {
                                    return (
                                        <div className="flex gap-3" key={index}>
                                            <div className="w-[20%]">
                                                <img src={item.upload_profile} alt="" className="w-12 h-12 object-cover rounded-full" />
                                            </div>
                                            <div className="w-full">
                                                <h1>{item.fullname}</h1>
                                                <p className="text-gray-500">{item.email}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div></>
    )
}

export default BodyDashboard