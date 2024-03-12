import { TablePagination } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useEffect, useState } from "react";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { CiExport } from "react-icons/ci";
import ExportAssignmentRecord from "./ExportExcelData";
import Loader from "../../Utils/Loader";


const AssignmentRecord = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [assignmentRecord, setAssignmentRecord] = useState([])
    const [loader, setLoader] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getAssignmentRecord = async () => {
        try {
            setLoader(true)
            const response = await axiosInstance.get("/assignment/get")
            const data = await response.data
            setAssignmentRecord(data?.assignmentsWithUserDetails);
            setLoader(false)
        } catch (error) {
            console.log("Error Fetching Assignment Record", error.message)
        }
    }

    console.log(assignmentRecord)

    const handleExportToExcel = (e) => {
        e.preventDefault()

        console.log(assignmentRecord);

        ExportAssignmentRecord(assignmentRecord, "sheet-1")

      }

    useEffect(() => {
        getAssignmentRecord()
    }, [])
    return (
        <div>
            <AdminDashboard />
            {loader ? <Loader /> : 
            <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300 h-screen" data-aos="fade-down">
                <div className="p-2 flex justify-between items-start gap-2">
                    <div>
                        <h1 className="text-2xl">Assignment Record</h1>
                        <p>Total 7 Records in Table </p>
                    </div>
                    <div>
                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-44" onClick={handleExportToExcel}><CiExport className="font-extrabold text-xl" />Export</button>
                    </div>
                </div>
                <div className="w-full mt-5 bg-white rounded-lg">
                    <table className="w-[100%]">
                        <thead>
                            <tr className=" border-b">
                                <th className="border-r">
                                    <input type="checkbox" />
                                </th>

                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">User Name</h1>
                                </th>

                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Mobile Number</h1>
                                </th>

                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">User Role</h1>
                                </th>

                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Language</h1>
                                </th>

                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Total Questions</h1>
                                </th>

                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Correct Answers</h1>
                                </th>

                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Wrong Answers</h1>
                                </th>


                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Percentage</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assignmentRecord?.map((item, index) => {
                                    return (

                                        <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                                            <td className="border-r">  <input type="checkbox" /></td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.user?.fullname} </td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                {item?.user?.mobile}
                                            </td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 capitalize">{item?.user?.role}</td>

                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 capitalize">{item?.user?.language}</td>

                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.assignment?.totalquestions}</td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.assignment?.correctanswer}</td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.assignment?.wronganswer}</td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.assignment?.percentage}</td>




                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td><TablePagination
                                    rowsPerPageOptions={[5, 10, 100]}
                                    component="div"
                                    count={1}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </div>
    )
}

export default AssignmentRecord