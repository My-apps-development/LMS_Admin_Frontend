import { TablePagination } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";


const EnrollmentList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div className="w-full">
            <AdminDashboard />
            <div className="ml-56 mt-32 w-auto p-3 font-semibold text-gray-600">
                <div className="p-2 ">
                    <h1 className="text-2xl">Enrollment</h1>
                </div>
                <div className="flex justify-between items-center p-2">
                    <h1>Enrollment List</h1>
                    <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-32"><FaPlus />Add</button>
                </div>
                <div className="w-full mt-5">
                    <table className="w-[100%]">
                        <thead>
                            <tr className=" border-b">
                                <th className="border-r">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">User Role</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Enrolled Courses</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Enrolled Date</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Action</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Hamburger</h1>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td className="border-r">  <input type="checkbox" /></td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Introduction</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                                <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                                    <p><CiEdit /></p>
                                    <p><MdDelete /></p>
                                </td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">hamburger</td>
                            </tr>


                            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td className="border-r">  <input type="checkbox" /></td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Introduction</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                                <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                                    <p><CiEdit /></p>
                                    <p><MdDelete /></p>
                                </td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">hamburger</td>
                            </tr>


                            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td className="border-r">  <input type="checkbox" /></td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Introduction</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                                <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                                    <p><CiEdit /></p>
                                    <p><MdDelete /></p>
                                </td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">hamburger</td>
                            </tr>


                            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td className="border-r">  <input type="checkbox" /></td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Introduction</td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                                <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                                    <p><CiEdit /></p>
                                    <p><MdDelete /></p>
                                </td>
                                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">hamburger</td>
                            </tr>
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
        </div>
    )
}

export default EnrollmentList