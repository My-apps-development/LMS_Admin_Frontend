import { Box, Divider, Modal } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { errorMessage, successMessage } from "../../Utils/notificationManager";
import Loader from "../../Utils/Loader";
import { MdDelete, MdSettings } from "react-icons/md";



const CourseList = () => {


    // -------------------------------------------------  State Starts  ---------------------------------------------------

    const [isOpen, setIsOpen] = useState(false)
    const [isSubModalOpen, setIsSubModalOpen] = useState(false)
    const [courseList, setCoursesList] = useState([])
    const [isFlag, setIsFlag] = useState(true)
    const [loader, setLoader] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [postVideo, setPostVideo] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)

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

    const [chapterList, setChapterList] = useState([])
    const [language, setLanguage] = useState([])
    const [roles, setRoles] = useState([])
    const [settingData, setSettingData] = useState([])
    // const [parentCourseName, setParentCourseName] = useState("")
    // const [parentCourseId, setParentCourseId] = useState("")



    // -------------------------------------------------  State Ends  ---------------------------------------------------

    // -------------------------------------------------  Modals Style Starts  ---------------------------------------------------


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

    const styleSettingModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid transparent',
        borderRadius: 1,
        boxShadow: 24,
        overflowY: 'auto',
        p: 4,
    }

    // -------------------------------------------------  Modals Style Ends  ---------------------------------------------------

    // -------------------------------------------------  Form Manipulation Starts  ---------------------------------------------------


    const handleOpenModal = () => {
        setIsFlag(true)
        setIsOpen(true)
    }


    const handleCloseModal = () => {
        setIsOpen(false)
    }


    const handleOpenSubModal = () => {
        // console.log(singleCourseTitle);
        setIsSubModalOpen(true)
        // setParentCourseId(singleCourseId)
        // setParentCourseName(singleCourseTitle)
    }


    const handleCloseSubModal = () => {
        setIsSubModalOpen(false)
    }


    const handleChange = (e) => {
        e.preventDefault()

        if (e.target.name == "source") {
            setSelectedSource(e.target.value)
        }



        isFlag ? setCourseInputs({ ...CourseInputs, [e.target.name]: e.target.value }) : setSingleCourse({ ...singleCourse, [e.target.name]: e.target.value })
    }





    const handleChangeVedioFile = (e) => {
        const file = e.target.files[0]
        setPostVideo(file)
    }

    const handleChangeChapterFile = (e) => {
        e.preventDefault()


        const file = e.target.files[0]
        setPostVideo(file)

    }

    const handleChangeChapter = (e) => {
        e.preventDefault()

        if (e.target.name == "source") {
            setSelectedSource(e.target.value)
        }





        chapterFlag ? setChapters({ ...chapters, [e.target.name]: e.target.value }) : setSingleChapter({ ...singleChapter, [e.target.name]: e.target.value })

    }

    const handleChangeSettingForm = (e) => {
        e.preventDefault()

        const { name, value } = e.target;
        setSettingData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }


    // -------------------------------------------------  Form Manipulation Ends  ---------------------------------------------------

    // -------------------------------------------------  CRUD Operation In Course Starts  ------------------------------------------

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

        if (selectedSource == "Upload") {
            formData.append("video_link", postVideo)
        } else {
            formData.append("video_link", CourseInputs.video_link)
        }


        try {
            // setLoader(true)
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
            setIsOpen(false)
            fetchCourses()
            setUploadProgress(0)
            ClearInputs()
            setIsFlag(false)
            // setLoader(false)
        } catch (error) {
            errorMessage(error.response.data.message)
            setLoader(false)

        }

    }

    const fetchCourses = async () => {

        try {
            // setLoader(true)
            const response = await axiosInstance.get("/homepage/courses")
            const data = await response.data
            setCoursesList(data.coursewithcategory);
            // setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            // console.log("error fetching data", error.message);
        }
    }

    console.log(isFlag);
    

    const fetchCourseById = async (_id) => {
        setFlag(false)

        try {
            // setLoader(true)
            const response = await axiosInstance.get(`https://myappsdevelopment.co.in/homepage/singlecourse?courseid=${_id} `)
            const data = await response?.data
            setSingleCourse(data?.Courses);
            setSelectedSource(data?.Courses?.source)
            // setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
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
            if (window.confirm("Are you sure you want to update course?")) {
                // setLoader(true)
                const response = await axiosInstance.patch(`/homepage/updateCourse?courseId=${singleCourse._id}`, UpdatedFormData, {
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
                fetchCourses()
                setUploadProgress(0)
                setIsOpen(false)
                // setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)

        }
    }

    const handleDeleteCourse = async (_id) => {
        try {
            if (window.confirm("Are you sure you want to delete course?")) {
                setLoader(true)
                const response = await axiosInstance.delete("homepage/deleteCourse", { data: { courseId: _id } })
                const data = await response.data
                successMessage(data.message);
                fetchCourses()
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
        }
    }

    // -------------------------------------------------  CRUD Operation In Course Starts  ------------------------------------------

    // -------------------------------------------------  CRUD Operation In Chapters Starts  ------------------------------------------


    const PostChapter = async (e) => {

        e.preventDefault()

        const postChapter = new FormData()
        postChapter.append("title", chapters.title)
        postChapter.append("courseId", singleCourse?._id)
        postChapter.append("categoryId", chapters.categoryId)
        postChapter.append("source", chapters.source)
        postChapter.append("description", chapters.description)
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

            successMessage(data.message)
            FetchChapters()
            fetchCourses()
            setUploadProgress(0)
            clearChapterInputs()
            setIsSubModalOpen(false)
            setIsOpen(false)
            setUploadProgress(0)

        } catch (error) {
            setLoader(false)
            errorMessage(error?.response?.data?.message)
        }
    }

    const FetchChapters = async () => {

        try {
            // setLoader(true)
            const response = await axiosInstance.get("/homepage/fetchChapters")
            const data = await response.data
            setChapterList(data.chapter)
            // setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
        }
    }

    const FetchChapterById = async (_id) => {

        try {
            const response = await axiosInstance.get(`/homepage/singlechapter?chapterid=${_id}`)
            const data = await response.data

            setSingleChapter(data.chapters);
            setSelectedSource(data?.chapters?.source);
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)

        }
    }

    const UpdateChapters = async (e) => {
        e.preventDefault()

        const updateChapter = new FormData()
        updateChapter.append("title", singleChapter.title)
        updateChapter.append("courseId", singleChapter.courseId)
        updateChapter.append("categoryId", singleChapter.categoryId)
        updateChapter.append("source", singleChapter.source)
        updateChapter.append("description", singleChapter.description)
        updateChapter.append("language", singleChapter.language)
        updateChapter.append("role", singleChapter.role)
        updateChapter.append("video_link", singleChapter.video_link)


        if (selectedSource == "Upload") {
            updateChapter.append("video_link", postVideo)
        } else {
            updateChapter.append("video_link", CourseInputs.video_link)
        }

        try {
            if (window.confirm("Are you sure want to update chapter?")) {
                // setLoader(true)
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
                FetchChapters()
                fetchCourses()
                setUploadProgress(0)

                setIsSubModalOpen(false)
                // setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)

        }

        ClearInputs()
    }


    const DeleteChapterById = async (_id, courseId) => {

        try {
            if (window.confirm("Are you sure you want to delete chapter?")) {
                setLoader(true)
                const response = await axiosInstance.delete("/homepage/deleteChapters", { data: { chapterId: _id, courseId: courseId } })
                const data = await response.data
                successMessage(data.message)
                FetchChapters()
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)

        }
    }

    // -------------------------------------------------  CRUD Operation In Chapters Ends  ------------------------------------------

    // -------------------------------------------------  Setting Section Starts  ---------------------------------------------------


    const GetSettings = async () => {
        try {
            const response = await axiosInstance.get("/setting/get")
            const data = await response.data
            setSettingData(data?.settingdata[0]);
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)

        }
    }

    const PostSettingForm = async (e) => {
        e.preventDefault()

        try {
            const response = await axiosInstance.patch(`/setting/update?id=${settingData?._id}`, settingData)
            const data = await response?.data
            successMessage(data?.message);
            GetSettings()
            setIsSettingModalOpen(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)

        }
    }


    // -------------------------------------------------  Setting Section Ends  ---------------------------------------------------------

    // ------------------------------------------------- Extra Data  Starts -------------------------------------------------------------

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

        }
    }

    const Languages = async () => {
        try {
            const response = await axiosInstance.get("/enrollment/masterlanguage")
            const data = await response?.data
            setLanguage(data?.Language);
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)

        }
    }

    const MasterRoles = async () => {
        try {
            const response = await axiosInstance.get("/enrollment/masterroles")
            const data = await response?.data
            setRoles(data?.roles);
        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)

        }
    }

    // ------------------------------------------------- Extra Data Ends -------------------------------------------------------------

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
            setPostVideo(null)
            setUploadProgress(0)
        } catch (error) {
            setLoader(false)

        }
    }

    const clearChapterInputs = () => {
        setChapters((prev) => ({
            ...prev,
            title: "",
            description: "",
            courseId: "",
            categoryId: "",
            video_link: "",
            source: "",
            language: "",
            role: ""
        }))
    }



    useEffect(() => {
        fetchCourses()
        FetchChapters()
        fetchCategories()
        Languages()
        MasterRoles()
        GetSettings()

    }, [])

    return (

        <div className="w-full ">

            <AdminDashboard />
            <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300">
                {
                    !courseList.length ? <div className="text-2xl"> Oops...! No Courses Found </div> : null
                }
                {
                    loader ? <Loader /> : <div className="">
                        <div>
                            <div>
                                <div className="font-bold">
                                    <h1 className="text-2xl">Video Courses</h1>
                                </div>
                                <div >
                                    <div className="flex justify-between items-center">
                                        <p>Total {courseList?.length} video courses are available</p>
                                        <div className="flex gap-2 relative">
                                            <p className="p-2 flex justify-center items-center gap-2 border-2 border-[#B32073] text-[#B32073] hover:bg-[#B32073] hover:text-white cursor-pointer" onClick={() => setIsSettingModalOpen(true)}><MdSettings />Settings</p>
                                            <button className="p-2 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white hover:bg-[#B32073] hover:bg-inherit hover:text-[#B32073]" onClick={handleOpenModal}><FaPlus />Add Course</button>

                                            {/* <div className={`absolute mt-14  flex-col justify-center items-center gap-1 border-2 border-gray-600 rounded z-40 ${videoIntervalDisplay ? "flex" : "hidden"}`} >
                                                {
                                                    settingData.map((item, index) => {
                                                        return (
                                                            <div key={index} className="bg-gray-600 text-white p-2">
                                                                <p className="cursor-pointer">first month: {item?.firstmonth}</p>
                                                                <p className="cursor-pointer"> second month: {item?.secondmonth}</p>
                                                                <p className="cursor-pointer">third month: {item?.thirdmonth}</p>
                                                                <button className="px-2 py-1 bg-[#B32073] mt-3" onClick={() => setIsSettingModalOpen(true)}><CiEdit /></button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div> */}
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-5 mt-5 p-2 w-[100%] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                            {
                                [...courseList]?.reverse()?.map((item, index) => {
                                    return (
                                        <div className="w-[100%] h-50 border-2 shadow-xl p-2 rounded-lg hover:scale-95 duration-300 bg-white" key={index} data-aos="flip-left">
                                            <div className="flex flex-col gap-2 ">
                                                <h1 className="text-xl text-gray-600 capitalize">{item?.course?.title}</h1>

                                                <div className="flex justify-between items-center gap-2 text-xs">
                                                    <p className="text-gray-400 w-[50%]">Category: <span className="text-blue-500 text-end w-[25%]">{item?.category?.categories}</span></p>
                                                    <p className="text-gray-400 w-[50%] text-end">Language: <span className="text-blue-500 text-end w-[25%]">{item?.course?.language}</span></p>
                                                </div>
                                                <div className="flex justify-between items-center py-2 text-xs">
                                                    <p className="text-gray-400 w-[50%]" >status: <span className={`${item?.course?.status?.toLowerCase() === "active" ? 'text-green-600' : "text-red-600"} capitalize text-end w-[25%]`}>{item?.course?.status?.toLowerCase()}</span></p>
                                                    <p className="text-gray-400 w-[50%] text-end">Source:  <span className={`text-end w-[25%] ${item?.course?.source?.toLowerCase() === "upload" ? 'text-blue-500' : item?.course?.source?.toLowerCase() === "embed" ? 'text-yellow-500' : item?.course?.source?.toLowerCase() === "vimeo" ? 'text-green-500' : item?.course?.source?.toLowerCase()?.trim() === "dropbox" ? "text-orange-500" : 'text-black'}`}>
                                                        {item?.course?.source}
                                                    </span></p>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className=" py-2 h-auto">
                                                {
                                                    [...chapterList]?.reverse()?.filter(it => it.courseId === item.course?._id)?.map((i, index) => {

                                                        return (
                                                            <div className="flex justify-between items-center gap-2 border-b-2 w-full cursor-pointer" key={index}>
                                                                <div className="flex justify-start items-start flex-col">
                                                                    <p>{i?.title}</p>
                                                                    <p className="text-gray-400 text-xs">Source: {i?.source}  &nbsp;  Language: {i?.language}</p>
                                                                </div>
                                                                <div className="flex justify-center items-center gap-5 w-28 h-14 font-2xl font-bold">
                                                                    <p className="font-2xl p-2" onClick={() => {
                                                                        fetchCourseById(item?.course?._id)
                                                                        FetchChapterById(i?._id)

                                                                        setIsFlag(false)
                                                                        setChapterFlag(false)
                                                                        handleOpenSubModal(singleCourse?.title, singleCourse?._id)
                                                                    }}><CiEdit /></p>
                                                                    <p className="font-2xl p-2 text-red-600" onClick={() => DeleteChapterById(i?._id, item.course?._id)}><MdDelete /></p>
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
                                        <form onSubmit={isFlag ? PostCourse : UpdateCourse}>
                                            <div className="grid grid-cols-2 mt-5">
                                                <div className="flex flex-col p-2 gap-3">
                                                    <label htmlFor="">Course Name</label>
                                                    <input type="text" name="title" id="title" onChange={handleChange} value={isFlag ? CourseInputs.title : singleCourse.title} autoComplete="off" className="p-3 border-2 border-gray-600 rounded-lg" />
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
                                                            type={selectedSource == "Upload" ? "file" : "text"}
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
                                                            <input type={selectedSource == "Upload" ? "file" : "text"} name="video_link" id="video_link" className="p-3 w-full border-2 border-gray-600 rounded-lg" onChange={handleChangeVedioFile} />
                                                            {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">Description</label>
                                                <textarea name="description" id="description" value={isFlag ? CourseInputs.description : singleCourse.description} cols="10" rows="5" onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className={` justify-start items-center py-4 px-2 ${isFlag ? "hidden" : "flex"}`}>
                                                    <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-36" type="button" onClick={() => {
                                                        setChapterFlag(true)
                                                        setIsFlag(false)
                                                        handleOpenSubModal(singleCourse?.title, singleCourse?._id)


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
                                                        {/* 
                                                        <div className="flex justify-center items-center p-2 gap-3">
                                                            <input type="radio" name="status" id="status" value="Pending" checked={isFlag ? CourseInputs.status == "Pending" : singleCourse.status === "Pending"} onChange={handleChange} className="p-3 border-2 border-gray-600 rounded-lg" />
                                                            <label htmlFor="">Pending</label>

                                                        </div> */}

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

                                                        <input type="text" id="title" value={singleCourse?.title} onChange={handleChangeChapter} className="p-3 border-2 border-gray-600 rounded-lg" />

                                                        {/* <select className="p-3 border-2 border-gray-600 rounded-lg" name="courseId" onChange={handleChangeChapter} value={isFlag ? CourseInputs?.title : singleCourse?.title}>
                                                <option value="">Choose Option</option>
                                                {
                                                    courseList?.map((item) => {
                                                        return (
                                                            <option value={item?.course?._id} key={item?.course?._id}>{item?.course?.title}</option>
                                                        )
                                                    })
                                                }
                                            </select> */}

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
                                                        </div>
                                                    </div>
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
                                                                    type={selectedSource == "Upload" ? "file" : "text"}
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
                                                                    <input type={selectedSource == "Upload" ? "file" : "text"} name="video_link" id="video_link" className="p-3 w-full border-2 border-gray-600 rounded-lg" onChange={handleChangeChapterFile} />
                                                                    {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
                                                                </>
                                                            )
                                                        }

                                                    </div>
                                                    <div className="flex flex-col p-2 gap-3">
                                                        <label htmlFor="">Description</label>
                                                        <textarea name="description" id="" cols="10" rows="5" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeChapter} value={chapterFlag ? chapters?.description : singleChapter?.description}></textarea>
                                                    </div>
                                                    <div className="w-full flex justify-center items-center gap-5 p-2">
                                                        
                                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg" type="submit">{chapterFlag ? "Add Chapter" : "Update Chapter"}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Box>
                            </Modal>
                        </div>

                        <div>
                            <Modal
                                open={isSettingModalOpen}
                            >
                                <Box sx={styleSettingModal}>
                                    <div>
                                        <div className="flex justify-between items-center font-semibold">
                                            <h1 className="text-2xl">Video View Settings</h1>
                                            <button className="p-1 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg" onClick={() => setIsSettingModalOpen(false)}>Close</button>
                                        </div>
                                        <form className="flex flex-col font-semibold mt-5" onSubmit={PostSettingForm}>
                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">First month</label>
                                                <input type="text" name="firstmonth" id="firstmonth" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeSettingForm} value={settingData?.firstmonth} />
                                            </div>

                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">Second month</label>
                                                <input type="text" name="secondmonth" id="secondmonth" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeSettingForm} value={settingData?.secondmonth} />
                                            </div>

                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">Third month</label>
                                                <input type="text" name="thirdmonth" id="thirdmonth" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeSettingForm} value={settingData?.thirdmonth} />
                                            </div>

                                            <div className="flex justify-center items-center mt-5">
                                                <button className="p-1 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg" type="submit">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CourseList