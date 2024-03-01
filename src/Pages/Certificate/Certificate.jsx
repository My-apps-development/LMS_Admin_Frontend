import { Box, Modal } from "@mui/material"
import AdminDashboard from "../Dashboard/AdminDashboard"
import { useEffect, useState } from "react"
import { errorMessage, successMessage } from "../../Utils/notificationManager"
import { axiosInstance } from "../../Utils/AxiosSetUp"
import Loader from "../../Utils/Loader"


const Certificate = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [courseList, setCourseList] = useState([])

    const [Logo, setLogo] = useState(null)
    const [signature, setSignature] = useState(null)
    const [certificate, setCertificate] = useState(null)

    const [postLogo, setPostLogo] = useState(null)
    const [postSignature, setPostSignature] = useState(null)
    const [postCertificate, setPostCertificate] = useState(null)

    const [certificateList, setCertificateList] = useState([])

    const [loader, setLoader] = useState(false)

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        userId: "",
        courseId: "",
        validDate: "",
        uploadLogo: "",
        uploadSignature: "",
        uploadTemplate: ""
    })

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
        overflowY: 'auto',
        p: 4,
    };


    const handleChangeInputs = (e) => {
        e.preventDefault()

        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }


    const handleChangeLogo = (e) => {
        e.preventDefault()

        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()


            reader.onloadend = () => {
                console.log(reader);
                setLogo(reader.result)
            }

            reader.readAsDataURL(file)

        }

        setPostLogo(file)

    }

    const handleChangeSignature = (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        if (file) {


            const reader = new FileReader()
            reader.onloadend = () => {
                setSignature(reader.result)
            }

            reader.readAsDataURL(file)
        }
        setPostSignature(file)
    }

    const handleChangeCertificate = (e) => {
        e.preventDefault()

        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setCertificate(reader.result)
            }

            reader.readAsDataURL(file)
        }
        setPostCertificate(file)
    }


    const PostCertificate = async (e) => {
        e.preventDefault()

        if (!inputs?.firstName) {
            errorMessage("first name is required")
            return
        }
        if (!inputs?.lastName) {
            errorMessage("last name is required")
            return
        }
        if (!inputs?.validDate) {
            errorMessage("date is required")
            return
        }
        if (!inputs?.courseId) {
            errorMessage("course is required")
            return
        }
        if (!postLogo) {
            errorMessage("Logo is required")
            return
        }
        if (!postSignature) {
            errorMessage("signature is required")
            return
        }
        if (!postCertificate) {
            errorMessage("certificate is required")
            return
        }

        const formData = new FormData()
        formData.append("firstName", inputs?.firstName)
        formData.append("lastName", inputs?.lastName)
        formData.append("validDate", inputs?.validDate)
        formData.append("courseId", inputs?.courseId)
        formData.append("userId", "65c60cf888aec6310c29b42e")
        formData.append("uploadLogo", postLogo)
        formData.append("uploadSignature", postSignature)
        formData.append("uploadTemplate", postCertificate)

        try {
            const response = await axiosInstance.post("/certificate/insert", formData)
            const data = await response?.data
            successMessage(data?.message);
            clearInputs()
            setIsOpen(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            console.log("error posting certificate", error.message)
        }
    }



    const FetchCourses = async () => {

        try {
            const response = await axiosInstance.get("/homepage/courses")
            const data = await response.data
            setCourseList(data?.coursewithcategory);
        } catch (error) {
            console.log("Error Fetching Courses", error.message);
            errorMessage(error.response.data.message)
        }
    }

    console.log(courseList);


    const fetchCertificates = async () => {
        try {
            setLoader(true)
            const response = await axiosInstance.get("/certificate/")
            const data = await response?.data
            setCertificateList(data?.data);
            setLoader(false)
        } catch (error) {
            setLoader(false)
            errorMessage(error?.response?.data?.message)
            console.log("Error Fetching Certificates", error.message);
        }
    }

    const clearInputs = () => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            firstName: "",
            lastName: "",
            courseId: "",
            validDate: "",
            userId: ""
        }))

        setLogo(null)
        setCertificate(null)
        setSignature(null)

        setPostCertificate(null)
        setPostLogo(null)
        setPostCertificate(null)
    }





    useEffect(() => {
        FetchCourses()
        fetchCertificates()
    }, [])


    return (
        <div>
            <AdminDashboard />
            {
                loader ? <Loader /> :

                    <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300">
                        <div className="w-full justify-between items-center flex p-2">
                            <h1 className="text-2xl">Certificate</h1>
                            <button type="button" className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-40" onClick={() => setIsOpen(true)}>Add Certificate</button>
                        </div>
                        <div className="mt-10 ml-3 grid grid-cols-4 gap-5">
                            {
                                certificateList?.map((item, index) => {
                                    return (
                                        <div className="border-2 w-72 shadow-lg flex flex-col gap-3 p-3 rounded-lg hover:scale-95 duration-300 bg-white" key={index}>
                                            <div >
                                                <img src={item?.uploadTemplate} alt="" className="rounded-lg object-cover w-72 h-72" />
                                            </div>
                                            <div>
                                                <div>
                                                    <h1>{item?.firstName} {item?.lastName}</h1>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <h1>Course Name</h1>
                                                    <p>{item?.validDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Modal
                            open={isOpen}
                        >
                            <Box sx={style}>
                                <div className="text-xs overflow-y-visible font-semibold text-gray-600">
                                    <div className="flex justify-between items-center w-full text-black">
                                        <h1 className="text-2xl">Add Certificate</h1>
                                        <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" onClick={() => setIsOpen(false)}>Close</button>
                                    </div>
                                    <form className="flex flex-col mt-10" onSubmit={PostCertificate}>

                                        <div className="grid grid-cols-2">
                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">First Name</label>
                                                <input type="text" name="firstName" id="firstName" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeInputs} />
                                            </div>

                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">Last Name</label>
                                                <input type="text" name="lastName" id="lastName" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeInputs} />
                                            </div>

                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">Completed Course</label>
                                                <select name="courseId" id="courseId" onChange={handleChangeInputs} className="p-3 border-2 border-gray-600 rounded-lg">
                                                    <option value="">Choose Course</option>
                                                    {
                                                        courseList?.map((item) => {
                                                            return (
                                                                <option key={item?.course?._id} value={item?.course?._id}>{item?.course?.title}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {/* <input type="text" name="courseId" id="courseId" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeInputs} /> */}
                                            </div>

                                            <div className="flex flex-col p-2 gap-3">
                                                <label htmlFor="">Issue Date</label>
                                                <input type="date" name="validDate" id="validDate" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeInputs} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 mt-10">

                                            <div className="flex w-[100%]">
                                                <div className="flex flex-col p-2 gap-3 w-[50%]">
                                                    <label htmlFor="">Certificate Logo</label>
                                                    <input type="file" name="uploadLogo" id="uploadLogo" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeLogo} />
                                                </div>
                                                <div className="w-[50%] flex justify-center items-center">
                                                    <img src={Logo} alt="" className="w-56 h-56" />
                                                </div>
                                            </div>

                                            <div className="flex w-[100%] ">
                                                <div className="flex flex-col p-2 gap-3 w-[50%]">
                                                    <label htmlFor="">Certificate Signature</label>
                                                    <input type="file" name="uploadSignature" id="uploadSignature" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeSignature} />
                                                </div>
                                                <div className="w-[50%] flex justify-center items-center">
                                                    <img src={signature} alt="" className="w-56 h-56" />
                                                </div>
                                            </div>


                                            <div className="flex w-[100%]">
                                                <div className="flex flex-col p-2 gap-3 w-[50%]">
                                                    <label htmlFor="">Certificate Template</label>
                                                    <input type="file" name="uploadTemplate" id="uploadTemplate" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeCertificate} />
                                                </div>
                                                <div className="w-[50%] flex justify-center items-center">
                                                    <img src={certificate} alt="" className="w-56 h-56" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col p-2 gap-3">
                                            <label htmlFor="">Description</label>
                                            <textarea name="description" id="description" cols="10" rows="5" className="p-3 border-2 border-gray-600 rounded-lg" onChange={handleChangeInputs}></textarea>
                                        </div>

                                        <div className="w-full flex justify-center items-center gap-5 p-2">
                                            {/* <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Save</button> */}
                                            <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-42 rounded-lg" type="submit">Issue Certificate</button>
                                        </div>

                                    </form>
                                </div>
                            </Box>
                        </Modal>

                    </div>
            }
        </div>
    )
}

export default Certificate




{/* <div className="w-full">
                        <div className="flex w-[50%] bg-slate-400">
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="">Issue Date</label>
                                <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                            </div>
                            <div className="w-[50%] bg-slate-900">
                                <img src="https://s3-alpha-sig.figma.com/img/2b7a/e2a9/ab1815762d340c9974f3e447205cfc0a?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aEPY7QuTi2wysCmyemLNF49y~3kWS2Be4A81pIWF0YkaTuOXL0VMlLm-vrmGzhbYyc9mCdxiXoxXwMQeyskHdMquey3pB4nak4-vwAMsAt9BhEjx5YGmH42rSXmt3NtOfGKRuL6RzaqyPMnVtRC9pdewImvJwmCbZQx7oSHuBHP2VajxjDtPinJVrz1af1q5vKsMdF8WscfHzXOsi717dmtITVa5RZQThfvlWrVrv0nhkDsewp3-YrAVmUjjHvP86x46oDhTyd646mHLQ8Bs6ab4zVJYjXRVeleeInPwSvineBiyTI7zjxt-cq7xwAC8EVbglq9D~0KSs-EwjORQ5Q__" alt="" className="w-56 h-56"/>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="">Issue Date</label>
                                <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                            </div>
                            <div>
                                <img src="https://s3-alpha-sig.figma.com/img/45ef/b21d/aca77a517ecec4344a10ade9e4654cc5?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TZ0ErWATaT9AjNXk6xNIyE8CM-5yoUD2dDQhT2rYJp1CdARkzorTXHiDs-a0oEuJdXJKO3NZaa-FkeuodtzubSFfX4SXuJe233p2DnTe6FVQNIW3BkcrwjC14IC52psdLl3erqPScPvMqN7KO8CSgbFWvgFd30-eX~3Kd1~7uXsSfhIqw76P5vFi1vj9Pe7DE16DhrX81-vyo2G5D-r9aiBCheoHiuLdY8Rqxn6dLk2f-sL-W7jkXKa4qPPgjvmUoJqiJ76X-G14NXQSZrEMhPjE6xeFBYZDNx5~tcOaPXwoBs2aZnRJB73IszMhl9tsI-JsGJcqXVw6hRs3eGvMuA__" alt="" className="w-56 h-56"/>
                            </div>
                        </div>


                        <div className="flex">
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="">Issue Date</label>
                                <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                            </div>
                            <div>
                                <img src="https://s3-alpha-sig.figma.com/img/b98d/8be9/e21a2491a0de0bf7d185970b00a44d15?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gdQ2sttl735I75mlss-JonAjDslPLrXRHBhVgoWZZT0X8u6IkmU1Jb7BoZ2aChd7tUMr4psos0Ep6gohwxmpbrDWk4oDVMzSNTC-vC51uWVvAKwJD2SGdKOH6i9ZBURoj4cYJPYMXOd11xDX2FMoolwauCECRbptqJCLM6EkLFrRGHhjhSe6UiTXP9l9aFVdAm0Aux-CpUip~9W2iJBhtjfMlZqDAiBQKuLZIKghTOLUzeAG9E-wWS4qFN30dEc6Q6Q-aufYd9VqZRCyO4SyqjnWh97aRdyvQ0uB4d3DqIh6qWioUMgt8UrB8SnSsrfhRamRwlw1ocNaCdrcCuEZzA__" alt="" className="w-56 h-56"/>
                            </div>
                        </div>
                    </div> */}