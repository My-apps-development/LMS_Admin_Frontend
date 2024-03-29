import { useEffect, useState } from "react";
import AdminDashboard from "../Dashboard/AdminDashboard"
import { FaPlus } from "react-icons/fa6";
import { Box, Modal } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { axiosInstance } from "../../Utils/AxiosSetUp";
import { errorMessage, successMessage } from "../../Utils/notificationManager";
import Loader from "../../Utils/Loader";



const CourseCategory = () => {

    const [subModalOpen, setSubModalOpen] = useState(false)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [loader, setLoader] = useState(false)
    const [image, setImage] = useState(null)
    const [postImage, setPostImage] = useState(null)
    const [subCategoryFlag, setSubCategoryFlag] = useState(false)
    const [roles, setRoles] = useState([])
    const [singleCategory, setSingleCategory] = useState({
        categories: "",
        role: "",
        _id: ""
    })
    const [singleSubCategory, setSingleSubCategory] = useState({
        _id: "",
        title: "",
        categoryId: ""
    })
    const [flag, setFlag] = useState(true)
    const [inputs, setInputs] = useState({
        categories: "",
        role: "",

    })
    const [subCategoryInputs, setSubCategoryInputs] = useState({

        title: "",

    })


    const handleChange = (e) => {
        e.preventDefault()

        flag ?

            setInputs({ ...inputs, [e.target.name]: e.target.value }) : setSingleCategory({ ...singleCategory, [e.target.name]: e.target.value })
    }

    const handleChangeImage = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
          
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file);
        }
        setPostImage(file)
    }

    const handleCloseSubmodal = () => {
        setSubModalOpen(false)
    }

    const handleAddModalOpen = () => {
        setFlag(true)
        setAddModalOpen(true)
    }

    const handleCloseAddModal = () => {
        setAddModalOpen(false)
    }

    const handleChangeSubcategory = (e) => {
        e.preventDefault()
        subCategoryFlag ? setSubCategoryInputs({ ...subCategoryInputs, [e.target.name]: e.target.value }) : setSingleSubCategory({ ...singleSubCategory, [e.target.name]: e.target.value })

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
        border: '2px solid white',
        boxShadow: 24,
        borderRadius: 1,
        p: 4,
    };

    const FetchMasterRoles = async () => {
        try {
            const response = await axiosInstance.get("/enrollment/masterroles")
            const data = await response.data
            setRoles(data?.roles)

        } catch (error) {
            
            errorMessage(error?.response?.data?.message)
        }
    }

    const PostCategory = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('categories', inputs.categories);
        formData.append('role', inputs.role)
        formData.append('Upload_Category', postImage);



        if (!inputs.categories) {
            errorMessage("Category is Required")
            return
        }

        if (!inputs.role) {
            errorMessage("Role is required")
            return
        }

        if (!postImage) {
            errorMessage("Image is required")
            return
        }

        try {
            setLoader(true)
            const response = await axiosInstance.post("/category/create", formData, {

            })
            const data = await response.data
            successMessage(data.message);
            FetchCategories()
            ClearInputs()
            setImage(null)
            setAddModalOpen(false)
            setLoader(false)
        } catch (error) {
            
            errorMessage(error?.response?.data?.message)
        }

    }

    const FetchCategories = async () => {

        try {
            setLoader(true)
            const response = await axiosInstance.get("/category/fetch")
            const data = await response.data
            setCategoryList(data.categories);


            setLoader(false)

        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const fetchCategoryById = async (categoryId) => {

        setAddModalOpen(true)
        setFlag(false)

        try {
            setLoader(true)
            const response = await axiosInstance.get(`category/singlecategory?categoryid=${categoryId}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            const data = await response.data
            setSingleCategory(data.category);
            setImage(data.category.upload_thumbnail);
            setLoader(false)
        }
        catch (error) {
            errorMessage(error?.response?.data?.message)
           
        }
    }

    const UpdateCategory = async (e) => {
        e.preventDefault()

        if (!singleCategory.categories) {
            errorMessage("Category is Required")
            return
        }

        if (!postImage) {
            errorMessage("Image is Required")
            return
        }

        const formData = new FormData();
        formData.append('id', singleCategory._id);
        formData.append('categories', singleCategory.categories);
        formData.append('totalsubCategory', singleCategory.totalsubCategory);
        formData.append("role", singleCategory?.role)
     
        formData.append('Upload_Category', postImage);

        try {
            setLoader(true)
            const response = await axiosInstance.patch("https://myappsdevelopment.co.in/category/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            const data = await response.data
            successMessage(data.message);
            setImage(null)
            FetchCategories()
            setAddModalOpen(false)
            setLoader(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const DeleteCategory = async (_id) => {
        try {
            setLoader(true)
            const response = await axiosInstance.delete(`/category/delete`, { data: { id: _id } })
            const data = await response.data
            successMessage(data.message);
            FetchCategories()
            setLoader(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            // console.log("Error Deleting Category", error.message);
        }
    }

    const FetchSubCategories = async () => {

        try {
            setLoader(true)
            const response = await axiosInstance.get(`/category/fetch/subcategory`)
            const data = await response.data
            setSubCategoryList(data.Subcategories);
            setLoader(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const FetchSingleSubcategoryById = async (_id) => {
        try {
            const response = await axiosInstance.get(`/category/singlesubcategory?subcategoryid=${_id}`)
            const data = await response.data
            // console.log(data);
            setSingleSubCategory(data?.subcategory);
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            // console.log("Error Fetching Single Subcategory by Id", error.message);
        }
    }

    const PostSubcategory = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", subCategoryInputs?.title)
        formData.append("categoryId", singleCategory?._id)

        try {
            const response = await axiosInstance.post("/category/add/subcategory", formData)
            const data = await response?.data
            console.log(data);
        } catch (error) {
            errorMessage(error?.response?.data?.message)
           
        }
    }

    const UpdateSubcategory = async (e) => {
        e.preventDefault()

        const UpdateSubcategoryForm = new FormData()
        UpdateSubcategoryForm.append("title", singleSubCategory?.title)
        UpdateSubcategoryForm.append("categoryId", singleCategory?._id)
        UpdateSubcategoryForm.append("role", singleCategory?.role)

        try {
            const response = await axiosInstance.patch(`category/update/subcategory?subcategoryId=${singleSubCategory?._id}`, UpdateSubcategoryForm)
            const data = await response.data
            successMessage(data?.message);
        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const DeleteSingleSubCategory = async (_id) => {

        if (window.confirm("Are you sure want to delete video")) {
            try {
                setLoader(true)
                const response = await axiosInstance.delete("https://myappsdevelopment.co.in/category/delete/subcategory", { data: { id: _id } })
                const data = await response?.data
                successMessage(data.message);
                FetchSubCategories()
                setLoader(false)
            } catch (error) {
                errorMessage(error.response.data.message)
             
            }
        }

    }

    const ClearInputs = () => {
        try {
            setInputs((prevState) => ({
                prevState,
                categories: "",
                role: "",
                Upload_Category: null
            }))
            setImage(null)
        } catch (error) {
            console.log("error clearing input fields", error.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                FetchMasterRoles()
                await FetchCategories();
                await FetchSubCategories();
                setLoader(false);
            } catch (error) {
                errorMessage(error?.response?.data?.message)
               
            }
        };

        fetchData();
    }, [])

    return (
        <div className="w-full">
            <AdminDashboard />
            {loader ? <Loader /> : <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300 ">

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

                    {!categoryList.length ? <div>Oops...! There is No Categories</div> : null}

                    {[...categoryList]?.reverse()?.map((item, index) => {

                        return (
                            <div key={index}>
                                <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg hover:scale-95 duration-300 bg-white" data-aos="flip-left">
                                    <div>
                                        <img src={item.upload_thumbnail} alt="" className="rounded-lg object-cover w-full h-72" loading="lazy" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl">{item.categories}</h1>
                                        {/* <p className="text-sm">{item.totalsubCategory} sub categories</p> */}
                                    </div>
                                    {
                                        subCategoryList.filter(it => it?.subcategory?.categoryId === item._id).map((i, index) => {
                                            return (
                                                <div className="flex justify-between items-center gap-2 cursor-pointer border-b-2 p-1" key={index}>
                                                    <p>{i?.subcategory?.title}</p>
                                                    <div className="flex justify-center items-center gap-2">
                                                        <p onClick={() => {
                                                            setSubModalOpen(true), FetchSingleSubcategoryById(i?.subcategory?._id), setSubCategoryFlag(false)
                                                        }}><CiEdit /></p>
                                                        <p onClick={() => DeleteSingleSubCategory(i?.subcategory?._id)}><MdDelete /></p>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }


                                    <div className="flex justify-between items-center gap-2 text-2xl">
                                        <p className="text-blue-500 cursor-pointer" onClick={() => fetchCategoryById(item?._id)}><CiEdit /></p>
                                        <p className="text-red-500 cursor-pointer" onClick={() => DeleteCategory(item._id)}><MdDelete /></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}



                </div>
            </div>}
            <div>

            </div>
            <div>
                <Modal
                    open={subModalOpen}
                >
                    <Box sx={SubModalStyle}>
                        <div className="text-gray-600 font-semibold text-lg">
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">{subCategoryFlag ? "Add Subcategory" : "Edit Subcategory"}</h1>
                                <button className="border-[#B32073] bg-[#B32073] p-2 rounded-lg w-20 text-lg text-white" onClick={handleCloseSubmodal}>Close</button>
                            </div>
                            <form action="" onClick={subCategoryFlag ? PostSubcategory : UpdateSubcategory}>

                                <div className="flex flex-col p-2 gap-3">
                                    <label htmlFor="">Parent</label>
                                    <input type="text" name="" id="" placeholder="Defensive Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " value={singleCategory?.categories} disabled />
                                </div>



                                <div className="flex flex-col p-2 gap-3">
                                    <label htmlFor="">Subcategory Title</label>
                                    <input type="text" name="title" id="title" placeholder="Subcategory" className="border-2 border-gray-600 rounded-lg text-lg p-2 " onChange={handleChangeSubcategory} />
                                </div>



                                {/* <div className="flex flex-col p-2 gap-3">
                                    <label htmlFor="" className="text-sm">Parent</label>
                                    <select name="categoryId" id="categoryId" className="border-2 border-gray-600 rounded-lg text-lg p-2 " value={singleCategory?.categories} onChange={handleChangeSubcategory}>
                                        <option value="">Choose Category</option>
                                        {
                                            categoryList?.map((item) => {
                                                return (
                                                    <option value={item?._id} key={item?._id}>{item?.categories}</option>
                                                )
                                            })
                                        }

                                    </select>

                                </div> */}
                                <div className="w-full flex justify-center items-center gap-5 p-5">
                                    {/* <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button> */}
                                    <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-38 rounded-lg">{subCategoryFlag ? "Add Subcategory" : "Update Subcategory"}</button>
                                </div>
                            </form>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={addModalOpen}
                >
                    <Box sx={style}>
                        <div className="text-xs text-gray-600 font-semibold ">
                            <div className="flex justify-between items-center w-full text-black">
                                <h1 className="text-2xl">{flag ? "Add Category " : "Edit Category"}</h1>
                                <button className="border-[#B32073] bg-[#B32073] p-2 rounded-lg w-20 text-lg text-white" onClick={handleCloseAddModal}>Close</button>
                            </div>
                            <div className="flex w-full gap-5 p-2">
                                <form className="w-[50%]" onSubmit={flag ? PostCategory : UpdateCategory}>
                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Category Title</label>
                                        <input type="text" name="categories" id="categories" placeholder="Defensive Driving" className="border-2 border-gray-600 rounded-lg text-lg p-2 " value={flag ? inputs.categories : singleCategory.categories} onChange={handleChange} />
                                    </div>


                                    <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Role</label>
                                        <select name="role" id="role" className="p-3 border-2 border-gray-600 text-lg rounded-lg" onChange={handleChange} value={flag ? inputs?.role : singleCategory?.role}>
                                            <option value="">Choose Role</option>
                                            {
                                                roles?.map((item, index) => {
                                                    return (
                                                        <option value={item} key={index} className="capitalize">{item}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>

                                    {/* <div className="flex flex-col p-2 gap-3">
                                        <label htmlFor="">Total Subcategories</label>
                                        <input type="text" name="totalsubCategory" id="totalsubCategory" placeholder="3" className="border-2 border-gray-600 rounded-lg text-lg p-2 " value={flag ? inputs.totalsubCategory : singleCategory.totalsubCategory} onChange={handleChange} />
                                    </div> */}





                                    {/* <div className="flex justify-start items-center py-4 px-2">
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-36 hover:scale-95 hover:duration-300" onClick={() => {
                                            setSubCategoryFlag(true), setSubModalOpen(true)
                                        }}><FaPlus /> Add Subcategory</button>
                                    </div> */}


                                    <div className="w-full flex justify-center items-center gap-5">
                                        {/* <button className="p-2 border-2 border-[#B32073] bg-white text-[#B32073] hover:text-white hover:bg-[#B32073] flex justify-center items-center gap-3 w-32 rounded-lg">Cancel</button> */}
                                        <button className="p-2 border-2 border-[#B32073] bg-[#B32073] hover:bg-white hover:text-[#B32073] text-white  flex justify-center items-center gap-3 w-32 rounded-lg hover:scale-95 hover:duration-300" type="submit">{flag ? "Add Category" : "Update Category"}</button>
                                    </div>

                                </form>
                                <div className="w-[50%]">
                                    <div className="border-2 shadow-lg flex flex-col gap-3 p-3 rounded-lg">
                                        <div className="">
                                            <img src={image} alt="" className="rounded-lg object-contain h-60 w-full" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl text-[#B32073]">Upload Thumbnail Image</h1>
                                            <p className="text-sm">Upload Course Image for your product.</p>
                                            <p className="capitalize">file format <b className="text-black">jpeg, png</b> Recommended size 425 X 371</p>

                                            <input type="file" name="Upload_Category" id="Upload_Category" accept="image/*" onChange={handleChangeImage} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div>
                {/* <Modal>
                    <Box sx={styleSubCategory}>

                    </Box>
                </Modal> */}
            </div>
        </div>
    )
}

export default CourseCategory