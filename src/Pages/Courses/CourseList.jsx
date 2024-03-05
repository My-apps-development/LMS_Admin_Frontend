import { Box, Divider, Modal } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { errorMessage, successMessage } from "../../Utils/notificationManager";

import Loader from "../../Utils/Loader";
import { MdDelete, MdKeyboardArrowDown, MdSettings } from "react-icons/md";
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

    // const [loading, setLoading] = useState(false);

    const [uploadProgress, setUploadProgress] = useState(0);

    // const [createChapter, setCreateChapter] = useState([{
    //     title: "",
    //     description: "",
    //     source: "",
    //     chapterLink: ""
    // }])

    const [videoIntervalDisplay, setVideoIntervalDisplay] = useState(false)

    const [singleCourse, setSingleCourse] = useState({
        title: "",
        description: "",
        source: "",
        language: "",
        role: "",
        status: "",
        categoryId: "",
        video_link: ""
    })

    const [flag, setFlag] = useState(true)

    const [selectedSource, setSelectedSource] = useState("")

    const [CourseInputs, setCourseInputs] = useState({
        title: "",
        description: "",
        source: "",
        language: "",
        role: "",
        status: "",
        categoryId: "",
        video_link: ""
    })

    // const [accordianFlag, setAccordianFlag] = useState(false)

    const [chapterFlag, setChapterFlag] = useState(false)

    const [chapters, setChapters] = useState({
        title: "",
        description: "",
        courseId: "",
        categoryId: "",
        video_link: "",
        source: "",
        language: "",
        role: ""
    })

    const [singleChapter, setSingleChapter] = useState({
        title: "",
        description: "",
        courseId: "",
        categoryId: "",
        video_link: "",
        source: "",
        language: "",
        role: ""
    })

    // const fileInputRef = useRef()

    const [chapterList, setChapterList] = useState([])

    const [language, setLanguage] = useState([])

    const [roles, setRoles] = useState([])

    // const [AddChapter, setAddChapter] = useState(false)







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
        setIsFlag(true)
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

        // if (e.target.value == "Upload") {
        //     fileInputRef.current.click()
        // }

        flag ? setCourseInputs({ ...CourseInputs, [e.target.name]: e.target.value }) : setSingleCourse({ ...singleCourse, [e.target.name]: e.target.value })
    }



    const handleChangeVedioFile = (e) => {
        const file = e.target.files[0]
        setPostVideo(file)
    }



    const handleChangeChapterFile = (e) => {
        e.preventDefault()

        // console.log(fileInputRef);

        const file = e.target.files[0]
        setPostVideo(file)

    }

    const handleChangeChapter = (e) => {
        e.preventDefault()

        if (e.target.name == "source") {
            setSelectedSource(e.target.value)
        }



        // if (e.target.value == "Upload") {
        //     setChapters((prevChapters) => ({ ...prevChapters, video_link: "" }))
        //     fileInputRef.current.click()
        // }

        chapterFlag ? setChapters({ ...chapters, [e.target.name]: e.target.value }) : setSingleChapter({ ...singleChapter, [e.target.name]: e.target.value })

    }

    const PostChapter = async (e) => {

        console.log(flag);



        e.preventDefault()

        console.log(chapters);

        const postChapter = new FormData()
        postChapter.append("title", chapters.title)
        postChapter.append("courseId", chapters.courseId)
        postChapter.append("categoryId", chapters.categoryId)
        postChapter.append("source", chapters.source)
        postChapter.append("description", chapters.description)
        // postChapter.append("video_link", chapters.video_link)
        postChapter.append("language", chapters.language)
        postChapter.append("role", chapters.role)


        if (selectedSource == "Upload") {
            postChapter.append("video_link", postVideo)
        } else {
            postChapter.append("video_link", CourseInputs.video_link)
        }



        try {
            const response = await axiosInstance.post("/homepage/addChapters", postChapter, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            })
            const data = await response.data
            console.log(data);
            successMessage(data.message)
            FetchChapters()
            fetchCourses()
            ClearInputs()
            setIsSubModalOpen(false)

        } catch (error) {
            setLoader(false)
            errorMessage(error?.response?.data?.message)
            console.log("Error Posting Chapters", error.message)
        }
    }

    const UpdateChapters = async (e) => {
        e.preventDefault()

        console.log(flag);

        const updateChapter = new FormData()
        updateChapter.append("title", singleChapter.title)
        updateChapter.append("courseId", singleChapter.courseId)
        updateChapter.append("categoryId", singleChapter.categoryId)
        updateChapter.append("source", singleChapter.source)
        updateChapter.append("description", singleChapter.description)
        updateChapter.append("language", singleChapter.language)
        updateChapter.append("role", singleChapter.role)
        updateChapter.append("video_link", singleChapter.video_link)
        console.log(postVideo);
        console.log(updateChapter);

        if (selectedSource == "Upload") {
            updateChapter.append("video_link", postVideo)
        } else {
            updateChapter.append("video_link", CourseInputs.video_link)
        }

        try {
            setLoader(true)
            const response = await axiosInstance.patch(`/homepage/updateChapters?chapterId=${singleChapter?._id}`, updateChapter, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            })
            const data = await response.data
            successMessage(data?.message)
            setIsSubModalOpen(false)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("Error Updating Chapter By Id", error.message);
        }

        ClearInputs()
    }

    const PostCourse = async (e) => {
        e.preventDefault()

        if (!CourseInputs.title) {
            errorMessage("Course Name Required")
            return
        }
        if (!CourseInputs.categoryId) {
            errorMessage("category Required")
            return
        }
        if (!CourseInputs.role) {
            errorMessage("role Required")
            return
        }
        if (!CourseInputs.language) {
            errorMessage("Language Required")
            return
        }
        if (!CourseInputs.source) {
            errorMessage("source Required")
            return
        }
        // if (!CourseInputs.video_link) {
        //     errorMessage("Video Required")
        //     return
        // }
        if (!CourseInputs.description) {
            errorMessage("Description Required")
            return
        }
        if (!CourseInputs.status) {
            errorMessage("status Required")
            return
        }

        const formData = new FormData()
        formData.append("title", CourseInputs.title)
        formData.append("description", CourseInputs.description)
        formData.append("language", CourseInputs.language)
        formData.append("source", CourseInputs.source)
        formData.append("role", CourseInputs.role)
        formData.append("status", CourseInputs.status)
        formData.append("categoryId", CourseInputs.categoryId)
        // formData.append("courselink", CourseInputs.courselink)

        if (selectedSource == "Upload") {
            formData.append("video_link", postVideo)
        } else {
            formData.append("video_link", CourseInputs.video_link)
        }


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
            // setIsOpen(false)
            setLoader(false)
        } catch (error) {
            errorMessage(error.response.data.message)
            setLoader(false)
            console.log("Error Creating course", error.message);
        }

    }

    console.log(CourseInputs);




    const fetchCategories = async () => {
        try {
            setLoader(true)
            const response = await axiosInstance.get("/category/fetch")
            const data = await response.data
            setCategoryList(data.categories);
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("Error fetching categories data", error.message);
        }
    }



    const fetchCourses = async () => {


        try {
            setLoader(true)
            const response = await axiosInstance.get("/homepage/courses")
            const data = await response.data
            // console.log(data);
            setCoursesList(data.coursewithcategory);
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("error fetching data", error.message);
        }
    }




    const FetchChapters = async () => {

        try {
            setLoader(true)
            const response = await axiosInstance.get("/homepage/fetchChapters")
            const data = await response.data
            setChapterList(data.chapter)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
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
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("Deleting data Failed", error.message);
        }
    }



    const UpdateCourse = async (e) => {
        e.preventDefault()

        if (!singleCourse.title) {
            errorMessage("Title should not be empty")
            return
        }

        if (!singleCourse.categoryId) {
            errorMessage("categoryId should not be empty")
            return
        }

        if (!singleCourse.role) {
            errorMessage("role should not be empty")
            return
        }

        if (!singleCourse.language) {
            errorMessage("language should not be empty")
            return
        }

        if (!singleCourse.source) {
            errorMessage("source should not be empty")
            return
        }

        if (!singleCourse.video_link) {
            errorMessage("video_link should not be empty")
            return
        }

        if (!singleCourse.description) {
            errorMessage("description should not be empty")
            return
        }

        if (!singleCourse.status) {
            errorMessage("status should not be empty")
            return
        }

        const UpdatedFormData = new FormData()

        UpdatedFormData.append("title", singleCourse.title)
        UpdatedFormData.append("description", singleCourse.description)
        UpdatedFormData.append("role", singleCourse.role)
        UpdatedFormData.append("source", singleCourse.source)
        UpdatedFormData.append("status", singleCourse.status)
        UpdatedFormData.append("categoryId", singleCourse.categoryId)
        UpdatedFormData.append("language", singleCourse.language)

        if (selectedSource == "Upload") {
            UpdatedFormData.append("video_link", postVideo)
        } else {
            UpdatedFormData.append("video_link", singleCourse.video_link)
        }

        try {
            setLoader(true)
            const response = await axiosInstance.patch(`/homepage/updateCourse?courseId=${singleCourse._id}`, UpdatedFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            const data = await response.data
            successMessage(data?.message)
            fetchCourses()
            setIsOpen(false)
            console.log(data);
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("error updating code", error.message);
        }
    }

    

    const fetchCourseById = async (_id) => {
        setFlag(false)
        console.log(flag);



        try {
            setLoader(true)
            const response = await axiosInstance.get(`https://myappsdevelopment.co.in/homepage/singlecourse?courseid=${_id} `)
            const data = await response.data
          
            setSingleCourse(data.Courses);
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("Error Fetching Chapters By Id", error.message)
        }

    }




    const FetchChapterById = async (_id) => {

        try {
            const response = await axiosInstance.get(`/homepage/singlechapter?chapterid=${_id}`)
            const data = await response.data
            setSingleChapter(data.chapters);
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("Error Fetching Chapters By Id", error.message);
        }
    }

    
    // console.log(singleCourse);
    // console.log(singleChapter);

    // const UpdateChapterById = async (e,_id) => {
    //     e.preventDefault()
    //     console.log(_id);
    // try{
    //     const response = await axiosInstance.patch(`/homepage/updateChapters?chapterId=${_id}`)
    //     const data = await response.data
    //     console.log(data);
    // } catch(error){
    //     console.log("Error Updating Chapter by Id", error.message);
    // }
    // }

    const DeleteChapterById = async (_id, courseId) => {
        console.log(_id);
        console.log(courseId);
        try {
            setLoader(true)
            const response = await axiosInstance.delete("/homepage/deleteChapters", { data: { chapterId: _id, courseId: courseId } })
            const data = await response.data
            successMessage(data.message)
            FetchChapters()
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("Error Deleting chapter by Id", error.message);
        }
    }

    const Languages = async () => {
        try {
            const response = await axiosInstance.get("/enrollment/masterlanguage")
            const data = await response?.data
            setLanguage(data?.Language);
        } catch (error) {
            console.log("Error Fetching Languages", error.message)
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

    const ClearInputs = () => {
        try {
            setCourseInputs((prevState) => ({
                prevState,
                title: "",
                description: "",
                source: "",
                language: "",
                role: "",
                status: "",
                categoryId: "",
                video_link: ""
            }))
        } catch (error) {
            setLoader(false)
            console.log("error clearing input fields", error.message);
        }
    }

    useEffect(() => {
        fetchCourses()
        FetchChapters()
        fetchCategories()
        Languages()
        MasterRoles()
        // FetchChapterById()
    }, [])






    return (

        <div className="w-full ">

            <AdminDashboard />
            <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300">
                {
                    !courseList.length ? <div className="text-2xl"> Oops...! No Courses Found </div> : null
                }
                {
                    loader ? <Loader /> : <div className="h-screen">
                        <div>
                            <div>
                                <div className="font-bold">
                                    <h1 className="text-2xl">Video Courses</h1>
                                </div>
                                <div >
                                    <div className="flex justify-between items-center">
                                        <p>Total {courseList?.length} video courses are available</p>
                                        <div className="flex gap-2 relative">
                                            <p className="p-2 flex justify-center items-center gap-2 border-2 border-[#B32073] text-[#B32073] hover:bg-[#B32073] hover:text-white" onClick={() => setVideoIntervalDisplay(!videoIntervalDisplay)}><MdSettings />Settings</p>
                                            <button className="p-2 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073]" onClick={handleOpenModal}><FaPlus />Add Course</button>

                                            <div className={`absolute mt-14 px-5  flex-col justify-center items-center gap-1 border-2 border-gray-600 py-1 rounded z-40 ${videoIntervalDisplay ? "flex" : "hidden"}`} >
                                                <p>30 days</p>
                                                <p>60 days</p>
                                                <p>90 days</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-5 mt-5 p-2 w-[100%] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                            {
                                courseList?.map((item, index) => {
                                    return (
                                        <div className="w-[100%] h-50 border-2 shadow-xl p-2 rounded-lg hover:scale-95 duration-300 bg-white" key={index} >
                                            <div className="flex flex-col gap-2 ">
                                                <h1 className="text-xl text-gray-600 capitalize">{item?.course?.title}</h1>

                                                <div className="flex justify-between items-center gap-2 text-xs">
                                                    <p className="text-gray-400">Category: <span className="text-blue-500">{item?.category?.categories}</span></p>
                                                    {/* <p className="text-gray-400">Videos: <span className="text-blue-500">{item?.course?.videoCount}</span></p> */}
                                                </div>
                                                <div className="flex justify-between items-center py-2 text-xs">
                                                    <p className="text-gray-400">status: <span className="text-green-600">{item?.course?.status}</span></p>
                                                    {/* <p className="text-gray-400">Enrolled User: <span className="text-blue-500">{item?.course?.inrolled_users}</span></p> */}
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="flex justify-between flex-col items-center py-2 w-full">
                                                {
                                                    chapterList?.filter(it => it.courseId === item.course?._id)?.map((i, index) => {

                                                        return (
                                                            <div className="flex justify-between items-center gap-2 border-b-2 w-full cursor-pointer" key={index}>
                                                                <div className="flex justify-start items-start flex-col">
                                                                    <p>{i?.title}</p>
                                                                    <p className="text-gray-400 text-xs">Source: {i?.source}</p>
                                                                </div>
                                                                <div className="flex justify-center items-center gap-5 w-28 h-14 font-2xl font-bold">
                                                                    <p className="font-2xl p-2" onClick={() => {
                                                                        FetchChapterById(i?._id)
                                                                        fetchCourseById(item?.course?._id)
                                                                        setIsFlag(false)
                                                                        setChapterFlag(false)
                                                                        handleOpenSubModal(true)
                                                                    }}><CiEdit /></p>
                                                                    <p className="font-2xl p-2" onClick={() => DeleteChapterById(i?._id, item.course?._id)}><MdDelete /></p>
                                                                </div>

                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                            <Divider />
                                            <div className="flex justify-between items-center text-2xl py-2">
                                                <button className="text-blue-400 border-2 p-1 rounded-lg border-blue-400 font-extrabold" onClick={() => {
                                                    setIsOpen(true)
                                                    setIsFlag(false)
                                                    fetchCourseById(item?.course?._id)
                                                }}><CiEdit /></button>
                                                <button className="text-red-600 font-extrabold border-red-600 border-2 p-1 rounded" onClick={() => handleDeleteCourse(item?.course?._id)}><RiDeleteBin5Fill /></button>
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
                                <div className="grid grid-cols-2 mt-5">
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Course Name</label>
                                        <input type="text" name="title" id="title" onChange={handleChange} value={isFlag ? CourseInputs.title : singleCourse.title} className="p-3 border-2 border-gray-600 rounded-lg" />
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

                                    </div>




                                </div>



                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Role</label>
                                        <select name="role" id="role" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={isFlag ? CourseInputs.role : singleCourse?.role} >
                                            <option value="">Choose Role</option>
                                            {
                                                roles?.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item}>{item}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        {/* <input type="text" name="role" id="role" className="p-3 border-2 border-gray-600 rounded-lg"/> */}
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">language</label>
                                        <select name="language" id="language" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChange} value={isFlag ? CourseInputs.language : singleCourse?.language} >
                                            <option value="">Choose language</option>
                                            {
                                                language?.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item}>{item}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        {/* <input type="text" name="language" id="language" className="p-3 border-2 border-gray-600 rounded-lg"/> */}
                                    </div>
                                </div>

                                <div className="flex flex-col p-2 gap-3">

                                    <div>
                                        <label htmlFor="">Source</label>
                                    </div>

                                    <div className="flex p-2 gap-3">
                                        {/* <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="Youtube" onChange={handleChange} checked={isFlag ? CourseInputs.source == "Youtube" : singleCourse.source && singleCourse.source.toLowerCase() === "Youtube"} className="p-3 border-2 border-gray-600 rounded-lg" />
                                            <label htmlFor="">Youtube</label>

                                        </div> */}

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="vimeo" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={isFlag ? CourseInputs.source == "vimeo" : singleCourse.source == "vimeo"} />
                                            <label htmlFor="">Vimeo</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="Dropbox" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={isFlag ? CourseInputs.source == "Dropbox" : singleCourse.source == "Dropbox"} />
                                            <label htmlFor="">Drop Box</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="embed" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={isFlag ? CourseInputs.source == "embed" : singleCourse.source == "embed"} />
                                            <label htmlFor="">embed</label>

                                        </div>

                                        <div className="flex justify-center items-center p-2 gap-3">
                                            <input type="radio" name="source" id="source" value="Upload" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" checked={isFlag ? CourseInputs.source == "Upload" : singleCourse.source == "Upload"} />
                                            <label htmlFor="">Upload</label>

                                        </div>
                                    </div>


                                </div>

                                <div className="flex flex-col p-2 gap-3">

                                    {selectedSource !== "Upload" && (
                                        <>
                                            <label htmlFor="">Link</label>
                                            <input
                                                type="text"
                                                name="video_link"
                                                id="video_link"
                                                onChange={handleChange}
                                                className="p-3 border-2 border-gray-600 rounded-lg"
                                                value={isFlag ? CourseInputs.video_link : singleCourse?.video_link}
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-center items-start p-2 gap-3 flex-col w-full">

                                    {
                                        selectedSource == "Upload" && (
                                            <>
                                                <label htmlFor="">Upload Video</label>
                                                <input type="file" name="video_link" id="video_link" className="p-3 w-full border-2 border-gray-600 rounded-lg" onChange={handleChangeVedioFile}  />
                                                {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
                                            </>
                                        )
                                    }

                                </div>

                                <div className="flex flex-col p-2 gap-3">
                                    <label htmlFor="">Description</label>
                                    <textarea name="description" id="description" value={isFlag ? CourseInputs.description : singleCourse.description} cols="10" rows="5" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                                </div>



                                {/* --------------------------------------Accordian Starts ------------------------------------------- */}


                                <div className="flex flex-col">

                                    {/* 
                                    <div className="flex font-semibold justify-between items-center p-2 border-2 rounded cursor-pointer mt-5" onClick={() => setAccordianFlag(!accordianFlag)}>
                                        <p>Chapters</p>
                                        <p className="font-bold text-2xl">{accordianFlag ? <MdKeyboardArrowDown /> : <IoIosArrowUp />}</p>
                                    </div> */}



                                    {/* <div className={`${accordianFlag ? "flex flex-col" : "hidden"}`}>

                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Chapter title</label>
                                            <input type="text" name="title" id="title" className="p-3 border-2 border-gray-600 rounded-lg" />
                                        </div>





                                        <div className="flex flex-col p-2 gap-3">

                                            <div>
                                                <label htmlFor="">Source</label>
                                            </div>

                                            <div className="flex p-2 gap-3">
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


                                        </div>


                                        <div className="flex flex-col p-2 gap-3">

                                            {selectedSource !== "Upload" && (
                                                <>
                                                    <label htmlFor="">Link</label>
                                                    <input
                                                        type="text"
                                                        name="video_link"
                                                        id="video_link"
                                                        onChange={handleChange}
                                                        className="p-3 border-2 border-gray-600 rounded-lg"
                                                        value={flag ? "" : singleCourse?.video_link}
                                                    />
                                                </>
                                            )}
                                        </div>

                                        <div className="flex justify-center items-start p-2 gap-3 flex-col w-full">

                                            {
                                                selectedSource == "Upload" && (
                                                    <>
                                                        <label htmlFor="">Upload Video</label>
                                                        <input type="file" name="video_link" id="video_link" className="p-3 w-full border-2 border-gray-600 rounded-lg" />
                                                        {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
                                                    </>
                                                )
                                            }

                                        </div>

                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Description</label>
                                            <textarea name="description" id="description" value={isFlag ? CourseInputs.description : singleCourse.description} cols="10" rows="5" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                                        </div>

                                    </div> */}

                                    {/* ---------------------------------------- Accordian Ends ----------------------------------- */}

                                    {/* ----------------------------------Chapter Sections Ends--------------------------- */}

                                    {/* 
                                        // <div className="flex flex-col p-2 gap-3">
                                        //     <label htmlFor="">Description</label>
                                        //     <textarea name="description" id="description" value={isFlag ? CourseInputs.description : singleCourse.description} cols="10" rows="5" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                                        // </div>
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
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-36" type="button" onClick={() => {
                                            setChapterFlag(true)
                                            handleOpenSubModal(true)
                                            // setCreateChapter([...createChapter, { title: "", source: "", description: "", chapterLink: "" }])
                                        }}><FaPlus /> Add Chapters</button>
                                    </div>


                                    <div className="flex flex-col justify-center items-start p-2 gap-3">

                                        <div>
                                            <label htmlFor=""> Status </label>
                                        </div>
                                        <div className="flex">
                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="status" id="status" value="Active" checked={isFlag ? CourseInputs.status == "Active" : singleCourse.status == "Active"} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                <label>Active</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="status" id="status" value="Pending" checked={isFlag ? CourseInputs.status == "Pending" : singleCourse.status === "Pending"} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                <label htmlFor="">Pending</label>

                                            </div>

                                            <div className="flex justify-center items-center p-2 gap-3">
                                                <input type="radio" name="status" id="status" value="Inactive" checked={isFlag ? CourseInputs.status == "Inactive" : singleCourse.status == "Inactive"} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                <label htmlFor="">Inactive</label>

                                            </div>
                                        </div>


                                    </div>
                                    <div className="w-full flex justify-center items-center gap-5 p-2">
                                        {/* <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button> */}
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg">{isFlag ? "Add Course" : "Update Course"}</button>
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
                                <h1 className="text-2xl">{chapterFlag ? "Add Chapter" : "Update Chapter"}</h1>
                                <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" onClick={handleCloseSubModal}>Close</button>
                            </div>
                            <form action="" onSubmit={chapterFlag ? PostChapter : UpdateChapters}>
                                <div className="mt-10">
                                    <div className="grid grid-cols-1">
                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Parent Course Name</label>

                                            {/* <input type="text" name="title" id="title" onChange={handleChangeChapter} value={isFlag ? CourseInputs.title : singleCourse.title} className="p-3 border-2 border-gray-600 rounded-lg" /> */}


                                            <select className="p-3 border-2 border-gray-600 rounded-lg" name="courseId" onChange={handleChangeChapter} value={isFlag ? CourseInputs?.title : singleCourse?.title}>
                                                <option value="">Choose Option</option>
                                                {
                                                    courseList?.map((item) => {
                                                        return (
                                                            <option value={item?.course?._id} key={item?.course?._id}>{item?.course?.title}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>

                                        {/* <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Category</label>
                                        
                                            <select className="p-3 border-2 border-gray-600 rounded-lg" name="categoryId" onChange={handleChangeChapter} value={chapterFlag ? chapters?.categoryId : singleChapter?.categoryId}>
                                                <option value="">Choose Option</option>
                                                {
                                                    categoryList?.map((item) => {
                                                        return (
                                                            <option value={item?._id} key={item?._id}>{item?.categories}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                           
                                        </div> */}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Vedio Title</label>
                                            <input type="text" className=" p-3 border-2 border-gray-600 rounded-lg" name="title" id="title" onChange={handleChangeChapter} value={chapterFlag ? chapters?.title : singleChapter?.title} />
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">Role</label>
                                                <select name="role" id="role" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value={chapterFlag ? chapters.role : singleChapter?.role} >
                                                    <option value="">Choose Role</option>
                                                    {
                                                        roles?.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item}>{item}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                {/* <input type="text" name="role" id="role" className="p-3 border-2 border-gray-600 rounded-lg"/> */}
                                            </div>

                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">language</label>
                                                <select name="language" id="language" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value={chapterFlag ? chapters.language : singleChapter?.language} >
                                                    <option value="">Choose language</option>
                                                    {
                                                        language?.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item}>{item}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                {/* <input type="text" name="language" id="language" className="p-3 border-2 border-gray-600 rounded-lg"/> */}
                                            </div>
                                        </div>



                                        {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}

                                        <div className="flex flex-col p-2 gap-3">
                                            <div className="flex justify-start items-start">
                                                <h1>Source</h1>
                                            </div>
                                            <div className="flex p-2 gap-3">
                                                {/* <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="source" id="source" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value="youtube" checked={chapterFlag ? chapters?.source == "youtube" : singleChapter?.source == "youtube"} />
                                                    <label htmlFor="">Youtube</label>

                                                </div> */}

                                                <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="source" id="source" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value="Vimeo" checked={chapterFlag ? chapters?.source == "Vimeo" : singleChapter?.source == "vimeo"} />
                                                    <label htmlFor="">Vimeo</label>

                                                </div>

                                                <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="source" id="source" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value="dropbox" checked={chapterFlag ? chapters.source == "dropbox" : singleChapter?.source == "dropbox"} />
                                                    <label htmlFor="">Drop Box</label>

                                                </div>

                                                <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="source" id="source" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value="embed" checked={chapterFlag ? chapters.source == "embed" : singleChapter?.source == "embed"} />
                                                    <label htmlFor="">embed</label>

                                                </div>

                                                <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="source" id="source" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value="Upload" checked={chapterFlag ? chapters.source == "Upload" : singleChapter?.source == "Upload"} />
                                                    <label htmlFor="">Upload</label>

                                                </div>
                                            </div>



                                        </div>

                                        <div className="flex flex-col p-2 gap-3">

                                            {selectedSource !== "Upload" && (
                                                <>
                                                    <label htmlFor="">Link</label>
                                                    <input
                                                        type="text"
                                                        name="video_link"
                                                        id="video_link"
                                                        onChange={handleChangeChapter}
                                                        className="p-3 border-2 border-gray-600 rounded-lg"
                                                        value={chapterFlag ? chapters?.video_link : singleChapter?.video_link}
                                                    />
                                                </>
                                            )}
                                        </div>

                                        <div className="flex justify-center items-start p-2 gap-3 flex-col w-full">

                                            {
                                                selectedSource == "Upload" && (
                                                    <>
                                                        <label htmlFor="">Upload Video</label>
                                                        <input type="file" name="video_link" id="video_link" className="p-3 w-full border-2 border-gray-600 rounded-lg" onChange={handleChangeChapterFile} />
                                                        {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
                                                    </>
                                                )
                                            }

                                        </div>

                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Description</label>
                                            <textarea name="description" id="" cols="10" rows="5" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value={chapterFlag ? chapters?.description : singleChapter?.description}></textarea>
                                        </div>

                                        {/* <div className="flex flex-col justify-center items-start p-2 gap-3">

                                            <div>
                                                <label htmlFor=""> Status </label>
                                            </div>
                                            <div className="flex">
                                                <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="status" id="status" value="active" checked={chapterFlag ? chapters?.status == "active" : singleChapter?.status == "active"} onChange={handleChangeChapter} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                    <label>Active</label>

                                                </div>

                                                <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="status" id="status" value="pending" checked={chapterFlag ? chapters?.status == "pending" : singleChapter?.status == "pending"} onChange={handleChangeChapter} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                    <label htmlFor="">Pending</label>

                                                </div>

                                                <div className="flex justify-center items-center p-2 gap-3">
                                                    <input type="radio" name="status" id="status" value="Inactive" checked={chapterFlag ? chapters?.status == "Inactive" : singleChapter?.status == "Inactive"} onChange={handleChangeChapter} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                    <label htmlFor="">Inactive</label>

                                                </div>
                                            </div>


                                        </div> */}

                                        <div className="w-full flex justify-center items-center gap-5 p-2">
                                            <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button>
                                            <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg" type="submit">{chapterFlag ? "Add Chapter" : "Update Chapter"}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Box>
                </Modal>
            </div>

        </div>
    )
}

export default CourseList