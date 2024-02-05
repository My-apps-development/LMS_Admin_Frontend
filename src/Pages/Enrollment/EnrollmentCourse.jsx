import { FaPlus } from "react-icons/fa"
import AdminDashboard from "../Dashboard/AdminDashboard"

import Box from '@mui/material/Box';


import Modal from '@mui/material/Modal';
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius:1,
    boxShadow: 24,
    p: 4,
};


const EnrollmentCourse = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        console.log(open);
        setOpen(true)
    };
    const handleClose = () => {
        console.log(open);
        setOpen(false)
    };

    return (
        <div className="w-full">
            <AdminDashboard />
            <div className="ml-56 mt-32 w-auto p-3 font-semibold text-gray-600">
                <div className="p-2 ">
                    <h1 className="text-2xl">Course Enrollment</h1>
                </div>
                <div className="flex justify-between items-center p-2">
                    <h1>Course Enrollment</h1>
                    <button className="p-2 border-2 border-pink-600 bg-pink-600 text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-32" onClick={handleOpen}><FaPlus />Add</button>
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
                                    <h1 className="text-2xl">Enrollment Form</h1>
                                    <button className="border-pink-600 bg-pink-600 p-2 rounded-lg w-20" onClick={handleClose}>Close</button>
                                </div>
                                <div className="flex flex-col p-2 gap-3">
                                    <label htmlFor="">User Role</label>
                                    <select name="" id="" className="p-3 border-2 border-gray-600 rounded-lg">
                                        <option value="Driver">Driver</option>
                                        <option value="Security Gaurd">Security Gaurd</option>
                                    </select>
                                </div>
                                <div className="flex flex-col p-2 gap-3">
                                    <label htmlFor="">Course To Enroll</label>
                                    <select name="" id="" className="p-3 border-2 border-gray-600 rounded-lg">
                                        <option value="Driver">Defencive driving</option>
                                        <option value="Security Gaurd">Security Gaurd</option>
                                    </select>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <button className="p-2 border-2 border-pink-600 bg-pink-600 text-white hover:bg-pink-800 flex justify-center items-center gap-3 w-32 rounded-lg">Enroll Course</button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default EnrollmentCourse