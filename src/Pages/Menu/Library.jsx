import { FaPlus } from "react-icons/fa"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { axiosInstance } from "../../Utils/AxiosSetUp"
import { successMessage } from "../../Utils/notificationManager"


const Library = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [pdf, setPdf] = useState(null)

  const handleChangeFile = (e) => {
    e.preventDefault()

    setPdf(e.target.files[0])


  }

  const handleSubmitPdf = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("pdfupload", pdf)

    try {
      const response = await axiosInstance.post("/library/insert", formData,  {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      const data = await response?.data
      successMessage(data?.message);
      setPdf("")
      setIsOpen(false)
    } catch (error) {
      console.log("Error Uploading Pdf", error.message);
    }
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: 1,
    boxShadow: 24,
    overflowY: 'auto',
    p: 4,
  };



  return (
    <div>
      <AdminDashboard />
      <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-700 text-2xl">Library</h1>
          <button className="p-2 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073]" onClick={() => setIsOpen(true)}><FaPlus /> Add PDF</button>
        </div>

      </div>
      <div>
        <Modal
          open={isOpen}
        >
          <Box sx={style}>
            <div className="w-full font-semibold">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl ">Add Library</h1>
                <button className="py-1 px-5 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073] rounded" onClick={()=>setIsOpen(false)}>Close</button>
              </div>

              <form action="" onSubmit={handleSubmitPdf} className="flex flex-col gap-5">
                <div className="flex flex-col gap-6 justify-center items-start mt-10">
                  <label htmlFor="">Upload PDF</label>
                  <input type="file" name="pdfupload" id="pdfupload" onChange={handleChangeFile} />
                </div>
                <div>
                  <button className="py-1 px-5 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073] rounded hover:scale-95 hover:duration-150">Upload Pdf</button>
                </div>
              </form>

            </div>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Library