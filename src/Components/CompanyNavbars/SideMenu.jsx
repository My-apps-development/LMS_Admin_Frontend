import { HiOfficeBuilding } from "react-icons/hi"
import { IoPower } from "react-icons/io5"
import { MdSpaceDashboard } from "react-icons/md"
import { NavLink, useNavigate } from "react-router-dom"


const SideMenu = () => {

    const navigate = useNavigate()
  return (
    <div className="fixed">
            <aside className="w-56 h-screen flex justify-start items-center gap-2 text-sm flex-col  font-semibold shadow-xl">
                <div className="mt-10  border-b-2 w-full flex justify-center items-center py-4 border-gray-400">


                    <img src="/Logo.png" alt="" className="w-20 h-20" />

                </div>

                <div className="w-[100%] flex flex-col gap-2 px-5 mt-10">
                    <NavLink to="/companydashboard" className={({ isActive, isPending }) => isPending ? "flex  flex-row items-center duration-300 hover:shadow-xl hover:scale-105 hover:text-[#B32073]  pr-6" : isActive ? "flex text-[#B32073] flex-row items-center duration-300 scale-105 pr-6 bg-gray-300  rounded hover:text-[#B32073] hover:shadow-xl " : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full hover:text-[#B32073]">
                            <p className="flex justify-center items-center "><MdSpaceDashboard /></p>
                            <h1 className="text-xl  w-full hover:text-[#B32073]">UserList</h1>
                        </div>
                    </NavLink>
                    


                    <NavLink to="/company/assignment/record" className={({ isActive, isPending }) => isPending ? "flex gap-2 text-[#B32073] hover:text-[#B32073]  items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex  gap-2 flex-row items-center duration-300 scale-105 pr-6 bg-gray-300 text-[#B32073] rounded hover:text-[#B32073] hover:shadow-xl" : "text-gray-500"}>
                        <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full cursor-pointer hover:text-[#B32073]">

                            <p className="flex justify-center items-center "><HiOfficeBuilding /></p>
                            <h1 className="text-xl hover:text-[#B32073]  w-full">Assessment</h1>


                        </div>
                    </NavLink>

                    <div className="p-2 hover:bg-gray-300 rounded-lg flex gap-2 w-full cursor-pointer hover:text-[#B32073]">
                        <p className="flex justify-center items-center "><IoPower /></p>
                        <h1 className="text-xl hover:text-[#B32073] text-gray-500 w-full" onClick={()=>{
                            localStorage.clear()
                            navigate("/login")
                            
                        }}>Logout</h1>
                    </div>
                </div>
            </aside>
        </div>
  )
}

export default SideMenu