
import AdminDashboard from "../Dashboard/AdminDashboard"
// import { MdKeyboardArrowUp } from "react-icons/md";
// import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import AddCompany from "./AddCompany";
import CompanyList from "./CompanyList";


const Company = () => {

    // const [addCompanyOpen, setAddCompanyOpen] = useState(false)

    const [menu, setMenu] = useState(1)

    useEffect(()=> {
        window.scrollTo(0,0)
    },[])

    return (
        <div>
            <AdminDashboard />
            <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300">
                <div className="flex w-full gap-3 bg-[#B32073] rounded-sm mt-10">
                    <div className={menu == 0? `w-[50%] flex justify-center items-center p-2 cursor-pointer bg-white text-[#B32073] text-2xl` : `w-[50%] flex justify-center items-center p-2 cursor-pointer text-white text-2xl ` } onClick={()=>setMenu(0)}>
                        <h1>Add Company</h1>
                    </div>
                    <div className={menu ? `w-[50%] flex justify-center items-center p-2 cursor-pointer bg-white text-[#B32073] text-2xl ` : `w-[50%] flex justify-center items-center p-2 cursor-pointer text-white text-2xl ` } onClick={()=>setMenu(1)}>
                        <h1>Company List</h1>
                    </div>
                </div>
            </div>
            {menu == 0 ? <AddCompany /> : null}
            {menu == 1 ? <CompanyList /> : null}
        </div>
    )
}

export default Company