
import AdminDashboard from "../Dashboard/AdminDashboard"
// import { MdKeyboardArrowUp } from "react-icons/md";
// import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import AddCompany from "./AddCompany";
import CompanyList from "./CompanyList";


const Company = () => {

    // const [addCompanyOpen, setAddCompanyOpen] = useState(false)

    const [menu, setMenu] = useState(0)

    return (
        <div>
            <AdminDashboard />
            <div className="ml-56 mt-16 w-auto p-3 font-semibold text-gray-600" >
                <div className="flex w-full p-1 gap-3 bg-[#B32073] rounded-sm">
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