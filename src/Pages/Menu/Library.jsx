import { FaPlus } from "react-icons/fa"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { Box, Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../Utils/AxiosSetUp"
import { errorMessage, successMessage } from "../../Utils/notificationManager"
import { BsFiletypePdf } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci"


const Library = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [pdf, setPdf] = useState(null)
  const [libraryList, setLibraryList] = useState([])

  const [flag, setFlag] = useState(false)

  const [input, setInput] = useState("")
  const [singleInputs, setSingleInputs] = useState({
    _id:"",
    title: "",
    pdfupload: ""
  })

  const handleChange = (e) => {
    e.preventDefault()

    flag ? setInput(e.target.value) : setSingleInputs({ ...singleInputs, [e.target.name]: e.target.value })
  }

  const handleChangeFile = (e) => {
    e.preventDefault()

    setPdf(e.target.files[0])


  }

  const handleSubmitPdf = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", input)
    formData.append("pdfupload", pdf)

    try {
      const response = await axiosInstance.post("/library/insert", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      const data = await response?.data
      successMessage(data?.message);
      fetchLibrary()
      setPdf("")
      setIsOpen(false)
    } catch (error) {
      console.log("Error Uploading Pdf", error.message);
    }
  }


  const fetchLibrary = async () => {


    try {
      const response = await axiosInstance.get("/library/fetch")
      const data = await response?.data
      setLibraryList(data?.data);
    } catch (error) {
      console.log("Error Fetching Library", error.message);
    }

  }


  const fetchLibraryById = async (_id) => {
    setFlag(false)
    try {
      const response = await axiosInstance.get(`/library/fetchsingle?id=${_id}`)
      const data = await response?.data
      setSingleInputs(data?.data);
    } catch (error) {
      console.log("Error Fetching Single Library", error.message);
    }
  }

 


  const updateLibrary = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", singleInputs?.title)
    formData.append("pdfupload", pdf)

    console.log(`/library/update?id=${singleInputs?._id}`);


    try {
      
      console.log(`/library/update?id=${singleInputs?._id}`);
      const response = await axiosInstance.patch(`/library/update?id=${singleInputs?._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      const data = await response?.data
      successMessage(data.message);
      fetchLibrary()
      setIsOpen(false)
    } catch (error) {
      errorMessage(error?.response?.data?.message)
      console.log("Error Updating Library", error.message);
    }
  }

  const DeletePdfById = async (_id) => {
    console.log(_id);

    try {
      const response = await axiosInstance.delete("/library/delete", { data: { id: _id } })
      const data = await response?.data
      successMessage(data?.message);
      fetchLibrary()
    } catch (error) {
      console.log("error deleting data", error.message);

    }
  }






  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: 1,
    boxShadow: 24,
    overflowY: 'auto',
    p: 4,
  };


  useEffect(() => {
    fetchLibrary()
  }, [])



  return (
    <div>
      <AdminDashboard />
      <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300 h-screen">
        <div className="flex justify-between items-center mx-5 mt-10">
          <h1 className="text-gray-700 text-2xl">Library</h1>

          <button className="p-2 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073]" onClick={() => {
            setFlag(true)
            setIsOpen(true)

          }}><FaPlus /> Add PDF</button>
        </div>

        <div className="grid grid-cols-3 gap-10 my-10">
          {libraryList?.map((item, index) => {
            return (
              <div key={index} className=" flex  mx-5 bg-white p-5 rounded-lg justify-between items-center shadow-xl">
                <div>
                  <a href={item?.pdfupload} download={item?.pdfupload} target="_blank" rel="noopener noreferrer" className="flex justify-start items-center gap-2  capitalize "> <BsFiletypePdf />{item.title}</a>
                </div>
                <div className="flex gap-5">
                  <p className="text-blue-400 text-2xl cursor-pointer" onClick={() => {
                    setFlag(false)
                    setIsOpen(true)
                    fetchLibraryById(item?._id)
                  }} ><CiEdit /></p>
                  <p className="text-red-400 text-2xl cursor-pointer" onClick={() => DeletePdfById(item?._id)}><MdDelete /></p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
      <div>
        <Modal
          open={isOpen}
        >
          <Box sx={style}>
            <div className="w-full font-semibold">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl ">{flag ? "Add Library" : "Update Library"}</h1>
                <button className="py-1 px-5 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073] rounded" onClick={() => {
                  setIsOpen(false)
                }}>Close</button>
              </div>

              <form action="" onSubmit={flag ? handleSubmitPdf : updateLibrary} className="flex flex-col gap-2">

                <div className="flex flex-col gap-3  mt-10 w-full">
                  <label htmlFor="">Title</label>
                  <input type="text" name="title" id="title" className="p-3 border-2 border-gray-600 rounded-lg focus:border-[#B32073]" onChange={handleChange} value={flag ? input : singleInputs?.title} />
                </div>
                <div className="flex flex-col gap-6 justify-center items-start mt-10">
                  <label htmlFor="">Upload PDF</label>
                  <input type="file" name="pdfupload" id="pdfupload" onChange={handleChangeFile} className="border-2 border-gray-600 w-full rounded-lg p-3 focus:border-[#B32073]" />
                </div>
                <div>
                  <button className="py-1 px-5 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073] rounded hover:scale-95 hover:duration-150">{flag ? "Upload Pdf" : "Update Pdf"}</button>
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