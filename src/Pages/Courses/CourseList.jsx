import { Box, Divider, Modal } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { FaPlus } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { successMessage } from "../../Utils/notificationManager";

import Loader from "../../Utils/Loader";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";


const CourseList = () => {

    const [isOpen, setIsOpen] = useState(false)

    const [isSubModalOpen, setIsSubModalOpen] = useState(false)

    const [courseList, setCoursesList] = useState([])

    const [isFlag, setIsFlag] = useState(true)


    const [loader, setLoader] = useState(false)

    const [categoryList, setCategoryList] = useState([])

    // const [video, setVideo] = useState(null)

    const [postVideo, setPostVideo] = useState(null)

    const [loading, setLoading] = useState(false);

    const [uploadProgress, setUploadProgress] = useState(0);

    const [singleCourse, setSingleCourse] = useState({
        CoursName: "",
        description: "",
        videos: "",
        inrolled_users: "",
        source: "",
        status: "",
        categoryId: ""
    })

    const [flag, setFlag] = useState(true)

    const [selectedSource, setSelectedSource] = useState("")

    const [CourseInputs, setCourseInputs] = useState({
        CoursName: "",
        description: "",
        videos: "",
        inrolled_users: "",
        source: "",
        status: "",
        categoryId: ""
    })

    const [accordianFlag, setAccordianFlag] = useState(false)

    const fileInputRef = useRef()




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid transparent',
        borderRadius: 1,
        boxShadow: 24,
        overflowY: 'auto',
        p: 4,
    };



    const styleSubModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid transparent',
        borderRadius: 1,
        boxShadow: 24,
        overflowY: 'auto',
        p: 4,
    };


    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }


    const handleOpenSubModal = () => {
        setIsSubModalOpen(true)
    }

    const handleCloseSubModal = () => {
        setIsSubModalOpen(false)
    }

    const handleChange = (e) => {
        e.preventDefault()

        if (e.target.name == "source") {
            setSelectedSource(e.target.value)
        }

        if(e.target.value == "Upload"){
            fileInputRef.current.click()
        }

        flag ? setCourseInputs({ ...CourseInputs, [e.target.name]: e.target.value }) : setSingleCourse({ ...singleCourse, [e.target.name]: e.target.value })
    }

    console.log(selectedSource);

    const handleChangeVedioFile = (e) => {
        const file = e.target.files[0]
        setPostVideo(file)
    }

    const PostCourse = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("CoursName", CourseInputs.CoursName)
        formData.append("description", CourseInputs.description)
        formData.append("inrolled_users", CourseInputs.inrolled_users)
        formData.append("source", CourseInputs.source)
        formData.append("status", CourseInputs.status)
        formData.append("categoryId", CourseInputs.categoryId)
        formData.append("videos", CourseInputs.videos)
        formData.append("video_link", postVideo)

        try {
            setLoader(true)
            const response = await axiosInstance.post("/homepage/addCourse", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            })

            const data = await response.data
            successMessage(data.message);

            fetchCourses()
            ClearInputs()
            setIsOpen(false)
            setLoader(false)
        } catch (error) {
            console.log("Error Creating course", error.message);
        }

    }


    const ClearInputs = () => {
        try {
            CourseInputs((prevState) => ({
                prevState,
                CoursName: "",
                description: "",
                videos: "",
                inrolled_users: "",
                source: "",
                status: "",
                categoryId: ""
            }))
        } catch (error) {
            console.log("error clearing input fields", error.message);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get("/category/fetch")
            const data = await response.data
            setCategoryList(data.categories);
        } catch (error) {
            console.log("Error fetching categories data", error.message);
        }
    }



    const fetchCourses = async () => {


        try {
            setLoader(true)
            const response = await axiosInstance.get("/homepage/courses")
            const data = await response.data
            // console.log(data);
            setCoursesList(data.Courses);
            setLoader(false)
        } catch (error) {
            console.log("error fetching data", error.message);
        }
    }




    // const fetchCourseById = async () => {
    //     try {
    //         const response = await axiosInstance.get(``)
    //     }
    // }

    const FetchChapters = async () => {

        try {
            const response = await axiosInstance.get("/homepage/fetchChapters")
            const data = await response.data
            console.log(data)
        } catch (error) {
            console.log("Error Fetching Chapters", error.message);
        }
    }
    const handleDeleteCourse = async (_id) => {
        console.log(_id);
        try {
            setLoader(true)
            const response = await axiosInstance.delete("homepage/deleteCourse", { data: { courseId: _id } })
            const data = await response.data
            successMessage(data.message);
            fetchCourses()
            setLoader(false)
        } catch (error) {
            console.log("Deleting data Failed", error.message);
        }
    }

    const FetchChapterById = async () => {

        // const data1 = []

        for (let courseId in courseList) {

            console.log(courseId);

        }

    }

    const UpdateCourse = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.patch("/homepage/updateCourse", singleCourse)
            const data = await response.data
            console.log(data);
        } catch (error) {
            console.log("error updating code", error.message);
        }
    }

    const fetchCourseById = async (_id) => {
        setFlag(false)
        console.log(flag);

        const filterCourse = courseList.filter((item) => item._id == _id)
        setSingleCourse(filterCourse);

        const response = await axiosInstance.get(`https://myappsdevelopment.co.in/homepage/singlecourse?courseid=${_id} `)
        const data = await response.data
        console.log(data);
        setSingleCourse(data.Courses);

    }

    useEffect(() => {
        fetchCourses()
        FetchChapters()
        fetchCategories()
        // FetchChapterById()
    }, [])


    // console.log(courseList);

    return (

        <div className="w-full">

            <AdminDashboard />
            <div className="ml-52 mt-10 w-auto p-3 flex flex-col font-semibold text-gray-600">
                {
                    loader ? <Loader /> : <div>
                        <div>
                            <div>
                                <div className="font-bold">
                                    <h1 className="text-2xl">Video Courses</h1>
                                </div>
                                <div >
                                    <div className="flex justify-between items-center">
                                        <p>Total 5 video courses are available</p>
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-pink-800" onClick={handleOpenModal}><FaPlus />Add Course</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-5 mt-5 p-2 w-[100%] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                            {
                                courseList.map((item, index) => {
                                    return (
                                        <div className="w-[100%] h-50 border-2 shadow-xl p-2 rounded-lg hover:scale-95 duration-300" key={index} >
                                            <div className="flex flex-col gap-2 ">
                                                <h1 className="text-xl text-gray-600 capitalize">{item.title}</h1>

                                                <div className="flex justify-between items-center gap-2 text-xs">
                                                    <p className="text-gray-400">Category: <span className="text-blue-500">{item.title}</span></p>
                                                    <p className="text-gray-400">Vedios: <span className="text-blue-500">{item.videoCount}</span></p>
                                                </div>
                                                <div className="flex justify-between items-center py-2 text-xs">
                                                    <p className="text-gray-400">status: <span className="text-green-600">{item.status}</span></p>
                                                    <p className="text-gray-400">Enrolled User: <span className="text-blue-500">{item.inrolled_users}</span></p>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="flex justify-between items-center py-2">
                                                <div>
                                                    <h1 className="text-gray-600 text-sm">{item.description}</h1>
                                                    <p className="text-gray-400 text-xs">Source: {item.source}</p>
                                                </div>
                                                <div className="flex gap-2 text-gray-400 text-2xl">
                                                    <p onClick={handleOpenSubModal} className="border-2 border-gray-400 rounded-lg p-1"><CiEdit /></p>
                                                    <p className="border-2 border-gray-400 rounded-lg p-1"><RiDeleteBin5Fill /></p>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="flex justify-between items-center text-2xl py-2">
                                                <button className="text-blue-400 border-2 p-1 rounded-lg border-blue-400 font-extrabold" onClick={() => {
                                                    setIsOpen(true)
                                                    setIsFlag(false)
                                                    fetchCourseById(item?._id)
                                                }}><CiEdit /></button>
                                                <button className="text-red-600 font-extrabold border-red-600 border-2 p-1 rounded" onClick={() => handleDeleteCourse(item?._id)}><RiDeleteBin5Fill /></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                }

            </div>

            <div>
                <Modal
                    open={isOpen}
                >
                    <Box sx={style}>
                        <div className="text-xs overflow-y-visible font-semibold text-gray-600">
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">{isFlag ? "Add Course" : "Updating Course"}</h1>
                                <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" onClick={handleCloseModal}>Close</button>
                            </div>
                            <form onSubmit={flag ? PostCourse : UpdateCourse}>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Course Name</label>
                                        <input type="text" name="CoursName" id="CoursName" onChange={handleChange} value={isFlag ? CourseInputs.CoursName : singleCourse.title} className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Category</label>
                                        <select name="categoryId" id="categoryId" onChange={handleChange} value={isFlag ? CourseInputs.categoryId : singleCourse?.categoryId} className="p-3 border-2 border-gray-600 rounded-lg" >
                                            <option value="Choose Option">Choose Options</option>
                                            {
                                                categoryList?.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item?._id}>{item?.categories}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {/* <input type="text" name="categoryId" id="categoryId" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" /> */}
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Enrolled Users</label>
                                        <input type="text" name="inrolled_users" id="inrolled_users" onChange={handleChange} value={isFlag ? CourseInputs.inrolled_users : singleCourse.inrolled_users} className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Vedios</label>
                                        <input type="text" name="videos" id="videos" value={isFlag ? CourseInputs.videos : singleCourse.videoCount} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>
                                </div>



                                <div className="flex flex-col">
                                    <label htmlFor="">Video/Chapters</label>
                                    <div className="flex font-semibold justify-between items-center p-2 bg-slate-200 rounded cursor-pointer mt-5" onClick={() => setAccordianFlag(!accordianFlag)}>
                                        <input type="text" name="chapter" id="chapter" className="border-2 p-2 w-[40%]" />
                                        <p className="font-bold text-2xl">{accordianFlag ? <MdKeyboardArrowDown /> : <IoIosArrowUp />}</p>
                                    </div>



                                    <div className={`${accordianFlag ? "flex flex-col" : "hidden"}`}>

                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Video/Chapters</label>
                                            <input type="file" name="Upload_Category" id="Upload_Category" ref={fileInputRef} onChange={handleChangeVedioFile} className="p-3 border-2 border-gray-600 rounded-lg" />
                                        </div>
                                        {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
                                        <div className="flex  p-2 gap-3">

                                            <label htmlFor="">Source</label>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="source" id="source" value="Youtube" onChange={handleChange} checked={flag ? CourseInputs.source == "Youtube" : singleCourse.source && singleCourse.source.toLowerCase() === "youtube"} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                <label htmlFor="">Youtube</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="source" id="source" value="vimeo" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "vimeo" : singleCourse.source == "vimeo"} />
                                                <label htmlFor="">Vimeo</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="source" id="source" value="Dropbox" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "Dropbox" : singleCourse.source == "Dropbox"} />
                                                <label htmlFor="">Drop Box</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="source" id="source" value="embed" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "embed" : singleCourse.source == "embed"} />
                                                <label htmlFor="">embed</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="source" id="source" value="Upload" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "Upload" : singleCourse.source == "Upload"} />
                                                <label htmlFor="">Upload</label>

                                            </div>


                                        </div>

                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Link</label>
                                            {selectedSource !== "Upload" && (
                                                <input
                                                    type="text"
                                                    name="link"
                                                    id="link"
                                                    onChange={handleChange}
                                                    className="p-3 border-2 border-gray-600 rounded-lg"
                                                />
                                            )}
                                        </div>


                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Description</label>
                                            <textarea name="description" id="description" value={isFlag ? CourseInputs.description : singleCourse.description} cols="10" rows="5" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                                        </div>
                                    </div>
                                </div>



                                
                                <div className="flex flex-col gap-2">

{/* 
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Video/Chapters</label>
                                        <input type="file" name="Upload_Category" id="Upload_Category" onChange={handleChangeVedioFile} className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>
                                    {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
                                    <label htmlFor="" className="p-2">Source</label> */}

                                    {/* <div className="flex p-2 gap-3">



                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="Youtube" onChange={handleChange} checked={flag ? CourseInputs.source == "Youtube" : singleCourse.source && singleCourse.source.toLowerCase() === "youtube"} className="p-3 border-2 border-gray-600 rounded-lg" />
                                            <label htmlFor="">Youtube</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="vimeo" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "vimeo" : singleCourse.source == "vimeo"} />
                                            <label htmlFor="">Vimeo</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="Dropbox" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "Dropbox" : singleCourse.source == "Dropbox"} />
                                            <label htmlFor="">Drop Box</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="embed" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "embed" : singleCourse.source == "embed"} />
                                            <label htmlFor="">embed</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="Upload" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={flag ? CourseInputs.source == "Upload" : singleCourse.source == "Upload"} />
                                            <label htmlFor="">Upload</label>

                                        </div>


                                    </div> */}

                                    {/* <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Link</label>
                                        {selectedSource !== "Upload" && (
                                            <input
                                                type="text"
                                                name="link"
                                                id="link"
                                                onChange={handleChange}
                                                className="p-3 border-2 border-gray-600 rounded-lg"
                                            />
                                        )}
                                    </div> */}


                                    {/* <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Description</label>
                                        <textarea name="description" id="description" value={isFlag ? CourseInputs.description : singleCourse.description} cols="10" rows="5" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                                    </div> */}

                                    <div className="flex justify-start items-center py-4 px-2">
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-36"><FaPlus /> Add Chapters</button>
                                    </div>


                                    <div className="flex flex-col justify-center items-start p-2 gap-3">

                                        <div>
                                            <label htmlFor=""> Status </label>
                                        </div>
                                        <div className="flex">
                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="status" id="status" value="Active" checked={flag ? CourseInputs.status == "Active" : singleCourse.status == "Active"} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                <label>Active</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="status" id="status" value="Pending" checked={flag ? CourseInputs.status == "Pending" : singleCourse.status === "Pending"} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                <label htmlFor="">Pending</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="status" id="status" value="Inactive" checked={flag ? CourseInputs.status == "Inactive" : singleCourse.status == "Inactive"} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                <label htmlFor="">Inactive</label>

                                            </div>
                                        </div>


                                    </div>
                                    <div className="w-full flex justify-center items-center gap-5 p-2">
                                        {/* <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button> */}
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg">{isFlag ? "Add Category" : "Update Category"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={isSubModalOpen}
                >
                    <Box sx={styleSubModal}>
                        <div className="text-xs overflow-y-visible font-semibold text-gray-600">
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">Edit / Video Chapter</h1>
                                <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" onClick={handleCloseSubModal}>Close</button>
                            </div>
                            <div className="mt-10">
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">First Name</label>
                                        <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">First Name</label>
                                        <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Video/Chapters</label>
                                        <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>

                                    <div className="flex p-2 gap-3">

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                            <label htmlFor="">Youtube</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                            <label htmlFor="">Vimeo</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                            <label htmlFor="">Drop Box</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                            <label htmlFor="">embed</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                            <label htmlFor="">Upload</label>

                                        </div>

                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Link</label>
                                        <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Description</label>
                                        <textarea name="" id="" cols="10" rows="5" className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                                    </div>

                                    <div className="w-full flex justify-center items-center gap-5 p-2">
                                        <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button>
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg">Update Video</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>

        </div>
    )
}

export default CourseList