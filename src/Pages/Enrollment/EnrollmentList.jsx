import { Box, Modal, TablePagination } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
// import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { errorMessage, successMessage } from "../../Utils/notificationManager";
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
    const [singleInputs, setSingleInputs] = useState({ role: "", courses_to_enroll: "", _id: "" })

    const [courseList, setCourseList] = useState([])
    const [userList, setUserList] = useState([])

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
        console.log(Flag);
        Flag ? setInputs({ ...inputs, [e.target.name]: e.target.value }) : setSingleInputs({ ...singleInputs, [e.target.name]: e.target.value })

      
    }

    const handleSubmitEnrollment = async (e) => {
        e.preventDefault()

        console.log(inputs);

        if(!inputs?.role){
            errorMessage("User Role is Required")
            return
        }

        if(!inputs?.courses_to_enroll){
            errorMessage("Course to enroll is Required")
            return
        }

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
            errorMessage(error?.response?.data?.message)
            console.log("Error Posting Enrollment", error.message);
        }

        // console.log(singleInputs);

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

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get("/homepage/courses")
            const data = await response.data
            // console.log(data);
            setCourseList(data.coursewithcategory);
        } catch(error) {
            console.log("Error Fetching Courses", error.message);
        }
    }

    const fetchUsers = async() => {
        try {
            const response = await axiosInstance.get("/users")
            const data = await response.data
           setUserList(data.users);
        } catch(error){
            console.log("Error Fetching Users", error.message);
        }
    }

 

    const FetchEnrollmentById = async (_id) => {
        console.log(Flag);
        console.log(`https://myappsdevelopment.co.in/enrollment/singleenrollment?enrollmentid=${_id}`);
        try {

            const response = await axiosInstance.get(`https://myappsdevelopment.co.in/enrollment/singleenrollment?enrollmentid=${_id}`)
            const data = await response.data
            if(data?.enrollment){
                setSingleInputs(data?.enrollment);
                
            }
           
        } catch (error) {
            console.log("Error Fetching Enrollement Data By Id", error.message);
        }
    }

    console.log(singleInputs);


    const UpdateEnrollment = async (e) => {
        e.preventDefault()
        console.log(singleInputs.enrollmentId);
        console.log(`/enrollment/update?enrollmentId=${singleInputs._id}`);

        if(!singleInputs.role){
            errorMessage("User role is required")
            return
        }

        if(!singleInputs.courses_to_enroll){
            errorMessage("Course to enroll is required")
            return
        }
        
        const formData = new FormData()
        // formData.append("enrollmentId", singleInputs._id)
        formData.append("role", singleInputs.role)
        formData.append("courses_to_enroll", singleInputs.courses_to_enroll)


        try {
            console.log(singleInputs);
            const response = await axiosInstance.patch(`/enrollment/update?enrollmentId=${singleInputs._id}`, formData, {headers: {
                'Content-Type': 'application/json',
            }})
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
        fetchCourses()
        fetchUsers()

    }, [])

    console.log(courseList);
    return (
        <div className="w-full">
            <AdminDashboard />
            <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300">
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
                        loader ? <Loader /> : <div className="w-full mt-5 bg-white rounded-lg">
                            <table className="w-[100%] ">
                                <thead>
                                    <tr className=" border-b">
                                        <th className="border-r">
                                            <input type="checkbox" />
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <h1 className="flex items-center justify-center">User Role</h1>
                                        </th>
                                        {/* <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <h1 className="flex items-center justify-center">Enrolled Courses</h1>
                                        </th> */}
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <h1 className="flex items-center justify-center">Enrolled Date</h1>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <h1 className="flex items-center justify-center">Action</h1>
                                        </th>
                                        {/* <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <h1 className="flex items-center justify-center"><PiDotsThreeOutlineFill /></h1>
                                        </th> */}

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        EnrollmentList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                            return (
                                                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                                                    <td className="border-r">  <input type="checkbox" /></td>
                                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 capitalize">{item.role}</td>
                                                    {/* <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 capitalize">{item.courses_to_enroll}</td> */}
                                                    <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.createdAt.split("T")[0]}</td>
                                                    <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                                                        <p onClick={() => {
                                                            FetchEnrollmentById(item?._id)
                                                            setFlag(false)
                                                            setIsOpen(true)
                                                            setSingleInputs({ ...singleInputs, enrollmentId: item?._id })
                                                        }}><CiEdit /></p>
                                                        <p onClick={() => DeleteEnrollment(item._id)}><MdDelete /></p>
                                                    </td>
                                                    {/* <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                        <p className="flex items-center justify-center"><PiDotsThreeOutlineFill /></p>
                                                    </td> */}
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
                                            count={EnrollmentList.length}
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
                                    {
                                        userRole?.map((item, index)=>{
                                            return (
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                   
                                </select>
                            </div>
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="">Course To Enroll</label>
                                <select name="courses_to_enroll" id="" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={Flag ? inputs?.courses_to_enroll : singleInputs?.courses_to_enroll}>
                                    <option>choose option</option>
                                    {
                                        courseList?.map((item)=>{
                                            return (
                                                <option key={item?._id} value={item?.course?.title}>{item?.course?.title}</option>
                                            )
                                        })
                                    }
                                    
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