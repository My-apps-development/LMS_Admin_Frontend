import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { errorMessage, successMessage } from "../../Utils/notificationManager"
import { axiosInstance } from "../../Utils/AxiosSetUp"


const CompanyLogin = () => {

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault()

        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmitData = async (e) => {
        e.preventDefault()

        if(!inputs?.email){
            errorMessage("Email is Required")
            return
        }

        if(!inputs?.password){
            errorMessage("password is required")
            return
        }

        try{
            const response =await axiosInstance.post("/company/login", inputs)
            const data = response?.data
            // console.log(data);
            localStorage.setItem("company", JSON.stringify(data?.company))
            localStorage.setItem("token", JSON.stringify(data?.token))
            successMessage(data?.message);
            navigate("/companydashboard")
            window.location.reload()
        } catch(error){
            // console.log("error sending login credentials", error.message);
            errorMessage(error?.response?.data?.message)
        }
    }
    return (
        <div className="flex w-[100%] h-screen font-semibold bg-gray-100">
            <div className="w-[50%] mt-28">
                <img src="https://img.freepik.com/free-vector/business-teamwork-concept-teamwork-leadership-effort-hard-work-team-strategy-concept-brainstorm-workshop-management-skills-vector-cartoon-illustration-flat-design_1150-56223.jpg?w=1060&t=st=1706766246~exp=1706766846~hmac=915e77b3c2618166d1a563c7ff58ba55fd46adccbdc91a2e6d9899501853a84b" alt="" className="object-fill w-auto h-auto" />
            </div>
            <div className="w-[50%] flex justify-center items-center  bg-slate-100">
                <div className="w-[75%] h-[600px] border-2 border-gray-300 rounded-lg p-5 flex justify-center items-center flex-col">

                    <div className="mt-10">
                        <img src="/Logo.png" alt="" className="w-28 h-28" />

                    </div>
                    {/* <div className="w-[70%]">
            <div className="flex justify-center items-center">
              <img src="https://s3-alpha-sig.figma.com/img/2b7a/e2a9/ab1815762d340c9974f3e447205cfc0a?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eVqTssfLKAkKuK7FxoGcwekgZU5s2CeVO4LyCghKGfpGdv8SoqG6YpCp9utoHyx5VxwOFNdaumLDciVcLmrJlerqlFHc2Kiy5BIOpkszs1AfV6WeVLBKWrsZKw4lINkJp5PYZElwhIHauq0RtGyX0sqqzhv-Z8xG9sTOtQbm7zRS0FfDbiF0kEes8IW1g~el~oSQmO6DPHjDQU~i66mjvVX0dEaq~wL7sjDVQWubVu1sHJIzY3zu9MkGcAXvargy-F8znxU2yZxfkNC~eeckaBWieQqrCXQ8QKoc-l4nHQJgzr3snpGGw3ovATCZdYaJX9B6fp9uie~zsCS6iYnHVw__" alt="" className="w-12 h-12" />
            </div>
            <div className="flex justify-center items-center flex-col gap-5 p-5 w-[100%]">
              <h4 className="text-xs text-gray-600">Welcome Please Login to Your account</h4>
              <p className="border-2 w-[100%] p-2 text-blue-600 border-blue-600 rounded-lg flex justify-center items-center gap-2"><FcGoogle /> Login with Google</p>
            </div>

          </div> */}
                    <div className="text-red-600 flex justify-center items-center gap-5 p-5 capitalize w-[100%]">
                        <p>Login for Company</p>
                    </div>

                    <div className="w-[70%] grid grid-cols-1 justify-center items-center p-2 gap-5">
                        <form className="w-[100%]" onSubmit={handleSubmitData}>
                            <div className="p-2 flex flex-col gap-2">
                                <label htmlFor="">Username or Email <span className="text-red-700">*</span></label>
                                <input type="text" name="email" id="email" className="border-2 p-2 rounded-lg" placeholder="Enter Email or Username" onChange={handleChange} />
                            </div>

                            <div className="p-2 flex flex-col gap-2">
                                <label htmlFor="">Password <span className="text-red-700">*</span></label>
                                <input type="text" name="password" id="password" className="border-2 p-2 rounded-lg" placeholder="Enter Password" onChange={handleChange} />
                            </div>

                            <div className="p-2 flex flex-col gap-2">
                                <button className="bg-[#B32073] p-2 rounded-lg text-white hover:border-2 hover:border-[#B32073]  hover:text-[#B32073] hover:bg-white" type="submit">Log in</button>
                                <button className="bg-white text-[#B32073] p-2 border-2 border-[#B32073] hover:text-white rounded-lg  hover:bg-[#B32073]" onClick={() => navigate("/login")}>Admin Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyLogin