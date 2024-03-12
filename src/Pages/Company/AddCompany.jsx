import { useState } from 'react'

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { errorMessage, successMessage } from '../../Utils/notificationManager'
import { axiosInstance } from '../../Utils/AxiosSetUp'
import Loader from '../../Utils/Loader'
// import Loader from '../../Utils/Loader'

const AddCompany = () => {
    const [addCompanyOpen, setAddCompanyOpen] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    const [loader, setLoader] = useState(false)


    const handleChange = (e) => {
        e.preventDefault()
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const PostCompanyForm = async (e) => {
        e.preventDefault()

        console.log(inputs)
        if (!inputs.name) {
            errorMessage("Company Name is required")
            return
        }

        if (!inputs.email) {
            errorMessage("Email is required")
            return
        }

        if (!inputs.password) {
            errorMessage("Password is required")
            return
        }

        if (!inputs.phone) {
            errorMessage("phone is required")
            return
        }



        const formData = new FormData()
        formData.append("name", inputs.name)
        formData.append("email", inputs.email)
        formData.append("phone", inputs.phone)
        formData.append("password", inputs.password)

        try {
            setLoader(true)
            const response = await axiosInstance.post("/company/add", JSON.stringify({ name: inputs.name, email: inputs.email, phone: inputs.phone, password: inputs.password }), { headers: { 'Content-Type': 'application/json' } })
            const data = await response.data
            successMessage(data.message);
            setLoader(false)

        } catch (error) {
            setLoader(false)
            errorMessage(error.response.data.message)
            console.log("Error posting company", error.message);
        }
    }
    return (
        <div>
            {loader ? <Loader /> : null}
            <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300 h-screen" >
                <div className="w-full p-5 rounded border-2 flex flex-col gap-5 bg-white shadow-lg" data-aos="fade-down">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setAddCompanyOpen(!addCompanyOpen)}>
                        <h1 className="text-2xl">Add Company</h1>
                        <button className="p-2 text-2xl font-bold  flex justify-center items-center gap-3">{addCompanyOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</button>
                    </div>
                    <div 
                    // className={`${addCompanyOpen ? "block" : "hidden"}`}
                    >
                        <form action="" className="w-[100%] flex flex-col gap-6" onSubmit={PostCompanyForm}>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Company Name</label>
                                    <input type="text" name="name" id="name" className="border-2 border-gray-600 p-2 rounded" placeholder='Company Name' onChange={handleChange} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Email</label>
                                    <input type="text" name="email" id="email" className="border-2 border-gray-600 p-2 rounded" placeholder='Companey Email' onChange={handleChange} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">password</label>
                                    <input type="text" name="password" id="password" className="border-2 border-gray-600 p-2 rounded" placeholder='Password' onChange={handleChange} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">phone</label>
                                    <input type="text" name="phone" id="phone" className="border-2 border-gray-600 p-2 rounded" placeholder='Phone Number' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <button className="p-2 border-2 border-[#B32073] bg-[#B32073] flex justify-center items-center gap-3  text-white ho hover:bg-white hover:text-[#B32073] rounded hover:scale-95 hover:duration-150">Add Company</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddCompany