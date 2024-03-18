import { useEffect, useState } from "react"
import Navbars from "../CompanyNavbars/Navbars"
import { errorMessage, successMessage } from "../../Utils/notificationManager"
import { axiosInstance } from "../../Utils/AxiosSetUp"
import { TablePagination } from "@mui/material"
import Loader from "../../Utils/Loader"


const CompanyAssigngment = () => {
  const [assignmentList, setAssignmentList] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(false)



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchAssignmentData = async () => {
    try {
      setLoader(true)
      const response = await axiosInstance.get("/assignment/companyassignment")
      const data = await response?.data
      setAssignmentList(data?.assignmentsWithUserDetails)
      successMessage(data?.message)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      errorMessage(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchAssignmentData()
  }, [])
  return (
    <div>
      <Navbars />

      <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300">
      {
                    !assignmentList.length && <div className="w-full text-center">No Record Found</div>
                }
        {
          loader ? <Loader /> :

            <div className="w-full mt-5 bg-white rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className=" border-b">
                    {/* <th className="border-r">
                  <input type="checkbox" />
                </th> */}
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <h1 className="flex items-center justify-center">User Name</h1>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <h1 className="flex items-center justify-center">Registered Role</h1>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <h1 className="flex items-center justify-center">Language</h1>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <h1 className="flex items-center justify-center">Total Questions</h1>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <h1 className="flex items-center justify-center">Correct Answered</h1>
                    </th>

                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <h1 className="flex items-center justify-center">Wrong Answered</h1>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <h1 className="flex items-center justify-center">Percentage</h1>
                    </th>


                    {/* <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Action</h1>
                                </th> */}

                  </tr>
                </thead>
                <tbody>
                  {
                    assignmentList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                      return (
                        <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                          {/* <td className="border-r">  <input type="checkbox" /></td> */}
                          <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.user?.fullname} </td>
                          <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.user?.role}</td>
                          <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.user?.language}</td>
                          <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.assignment?.totalquestions}</td>

                          <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item?.assignment?.correctanswer}</td>
                          <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 capitalize">{item?.assignment?.wronganswer}</td>
                          <td className={`p-2 border-r cursor-pointer text-sm font-semibold text-gray-500 `}>
                            {item?.assignment?.percentage}


                            {/* <div className={`flex justify-center items-center gap-2 mt-2 ${item?.approve ? "text-green-700" : "text-red-700"} `}>
                                                <button className="p-1  rounded" onClick={() => userApproval(item?._id)}>{item?.approve ? "Approved" : "Approve"}</button>

                                            </div> */}
                            {/* <select name="approval" id="approval" className={`w-full p-2 outline-gray-500 ${statusColors[approvalStatus]}`} onChange={handleChangeApproval}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select> */}
                          </td>
                          {/* <td className="p-2 border-r cursor-pointer font-semibold text-gray-500 flex gap-2 text-2xl justify-around ">
                          <p onClick={() => {

                            setFlag(false)
                            setOpen(true)
                            getSingleUserById(item?._id)
                          }}><CiEdit /></p>
                         
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
  )
}

export default CompanyAssigngment