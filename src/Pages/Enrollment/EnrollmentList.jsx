import { Box, Modal, TablePagination } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { successMessage } from "../../Utils/notificationManager";
import Loader from "../../Utils/Loader";


const EnrollmentList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [EnrollmentList, setEnrollmentList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [userRole, setUserRole] = useState([])

    const [inputs, setInputs] = useState({ role: "", courses_to_enroll: "" })
    const [loader, setLoader] = useState(false)
    const [Flag, setFlag] = useState(true)
    const [singleInputs, setSingleInputs] = useState({ role: "", courses_to_enroll: "", enrollmentId: "" })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid transparent',
        boxShadow: 24,
        p: 4,
    };

    const handleChange = (e) => {
        e.preventDefault()

        Flag ? setInputs({ ...inputs, [e.target.name]: e.target.value }) : setSingleInputs({ ...singleInputs, [e.target.name]: e.target.value })
    }

    const handleSubmitEnrollment = async (e) => {
        e.preventDefault()

        console.log(inputs);

        try {
            setLoader(true)
            const response = await axiosInstance.post("/enrollment/insert", inputs)
            const data = await response.data

            if (response.status === 200) {
                successMessage(data.message);
                FetchEnrollment()
                setIsOpen(false)
            }

            setLoader(false)

        } catch (error) {
            console.log("Error Posting Enrollment", error.message);
        }

        ClearInputs()
    }

    const FetchEnrollment = async () => {
        try {
            setLoader(true)
            const response = await axiosInstance.get("/enrollment/fetch")
            const data = await response.data
            setEnrollmentList(data.enrollments);
            setLoader(false)
        } catch (error) {
            console.log("Error Fetching Enrollment", error.message);
        }
    }

    const FetchUserRoleDropDown = async () => {
        try {
            setLoader(true)
            const response = await axiosInstance.get("/enrollment/masterroles")
            const data = await response.data

            setUserRole(data.roles);
            setLoader(false)
        } catch (error) {
            console.log("Error Fetching Dropdown Values", error.message);
        }
    }

    const FetchEnrollmentById = async (_id) => {
        try {

            const response = await axiosInstance.get(`https://myappsdevelopment.co.in/enrollment/singleenrollment?enrollmentid=${_id}`)
            const data = await response.data
            setSingleInputs(data?.enrollment);
        } catch (error) {
            console.log("Error Fetching Enrollement Data By Id", error.message);
        }
    }


    const UpdateEnrollment = async (e) => { 
        e.preventDefault()
        console.log(singleInputs);
        try {
            console.log(singleInputs);
            const response = await axiosInstance.patch("https://myappsdevelopment.co.in/enrollment/update", singleInputs)
            const data = await response.data
            successMessage(data.message)
            FetchEnrollment()
            setIsOpen(false)
        } catch (error) {
            console.log("Error Updating Enrollment", error.message);
        }
        ClearInputs()
    }

    

    const ClearInputs = () => {
        try {
            setInputs((prevState) => ({
                ...prevState,
                role: "",
                courses_to_enroll: ""
            }))
        } catch (error) {
            console.log("error clearing input fields", error.message);
        }
    }


    const DeleteEnrollment = async (_id) => {

        try {
            setLoader(true)
            const response = await axiosInstance.delete("/enrollment/delete", { data: { enrollmentId: _id } })
            const data = await response.data
            if (response.status === 200) {
                successMessage(data.message)
                FetchEnrollment()
            }
            setLoader(false)
        } catch (error) {
            console.log("Error Deleting Enrollment", error.message);
        }
    }

    useEffect(() => {
        FetchEnrollment()
        FetchUserRoleDropDown()
        FetchEnrollmentById()
    }, [])

    // console.log(singleInputs);
    return (
        <div className="w-full">
            <AdminDashboard />
            <div className="ml-56 mt-16 w-auto p-3 font-semibold text-gray-600">
                <div className="p-2 ">
                    <h1 className="text-2xl">Enrollment</h1>
                </div>
                <div className="flex justify-between items-center p-2">
                    <h1>Enrollment List</h1>
                    <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-32" onClick={() => {
                        setIsOpen(true)
                        setFlag(true)
                    }}><FaPlus />Add</button>
                </div>
                <div>
                    {
                        loader ? <Loader /> : <div className="w-full mt-5">
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
                                            <h1 className="flex items-center justify-center"><PiDotsThreeOutlineFill /></h1>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        EnrollmentList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                            return (
                                                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                                                    <td className="border-r">  <input type="checkbox" /></td>
                                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.role}</td>
                                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.courses_to_enroll}</td>
                                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.createdAt.split("T")[0]}</td>
                                                    <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                                                        <p onClick={() => {
                                                            setIsOpen(true)
                                                            setFlag(false)
                                                            FetchEnrollmentById(item?._id)
                                                            setSingleInputs({ ...singleInputs, enrollmentId: item?._id })
                                                        }}><CiEdit /></p>
                                                        <p onClick={() => DeleteEnrollment(item._id)}><MdDelete /></p>
                                                    </td>
                                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                        <p className="flex items-center justify-center"><PiDotsThreeOutlineFill /></p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {/* <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                    <td className="border-r">  <input type="checkbox" /></td>
                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Introduction</td>
                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                                    <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                                        <p><CiEdit /></p>
                                        <p><MdDelete /></p>
                                    </td>
                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                        <p className="flex items-center justify-center"><PiDotsThreeOutlineFill /></p>
                                    </td>
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
                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                        <p className="flex items-center justify-center"><PiDotsThreeOutlineFill /></p>
                                    </td>
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
                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                        <p className="flex items-center justify-center"><PiDotsThreeOutlineFill /></p>
                                    </td>
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
                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                        <p className="flex items-center justify-center"><PiDotsThreeOutlineFill /></p>
                                    </td>
                                </tr> */}
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
                    }
                </div>
            </div>
            <div>
                <Modal
                    open={isOpen}>
                    <Box sx={style}>
                        <form className="w-full font-semibold text-gray-600 flex flex-col gap-5" onSubmit={Flag ? handleSubmitEnrollment : UpdateEnrollment}>
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">Enrollment Form</h1>
                                <button className="border-[#B32073] bg-[#B32073] p-2 rounded-lg w-20" onClick={() => setIsOpen(false)}>Close</button>
                            </div>
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="">User Role</label>
                                <select name="role" id="" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={Flag ? inputs?.role : singleInputs?.role}>
                                    <option>choose option</option>
                                    <option value={userRole["role-1"]}>{userRole["role-1"]}</option>
                                    <option value={userRole["role-2"]}>{userRole["role-2"]}</option>
                                    <option value={userRole["role-3"]}>{userRole["role-3"]}</option>
                                </select>
                            </div>
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="">Course To Enroll</label>
                                <select name="courses_to_enroll" id="" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={Flag ? inputs?.courses_to_enroll : singleInputs?.courses_to_enroll}>
                                    <option>choose option</option>
                                    <option value={userRole["role-1"]}>{userRole["role-1"]}</option>
                                    <option value={userRole["role-2"]}>{userRole["role-2"]}</option>
                                    <option value={userRole["role-3"]}>{userRole["role-3"]}</option>
                                </select>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-32 rounded-lg" type="submit">{Flag ? "Enroll" : "Update Enroll"}</button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default EnrollmentList