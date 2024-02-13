import { useEffect, useState } from "react";
import AdminDashboard from "../Dashboard/AdminDashboard"
import { FaPlus } from "react-icons/fa6";
import { Box, Modal } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { successMessage } from "../../Utils/notificationManager";



const CourseCategory = () => {

    const [open, setOpen] = useState(false)
    const [subModalOpen, setSubModalOpen] = useState(false)
    const [addModalOpen, setAddModalOpen] = useState(false)

    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [subCategory, setSubCategory] = useState([])




    const handleEdit = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleEditSubmodal = () => {
        setSubModalOpen(true)
    }

    const handleCloseSubmodal = () => {
        setSubModalOpen(false)
    }

    const handleAddModalOpen = () => {
        setAddModalOpen(true)
    }

    const handleCloseAddModal = () => {
        setAddModalOpen(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid transparent',
        boxShadow: 24,
        borderRadius: 1,
        p: 4,
    };

    const SubModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid transparent',
        boxShadow: 24,
        borderRadius: 1,
        p: 4,
    };

    const FetchCategories = async () => {

        try {
            const response = await axiosInstance.get("/category/fetch")
            const data = await response.data
            setCategoryList(data.categories);

            data.categories.forEach(category => {
                setSubCategory(category._id)
            })

        } catch (error) {
            console.log("Error Fetching Categories");
        }
    }



    // console.log(subCategory);

    console.log(categoryList);


    const FetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get(`category/fetch/subcategory?categoryId=65bca28182a04790da0b2e7f`)
            const data = await response.data
            setSubCategoryList(data.Subcategories);
        } catch (error) {
            console.log("Error fetching Sub Category List");
        }
    }

    const DeleteCategory = async (_id) => {
        console.log(_id)
        try {
            const response = await axiosInstance.delete(`/category/delete`, { data: { id: _id } })
            const data = await response.data
            successMessage(data.message);
            FetchCategories()
        } catch (error) {
            console.log("Error Deleting Category", error.message);
        }
    }


    useEffect(() => {
        FetchCategories()
        FetchSubCategories()
    }, [])

    // console.log(subCategoryList);

    return (
        <div className="w-full">
            <AdminDashboard />
            <div className="ml-56 mt-32 w-auto p-3 font-semibold text-gray-600">

                <div className="">
                    <div className="p-2 ">
                        <h1 className="text-2xl">Categories</h1>
                    </div>
                    <div className="flex justify-between items-center p-2">
                        <p>Total {categoryList.length} Categories Available</p>
                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] text-white hover:bg-pink-800 flex justify-center items-center gap-3" onClick={handleAddModalOpen}><FaPlus /> Add Category</button>
                    </div>
                </div>



                <div className="grid grid-cols-4 gap-5 mt-5 p-2 w-[100%] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-lg:text-xs">

                    {categoryList.map((item, index) => {

                        return (
                            <div key={index}>
                                <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg hover:scale-95 duration-300">
                                    <div>
                                        <img src={item.upload_thumbnail} alt="" className="rounded-lg object-cover" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl">{item.categories}</h1>
                                        <p className="text-sm">{item.totalsubCategory} sub categories</p>
                                    </div>
                                    {
                                        subCategoryList.map((item, index) => {
                                            return (
                                                <div className="flex justify-between items-center gap-2" key={index}>
                                                    <p>{item.title}</p>
                                                    <div className="flex justify-center items-center gap-2">
                                                        <p onClick={handleEditSubmodal}><CiEdit /></p>
                                                        <p><MdDelete /></p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {/* <div className="flex justify-between items-center gap-2">
                                        <p>Sub Category 2</p>
                                        <div className="flex justify-center items-center gap-2">

                                            <p onClick={handleEditSubmodal}><CiEdit /></p>
                                            <p><MdDelete /></p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center gap-2">
                                        <p>Sub Category 2</p>
                                        <div className="flex justify-center items-center gap-2">
                                            <p><CiEdit /></p>
                                            <p><MdDelete /></p>
                                        </div>
                                    </div> */}
                                    <div className="flex justify-between items-center gap-2 text-2xl">
                                        <p className="text-blue-500 cursor-pointer" onClick={handleEdit}><CiEdit /></p>
                                        <p className="text-red-500 cursor-pointer" onClick={() => DeleteCategory(item._id)}><MdDelete /></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                        <div>
                            <img src="https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg?t=st=1706787923~exp=1706788523~hmac=c2a58b2e44fde18bbe73065ee3ec83536c363ff3f098ea6a57ec1ba9795607a9" alt="" className="rounded-lg object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl">Introduction</h1>
                            <p className="text-sm">3 sub categories</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>App Introduction</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">

                                <p onClick={handleEditSubmodal}><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2 text-2xl">
                            <p className="text-blue-500" onClick={handleEdit}><CiEdit /></p>
                            <p className="text-red-500"><MdDelete /></p>
                        </div>
                    </div>

                    <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                        <div>
                            <img src="https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg?t=st=1706787923~exp=1706788523~hmac=c2a58b2e44fde18bbe73065ee3ec83536c363ff3f098ea6a57ec1ba9795607a9" alt="" className="rounded-lg object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl">Introduction</h1>
                            <p className="text-sm">3 sub categories</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>App Introduction</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2 text-2xl">
                            <p className="text-blue-500" onClick={handleEdit}><CiEdit /></p>
                            <p className="text-red-500"><MdDelete /></p>
                        </div>
                    </div>

                    <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                        <div>
                            <img src="https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg?t=st=1706787923~exp=1706788523~hmac=c2a58b2e44fde18bbe73065ee3ec83536c363ff3f098ea6a57ec1ba9795607a9" alt="" className="rounded-lg object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl">Introduction</h1>
                            <p className="text-sm">3 sub categories</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>App Introduction</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2 text-2xl">
                            <p className="text-blue-500" onClick={handleEdit}><CiEdit /></p>
                            <p className="text-red-500"><MdDelete /></p>
                        </div>
                    </div>

                    <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                        <div>
                            <img src="https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg?t=st=1706787923~exp=1706788523~hmac=c2a58b2e44fde18bbe73065ee3ec83536c363ff3f098ea6a57ec1ba9795607a9" alt="" className="rounded-lg object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl">Introduction</h1>
                            <p className="text-sm">3 sub categories</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>App Introduction</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2 text-2xl">
                            <p className="text-blue-500" onClick={handleEdit}><CiEdit /></p>
                            <p className="text-red-500"><MdDelete /></p>
                        </div>
                    </div>

                    <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                        <div>
                            <img src="https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg?t=st=1706787923~exp=1706788523~hmac=c2a58b2e44fde18bbe73065ee3ec83536c363ff3f098ea6a57ec1ba9795607a9" alt="" className="rounded-lg object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl">Introduction</h1>
                            <p className="text-sm">3 sub categories</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>App Introduction</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p>Sub Category 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p><CiEdit /></p>
                                <p><MdDelete /></p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2 text-2xl">
                            <p className="text-blue-500" onClick={handleEdit}><CiEdit /></p>
                            <p className="text-red-500"><MdDelete /></p>
                        </div>
                    </div> */}

                </div>
            </div>
            <div>
                <Modal
                    open={open}
                >
                    <Box sx={style}>
                        <div className="text-xs text-gray-600 font-semibold">
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">Edit Category</h1>
                                <button className="border-[#B32073] bg-[#B32073] p-2 rounded-lg w-20 text-lg text-white" onClick={handleClose}>Close</button>
                            </div>
                            <div className="flex w-full gap-5 p-2">
                                <div className="w-[50%]">
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Category Title</label>
                                        <input type="text" name="firstname" id="firstname" placeholder="Defensive Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Total Subcategories</label>
                                        <input type="text" name="firstname" id="firstname" placeholder="3" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">SubCategory/Parent</label>
                                        <input type="text" name="firstname" id="firstname" placeholder="Safe Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                        <input type="text" name="firstname" id="firstname" placeholder="Safe Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                        <input type="text" name="firstname" id="firstname" placeholder="Sub category 3" className=" border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                    </div>



                                    <div className="flex justify-start items-center py-4 px-2">
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-36"><FaPlus /> Add Subcategory</button>
                                    </div>


                                    <div className="w-full flex justify-center items-center gap-5">
                                        <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button>
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg">Add/Edit Category</button>
                                    </div>

                                </div>
                                <div className="w-[50%]">
                                    <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                                        <div>
                                            <img src="https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg?t=st=1706787923~exp=1706788523~hmac=c2a58b2e44fde18bbe73065ee3ec83536c363ff3f098ea6a57ec1ba9795607a9" alt="" className="rounded-lg object-cover" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl text-[#B32073]">Upload Thumbnail Image</h1>
                                            <p className="text-sm">Upload Course Image for your product.</p>
                                            <p className="capitalize">file format <b className="text-black">jpeg, png</b> Recommended size 425 X 371</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={subModalOpen}
                >
                    <Box sx={SubModalStyle}>
                        <div className="text-gray-600 font-semibold text-lg">
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">Edit/Add Category</h1>
                                <button className="border-[#B32073] bg-[#B32073] p-2 rounded-lg w-20 text-lg text-white" onClick={handleCloseSubmodal}>Close</button>
                            </div>
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="">Category Title</label>
                                <input type="text" name="firstname" id="firstname" placeholder="Defensive Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                            </div>
                            <div className="flex flex-col p-2 gap-3">
                                <label htmlFor="" className="text-sm">Parent</label>
                                <input type="text" name="firstname" id="firstname" placeholder="Defensive Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                            </div>
                            <div className="w-full flex justify-center items-center gap-5 p-5">
                                <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button>
                                <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-38 rounded-lg">Add Course</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={addModalOpen}
                >
                    <Box sx={style}>
                        <div className="text-xs text-gray-600 font-semibold">
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">Add Category</h1>
                                <button className="border-[#B32073] bg-[#B32073] p-2 rounded-lg w-20 text-lg text-white" onClick={handleCloseAddModal}>Close</button>
                            </div>
                            <div className="flex w-full gap-5 p-2">
                                <div className="w-[50%]">
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Category Title</label>
                                        <input type="text" name="firstname" id="firstname" placeholder="Defensive Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Total Subcategories</label>
                                        <input type="text" name="firstname" id="firstname" placeholder="3" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                    </div>

                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">SubCategory/Parent</label>
                                        <input type="text" name="firstname" id="firstname" placeholder="Safe Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " />
                                    </div>



                                    <div className="flex justify-start items-center py-4 px-2">
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-36"><FaPlus /> Add Subcategory</button>
                                    </div>


                                    <div className="w-full flex justify-center items-center gap-5">
                                        <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button>
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg">Add Category</button>
                                    </div>

                                </div>
                                <div className="w-[50%]">
                                    <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                                        <div>
                                            <img src="https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg?t=st=1706787923~exp=1706788523~hmac=c2a58b2e44fde18bbe73065ee3ec83536c363ff3f098ea6a57ec1ba9795607a9" alt="" className="rounded-lg object-cover" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl text-[#B32073]">Upload Thumbnail Image</h1>
                                            <p className="text-sm">Upload Course Image for your product.</p>
                                            <p className="capitalize">file format <b className="text-black">jpeg, png</b> Recommended size 425 X 371</p>
                                        </div>

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

export default CourseCategory