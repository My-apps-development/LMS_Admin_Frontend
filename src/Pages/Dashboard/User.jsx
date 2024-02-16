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

  // const [Image, setImage] = useState()



  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    fullname: "",
    mob_number: "",
    email: "",
    license_num: "",
    role: "",
    aadhar_num: "",
    course: "",
    upload_license: ""

  })

  const [singleInputs, setSingleInputs] = useState({
    firstName: "",
    lastName: "",
    fullname: "",
    mob_number: "",
    email: "",
    license_num: "",
    role: "",
    aadhar_num: "",
    course: ""

  })


  const [userList, setUserList] = useState([])

  const [courseList, setCourseList] = useState([])

  const [image, setImage] = useState()

  const [loader, setLoader] = useState(false)


  const lengthOfTable = userList.length


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

    setImage(imageFile);

    // console.log(imageFile);
    // setImage(imageFile)

    // if (imageFile) {
    //   const imageUrl = URL.createObjectURL(imageFile);
    //   console.log(imageUrl);

    //   setImage(imageFile);
    //   setOpen(false)
    // }

    
  }


  const FetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users")
      const data = await response.data
      setUserList(data.users);
    } catch (error) {
      console.log("error fetching users", error.message);
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    flag ?

      setUserInputs((prevInputs) => ({
        ...prevInputs,
        [e.target.name]: e.target.value,
        fullname: e.target.name === 'firstname' ? e.target.value + (prevInputs.lastname || '') : (prevInputs.firstname || '') + e.target.value
      }))
      :
      setSingleInputs((prevInputs) => ({
        ...prevInputs,
        [e.target.name]: e.target.value,
        fullname: e.target.name === 'firstname' ? e.target.value + (prevInputs.lastname || '') : (prevInputs.firstname || '') + e.target.value
      }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userInputs.firstName) {
      errorMessage("Firstname Required")
      return
    }

    if (!userInputs.lastName) {
      errorMessage("Lastname Required")
      return
    }

    if (!userInputs.mob_number) {
      errorMessage("Mobile Number Required")
      return
    }

    if (!userInputs.email) {
      errorMessage("Email Required")
      return
    }

    if (!userInputs.license_num) {
      errorMessage("License Required")
    }

    if (!userInputs.role) {
      errorMessage("Role Required")
    }

    if (!userInputs.aadhar_num) {
      errorMessage("Aadhar Required")
    }

    console.log(userInputs);

    const fD = new FormData()
    fD.append("firstName", userInputs.firstName)
    fD.append("lastName", userInputs.lastName)
    fD.append("mob_number", userInputs.mob_number)
    fD.append("license_num", userInputs.license_num)
    fD.append("role", userInputs.role)
    fD.append("aadhar_num", userInputs.aadhar_num)
    fD.append("Upload_Category", image)


    try {
      const response = await axiosInstance.post("/adduser", fD, { headers: { 'Content-Type': 'multipart/form-data' } })
      const data = await response.data

      console.log(data);


    } catch (error) {

      console.log("Error Posting data", error.message);
    }

    ClearInputs()
  }

  const handleUpdateUSer = async (e) => {
    e.preventDefault()



    try {
      const response = await axiosInstance.patch("/userUpdate", singleInputs)
      const data = await response.data
      console.log(data);
    } catch (error) {
      console.log("error updating data", error.message);
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
      console.log("Error deleting", error.message);
    }
    console.log(_id);
  }

  const FetchCourse = async () => {
    try {
      const response = await axiosInstance.get("/homepage/courses")
      const data = await response.data
      setCourseList(data.Courses);
    } catch (error) {
      console.log("error fetching course", error.message);
    }
  }

  const getSingleUserById = async (_id) => {
    try {
      setLoader(true)
      const response = await axiosInstance.get(`/singleuser?userid=${_id}`)
      const data = await response.data
      console.log(data);
      setSingleInputs(data.user);
      setLoader(false)
    } catch (error) {
      console.log("error fetching Single user detials", error.message);
    }
  }

  const ClearInputs = () => {
    try {
      setUserInputs((prevState) => ({
        ...prevState,
        firstName: "",
        lastName: "",
        fullname: "",
        mob_number: "",
        email: "",
        license_num: "",
        role: "",
        aadhar_num: "",
        course: ""

      }))
    } catch (error) {
      console.log("error clearing input fields", error.message);
    }
  }



  console.log(singleInputs);
  useEffect(() => {
    FetchUsers()
    FetchCourse()
    // getSingleUserById()
  }, [])

  console.log(courseList);
  return (
    <div>
      <AdminDashboard />
      <div className="ml-56 mt-12 w-auto p-3 font-semibold text-gray-600">
        <div className="p-2 ">
          <h1 className="text-2xl">Users</h1>
        </div>
        <div className="flex justify-between items-center p-2">
          <h1>User List</h1>
          <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-32" onClick={handleOpen}><FaPlus />Add</button>
        </div>
        <div>
          {loader ? <Loader /> : <div className="w-full mt-5">
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
                    <h1 className="flex items-center justify-center">Mobile</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Email</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Aadhaar</h1>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                    <h1 className="flex items-center justify-center">Status</h1>
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
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.fullname}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.role}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.mob_number}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.email}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.aadhar_num}</td>
                        <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">status</td>
                        <td className="p-2 border-r cursor-pointer font-semibold text-gray-500 flex gap-2 text-2xl justify-around ">
                          <p onClick={() => {

                            setFlag(false)
                            setOpen(true)
                            getSingleUserById(item?._id)
                          }}><CiEdit /></p>
                          <p onClick={() => handleDelete(item._id)}><MdDelete /></p>
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
                  <h1 className="text-2xl">Add/Edit User</h1>
                  <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" onClick={handleClose}>Close</button>
                </div>
                <form onSubmit={flag ? handleSubmit : handleUpdateUSer}>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">First Name</label>
                      <input type="text" name="firstName" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.firstname : singleInputs?.firstName} />
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Last Name</label>
                      <input type="text" name="lastName" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.lastname : singleInputs?.lastName} />
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Mobile</label>
                      <input type="text" name="mob_number" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.mob_number : singleInputs?.mob_number} />
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Email</label>
                      <input type="text" name="email" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.email : singleInputs?.email} />
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Upload License</label>
                      <input type="file" name="upload_license" id="image" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeImage} />
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">License Number</label>
                      <input type="text" name="license_num" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.license_num : singleInputs?.license_num} />
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Role</label>
                      <input type="text" name="role" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange}
                        value={flag ? userInputs?.role : singleInputs?.role} />
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Aadhar</label>
                      <input type="text" name="aadhar_num" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={flag ? userInputs?.aadhar_num : singleInputs?.aadhar_num} />
                    </div>



                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">Course To Enroll</label>
                    <select name="course" id="" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange}>
                      <option value="Driver">Choose Options</option>
                      {
                        courseList.map((item, index) => {
                          return (
                            <option key={index} value={item?._id}>{item?.title}</option>
                          )
                        })
                      }
                    </select>
                  </div>


                  <div className="w-full flex justify-center items-center gap-5">
                    <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button>
                    <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg">{flag ? "Add User" : "Update User"}</button>
                  </div>
                </form>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default User