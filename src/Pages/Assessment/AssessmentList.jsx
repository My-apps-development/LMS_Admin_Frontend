import { Box, Modal, TablePagination } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { Redactor } from '@texttree/notepad-rcl';
import { errorMessage, successMessage } from "../../Utils/notificationManager";
import Loader from "../../Utils/Loader";


const AssessmentList = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const [Quiz, setQuiz] = useState([])
  const [Flag, setFlag] = useState(true)
  const [loader, setLoader] = useState(false)
  const [courseList, setCoursesList] = useState([])
  const [chapterList, setChapterList] = useState([])

  const [inputs, setInputs] = useState({
    question: "",
    option_A: "",
    option_B: "",
    option_C: "",
    option_D: "",
    correct_option: "",
    marks: "",
    courseId: "",
    chapterId: ""
  })

  const [singleInputs, setSingleInputs] = useState({
    question: "",
    option_A: "",
    option_B: "",
    option_C: "",
    option_D: "",
    correct_option: "",
    marks: "",
    courseId: "",
    chapterId: "",
    _id:""
  })


  const handleOpen = () => {
    console.log(open);
    setOpen(true)
    setFlag(true)
  };
  const handleClose = () => {
    console.log(open);
    setOpen(false)
  };

  const handleChange = (e) => {
    e.preventDefault()

    Flag ? setInputs({ ...inputs, [e.target.name]: e.target.value }) : setSingleInputs({ ...singleInputs, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputs.question) {
      errorMessage("Question is Required")
      return
    }

    if (!inputs.option_A) {
      errorMessage("Option A is Required")
      return
    }

    if (!inputs.option_B) {
      errorMessage("Option B is Required")
      return
    }

    if (!inputs.option_D) {
      errorMessage("Option c is Required")
      return
    }

    if (!inputs.correct_option) {
      errorMessage("Correct Answer Required")
      return
    }

    console.log("submit initial");
    console.log(inputs);

    try {
      setLoader(true)
      const response = await axiosInstance.post("/Quiz/insert", inputs)
      const data = await response.data
      successMessage(data.message);
      fetchQuestion()
      setOpen(false)
      setLoader(false)
    } catch (error) {
      console.log("Error Posting Data", error.message)
    }

    ClearInputs()
  }

  const FetchCourses = async () => {
    try {
      setLoader(true)
      const response = await axiosInstance.get("https://myappsdevelopment.co.in/homepage/courses")
      const data = await response.data
      setCoursesList(data.Courses);
      setLoader(false)
    } catch (error) {
      console.log("Error Fetching Course", error.message);
    }
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    boxShadow: 24,
    overflowY: 'scroll',
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

  const totalQuizLength = Quiz.length


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const fetchQuestion = async () => {
    try {
      setLoader(true)
      const response = await axiosInstance.get("/Quiz/fetch")
      const data = await response.data
      setQuiz(data.data);
      setLoader(false)
    } catch (error) {
      console.log("Error Fetching Quiz", error.message);
    }

  }

  console.log(Quiz);


  const FetchChapters = async () => {
    try {
      const response = await axiosInstance.get("/homepage/fetchChapters")
      const data = await response.data
      setChapterList(data.chapter);
    } catch (error) {
      console.log("Error Fetching Chapters", error.message)
    }
  }


  const FetchSingleQuestionById = async (questionid) => {

    console.log(questionid);

    try {
      setLoader(true)
      const response = await axiosInstance.get(`/Quiz/singlequestion?questionid=${questionid}`)
      const data = await response.data
      setSingleInputs(data.question);
      setLoader(false)
    } catch (error) {
      console.log("Error While Fetching By Single Id", error.message);
    }
  }

  console.log(singleInputs);

  const UpdateQuestionById = async (e) => {
    e.preventDefault()
    console.log("update by id", singleInputs._id);

    const formData = new FormData()
    formData.append("quetionId", singleInputs._id)
    formData.append("question", singleInputs.question)
    formData.append("option_A", singleInputs.option_A)
    formData.append("option_B", singleInputs.option_B)
    formData.append("option_C", singleInputs.option_C)
    formData.append("option_D", singleInputs.option_D)
    formData.append("correct_option", singleInputs.correct_option)
    formData.append("marks", singleInputs.marks)
    formData.append("chapterId", singleInputs.chapterId)
    formData.append("courseId", singleInputs.courseId)

    try {
      setLoader(true)
      const response = await axiosInstance.patch("/Quiz/update", formData)
      const data = await response.data
      successMessage(data.message);
      fetchQuestion()
      setOpen(false)
      setLoader(false)
    } catch (error) {
      console.log("Error Updating Data", error.message);
    }

    ClearInputs()
  }

  const DeleteQuestionById = async (_id) => {
    try {
      setLoader(true)
      const response = await axiosInstance.delete("/Quiz/delete", { data: { QuestionId: _id } })
      const data = await response.data
      successMessage(data.massage)
      fetchQuestion()
      setLoader(false)
    } catch (error) {
      console.log("Error Deleting Data", error.message);
    }
  }

  const ClearInputs = () => {
    try {
      setInputs((prevState) => ({
        ...prevState,
        question: "",
        option_A: "",
        option_B: "",
        option_C: "",
        option_D: "",
        correct_option: "",
        marks: "",
        courseId: "",
        chapterId: ""
      }))
    } catch (error) {
      console.log("error clearing input fields", error.message);
    }
  }





  useEffect(() => {
    fetchQuestion()
    FetchCourses()
    FetchChapters()

  }, [])

  // console.log(Quiz);

  return (
    <div>
      <AdminDashboard />
      <div className="ml-56 mt-16 w-auto p-3 font-semibold text-gray-600">
        <div className="p-2 ">
          <h1 className="text-2xl">Assessment</h1>
        </div>
        <div className="flex justify-between items-center p-2">
          <h1>Question List</h1>
          <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-38" onClick={handleOpen}><FaPlus />Add Question</button>
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
              {loader ? <Loader /> : null}
              {
                Quiz?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                  return (
                    <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                      <td className="border-r">  <input type="checkbox" /></td>
                      <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{index + 1 + page * rowsPerPage}</td>
                      <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500  text-start ml-5">{item.question}</td>
                      <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500  text-start">
                        <option value="1" className=" text-start ml-5">1. {item.option_A}</option>
                        <option value="2" className=" text-start ml-5">2. {item.option_B}</option>
                        <option value="3" className=" text-start ml-5">3. {item.option_C}</option>
                        <option value="4" className=" text-start ml-5">4. {item.option_D}</option>
                      </td>
                      <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">{item.correct_option}</td>
                      <td className="p-2 border-r cursor-pointer text-2xl flex justify-center items-center gap-5 font-semibold text-gray-500 ">
                        <p onClick={() => {
                          FetchSingleQuestionById(item?._id)
                          setOpen(true)

                          setFlag(false)
                        }}><CiEdit /></p>
                        <p onClick={() => {
                          DeleteQuestionById(item?._id)
                        }}><MdDelete /></p>
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
                  count={totalQuizLength}
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
                  <h1 className="text-2xl">{Flag ? "Add Question" : "Edit Question"}</h1>
                  <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" onClick={handleClose}>Close</button>
                </div>

                <form action="" onSubmit={Flag ? handleSubmit : UpdateQuestionById}>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Select Course</label>
                      <select name="courseId" id="" className="p-3 border-2 border-gray-600 rounded-lg" value={Flag ? inputs.courseId : singleInputs.courseId} onChange={handleChange}>
                        <option value="Choose Option">Choose Option</option>

                        {
                          courseList?.map((item, index) => {
                            return (
                              <option key={index} value={item?._id}>{item?.title}</option>
                            )
                          })
                        }

                      </select>
                    </div>

                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Video/Chapters</label>
                      <select name="chapterId" id="" className="p-3 border-2 border-gray-600 rounded-lg" value={Flag ? inputs?.chapterId : singleInputs?.chapterId} onChange={handleChange}>
                        <option value="Choose Option">Choose Option</option>

                        {
                          chapterList?.map((item, index) => {
                            return (
                              <option key={index} value={item?._id}>{item?.title}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div>


                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">Question</label>
                    <Redactor />
                    <input type="text" name="question" id="question" value={Flag ? inputs?.question : singleInputs?.question} className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">Option A</label>
                    <input type="text" name="option_A" id="option_A" value={Flag ? inputs?.option_A : singleInputs?.option_A} className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">Option B</label>
                    <input type="text" name="option_B" id="option_B" value={Flag ? inputs?.option_B : singleInputs?.option_B} className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">Option C</label>
                    <input type="text" name="option_C" id="option_C" value={Flag ? inputs?.option_C : singleInputs?.option_C} className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} />
                  </div>

                  <div className="flex flex-col p-2 gap-3">
                    <label htmlFor="">Option D</label>
                    <input type="text" name="option_D" id="option_D" value={Flag ? inputs?.option_D : singleInputs?.option_D} className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} />
                  </div>

                  <div className="grid grid-cols-2 justify-between items-center">
                    <div className="flex flex-col p-2 gap-3">
                      <label htmlFor="">Add Marks</label>
                      <input type="text" name="marks" id="marks" value={Flag ? inputs?.marks : singleInputs?.marks} className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col p-2">
                      <label htmlFor="">Correct Answer</label>
                      <div className="flex gap-4">
                        <input type="radio" name="correct_option" id="correct_option_A" value="A" checked={Flag ? inputs.correct_option === 'A' : singleInputs.correct_option === 'A'} onChange={handleChange} />
                        <label htmlFor="">A</label>
                        <input type="radio" name="correct_option" id="correct_option_B" value="B" checked={Flag ? inputs.correct_option === 'B' : singleInputs.correct_option === 'B'} onChange={handleChange} />
                        <label htmlFor="">B</label>
                        <input type="radio" name="correct_option" id="correct_option_C" value="C" checked={Flag ? inputs.correct_option === 'C' : singleInputs.correct_option === 'C'} onChange={handleChange} />
                        <label htmlFor="">C</label>
                        <input type="radio" name="correct_option" id="correct_option_D" value="D" checked={Flag ? inputs.correct_option === 'D' : singleInputs.correct_option === 'D'} onChange={handleChange} />
                        <label htmlFor="">D</label>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex justify-center items-center gap-5">
                    {/* <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg" onClick={() => setOpen(false)}>Cancel</button> */}
                    <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-40 rounded-lg">{Flag ? "Add Question" : " Update Question"}</button>
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

export default AssessmentList