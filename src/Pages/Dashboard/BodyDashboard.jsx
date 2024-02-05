import { useState } from "react";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import AdminDashboard from "./AdminDashboard";

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
    return (
        <>
       
            <div className=" ml-56 flex flex-col font-semibold justify-center items-center mt-32 w-[85%]">

                <div className="flex justify-start items-center p-3 w-full">
                    <h1 className="text-2xl text-gray-800">DashBoard</h1>
                </div>
                <div className="grid grid-cols-4 p-5 gap-5 w-[100%]">
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 p-5 gap-5 w-[100%]">
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start border-2 p-2 rounded-lg shadow-lg">
                        <p>icon</p>
                        <p>Total Courses</p>
                        <p>12</p>
                    </div>
                </div>

                <div className="w-[100%] flex gap-5">
                    <div className="w-[70%] shadow-xl p-3 ml-5">
                        <div className="flex justify-between items-center">
                            <h1>Active User (Students) </h1>
                            <p className="border-2 px-4 py-2 rounded-lg bg-pink-600 text-white">Jan 2024 &gt;</p>
                        </div>
                        <div>
                            <Bar data={userData} />
                        </div>
                    </div>
                    <div className="w-[25%] shadow-xl p-3">
                        <div className="flex justify-start items-center w-[100%] p-2">
                            <h1>Users List</h1>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[20%]">
                                <img src="https://img.freepik.com/free-photo/businessman-working-laptop_23-2147839979.jpg?size=626&ext=jpg&ga=GA1.1.1985124745.1695480142&semt=sph" alt="" className="w-12 h-12 object-cover rounded-full" />
                            </div>
                            <div className="w-full">
                                <h1>John Doe</h1>
                                <p className="text-gray-500">johndoe@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default BodyDashboard