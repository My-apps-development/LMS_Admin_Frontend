import { useEffect, useState } from "react"
import { axiosInstance } from "../../Utils/AxiosSetUp"
import Loader from "../../Utils/Loader"
import { TablePagination } from "@mui/material"


const CompanyList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [companyList, setCompanyList] = useState([])
    const [loader, setLoader] = useState(false)

    const fetchCompanyList = async () => {
        try {
            setLoader(true)
            const response = await axiosInstance.get("/company/fetch")
            const data = await response.data
            setCompanyList(data.companies);
            setLoader(false)
        } catch (error) {
            console.log("Error Fetching company details", error.message);
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    useEffect(() => {
        fetchCompanyList()
    }, [])
    return (
        <div className="ml-56 p-3 flex flex-col font-semibold text-gray-600 bg-gray-300 h-dvh">
            {
                loader ? <Loader /> : <div className="w-full bg-white rounded-lg">
                    <table className="w-full">
                        <thead>
                            <tr className=" border-b">
                                <th className="border-r">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">#</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Name</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Email</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">Phone</h1>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                    <h1 className="flex items-center justify-center">User</h1>
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                companyList.map((item, index) => {
                                    return (
                                        <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>

                                            <td className="border-r">  <input type="checkbox" /></td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                <h1 className="flex items-center justify-center">{index + 1}</h1>
                                            </td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                <h1 className="flex items-center justify-center">{item.name}</h1>
                                            </td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                <h1 className="flex items-center justify-center">{item.email}</h1>
                                            </td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                <h1 className="flex items-center justify-center">{item.phone}</h1>
                                            </td>
                                            <td className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                                <h1 className="flex items-center justify-center">User</h1>
                                            </td>


                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td><TablePagination
                    rowsPerPageOptions={[5, 10, 100]}
                    component="div"
                    count={companyList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  /></td>

                </tr>
              </tbody>
            </table>
                </div>
            }
        </div>
    )
}

export default CompanyList