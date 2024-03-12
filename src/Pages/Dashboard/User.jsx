import { Box, Modal, TablePagination } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { errorMessage, successMessage } from "../../Utils/notificationManager";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Loader from "../../Utils/Loader";


const User = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(true)
  const [roles, setRoles] = useState([])
  const [language, setLanguage] = useState([])



  const [approvalStatus, setApprovalStatus] = useState("Pending")

  // const [Image, setImage] = useState()



  const [userInputs, setUserInputs] = useState({
   
    fullname: "",
    mobile: "",
    email: "",
    license_num: "",
    role: "",
    language: "",
    company: "",
    status: ""

  })

  const [singleInputs, setSingleInputs] = useState({
    
    fullname: "",
    mobile: "",
    email: "",
    license_num: "",
    role: "",
    language: "",
    company: "",
    status: ""

  })


  const [userList, setUserList] = useState([])



  const [image, setImage] = useState(null)

  const [loader, setLoader] = useState(false)

  const [companiesList, setCompaniesList] = useState([])

  const [displayImage, setDisplayImage] = useState(null)


  const lengthOfTable = userList.length


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1150,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    boxShadow: 24,
    overflowY: 'scroll',
    p: 4,
  };

  const handleOpen = () => {
    // console.log(open);
    setFlag(true)

    console.log(flag);
    setOpen(true)
  };
  const handleClose = () => {
    console.log(open);

    setOpen(false)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleChangeImage = (e) => {
    e.preventDefault()



    const imageFile = e.target.files[0];



    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDisplayImage(reader.result)
      }
      reader.readAsDataURL(imageFile)
    }

    setImage(imageFile);






  }

  // console.log(userList);


  const FetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users")
      const data = await response.data
      setUserList(data.users);
    } catch (error) {
      setLoader(false)
      console.log("error fetching users", error.message);
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    flag ?

      // setUserInputs((prevInputs) => ({
      //   ...prevInputs,
      //   [e.target.name]: e.target.value,
      //   fullname: e.target.name === 'firstName' ? e.target.value + (prevInputs.lastName) : (prevInputs.firstName) + e.target.value
      // }))
      setUserInputs({ ...userInputs, [e.target.name]: e.target.value })
      :
      setSingleInputs({ ...singleInputs, [e.target.name]: e.target.value })
    // setSingleInputs((prevInputs) => ({
    //   ...prevInputs,
    //   [e.target.name]: e.target.value,
    //   fullname: e.target.name === 'firstName' ? e.target.value + (prevInputs.lastName || '') : (prevInputs.firstName || '') + e.target.value
    // }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // if (!userInputs.firstName) {
    //   errorMessage("Firstname Required")
    //   return
    // }

    // if (!userInputs.lastName) {
    //   errorMessage("Lastname Required")
    //   return
    // }

    if (!userInputs.mobile) {
      errorMessage("Mobile Number Required")
      return
    }

    if (!userInputs.email) {
      errorMessage("Email Required")
      return
    }

    if (!image) {
      errorMessage("Upload License is Required")
      return
    }

    if (!userInputs.license_num) {
      errorMessage("License Required")
    }

    if (!userInputs.role) {
      errorMessage("Role Required")
    }

    if (!userInputs.language) {
      errorMessage("language Required")
    }

    // console.log(userInputs);

    // console.log(image);



    const fD = new FormData()
    // fD.append("firstName", userInputs.firstName)
    // fD.append("lastName", userInputs.lastName)
    fD.append("fullname", userInputs.fullname)
    fD.append("mobile", userInputs.mobile)
    fD.append("license_num", userInputs.license_num)
    fD.append("role", userInputs.role)
    fD.append("language", userInputs.language)
    fD.append("upload_license", image)
    fD.append("email", userInputs.email)
    fD.append("company", userInputs.company)
    fD.append("status", userInputs.status)


    try {
      const response = await axiosInstance.post("/adduser", fD, { headers: { "Content-Type": "multipart/form-data" } })
      const data = await response.data
      successMessage(data.message);
      FetchUsers()
      setOpen(false)



    } catch (error) {
      setLoader(false)
      errorMessage(error.response.data.message)
      console.log("Error Posting data", error.message);
    }

    ClearInputs()
  }

  const handleUpdateUSer = async (e) => {
    e.preventDefault()

    // if (!singleInputs.firstName) {
    //   errorMessage("Firstname Required")
    //   return
    // }

    // if (!singleInputs.lastName) {
    //   errorMessage("Lastname Required")
    //   return
    // }

    if (!singleInputs.mobile) {
      errorMessage("Mobile Number Required")
      return
    }

    if (!singleInputs.email) {
      errorMessage("Email Required")
      return
    }

    if (!singleInputs.license_num) {
      errorMessage("License Required")
    }

    if (!singleInputs.role) {
      errorMessage("Role Required")
    }

    if (!singleInputs.language) {
      errorMessage("language Required")
    }

    const UpdatedFormData = new FormData()
    UpdatedFormData.append("firstName", singleInputs.firstName)
    UpdatedFormData.append("lastName", singleInputs.lastName)
    UpdatedFormData.append("fullname", singleInputs.fullname)
    UpdatedFormData.append("mobile", singleInputs.mobile)
    UpdatedFormData.append("license_num", singleInputs.license_num)
    UpdatedFormData.append("role", singleInputs.role)
    UpdatedFormData.append("language", singleInputs.language)
    UpdatedFormData.append("upload_license", image)
    UpdatedFormData.append("email", singleInputs.email)
    UpdatedFormData.append("course", singleInputs.course)
    UpdatedFormData.append("status", singleInputs.status)


    try {
      const response = await axiosInstance.patch(`/userUpdate?id=${singleInputs._id}`, UpdatedFormData)
      const data = await response.data
      successMessage(data.message);
      FetchUsers()
      setOpen(false)
    } catch (error) {
      setLoader(false)
      console.log("error updating data", error.message);
      errorMessage(error.response.data.message)
    }
    ClearInputs()
  }


  // const handleEdit = (_id) => {
  //   console.log(_id);
  //   getSingleUserById(_id)
  //   setFlag(false)
  //   console.log(flag);
  //   setOpen(!open)
  // }

  const handleDelete = async (_id) => {

    console.log(_id);

    try {
      setLoader(true)
      const response = await axiosInstance.delete("/userDelete", { data: { id: _id } })
      const data = await response.data
      if (response.status === 200) {
        successMessage(data.message);
        FetchUsers()
      } else {
        errorMessage(data.message)
      }
      setLoader(false)

    } catch (error) {
      setLoader(false)
      errorMessage(error?.response?.data?.message)
      console.log("Error deleting", error.message);
    }
    console.log(_id);
  }

  // const FetchCourse = async () => {
  //   try {
  //     setLoader(true)
  //     const response = await axiosInstance.get("/homepage/courses")
  //     const data = await response.data
  //     setCourseList(data?.coursewithcategory);
  //     setLoader(false)
  //   } catch (error) {
  //     console.log("error fetching course", error.message);
  //   }
  // }

  const getSingleUserById = async (_id) => {
    try {
      setLoader(true)
      const response = await axiosInstance.get(`/singleuser?userid=${_id}`)
      const data = await response.data
      console.log(data);
      setSingleInputs(data.user);
      setDisplayImage(data?.user?.upload_license)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      errorMessage(error?.response?.data?.message)
      console.log("error fetching Single user detials", error.message);
    }
  }

  console.log(singleInputs);

  const FetchCompanies = async () => {
    try {
      const response = await axiosInstance.get("/company/fetch")
      const data = await response?.data
      setCompaniesList(data?.companies);
    } catch (error) {
      setLoader(false)
      errorMessage(error?.response?.data?.message)
      console.log("Error Fetching Companies", error.message)
    }
  }

  const userApproval = async (_id) => {

    try {
      const response = await axiosInstance.post("/userapprove", { userid: _id })
      const data = await response?.data
      successMessage(data?.message);
      FetchUsers()
    } catch (error) {
      setLoader(false)
      errorMessage(error?.response?.data?.message)
      console.log("Error Approving User Status", error.message);
    }
  }



  const ClearInputs = () => {
    try {
      setUserInputs((prevState) => ({
        ...prevState,
        firstName: "",
        lastName: "",
        fullname: "",
        mobile: "",
        email: "",
        license_num: "",
        role: "",
        language: "",
        course: "",
        status: ""

      }))
      setImage(null)
      setDisplayImage(null)
    } catch (error) {
      console.log("error clearing input fields", error.message);
    }
  }

  const MasterRoles = async () => {
    try {
      const response = await axiosInstance.get("/enrollment/masterroles")
      const data = await response?.data
      setRoles(data?.roles);
    } catch (error) {
      console.log("Error Fetching Master Roles", error.message)
    }
  }

  const MasterLanguages = async () => {
    try {
      const response = await axiosInstance.get("/enrollment/masterlanguage")
      const data = await response?.data
      setLanguage(data?.Language);
    } catch (error) {
      console.log("Error Fetching Master Roles", error.message)
    }
  }

  // console.log(userInputs);

  const statusColors = {
    Pending: 'bg-yellow-200',
    Approved: 'bg-green-200',
    Rejected: 'bg-red-200',
  };

  const handleChangeApproval = (e) => {
    e.preventDefault()

    setApprovalStatus(e.target.value);


  }






  // console.log(singleInputs);
  useEffect(() => {
    FetchUsers()
    // FetchCourse()
    MasterRoles()
    MasterLanguages()
    FetchCompanies()
    // getSingleUserById()
  }, [])

  // console.log(courseList);
  return (
    <div>
      <AdminDashboard />
      <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300" data-aos="fade-down">
        <div className="p-2 flex justify-start items-start gap-2 flex-col">
          <h1 className="text-2xl">Users</h1>
          <p>Total {userList?.length} Users in Table </p>
        </div>
        <div className="flex justify-between items-center p-2">
          <h1>User List</h1>
          <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-32" onClick={handleOpen}><FaPlus />Add</button>
        </div>
        <div>
          {loader ? <Loader /> : <div className="w-full mt-5 bg-white rounded-lg">
            <table className="w-[100%]">
              <thead>
                <tr className=" border-b">
                  <th className="border-r">
                    <input type="checkbox" />
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">User</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Registered Role</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Email</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Mobile</h1>
                  </th>

                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Language</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Status</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">User Approval</h1>
                    <p>(click here to approve)</p>
                  </th>

                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Action</h1>
                  </th>

                </tr>
              </thead>
              <tbody>
                {
                  userList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                    return (
                      <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                        <td className="border-r">  <input type="checkbox" /></td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.firstName} {item?.lastName}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.role}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.email}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.mobile}</td>

                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.language}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 capitalize">{item?.status}</td>
                        <td className={`p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 `}>


                          <div className={`flex justify-center items-center gap-2 mt-2 ${item?.approve ? "text-green-700" : "text-red-700"} `}>
                            <button className="p-1  rounded" onClick={() => userApproval(item?._id)}>{item?.approve ? "Approved" : "Approve"}</button>

                          </div>
                          {/* <select name="approval" id="approval" className={`w-full p-2 outline-gray-500 ${statusColors[approvalStatus]}`} onChange={handleChangeApproval}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select> */}
                        </td>
                        <td className="p-2 border-r cursor-pointer font-semibold text-gray-500 flex gap-2 text-2xl justify-around ">
                          <p onClick={() => {

                            setFlag(false)
                            setOpen(true)
                            getSingleUserById(item?._id)
                          }}><CiEdit /></p>
                          {/* <p onClick={() => handleDelete(item._id)}><MdDelete /></p> */}
                        </td>
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
                    count={lengthOfTable}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  /></td>

                </tr>
              </tbody>
            </table>
          </div>}


        </div>
        <div>
          <Modal
            open={open}

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="w-full font-semibold text-gray-600 flex flex-col gap-5">
                <div className="flex justify-between items-center w-full text-black">
                  <h1 className="text-2xl">{flag ? "Add User" : "Update User"}</h1>
                  <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" onClick={handleClose}>Close</button>
                </div>
                <div className="flex gap-2">
                  <form onSubmit={flag ? handleSubmit : handleUpdateUSer}>
                    <div className="grid grid-cols-2">
                      {/* <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">First Name</label>
                        <input type="text" name="firstName" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.firstName : singleInputs?.firstName} />
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.lastName : singleInputs?.lastName} />
                      </div> */}

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Full Name</label>
                        <input type="text" name="fullname" id="fullname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.fullname : singleInputs?.fullname} />
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Mobile</label>
                        <input type="number" name="mobile" id="mobile" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.mobile : singleInputs?.mobile} />
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" id="email" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.email : singleInputs?.email} />
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Upload License</label>
                        <input type="file" name="upload_license" id="upload_license" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeImage} />
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">License Number</label>
                        <input type="text" name="license_num" id="license_num" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.license_num : singleInputs?.license_num} />
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Role</label>
                        <select name="role" id="role" className="p-3 border-2 border-gray-600 rounded-lg" value={flag ? userInputs?.role : singleInputs?.role} onChange={handleChange}>
                          <option value="">Choose Role</option>
                          {
                            roles?.map((item, index) => {
                              return (
                                <option value={item} key={index}>{item}</option>
                              )
                            })
                          }
                        </select>
                        {/* <input type="text" name="role" id="role" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange}
                        value={flag ? userInputs?.role : singleInputs?.role} /> */}
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Language</label>
                        <select name="language" id="language" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.language : singleInputs?.language}>
                          <option value="">Choose Language</option>
                          {
                            language?.map((item, index) => {
                              return (
                                <option value={item} key={index}>{item}</option>
                              )
                            })
                          }
                        </select>
                        {/* <input type="text" name="aadhar_num" id="aadhar_num" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.aadhar_num : singleInputs?.aadhar_num} /> */}
                      </div>

                      <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Company</label>
                      <select name="company" id="company" className="p-3 border-2 border-gray-600 rounded-lg" value={flag ? userInputs?.course : singleInputs?.course} onChange={handleChange}>
                        <option value="Driver">Choose Options</option>
                        {
                          companiesList?.map((item, index) => {
                            return (
                              <option key={index} value={item?._id}>{item?.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>



                    </div>

                    

                    <div className="flex flex-col gap-3 p-2">
                      <label htmlFor="">Status</label>
                      <div className=" flex gap-5">
                        <input type="radio" name="status" id="status" onChange={handleChange} value="active" checked={flag ? userInputs?.status == "active" : singleInputs?.status == "active"} />
                        <p>Active</p>

                        <input type="radio" name="status" id="status" onChange={handleChange} value="pending" checked={flag ? userInputs?.status == "pending" : singleInputs?.status == "pending"} />
                        <p>Pending</p>

                        <input type="radio" name="status" id="status" onChange={handleChange} value="Inactive" checked={flag ? userInputs?.status == "Inactive" : singleInputs?.status == "Inactive"} />
                        <p>InActive</p>

                      </div>
                    </div>


                    <div className="w-full flex justify-center items-center gap-5">
                      {/* <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button> */}
                      <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg">{flag ? "Add User" : "Update User"}</button>
                    </div>
                  </form>
                  <div className="mt-5 rounded shadow-xl p-2 h-80 flex flex-col gap-3">
                    <img src={displayImage} alt="" className="w-96 h-52 rounded-lg object-cover" />
                    <div className="flex flex-col justify-center items-center gap-2">
                      <h1 className="text-2xl text-[#B32073]">Uploaded License</h1>
                      <p className="text-xs">Upload only PNG,JPEG</p>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default User