import AdminDashboard from "../Dashboard/AdminDashboard"


const Certificate = () => {
    return (
        <div>
            <AdminDashboard />
            <div className="ml-56 mt-32 w-auto p-3 font-semibold text-gray-600">
                <div className="flex justify-between items-center w-full text-black">
                    <h1 className="text-2xl">Add Course</h1>
                    <button className="border-[#B32073] text-white bg-[#B32073] p-2 rounded-lg w-20" >Close</button>
                </div>
                <div>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col p-2 gap-3">
                            <label htmlFor="">First Name</label>
                            <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                        </div>

                        <div className="flex flex-col p-2 gap-3">
                            <label htmlFor="">Last Name</label>
                            <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                        </div>

                        <div className="flex flex-col p-2 gap-3">
                            <label htmlFor="">Completed Course</label>
                            <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                        </div>

                        <div className="flex flex-col p-2 gap-3">
                            <label htmlFor="">Issue Date</label>
                            <input type="text" name="firstname" id="firstname" className="p-3 border-2 border-gray-600 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" cols="10" rows="5" className="p-3 border-2 border-gray-600 rounded-lg" ></textarea>
                    </div>

                    <div className="w-full flex justify-center items-center gap-5 p-2">
                        <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Save</button>
                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-42 rounded-lg">Issue Certificate</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Certificate