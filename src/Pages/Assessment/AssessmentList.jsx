import { Box, Modal, TablePagination } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";


const AssessmentList = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log(open);
    setOpen(true)
  };
  const handleClose = () => {
    console.log(open);
    setOpen(false)
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

  // const styleEditQuestion = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 800,
  //   bgcolor: 'background.paper',
  //   border: '2px solid transparent',
  //   boxShadow: 24,
  //   p: 4,
  // };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <AdminDashboard />
      <div className="ml-56 mt-32 w-auto p-3 font-semibold text-gray-600">
        <div className="p-2 ">
          <h1 className="text-2xl">Assessment</h1>
        </div>
        <div className="flex justify-between items-center p-2">
          <h1>Question List</h1>
          <button className="p-2 border-2 border-pink-600 bg-pink-600 text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-38" onClick={handleOpen}><FaPlus />Add Question</button>
        </div>
        <div className="w-full mt-5">
          <table className="w-[100%]">
            <thead>
              <tr className=" border-b">
                <th className="border-r">
                  <input type="checkbox" />
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <h1 className="flex items-center justify-center">#</h1>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <h1 className="flex items-center justify-center">Question</h1>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <h1 className="flex items-center justify-center">Options</h1>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <h1 className="flex items-center justify-center">Answer</h1>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <h1 className="flex items-center justify-center">Action</h1>
                </th>
               

              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                <td className="border-r">  <input type="checkbox" /></td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">1</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">OPtion 4</option>
                </td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <p>edit</p>
                  <p>delete</p>
                </td>
      
              </tr>


              <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                <td className="border-r">  <input type="checkbox" /></td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">2</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">OPtion 4</option>
                </td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <p>edit</p>
                  <p>delete</p>
                </td>
      
              </tr>


              <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                <td className="border-r">  <input type="checkbox" /></td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">3</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">OPtion 4</option>
                </td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <p>edit</p>
                  <p>delete</p>
                </td>
      
              </tr>


              <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                <td className="border-r">  <input type="checkbox" /></td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">4</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">Driver</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">OPtion 4</option>
                </td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">21/02/2024</td>
                <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                  <p>edit</p>
                  <p>delete</p>
                </td>
      
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
                  <button className="border-pink-600 text-white bg-pink-600 p-2 rounded-lg w-20" onClick={handleClose}>Close</button>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                  </div>



                </div>

                <div className="flex flex-col p-2 gap-3">
                  <label htmlFor="">Course To Enroll</label>
                  <select name="" id="" className="p-3 border-2 border-gray-600 rounded-lg">
                    <option value="Driver">Defencive driving</option>
                    <option value="Security Gaurd">Security Gaurd</option>
                  </select>
                </div>


                <div className="w-full flex justify-center items-center gap-5">
                  <button className="p-2 border-2 border-pink-600 bg-white text-pink-600 hover:text-white hover:bg-pink-600 flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button>
                  <button className="p-2 border-2 border-pink-600 bg-pink-600 hover:bg-white hover:text-pink-600 text-white  flex justify-center items-center gap-3 w-32 rounded-lg">Add/Edit User</button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default AssessmentList